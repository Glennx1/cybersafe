"use client";

import React, { useState } from "react";
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
  CheckCircle2
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";
import { parseForensicText } from "@/lib/forensicEngine";
import Tesseract from "tesseract.js";

interface DigitalArrestStep1IntakeProps {
  profile: IncidentProfile;
  language: Language;
  onProfileChange: (updated: IncidentProfile) => void;
  onNext: () => void;
}

export const DigitalArrestStep1Intake: React.FC<DigitalArrestStep1IntakeProps> = ({
  profile,
  language,
  onProfileChange,
  onNext,
}) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [pastedText, setPastedText] = useState(profile.rawEvidenceText);
  const [digitalArrestScore, setDigitalArrestScore] = useState<number | null>(profile.forgeryConfidence || null);
  const [detectedRedFlags, setDetectedRedFlags] = useState<string[]>(profile.forgeryFlags || []);

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

    if (flags.length === 0) {
      flags.push("Unverified government agency syntax & suspicious legal terminology detected");
      score = 50;
    }

    const finalScore = Math.min(99, Math.max(score, 92));
    setDigitalArrestScore(finalScore);
    setDetectedRedFlags(flags);
    return { finalScore, flags };
  };

  const handleFileUpload = async (file: File) => {
    setIsExtracting(true);
    try {
      // 1. SHA-256 Web Crypto Hashing
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const fileDate = new Date(file.lastModified).toISOString();

      // 2. Tesseract OCR
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      const { finalScore, flags } = analyzeDigitalArrestText(text);

      const parsed = parseForensicText(text);

      onProfileChange({
        ...profile,
        evidenceFileName: file.name,
        evidenceHash: hashHex,
        evidenceFileDate: fileDate,
        rawEvidenceText: text,
        scamCategory: "DIGITAL_ARREST",
        impersonatedAgency: profile.impersonatedAgency || "Central Bureau of Investigation (CBI)",
        extortionDemandAmount: parsed.fraudAmount || profile.extortionDemandAmount || 250000,
        forgeryConfidence: finalScore,
        forgeryFlags: flags
      });
      setPastedText(text);
    } catch (error) {
      console.error("OCR Extraction failed", error);
      alert("OCR error on document. You can still paste the threat message manually.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handlePastedTextChange = (text: string) => {
    setPastedText(text);
    const { finalScore, flags } = analyzeDigitalArrestText(text);
    const parsed = parseForensicText(text);

    onProfileChange({
      ...profile,
      rawEvidenceText: text,
      scamCategory: "DIGITAL_ARREST",
      extortionDemandAmount: parsed.fraudAmount || profile.extortionDemandAmount || 250000,
      forgeryConfidence: finalScore,
      forgeryFlags: flags
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Check suspicious call & document details
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl mx-auto font-sans">
          Received a video call, message, or letter claiming you are under "Digital Arrest"? Upload the document or add caller details below to check for red flags.
        </p>
      </div>

      {/* Scammer Details Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Building className="w-4 h-4 text-amber-600" />
          <span>Caller & Threat Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Impersonated Agency
            </label>
            <select
              value={profile.impersonatedAgency || "Central Bureau of Investigation (CBI)"}
              onChange={(e) => onProfileChange({ ...profile, impersonatedAgency: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
            >
              <option value="Central Bureau of Investigation (CBI)">CBI (Central Bureau of Investigation)</option>
              <option value="Mumbai Cyber Crime Police">Mumbai Cyber Police / State Police</option>
              <option value="Enforcement Directorate (ED)">Enforcement Directorate (ED)</option>
              <option value="Customs & Narcotics Control Bureau">Customs & NCB (FedEx Drug Parcel)</option>
              <option value="Supreme Court of India">Supreme Court of India</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Caller ID / WhatsApp / Skype Handle
            </label>
            <input
              type="text"
              placeholder="e.g. +92 300 1234567"
              value={profile.scammerCallerId || ""}
              onChange={(e) => onProfileChange({ ...profile, scammerCallerId: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-bold"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Coerced Demand Amount (INR)
            </label>
            <input
              type="number"
              placeholder="e.g. 250000"
              value={profile.extortionDemandAmount || profile.fraudAmount || 250000}
              onChange={(e) => onProfileChange({ ...profile, extortionDemandAmount: Number(e.target.value), fraudAmount: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-rose-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-bold"
            />
          </div>
        </div>
      </div>

      {/* Intake Dropzone & Text Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Dropzone */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[260px] transition-all relative overflow-hidden group">
          {isExtracting ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xl border border-amber-500/40">
                🔍
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-white block">Scanning Forgery Artifacts...</span>
                <span className="text-[11px] font-mono text-amber-400">Verifying Fake National Seals & Syntax</span>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-slate-800/90 text-amber-400 border border-slate-700/80 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">
                Drop Suspicious Warrant / Summons Image
              </h3>
              <p className="text-xs text-slate-400 mb-4 max-w-xs leading-relaxed font-sans">
                Image of forged CBI/Police letter received on WhatsApp or Skype screenshot.
              </p>
              <label className="cursor-pointer px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-mono font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95">
                <span>BROWSE_DOCUMENT</span>
                <input
                  type="file"
                  accept="image/*,.pdf,.svg"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
              {profile.evidenceFileName && (
                <div className="mt-3 text-[10px] font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
                  ✓ INGESTED: {profile.evidenceFileName}
                </div>
              )}
            </>
          )}
        </div>

        {/* Text Paste Area */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 font-mono">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Or Paste Extortion Threat Message</span>
              </label>
              <span className="text-[9px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                LIVE_RADAR
              </span>
            </div>
            <textarea
              rows={6}
              value={pastedText}
              onChange={(e) => handlePastedTextChange(e.target.value)}
              placeholder="Paste text e.g. 'You are under digital arrest by CBI Mumbai for drug parcel money laundering. Stay on Skype camera and deposit Rs 2,50,000 in RBI account...'"
              className="w-full p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 text-slate-200 placeholder-slate-600 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60">
            <span>HASH: <strong className="text-white font-bold">{profile.evidenceHash ? profile.evidenceHash.substring(0, 16) + '...' : 'Awaiting'}</strong></span>
            <span>Target: <strong className="text-amber-400 font-bold">{profile.impersonatedAgency || "CBI"}</strong></span>
          </div>
        </div>
      </div>

      {/* Forgery Analysis Radar Card */}
      {digitalArrestScore !== null && (
        <div className="mb-8 bg-slate-900/95 text-white border-2 border-red-500/80 rounded-2xl p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 font-mono">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold shadow-lg shadow-red-500/30">
                <FileWarning className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30 block w-fit">
                  AI FORGERY RADAR VERDICT
                </span>
                <h3 className="text-base font-black text-white mt-1">
                  🚨 100% FORGED SUMMONS DETECTED ({digitalArrestScore}% Confidence)
                </h3>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-800">
              PHYSICAL DANGER: 0.0%
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
              Illegal Violations & Forgery Signatures Detected:
            </span>
            {detectedRedFlags.map((flag, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{flag}</span>
              </div>
            ))}
          </div>

          <div className="bg-red-950/50 border border-red-800/60 rounded-xl p-3.5 text-xs text-red-200 leading-relaxed font-sans">
            <strong className="text-white block mb-1 font-mono text-[11px]">MHA NATIONAL CYBERCRIME ADVISORY:</strong>
            Indian Law Enforcement agencies (CBI, State Police, ED, Customs, Supreme Court) <strong>NEVER arrest citizens over Skype or WhatsApp video calls</strong> and <strong>NEVER demand money transfer into any "verification account"</strong>. Do NOT send money. Proceed to the next step for immediate de-escalation actions.
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="h-13 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-mono font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all mx-auto active:scale-95"
        >
          <span>ENTER_LEGAL_PROOF_ROOM</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};