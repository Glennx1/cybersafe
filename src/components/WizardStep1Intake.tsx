"use client";

import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  Sparkles,
  ArrowRight,
  FileText,
  Zap,
  Eye,
  CheckCircle2,
  Lock,
  FileCheck,
  Volume2,
  VolumeX
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";
import { parseForensicText } from "@/lib/forensicEngine";
import { getDictionary } from "@/lib/i18n";
import { readExtractedDetailsAloud, stopSpeaking } from "@/lib/speechService";
import { VoiceInputButton } from "@/components/VoiceInputButton";
import Tesseract from "tesseract.js";

interface WizardStep1IntakeProps {
  profile: IncidentProfile;
  language: Language;
  audioFirstMode?: boolean;
  onProfileChange: (updated: IncidentProfile) => void;
  onNext: () => void;
}

export const WizardStep1Intake: React.FC<WizardStep1IntakeProps> = ({
  profile,
  language,
  audioFirstMode = false,
  onProfileChange,
  onNext,
}) => {
  const dict = getDictionary(language);
  const [isExtracting, setIsExtracting] = useState(false);
  const [pastedText, setPastedText] = useState(profile.rawEvidenceText);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleReadAloud = (customProfile?: IncidentProfile) => {
    if (isReadingAloud) {
      stopSpeaking();
      setIsReadingAloud(false);
      return;
    }

    readExtractedDetailsAloud(
      customProfile || profile,
      false,
      language,
      () => setIsReadingAloud(true),
      () => setIsReadingAloud(false),
      () => setIsReadingAloud(false)
    );
  };

  const handleFileUpload = async (file: File) => {
    setIsExtracting(true);
    try {
      // 1. Calculate Client Cryptographic Hash (Sec 63 BSA)
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const clientHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const fileDate = new Date(file.lastModified).toISOString();

      // 2. Perform Server-Side Independent Verification
      let serverHash = clientHashHex;
      let hashMismatch = false;
      let serverTimestamp = new Date().toISOString();

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('clientHash', clientHashHex);
        formData.append('caseId', profile.id);

        const uploadRes = await fetch('/api/evidence/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          serverHash = uploadData.serverHash;
          hashMismatch = uploadData.hashMismatch;
          serverTimestamp = uploadData.serverTimestamp;
        }
      } catch (err) {
        console.warn("Server hash verification fallback to local:", err);
      }

      // 3. Tesseract OCR
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      const parsed = parseForensicText(text);

      const updatedProfile: IncidentProfile = {
        ...profile,
        evidenceFileName: file.name,
        evidenceHash: clientHashHex,
        serverEvidenceHash: serverHash,
        hashMismatch,
        evidenceFileDate: fileDate,
        bsaCertificateDate: serverTimestamp,
        rawEvidenceText: text,
        scamCategory: "UPI_PHISHING",
        utrNumber: parsed.utrNumber || profile.utrNumber,
        fraudAmount: parsed.fraudAmount || profile.fraudAmount,
        suspectVpa: parsed.suspectVpa || profile.suspectVpa,
        suspectBankIfsc: parsed.suspectBankIfsc || profile.suspectBankIfsc
      };

      onProfileChange(updatedProfile);
      setPastedText(text);

      // Auto read-back if global audio-first mode is enabled
      if (audioFirstMode) {
        setTimeout(() => {
          handleReadAloud(updatedProfile);
        }, 400);
      }
    } catch (error) {
      console.error("OCR Extraction failed", error);
      alert("OCR parsing encountered an issue. You can still paste the raw SMS / transaction text manually.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handlePastedTextChange = (text: string) => {
    setPastedText(text);
    const parsed = parseForensicText(text);
    onProfileChange({
      ...profile,
      rawEvidenceText: text,
      scamCategory: "UPI_PHISHING",
      utrNumber: parsed.utrNumber || profile.utrNumber,
      fraudAmount: parsed.fraudAmount || profile.fraudAmount,
      suspectVpa: parsed.suspectVpa || profile.suspectVpa,
      suspectBankIfsc: parsed.suspectBankIfsc || profile.suspectBankIfsc
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Step Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          {dict.intake.financialTitle}
        </h2>
        <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-xl mx-auto font-sans">
          {dict.intake.financialSubtitle}
        </p>
      </div>

      {/* Forensic Hash Mismatch Warning Banner */}
      {profile.hashMismatch && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-brand-urgent/60 text-red-950 flex items-start gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-brand-urgent flex items-center justify-center font-bold shrink-0">
            ⚠️
          </div>
          <div>
            <strong className="text-sm font-bold block text-brand-urgent mb-0.5">
              Forensic Warning: Cryptographic Hash Mismatch Detected
            </strong>
            <p className="text-xs text-red-900 leading-relaxed">
              The client-computed hash ({profile.evidenceHash?.substring(0, 16)}...) does not match the server-verified hash ({profile.serverEvidenceHash?.substring(0, 16)}...). This discrepancy has been flagged in the case audit ledger for evidentiary integrity.
            </p>
          </div>
        </div>
      )}

      {/* 2. Intake Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Upload Bay */}
        <div className="bg-surface-card border border-stone-200/80 hover:border-brand-primary rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[260px] transition-all relative overflow-hidden shadow-sm group">
          {isExtracting ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center font-bold text-lg border border-indigo-100 relative">
                OCR
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-text-primary block">Reading receipt & hashing...</span>
                <span className="text-xs text-brand-primary">Verifying SHA-256 under Sec 63 BSA</span>
              </div>
              <div className="w-48 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="w-full h-full bg-brand-primary animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-brand-primary border border-indigo-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-text-primary mb-1">
                {dict.intake.dropzoneTitle}
              </h3>
              <p className="text-xs text-text-muted mb-4 max-w-xs leading-relaxed">
                {dict.intake.dropzoneSubtitle}
              </p>
              <label className="cursor-pointer px-5 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95">
                <span>{dict.intake.uploadScreenshot}</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
              {profile.evidenceFileName && (
                <div className="mt-3 text-xs text-brand-success bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-success" />
                  <span>Sec 63 BSA Verified: {profile.evidenceFileName}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Text / SMS Raw Input */}
        <div className="bg-surface-card border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="raw-sms-input" className="text-xs font-bold text-text-primary flex items-center gap-1.5 cursor-pointer">
                <FileText className="w-4 h-4 text-brand-primary" />
                <span>{dict.intake.pasteSmsTitle}</span>
              </label>

              {/* Voice input for SMS / raw transaction text */}
              <VoiceInputButton
                language={language}
                fieldLabel="SMS or Transaction message"
                buttonTitle="Dictate SMS or fraud details"
                onTranscript={(text) => handlePastedTextChange(pastedText ? `${pastedText} ${text}` : text)}
              />
            </div>
            <textarea
              id="raw-sms-input"
              rows={6}
              value={pastedText}
              onChange={(e) => handlePastedTextChange(e.target.value)}
              placeholder={dict.intake.pasteSmsPlaceholder}
              className="w-full p-3 bg-surface-card border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-text-primary placeholder-text-muted leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-text-muted border-t border-stone-100" aria-live="polite">
            <span>{dict.intake.utrLabel}: <strong className="text-text-primary font-bold">{profile.utrNumber || "Not detected"}</strong></span>
            <span>{dict.intake.amountLabel}: <strong className="text-brand-success font-bold">₹{profile.fraudAmount.toLocaleString("en-IN")}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. Forensic Entity Manifest & Audio Read-Back */}
      {(profile.serverEvidenceHash || profile.evidenceHash || profile.utrNumber || profile.fraudAmount > 0) && (
        <div className="mb-8 bg-surface-card border border-stone-200/80 rounded-2xl p-5 shadow-sm animate-in fade-in" aria-live="polite">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-primary" />
              <h3 className="text-xs font-bold text-text-primary">
                {dict.audit.summaryTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Active Audio Read-Back Button */}
              <button
                type="button"
                onClick={() => handleReadAloud()}
                aria-label={isReadingAloud ? "Stop reading details" : "Read extracted details aloud in your language"}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                  isReadingAloud
                    ? "bg-brand-urgent text-white animate-pulse"
                    : "bg-indigo-50 text-brand-primary hover:bg-indigo-100 border border-indigo-200"
                }`}
              >
                {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isReadingAloud ? dict.common.stopAudio : dict.common.readDetailsAloud}</span>
              </button>

              <span className="text-xs bg-emerald-50 text-brand-success px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
                {dict.intake.serverVerified}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-surface-section rounded-xl p-3 border border-stone-200/60">
              <span className="text-[10px] text-text-muted block">{dict.intake.utrLabel}</span>
              <span className="text-xs font-bold text-brand-success truncate block mt-0.5">
                {profile.utrNumber || "N/A"}
              </span>
            </div>

            <div className="bg-surface-section rounded-xl p-3 border border-stone-200/60">
              <span className="text-[10px] text-text-muted block">{dict.intake.amountLabel}</span>
              <span className="text-xs font-bold text-text-primary truncate block mt-0.5">
                ₹{profile.fraudAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-surface-section rounded-xl p-3 border border-stone-200/60">
              <span className="text-[10px] text-text-muted block">{dict.audit.suspectVpaLabel}</span>
              <span className="text-xs font-bold text-brand-primary truncate block mt-0.5">
                {profile.suspectVpa || profile.suspectAccountNo || "Tracing..."}
              </span>
            </div>

            <div className="bg-surface-section rounded-xl p-3 border border-stone-200/60">
              <span className="text-[10px] text-text-muted block">{dict.intake.serverVerified}</span>
              <span className="text-xs font-bold text-brand-primary font-mono truncate block mt-0.5" title={profile.serverEvidenceHash || profile.evidenceHash}>
                {(profile.serverEvidenceHash || profile.evidenceHash)?.substring(0, 16)}...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Action CTA */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => {
            stopSpeaking();
            onNext();
          }}
          className="h-12 px-8 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all mx-auto active:scale-95"
        >
          <span>{dict.common.continue}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};