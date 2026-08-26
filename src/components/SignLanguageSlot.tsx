"use client";

import React, { useState } from "react";
import {
  Video,
  Info,
  ShieldCheck,
  CheckCircle2,
  PhoneOff,
  Sparkles
} from "lucide-react";

interface SignLanguageSlotProps {
  /**
   * Title/context for this specific sign language explainer slot (e.g. "Incident Intake Overview")
   */
  slotTitle?: string;
  /**
   * Future video source URL when certified ISL clips are uploaded
   */
  videoUrl?: string;
  /**
   * Future VTT caption file for closed captions
   */
  captionsUrl?: string;
  /**
   * Text transcript of the sign language video
   */
  transcript?: string;
  /**
   * Set to true once verified, certified ISL interpreter videos are provided
   */
  islClipsAvailable?: boolean;
  className?: string;
}

export const SignLanguageSlot: React.FC<SignLanguageSlotProps> = ({
  slotTitle = "Section Overview",
  videoUrl,
  captionsUrl,
  transcript,
  islClipsAvailable = false,
  className = ""
}) => {
  const [showTranscript, setShowTranscript] = useState(false);

  // If real ISL video is available, render the accessible, lazy-loaded video player
  if (islClipsAvailable && videoUrl) {
    return (
      <div
        className={`bg-white border border-indigo-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 ${className}`}
        aria-label={`Indian Sign Language video for ${slotTitle}`}
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Video className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Indian Sign Language (ISL) Video Guide
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {slotTitle} • Certified Interpreter
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>ISL Certified</span>
          </span>
        </div>

        <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden mb-3">
          <video
            controls
            preload="metadata"
            autoPlay={false}
            playsInline
            className="w-full h-full object-contain"
            aria-label={`Indian Sign Language explanation for ${slotTitle}`}
          >
            <source src={videoUrl} type="video/mp4" />
            {captionsUrl && (
              <track
                kind="captions"
                src={captionsUrl}
                srcLang="en"
                label="English Captions"
                default
              />
            )}
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {transcript && (
          <div>
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline"
              aria-expanded={showTranscript}
            >
              {showTranscript ? "Hide text transcript" : "Show text transcript"}
            </button>
            {showTranscript && (
              <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
                {transcript}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Polished "Coming Soon" Roadmap State for Deaf and Hard-of-Hearing Users
  return (
    <div
      className={`bg-surface-section border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 ${className}`}
      role="region"
      aria-label="Indian Sign Language video notice"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-stone-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center shrink-0">
            <Video className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-text-primary tracking-tight">
              Indian Sign Language videos — coming soon
            </h3>
            <span className="text-[10px] text-brand-primary font-semibold">
              Preview Slot • {slotTitle}
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 text-brand-primary font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
          <Sparkles className="w-3 h-3 text-brand-primary" aria-hidden="true" />
          <span>Roadmap Preview</span>
        </span>
      </div>

      <div className="space-y-2.5 text-xs text-text-muted">
        <p className="leading-relaxed">
          We&apos;re working with certified ISL interpreters to add sign language explainer videos for Deaf and hard-of-hearing users. This feature isn&apos;t ready yet, but we wanted to show you where it&apos;s headed.
        </p>

        {/* Functional 1930 No-Call Alternative Callout */}
        <div className="p-3 bg-surface-card border border-emerald-200/80 rounded-xl flex items-start gap-2.5 text-text-primary shadow-xs">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-brand-success flex items-center justify-center shrink-0 mt-0.5">
            <PhoneOff className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <div>
            <strong className="text-[11px] font-bold text-brand-success block mb-0.5">
              100% Digital & No-Call Filing Available
            </strong>
            <p className="text-[11px] text-text-muted leading-relaxed">
              If you&apos;re unable to make a phone call, you can complete your entire report through this app instead — no call required. All evidence hashing, bank freeze letters, and police FIR dossiers are generated directly on your screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
