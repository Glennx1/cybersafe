"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Scale,
  XCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Building,
  UserCheck,
  PhoneCall,
  Lock,
  Sparkles,
  HelpCircle,
  Volume2,
  VolumeX,
  Radio
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { readLegalFactCheckAloud, stopSpeaking } from "@/lib/speechService";
import { VoiceInputButton } from "@/components/VoiceInputButton";
import { SignLanguageSlot } from "@/components/SignLanguageSlot";

interface DigitalArrestStep2AuditProps {
  profile: IncidentProfile;
  language: Language;
  audioFirstMode?: boolean;
  showSignLanguage?: boolean;
  onProfileChange: (updated: IncidentProfile) => void;
  onBack: () => void;
  onNext: () => void;
}

export const DigitalArrestStep2Audit: React.FC<DigitalArrestStep2AuditProps> = ({
  profile,
  language,
  audioFirstMode = false,
  showSignLanguage = false,
  onProfileChange,
  onBack,
  onNext,
}) => {
  const dict = getDictionary(language);
  const [isPlayingFactCheck, setIsPlayingFactCheck] = useState(false);
  const [activePairIndex, setActivePairIndex] = useState<number | null>(null);
  const cancelFactCheckRef = useRef<(() => void) | null>(null);

  const comparisonData = [
    {
      scammerMyth: dict.digitalArrest.myth1Claim,
      legalReality: dict.digitalArrest.myth1Truth,
      statute: "MHA Advisory / BNSS Sec 41A"
    },
    {
      scammerMyth: dict.digitalArrest.myth2Claim,
      legalReality: dict.digitalArrest.myth2Truth,
      statute: "Sec 308(2) BNS 2023"
    },
    {
      scammerMyth: dict.digitalArrest.myth3Claim,
      legalReality: dict.digitalArrest.myth3Truth,
      statute: "Sec 319 BNS & 66D IT Act"
    },
    {
      scammerMyth: dict.digitalArrest.myth4Claim,
      legalReality: dict.digitalArrest.myth4Truth,
      statute: "Art 22 & Sec 36 BNSS"
    }
  ];

  const handleToggleFactCheckAudio = () => {
    if (isPlayingFactCheck) {
      if (cancelFactCheckRef.current) {
        cancelFactCheckRef.current();
      }
      setIsPlayingFactCheck(false);
      setActivePairIndex(null);
      return;
    }

    const cancelFn = readLegalFactCheckAloud(
      comparisonData,
      language,
      () => setIsPlayingFactCheck(true),
      () => {
        setIsPlayingFactCheck(false);
        setActivePairIndex(null);
      },
      (idx) => setActivePairIndex(idx)
    );

    cancelFactCheckRef.current = cancelFn;
  };

  useEffect(() => {
    if (audioFirstMode) {
      const timer = setTimeout(() => {
        handleToggleFactCheckAudio();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [audioFirstMode]);

  useEffect(() => {
    return () => {
      if (cancelFactCheckRef.current) {
        cancelFactCheckRef.current();
      }
      stopSpeaking();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Myth Buster Hero Banner */}
      <div className="bg-surface-card rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-brand-warning text-xs font-bold border border-amber-200/80">
            <Sparkles className="w-3.5 h-3.5 text-brand-warning" />
            <span>{dict.digitalArrest.factCheckBadge}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-emerald-50 text-brand-success border border-emerald-200 px-3 py-1 rounded-full font-bold">
            <ShieldCheck className="w-4 h-4 text-brand-success" />
            <span>{dict.digitalArrest.notInDangerBadge}</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mb-2">
          {dict.digitalArrest.step2Title}
        </h2>

        <p className="text-xs sm:text-sm text-text-muted max-w-2xl leading-relaxed">
          {dict.digitalArrest.step2Subtitle}
        </p>
      </div>

      {/* ISL Video Explainer Slot (Roadmap Preview) */}
      {showSignLanguage && (
        <SignLanguageSlot slotTitle="Legal Fact Check Matrix (Myth vs Reality)" />
      )}

      {/* 2. Side-by-Side Deconstruction Table & Audio Narration */}
      <div className="bg-surface-card border border-stone-200/80 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
          <span className="text-xs font-bold text-text-primary flex items-center gap-2">
            <Scale className="w-4 h-4 text-brand-primary" />
            <span>{dict.digitalArrest.claimVsRealityTitle}</span>
          </span>

          {/* Audio Fact Check Narration Control */}
          <button
            type="button"
            onClick={handleToggleFactCheckAudio}
            aria-label={isPlayingFactCheck ? "Stop legal fact check narration" : "Listen to legal fact check points aloud"}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
              isPlayingFactCheck
                ? "bg-brand-urgent text-white animate-pulse"
                : "bg-indigo-50 text-brand-primary hover:bg-indigo-100 border border-indigo-200"
            }`}
          >
            {isPlayingFactCheck ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-brand-primary" />}
            <span>{isPlayingFactCheck ? "Stop Audio Narration" : "Listen to Fact Check Aloud"}</span>
          </button>
        </div>

        <div className="space-y-3">
          {comparisonData.map((item, idx) => {
            const isCurrentlyPlaying = activePairIndex === idx && isPlayingFactCheck;
            return (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl transition-all ${
                  isCurrentlyPlaying
                    ? "bg-indigo-50/80 border-2 border-brand-primary shadow-md ring-2 ring-brand-primary/20"
                    : "bg-surface-section border border-stone-200/60"
                }`}
              >
                {/* Scammer Myth */}
                <div className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-brand-warning shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-brand-warning block">
                        {dict.digitalArrest.scammerClaimLabel}:
                      </span>
                      {isCurrentlyPlaying && (
                        <span className="text-[9px] bg-brand-primary text-white px-1.5 py-0.5 rounded font-bold uppercase animate-pulse">
                          Speaking
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-primary mt-0.5 leading-relaxed">{item.scammerMyth}</p>
                  </div>
                </div>

                {/* Legal Reality */}
                <div className="flex items-start gap-2.5 border-t md:border-t-0 md:border-l border-stone-200 pt-2 md:pt-0 md:pl-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-brand-success">
                        {dict.digitalArrest.legalRealityLabel}:
                      </span>
                      <span className="text-[10px] bg-emerald-100/70 text-brand-success px-2 py-0.5 rounded font-bold">
                        {item.statute}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary mt-0.5 leading-relaxed">{item.legalReality}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Complainant & Threat Verification with Voice Input */}
      <div className="bg-surface-card border border-stone-200/80 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
        <h3 className="text-xs font-bold text-text-primary mb-3 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-brand-primary" />
          <span>{dict.audit.verifyEditTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="victim-name-input" className="text-text-muted font-medium">
                {dict.audit.victimNameLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Full Name"
                buttonTitle="Dictate your name"
                onTranscript={(text) => onProfileChange({ ...profile, victimName: text })}
              />
            </div>
            <input
              id="victim-name-input"
              type="text"
              placeholder="Your full legal name"
              value={profile.victimName}
              onChange={(e) => onProfileChange({ ...profile, victimName: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="victim-phone-input" className="text-text-muted font-medium">
                {dict.audit.contactPhoneLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Phone Number"
                buttonTitle="Dictate phone number"
                onTranscript={(text) => onProfileChange({ ...profile, victimPhone: text.replace(/[^0-9]/g, "") })}
              />
            </div>
            <input
              id="victim-phone-input"
              type="tel"
              placeholder="e.g. 9876543210"
              value={profile.victimPhone}
              onChange={(e) => onProfileChange({ ...profile, victimPhone: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="demand-verify-input" className="text-text-muted font-medium">
                {dict.digitalArrest.extortionDemandLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Demanded Extortion Amount"
                buttonTitle="Dictate demand amount"
                onTranscript={(text) => {
                  const cleaned = Number(text.replace(/[^0-9]/g, ""));
                  if (cleaned) {
                    onProfileChange({ ...profile, extortionDemandAmount: cleaned, fraudAmount: cleaned });
                  }
                }}
              />
            </div>
            <input
              id="demand-verify-input"
              type="number"
              value={profile.extortionDemandAmount || 250000}
              onChange={(e) => onProfileChange({ ...profile, extortionDemandAmount: Number(e.target.value), fraudAmount: Number(e.target.value) })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-bold text-brand-warning focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="caller-id-verify-input" className="text-text-muted font-medium">
                {dict.digitalArrest.callerIdLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Scammer Caller ID"
                buttonTitle="Dictate caller ID"
                onTranscript={(text) => onProfileChange({ ...profile, scammerCallerId: text })}
              />
            </div>
            <input
              id="caller-id-verify-input"
              type="text"
              placeholder="e.g. +91 98765 43210"
              value={profile.scammerCallerId || ""}
              onChange={(e) => onProfileChange({ ...profile, scammerCallerId: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-bold text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
        </div>
      </div>

      {/* 4. Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (cancelFactCheckRef.current) cancelFactCheckRef.current();
            stopSpeaking();
            onBack();
          }}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-text-primary bg-surface-card border border-stone-200 hover:border-stone-300 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict.step3Action.backToDetails}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (cancelFactCheckRef.current) cancelFactCheckRef.current();
            stopSpeaking();
            onNext();
          }}
          className="h-12 px-8 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <span>{dict.digitalArrest.continueToSafetyBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};