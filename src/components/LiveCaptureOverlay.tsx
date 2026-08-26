"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  MicOff,
  Trash2,
  Check,
  Plus,
  Clock,
  ArrowRight,
  Minimize2,
  Loader2,
  Volume2,
  Play,
  AlertCircle
} from "lucide-react";
import {
  appendCovertNote,
  saveCovertAudioBlob,
  getOrCreateCovertSession,
  clearCovertSession
} from "@/lib/covertStore";
import { Language } from "@/lib/types";

interface LiveCaptureOverlayProps {
  isOpen: boolean;
  language?: Language;
  onClose: () => void;
  onNavigateToLogin: () => void;
}

type RecordingState = "idle" | "recording" | "mic-unavailable" | "saved";

function getSupportedMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/ogg",
    "audio/aac"
  ];
  for (const t of types) {
    try {
      if (MediaRecorder.isTypeSupported(t)) {
        return t;
      }
    } catch (e) {}
  }
  return "";
}

export const LiveCaptureOverlay: React.FC<LiveCaptureOverlayProps> = ({
  isOpen,
  language = "en",
  onClose,
  onNavigateToLogin
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [displayTime, setDisplayTime] = useState<string>("00:00");
  const [isSaving, setIsSaving] = useState(false);
  const [micErrorMessage, setMicErrorMessage] = useState<string>("");

  // Quick notes state
  const [notes, setNotes] = useState<Array<{ id: string; text: string; deviceTimestamp: string }>>([]);
  const [quickNoteText, setQuickNoteText] = useState("");
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Refs for MediaRecorder lifecycle and buffering (ensures no garbage collection on re-render)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const secondsRef = useRef<number>(0);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    secondsRef.current = 0;
    setDisplayTime("00:00");
    timerRef.current = setInterval(() => {
      secondsRef.current += 1;
      const m = String(Math.floor(secondsRef.current / 60)).padStart(2, "0");
      const s = String(secondsRef.current % 60).padStart(2, "0");
      setDisplayTime(`${m}:${s}`);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch (e) {}
      });
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
  };

  const startRecording = useCallback(async () => {
    // Guard against duplicate recording instances
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      return;
    }

    setMicErrorMessage("");

    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setRecordingState("mic-unavailable");
        setMicErrorMessage("Audio recording is not supported in this browser.");
        return;
      }

      // Laptop & mobile resilient getUserMedia audio constraints
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: true
          }
        });
      } catch (errFallback) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      streamRef.current = stream;

      const audioTracks = stream.getAudioTracks();
      if (!audioTracks || audioTracks.length === 0) {
        console.warn("No audio tracks found in stream");
        setRecordingState("mic-unavailable");
        setMicErrorMessage("No microphone detected. Use text notes below.");
        return;
      }

      const audioTrack = audioTracks[0];
      audioTrack.enabled = true;

      // Detect supported MIME type
      const mimeType = getSupportedMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onerror = (e: Event) => {
        console.error("MediaRecorder runtime error:", e);
      };

      recorder.onstop = () => {
        // Handled in stopAndSave / stopAndDiscard
      };

      recorder.start(1000); // timeslice: fire ondataavailable every 1s
      setRecordingState("recording");
      startTimer();
    } catch (err: any) {
      console.warn("Microphone access unavailable or dismissed:", err);
      setRecordingState("mic-unavailable");
      if (err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError") {
        setMicErrorMessage("Microphone permission was not granted. Tap below to allow, or use text notes.");
      } else if (err?.name === "NotFoundError" || err?.name === "DevicesNotFoundError") {
        setMicErrorMessage("No microphone hardware found on this device.");
      } else {
        setMicErrorMessage("Microphone unavailable. Use text notes below.");
      }
    }
  }, []);

  // Initialize covert database session on modal open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    getOrCreateCovertSession().then((session) => {
      if (!isMounted) return;
      setActiveSessionId(session.id);
      setNotes(session.notes || []);
    });

    // Auto-attempt start on open
    if (!mediaRecorderRef.current) {
      startRecording();
    }
  }, [isOpen, startRecording]);

  // Clean up on component unmount only
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => {
          try {
            t.stop();
          } catch (e) {}
        });
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Stop & Save Evidence to IndexedDB
  const stopAndSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    stopTimer();

    const finalDuration = secondsRef.current;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.onstop = async () => {
        try {
          const mimeType = mediaRecorderRef.current?.mimeType || getSupportedMimeType() || "audio/webm";
          const blob = new Blob(audioChunksRef.current, { type: mimeType });
          await saveCovertAudioBlob(blob, finalDuration);
        } catch (err) {
          console.error("Failed to save audio blob to IndexedDB:", err);
        } finally {
          cleanup();
          setRecordingState("saved");
          setIsSaving(false);
          onClose();
        }
      };
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        cleanup();
        setRecordingState("saved");
        setIsSaving(false);
        onClose();
      }
    } else {
      if (audioChunksRef.current.length > 0) {
        try {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          await saveCovertAudioBlob(blob, finalDuration);
        } catch (e) {}
      }
      cleanup();
      setRecordingState("saved");
      setIsSaving(false);
      onClose();
    }
  };

  // Stop & Discard without saving audio
  const stopAndDiscard = async () => {
    stopTimer();

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.onstop = () => {
        audioChunksRef.current = [];
        cleanup();
      };
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        cleanup();
      }
    } else {
      cleanup();
    }

    setRecordingState("idle");
    setDisplayTime("00:00");

    if (activeSessionId) {
      await clearCovertSession(activeSessionId);
    }

    onClose();
  };

  const handleAddQuickNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNoteText.trim()) return;

    try {
      const updated = await appendCovertNote(quickNoteText.trim());
      setNotes(updated.notes);
      setQuickNoteText("");
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 800);
    } catch (err) {
      console.warn("Failed to add note:", err);
    }
  };

  if (!isOpen) return null;

  const isRecording = recordingState === "recording";

  return (
    <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-in fade-in">
      <div className="bg-surface-card text-text-primary border border-stone-200/80 rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-7 max-h-[90vh] flex flex-col justify-between overflow-y-auto">
        {/* Top Header Bar */}
        <div className="pb-3 border-b border-stone-100 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {/* Live Recording Pulse Indicator / Timer */}
            {isRecording ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-brand-urgent/40 text-brand-urgent font-mono font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-urgent animate-ping" />
                <span>● REC {displayTime}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-section border border-stone-200 text-text-muted font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Vault Active</span>
              </div>
            )}
          </div>

          {/* Top Right Controls (Minimize / Keep recording in background) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-text-muted hover:text-text-primary bg-surface-section hover:bg-stone-200 px-3 py-1.5 rounded-lg border border-stone-200 flex items-center gap-1.5 transition-all"
              title="Minimize window while recording continues in background"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Minimize</span>
            </button>
          </div>
        </div>

        {/* Instruction 4: Small muted instruction above the mic card */}
        <p className="text-[11px] text-text-muted mb-2 font-medium">
          App-switch back to your call after starting — recording continues in the background.
        </p>

        {/* Main Content Area */}
        <div className="space-y-3">
          {/* Audio Telemetry Banner (Instruction 1 & 7) */}
          <div className="bg-surface-section border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={recordingState !== "recording" ? startRecording : undefined}
                disabled={isRecording}
                className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold transition-all shrink-0 ${
                  isRecording
                    ? "bg-red-50 text-brand-urgent border border-brand-urgent/30 cursor-default"
                    : "bg-brand-primary text-white hover:bg-indigo-700 cursor-pointer shadow-sm active:scale-95 ring-2 ring-brand-primary/20"
                }`}
                title={isRecording ? "Microphone active & recording" : "Click to start recording"}
              >
                {isRecording ? <Mic className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div>
                <h3 className="text-xs font-bold text-text-primary">
                  {recordingState === "mic-unavailable"
                    ? "Microphone unavailable"
                    : "Recording Your Voice Notes"}
                </h3>
                <p className="text-[11px] text-text-muted leading-tight mt-0.5">
                  {micErrorMessage ||
                    (recordingState === "mic-unavailable"
                      ? "Use text notes below instead."
                      : "Quietly speak key details aloud — caller name, number, demands. Captured only on this device. Zero network traffic.")}
                </p>
                {!isRecording && (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="mt-1 text-[11px] text-brand-primary font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Tap to start recording</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {isRecording && (
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-urgent animate-pulse" />
                <span className="w-1.5 h-6 rounded-full bg-brand-urgent animate-pulse delay-75" />
                <span className="w-1.5 h-3 rounded-full bg-brand-urgent animate-pulse delay-150" />
              </div>
            )}
          </div>

          {/* Instruction 2: Soft Informational Tip Card directly below mic card */}
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2 text-text-muted">
            <Volume2 className="w-4 h-4 text-brand-warning shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-stone-700">
              <strong className="text-brand-warning">Tip:</strong> If you switch your call to speakerphone before opening this tool, the mic may also pick up what the caller is saying. Audio quality will vary.
            </p>
          </div>

          {/* Quick Note Input (Instruction 3: Pure text input, zero hardware contention) */}
          <div className="bg-surface-section border border-stone-200/80 rounded-2xl p-3.5 shadow-xs">
            <label htmlFor="quick-note-input" className="block text-xs font-bold text-text-primary mb-2">
              Or type key details instead (faster and always reliable):
            </label>
            <form onSubmit={handleAddQuickNote} className="flex gap-2">
              <input
                id="quick-note-input"
                type="text"
                autoFocus
                value={quickNoteText}
                onChange={(e) => setQuickNoteText(e.target.value)}
                placeholder="e.g. Caller: Officer Sharma, Demands: ₹2L, Number: 9876543210"
                className="flex-1 px-3.5 py-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary placeholder-text-muted focus:outline-hidden focus:border-brand-primary"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-xs active:scale-95"
              >
                {noteSavedFeedback ? <Check className="w-3.5 h-3.5 text-brand-success" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{noteSavedFeedback ? "Saved" : "Add Note"}</span>
              </button>
            </form>
          </div>

          {/* Captured Notes List */}
          {notes.length > 0 && (
            <div className="bg-surface-section border border-stone-200/80 rounded-2xl p-3.5">
              <span className="text-[11px] font-bold text-text-muted block mb-2 uppercase tracking-wider">
                Logged Notes ({notes.length})
              </span>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {notes.map((note, idx) => (
                  <div key={note.id || idx} className="p-2.5 bg-surface-card rounded-xl border border-stone-200/60 flex items-start justify-between gap-2 text-xs">
                    <span className="text-text-primary font-medium">{note.text}</span>
                    <span className="text-[10px] text-text-muted font-mono shrink-0">
                      {new Date(note.deviceTimestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-stone-100 space-y-2.5 mt-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {isRecording ? (
              <>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={stopAndSave}
                  className="w-full sm:flex-1 py-3.5 bg-brand-success hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  )}
                  <span>{isSaving ? "Saving Evidence..." : "Stop & Save Evidence"}</span>
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={stopAndDiscard}
                  className="w-full sm:w-auto px-4 py-3.5 bg-surface-card hover:bg-red-50 text-brand-urgent rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-200 transition-all shadow-xs disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Stop & Discard</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                className="w-full py-3.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <Mic className="w-4 h-4" />
                <span>Start Live Recording</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
            <span>Evidence saved to local device IndexedDB.</span>
            <button
              type="button"
              onClick={() => {
                if (isRecording) {
                  stopAndSave();
                } else {
                  onClose();
                }
                onNavigateToLogin();
              }}
              className="text-brand-primary hover:underline font-bold flex items-center gap-1"
            >
              <span>Go to login & start case</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
