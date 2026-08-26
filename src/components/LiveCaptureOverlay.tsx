"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Minimize2
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

export const LiveCaptureOverlay: React.FC<LiveCaptureOverlayProps> = ({
  isOpen,
  language = "en",
  onClose,
  onNavigateToLogin
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [micAvailable, setMicAvailable] = useState<boolean | null>(null);

  // Quick notes state
  const [notes, setNotes] = useState<Array<{ id: string; text: string; deviceTimestamp: string }>>([]);
  const [quickNoteText, setQuickNoteText] = useState("");
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize session and auto-start recording on mount/open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    getOrCreateCovertSession().then((session) => {
      if (!isMounted) return;
      setActiveSessionId(session.id);
      setNotes(session.notes || []);
    });

    // Auto-start recording immediately
    startAudioRecording();

    return () => {
      isMounted = false;
      // Do not terminate media recorder on simple overlay close if still running,
      // but clean up duration display interval if unmounted
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
    };
  }, [isOpen]);

  const startAudioRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      return;
    }

    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setMicAvailable(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setMicAvailable(true);

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "";

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // chunk every 1s
      setIsRecording(true);

      // Start duration counter
      durationTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access unavailable or denied (silent fallback to quick notes):", err);
      setMicAvailable(false);
      setIsRecording(false);
    }
  };

  const handleStopAndSave = async () => {
    // 1. Stop audio recorder and save blob
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorderRef.current?.mimeType || "audio/webm"
        });
        await saveCovertAudioBlob(audioBlob, recordingDuration);

        // Stop all tracks
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };
      mediaRecorderRef.current.stop();
    }

    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }
    setIsRecording(false);

    // Close overlay
    onClose();
  };

  const handleStopAndDiscard = async () => {
    // Stop recording and cleanup without saving
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }
    setIsRecording(false);

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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 text-slate-100 flex flex-col justify-between font-sans animate-in fade-in backdrop-blur-md">
      {/* Top Header Bar */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Live Recording Pulse Indicator */}
          <div className="flex items-center gap-2 bg-rose-950/60 border border-rose-800/80 px-3 py-1 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
            <span className="text-xs font-bold text-rose-300 font-mono tracking-wider uppercase">
              {isRecording ? "Recording Live" : "Capture Vault Active"}
            </span>
          </div>

          <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDuration(recordingDuration)}</span>
          </div>
        </div>

        {/* Top Right Controls (Minimize / Keep recording in background) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5 transition-all"
            title="Minimize window while recording continues in background"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Minimize</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-xl w-full mx-auto p-5 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          {/* Audio Telemetry Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                isRecording ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-slate-800 text-slate-400"
              }`}>
                {isRecording ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  {isRecording ? "Device Microphone Capturing Audio" : "Microphone Idle / Text Capture Ready"}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {micAvailable === false
                    ? "Mic unavailable — you can still log quick notes below."
                    : "Encrypted locally on this device. Zero network traffic."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-4 rounded-full bg-rose-500 ${isRecording ? "animate-pulse" : "opacity-30"}`} />
              <span className={`w-1.5 h-6 rounded-full bg-rose-400 ${isRecording ? "animate-pulse delay-75" : "opacity-30"}`} />
              <span className={`w-1.5 h-3 rounded-full bg-rose-500 ${isRecording ? "animate-pulse delay-150" : "opacity-30"}`} />
            </div>
          </div>

          {/* Quick Note Input (Sub-10s Entry) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="quick-note-input" className="text-xs font-bold text-slate-300">
                Jot down quick details (Phone #, Caller Name, Bank, Demand):
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Quick incident note"
                buttonTitle="Dictate quick note"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
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
                className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-xs active:scale-95"
              >
                {noteSavedFeedback ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{noteSavedFeedback ? "Saved" : "Add Note"}</span>
              </button>
            </form>
          </div>

          {/* Captured Notes List */}
          {notes.length > 0 && (
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                Logged Notes ({notes.length})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {notes.map((note, idx) => (
                  <div key={note.id || idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start justify-between gap-2 text-xs">
                    <span className="text-slate-200 font-medium">{note.text}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {new Date(note.deviceTimestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleStopAndSave}
              className="w-full sm:flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Stop & Save Evidence</span>
            </button>

            <button
              type="button"
              onClick={handleStopAndDiscard}
              className="w-full sm:w-auto px-4 py-3.5 bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-800 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Stop & Discard</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Evidence saved to local device IndexedDB.</span>
            <button
              type="button"
              onClick={() => {
                handleStopAndSave();
                onNavigateToLogin();
              }}
              className="text-indigo-400 hover:text-indigo-300 font-bold underline flex items-center gap-1"
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
