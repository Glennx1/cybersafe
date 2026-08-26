"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  MicOff,
  Square,
  Trash2,
  Check,
  Plus,
  Radio,
  Clock,
  ArrowRight,
  X,
  ShieldAlert,
  Minimize2,
  Loader2,
  Play
} from "lucide-react";
import {
  appendCovertNote,
  saveCovertAudioBlob,
  getOrCreateCovertSession,
  clearCovertSession,
  CovertSession
} from "@/lib/covertStore";
import { Language } from "@/lib/types";
import { VoiceInputButton } from "@/components/VoiceInputButton";

interface LiveCaptureOverlayProps {
  isOpen: boolean;
  language?: Language;
  onClose: () => void;
  onNavigateToLogin: () => void;
}

type RecordingState = "idle" | "recording" | "stopped";

export const LiveCaptureOverlay: React.FC<LiveCaptureOverlayProps> = ({
  isOpen,
  language = "en",
  onClose,
  onNavigateToLogin
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [micAvailable, setMicAvailable] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Quick notes state
  const [notes, setNotes] = useState<Array<{ id: string; text: string; deviceTimestamp: string }>>([]);
  const [quickNoteText, setQuickNoteText] = useState("");
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Refs for MediaRecorder lifecycle and buffering (ensures no garbage collection on re-render)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startAudioRecording = useCallback(async () => {
    // Prevent starting a new recording while one is already active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      return;
    }

    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        console.error("Audio recording API (getUserMedia) not supported in this browser.");
        setMicAvailable(false);
        setRecordingState("idle");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Requirement 4: Check audio tracks and ensure readyState === 'live'
      const audioTracks = stream.getAudioTracks();
      if (!audioTracks || audioTracks.length === 0 || audioTracks[0].readyState !== "live") {
        console.error("Microphone permission granted but audio track is not live:", audioTracks);
        setMicAvailable(false);
        setRecordingState("idle");
        return;
      }

      setMicAvailable(true);

      // Detect supported MIME types (WebM opus preferred, fallback to mp4 or ogg)
      let mimeType = "";
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) {
          mimeType = "audio/ogg;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        }
      }

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Requirement 2: Collect audio chunks in ref on every timeslice
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onerror = (event: Event) => {
        console.error("MediaRecorder runtime error:", event);
      };

      // Requirement 3: Timeslice of 1000ms buffers chunks continuously
      mediaRecorder.start(1000);
      setRecordingState("recording");
      setRecordingDuration(0);

      // Requirement 9: Visible duration timer updating every second
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
      durationTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access denied or failed to initialize:", err);
      setMicAvailable(false);
      setRecordingState("idle");
    }
  }, []);

  // Initialize session and auto-start recording on open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    getOrCreateCovertSession().then((session) => {
      if (!isMounted) return;
      setActiveSessionId(session.id);
      setNotes(session.notes || []);
    });

    startAudioRecording();

    // Requirement 5: Cleanup only on actual unmount / overlay closing
    return () => {
      isMounted = false;
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
        durationTimerRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, startAudioRecording]);

  // Requirement 7: Stop & Save Evidence to IndexedDB
  const handleStopAndSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }

    const finalDuration = recordingDuration;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      await new Promise<void>((resolve) => {
        if (!mediaRecorderRef.current) {
          resolve();
          return;
        }

        mediaRecorderRef.current.onstop = async () => {
          try {
            const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
            const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
            await saveCovertAudioBlob(audioBlob, finalDuration);
          } catch (err) {
            console.error("Failed to save audio blob to IndexedDB:", err);
          } finally {
            resolve();
          }
        };

        try {
          mediaRecorderRef.current.stop();
        } catch (e) {
          resolve();
        }
      });
    } else if (audioChunksRef.current.length > 0) {
      try {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await saveCovertAudioBlob(audioBlob, finalDuration);
      } catch (err) {
        console.error("Failed to save existing chunks:", err);
      }
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    setRecordingState("stopped");
    setIsSaving(false);

    onClose();
  };

  // Requirement 8: Stop & Discard without writing to IndexedDB
  const handleStopAndDiscard = async () => {
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    setRecordingState("idle");
    setRecordingDuration(0);

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

  // Requirement 9: MM:SS format
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const isRecording = recordingState === "recording";

  return (
    <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-in fade-in">
      <div className="bg-surface-card text-text-primary border border-stone-200/80 rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-7 max-h-[90vh] flex flex-col justify-between overflow-y-auto">
        {/* Top Header Bar */}
        <div className="pb-3 border-b border-stone-100 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {/* Live Recording Pulse Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
              isRecording
                ? "bg-red-50 border-brand-urgent/30"
                : "bg-surface-section border-stone-200"
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                isRecording ? "bg-brand-urgent animate-ping" : "bg-stone-400"
              }`} />
              <span className={`text-xs font-bold font-mono tracking-wider uppercase ${
                isRecording ? "text-brand-urgent" : "text-text-muted"
              }`}>
                {isRecording ? "Recording Live" : "Capture Vault Ready"}
              </span>
            </div>

            <div className="text-xs font-mono font-bold text-text-primary flex items-center gap-1 bg-surface-section px-2.5 py-1 rounded-full border border-stone-200/80">
              <Clock className="w-3.5 h-3.5 text-text-muted" />
              <span>{formatDuration(recordingDuration)}</span>
            </div>
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

        {/* Main Content Area */}
        <div className="space-y-4">
          {/* Audio Telemetry Banner */}
          <div className="bg-surface-section border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mic Icon Button (Requirement 6: Clickable when idle to start recording) */}
              <button
                type="button"
                onClick={recordingState === "idle" ? startAudioRecording : undefined}
                disabled={isRecording}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
                  isRecording
                    ? "bg-red-50 text-brand-urgent border border-brand-urgent/30 cursor-default"
                    : "bg-brand-primary text-white hover:bg-indigo-700 cursor-pointer shadow-xs active:scale-95"
                }`}
                title={isRecording ? "Microphone active & recording" : "Click to start recording"}
              >
                {isRecording ? <Mic className="w-5 h-5 animate-pulse" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <h3 className="text-xs font-bold text-text-primary">
                  {isRecording
                    ? "Device Microphone Capturing Audio"
                    : micAvailable === false
                    ? "Microphone Denied / Unavailable"
                    : "Microphone Idle — Tap Play or Add Notes"}
                </h3>
                <p className="text-[11px] text-text-muted">
                  {micAvailable === false
                    ? "Mic unavailable — you can still log quick notes below."
                    : "Encrypted locally on this device. Zero network traffic."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-4 rounded-full ${isRecording ? "bg-brand-urgent animate-pulse" : "bg-stone-300"}`} />
              <span className={`w-1.5 h-6 rounded-full ${isRecording ? "bg-brand-urgent animate-pulse delay-75" : "bg-stone-300"}`} />
              <span className={`w-1.5 h-3 rounded-full ${isRecording ? "bg-brand-urgent animate-pulse delay-150" : "bg-stone-300"}`} />
            </div>
          </div>

          {/* Quick Note Input (Sub-10s Entry) */}
          <div className="bg-surface-section border border-stone-200/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="quick-note-input" className="text-xs font-bold text-text-primary">
                Jot down quick details (Phone #, Caller Name, Bank, Demand):
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Quick incident note"
                buttonTitle="Dictate quick note"
                className="bg-surface-card hover:bg-stone-50 text-text-primary border-stone-200"
                onTranscript={(text) => setQuickNoteText((prev) => (prev ? `${prev} ${text}` : text))}
              />
            </div>
            <form onSubmit={handleAddQuickNote} className="flex gap-2">
              <input
                id="quick-note-input"
                type="text"
                autoFocus
                value={quickNoteText}
                onChange={(e) => setQuickNoteText(e.target.value)}
                placeholder="e.g. CBI Officer Sharma, ₹2.5L, Skype: cbi.investigation"
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
            <div className="bg-surface-section border border-stone-200/80 rounded-2xl p-4">
              <span className="text-[11px] font-bold text-text-muted block mb-2 uppercase tracking-wider">
                Logged Notes ({notes.length})
              </span>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
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

        {/* Bottom Actions Bar (Requirement 6: Active in 'recording' state) */}
        <div className="pt-6 border-t border-stone-100 space-y-3 mt-4">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {isRecording ? (
              <>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleStopAndSave}
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
                  onClick={handleStopAndDiscard}
                  className="w-full sm:w-auto px-4 py-3.5 bg-surface-card hover:bg-red-50 text-brand-urgent rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-200 transition-all shadow-xs disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Stop & Discard</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={startAudioRecording}
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
                handleStopAndSave();
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
