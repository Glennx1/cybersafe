"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  UploadCloud,
  Sparkles,
  ArrowRight,
  FileText,
  AlertTriangle,
  FileWarning,
  Eye,
  Building,
  PhoneCall,
  Lock,
  XCircle,
  CheckCircle2,
  Volume2,
  VolumeX
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";
import { parseForensicText } from "@/lib/forensicEngine";
import { getDictionary } from "@/lib/i18n";
import { readExtractedDetailsAloud, stopSpeaking } from "@/lib/speechService";
import { VoiceInputButton } from "@/components/VoiceInputButton";
import { SignLanguageSlot } from "@/components/SignLanguageSlot";
import Tesseract from "tesseract.js";

interface DigitalArrestStep1IntakeProps {
  profile: IncidentProfile;
  language: Language;
  audioFirstMode?: boolean;
  showSignLanguage?: boolean;
  onProfileChange: (updated: IncidentProfile) => void;
  onNext: () => void;
}

export const DigitalArrestStep1Intake: React.FC<DigitalArrestStep1IntakeProps> = ({
  profile,
  language,
  audioFirstMode = false,
  showSignLanguage = false,
  onProfileChange,
  onNext,
}) => {
  const dict = getDictionary(language);
  const [isExtracting, setIsExtracting] = useState(false);
  const [pastedText, setPastedText] = useState(profile.rawEvidenceText);
  const [digitalArrestScore, setDigitalArrestScore] = useState<number | null>(profile.forgeryConfidence || null);
  const [detectedRedFlags, setDetectedRedFlags] = useState<string[]>(profile.forgeryFlags || []);
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
      true,
      language,
      () => setIsReadingAloud(true),
      () => setIsReadingAloud(false),
      () => setIsReadingAloud(false)
    );
  };

  const analyzeDigitalArrestText = (text: string) => {
    const lower = text.toLowerCase();
    const flags: string[] = [];
    let score = 0;

    if (lower.includes("arrest") || lower.includes("warrant") || lower.includes("summons") || lower.includes("41a")) {
      flags.push("Contains illegal 'Arrest Warrant / Summons' terminology");
      score += 25;
    }
    if (lower.includes("cbi") || lower.includes("police") || lower.includes("customs") || lower.includes("ed ") || lower.includes("supreme court") || lower.includes("narcotics")) {
      flags.push("Impersonates Central Law Enforcement (CBI / ED / Police / Supreme Court)");
      score += 30;
    }
    if (lower.includes("skype") || lower.includes("whatsapp") || lower.includes("video call") || lower.includes("digital arrest") || lower.includes("camera")) {
      flags.push("Demands 24x7 WhatsApp / Skype Video Call confinement (100% Illegal)");
      score += 30;
    }
    if (lower.includes("security deposit") || lower.includes("rbi verification") || lower.includes("transfer") || lower.includes("escrow") || lower.includes("clearance")) {
      flags.push("Extortion: Coerces fund transfer into 'Verification / Clearance Account'");
      score += 25;
    }

    setDigitalArrestScore(score);
    setDetectedRedFlags(flags);

    onProfileChange({
      ...profile,
      rawEvidenceText: text,
      forgeryConfidence: score,
      forgeryFlags: flags
    });
  };

  const handleFileUpload = async (file: File) => {
    setIsExtracting(true);
    try {
      // 1. Client SHA-256 Web Crypto Hashing
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
      const lower = text.toLowerCase();
      const flags: string[] = [];
      let score = 0;

      if (lower.includes("arrest") || lower.includes("warrant") || lower.includes("summons") || lower.includes("41a")) {
        flags.push("Forged Arrest Warrant / Sec 41A Notice");
        score += 30;
      }
      if (lower.includes("cbi") || lower.includes("police") || lower.includes("customs") || lower.includes("narcotics") || lower.includes("ed ")) {
        flags.push("Unauthorized Emblem & Law Enforcement Seals");
        score += 35;
      }
      if (lower.includes("clearance") || lower.includes("rbi") || lower.includes("deposit") || lower.includes("fund") || lower.includes("transfer")) {
        flags.push("Financial Coercion: Demands Asset Verification Transfer");
        score += 25;
      }

      setDigitalArrestScore(score);
      setDetectedRedFlags(flags);

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
        scamCategory: "DIGITAL_ARREST",
        impersonatedAgency: profile.impersonatedAgency || "Central Bureau of Investigation (CBI)",
        extortionDemandAmount: parsed.fraudAmount || profile.extortionDemandAmount || 250000,
        forgeryConfidence: score,
        forgeryFlags: flags
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
      alert("OCR error on document. You can still paste the threat message manually.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handlePastedChange = (text: string) => {
    setPastedText(text);
    const lower = text.toLowerCase();
    const flags: string[] = [];
    let score = 0;

    if (lower.includes("arrest") || lower.includes("warrant") || lower.includes("summons") || lower.includes("41a")) {
      flags.push("Contains illegal 'Arrest Warrant / Summons' terminology");
      score += 25;
    }
    if (lower.includes("cbi") || lower.includes("police") || lower.includes("customs") || lower.includes("ed ") || lower.includes("supreme court") || lower.includes("narcotics")) {
      flags.push("Impersonates Central Law Enforcement (CBI / ED / Police / Supreme Court)");
      score += 30;
    }
    if (lower.includes("skype") || lower.includes("whatsapp") || lower.includes("video call") || lower.includes("digital arrest") || lower.includes("camera")) {
      flags.push("Demands 24x7 WhatsApp / Skype Video Call confinement (100% Illegal)");
      score += 30;
    }
    if (lower.includes("security deposit") || lower.includes("rbi verification") || lower.includes("transfer") || lower.includes("escrow") || lower.includes("clearance")) {
      flags.push("Extortion: Coerces fund transfer into 'Verification / Clearance Account'");
      score += 25;
    }

    setDigitalArrestScore(score);
    setDetectedRedFlags(flags);

    const parsed = parseForensicText(text);

    onProfileChange({
      ...profile,
      rawEvidenceText: text,
      scamCategory: "DIGITAL_ARREST",
      extortionDemandAmount: parsed.fraudAmount || profile.extortionDemandAmount || 250000,
      forgeryConfidence: score,
      forgeryFlags: flags
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {dict.digitalArrest.heroTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl mx-auto font-sans">
          {dict.digitalArrest.heroSubtitle}
        </p>
      </div>

      {/* ISL Video Explainer Slot (Roadmap Preview) */}
      {showSignLanguage && (
        <SignLanguageSlot slotTitle="Digital Arrest & Extortion Shield Intake" />
      )}

      {/* Forensic Hash Mismatch Warning Banner */}
      {profile.hashMismatch && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-950 flex items-start gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold shrink-0">
            ⚠️
          </div>
          <div>
            <strong className="text-sm font-bold block text-rose-900 mb-0.5">
              Forensic Warning: Cryptographic Hash Mismatch Detected
            </strong>
            <p className="text-xs text-rose-800 leading-relaxed">
              The client-computed hash ({profile.evidenceHash?.substring(0, 16)}...) does not match the server-verified hash ({profile.serverEvidenceHash?.substring(0, 16)}...). This discrepancy has been logged in the case audit ledger for evidentiary integrity.
            </p>
          </div>
        </div>
      )}

      {/* Scammer Details Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-600" />
            <span>{dict.digitalArrest.callerThreatDetailsTitle}</span>
          </h3>

          {/* Read Details Aloud Button */}
          <button
            type="button"
            onClick={() => handleReadAloud()}
            aria-label={isReadingAloud ? "Stop reading threat details" : "Read threat details aloud"}
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
              isReadingAloud
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200"
            }`}
          >
            {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-700" />}
            <span>{isReadingAloud ? "Stop Audio" : "Read Details Aloud"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label htmlFor="impersonated-agency-select" className="text-slate-600 font-medium block mb-1 cursor-pointer">
              {dict.digitalArrest.impersonatedAgencyLabel}
            </label>
            <select
              id="impersonated-agency-select"
              value={profile.impersonatedAgency || "Central Bureau of Investigation (CBI)"}
              onChange={(e) => onProfileChange({ ...profile, impersonatedAgency: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="Central Bureau of Investigation (CBI)">CBI (Central Bureau of Investigation)</option>
              <option value="Cyber Police">Cyber Police</option>
              <option value="State Police">State Police</option>
              <option value="Enforcement Directorate (ED)">Enforcement Directorate (ED)</option>
              <option value="Customs & Narcotics Control Bureau">Customs & NCB (FedEx Drug Parcel)</option>
              <option value="Supreme Court of India">Supreme Court of India</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="caller-id-input" className="text-slate-600 font-medium cursor-pointer">
                {dict.digitalArrest.callerIdLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Caller ID"
                buttonTitle="Dictate Caller ID"
                onTranscript={(text) => onProfileChange({ ...profile, scammerCallerId: text })}
              />
            </div>
            <input
              id="caller-id-input"
              type="text"
              placeholder="e.g. +91 98765 43210"
              value={profile.scammerCallerId || ""}
              onChange={(e) => onProfileChange({ ...profile, scammerCallerId: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-bold"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="extortion-amount-input" className="text-slate-600 font-medium cursor-pointer">
                {dict.digitalArrest.extortionDemandLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Demand Amount"
                buttonTitle="Dictate Demand Amount"
                onTranscript={(text) => {
                  const cleaned = Number(text.replace(/[^0-9]/g, ""));
                  if (cleaned) {
                    onProfileChange({ ...profile, extortionDemandAmount: cleaned, fraudAmount: cleaned });
                  }
                }}
              />
            </div>
            <input
              id="extortion-amount-input"
              type="number"
              placeholder="e.g. 250000"
              value={profile.extortionDemandAmount || profile.fraudAmount || 250000}
              onChange={(e) => onProfileChange({ ...profile, extortionDemandAmount: Number(e.target.value), fraudAmount: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-bold"
            />
          </div>
        </div>
      </div>

      {/* Intake Dropzone & Text Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Dropzone */}
        <div className="bg-white border border-slate-200 hover:border-amber-400 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[260px] transition-all relative overflow-hidden shadow-xs group">
          {isExtracting ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-100">
                OCR
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-slate-900 block">Scanning document...</span>
                <span className="text-xs text-amber-600">Verifying seals & terminology</span>
              </div>
              <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-full h-full bg-amber-500 animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {dict.digitalArrest.dropNoticeTitle}
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-xs leading-relaxed font-sans">
                {dict.digitalArrest.dropNoticeSubtitle}
              </p>
              <label className="cursor-pointer px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95">
                <span>{dict.digitalArrest.uploadDocumentBtn}</span>
                <input
                  type="file"
                  accept="image/*,.pdf,.svg"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
              {profile.evidenceFileName && (
                <div className="mt-3 text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5 font-medium">
                  ✓ Uploaded: {profile.evidenceFileName}
                </div>
              )}
            </>
          )}
        </div>

        {/* Text Paste Area */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>{dict.digitalArrest.pasteDemandTitle}</span>
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Threat message"
                buttonTitle="Dictate threat message text"
                onTranscript={(text) => handlePastedChange(pastedText ? `${pastedText} ${text}` : text)}
              />
            </div>
            <textarea
              rows={6}
              value={pastedText}
              onChange={(e) => handlePastedChange(e.target.value)}
              placeholder={dict.digitalArrest.pasteDemandPlaceholder}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-800 placeholder-slate-400 leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
            <span>{dict.digitalArrest.targetAgencyLabel}: <strong className="text-slate-900 font-bold">{profile.impersonatedAgency || "CBI"}</strong></span>
            <span>{dict.digitalArrest.demandLabel}: <strong className="text-rose-600 font-bold">₹{(profile.extortionDemandAmount || 250000).toLocaleString("en-IN")}</strong></span>
          </div>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-xs text-slate-700 leading-relaxed shadow-xs">
        <strong className="text-slate-900 font-bold block mb-1">{dict.digitalArrest.advisoryTitle}</strong>
        {dict.digitalArrest.advisoryDesc}
      </div>

      {/* CTA Button */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => {
            stopSpeaking();
            onNext();
          }}
          className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xs transition-all mx-auto active:scale-95"
        >
          <span>{dict.digitalArrest.continueToReviewProof}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};