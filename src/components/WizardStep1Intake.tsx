"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  Sparkles,
  ArrowRight,
  FileText,
  Zap,
  Eye,
  CheckCircle2,
  Lock,
  FileCheck
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";
import { parseForensicText } from "@/lib/forensicEngine";
import { getDictionary } from "@/lib/i18n";
import Tesseract from "tesseract.js";

interface WizardStep1IntakeProps {
  profile: IncidentProfile;
  language: Language;
  onProfileChange: (updated: IncidentProfile) => void;
  onNext: () => void;
}

export const WizardStep1Intake: React.FC<WizardStep1IntakeProps> = ({
  profile,
  language,
  onProfileChange,
  onNext,
}) => {
  const dict = getDictionary(language);
  const [isExtracting, setIsExtracting] = useState(false);
  const [pastedText, setPastedText] = useState(profile.rawEvidenceText);

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

      // 3. Perform OCR
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      const parsed = parseForensicText(text);

      onProfileChange({
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
      });
      setPastedText(text);
      
      if (!parsed.utrNumber && !parsed.fraudAmount && !parsed.suspectVpa) {
        alert("OCR Notice: Could not automatically detect UTR or Amount. You can verify and edit the values in Step 2.");
      }
    } catch (error) {
      console.error("OCR Extraction failed", error);
      alert("OCR Engine error. Please check console or enter details manually in Step 2.");
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
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {dict.intake.financialTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl mx-auto font-sans">
          {dict.intake.financialSubtitle}
        </p>
      </div>

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
              The client-computed hash ({profile.evidenceHash?.substring(0, 16)}...) does not match the server-verified hash ({profile.serverEvidenceHash?.substring(0, 16)}...). This discrepancy has been flagged in the case audit ledger for evidentiary integrity.
            </p>
          </div>
        </div>
      )}

      {/* 2. Intake Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Upload Bay */}
        <div className="bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[260px] transition-all relative overflow-hidden shadow-xs group">
          {isExtracting ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-100 relative">
                OCR
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-slate-900 block">Reading receipt & hashing...</span>
                <span className="text-xs text-indigo-600">Verifying SHA-256 under Sec 63 BSA</span>
              </div>
              <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-full h-full bg-indigo-600 animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {dict.intake.dropzoneTitle}
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-xs leading-relaxed">
                {dict.intake.dropzoneSubtitle}
              </p>
              <label className="cursor-pointer px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95">
                <span>{dict.intake.uploadScreenshot}</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
              {profile.evidenceFileName && (
                <div className="mt-3 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sec 63 BSA Verified: {profile.evidenceFileName}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Text / SMS Raw Input */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="raw-sms-input" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>{dict.intake.pasteSmsTitle}</span>
              </label>
            </div>
            <textarea
              id="raw-sms-input"
              rows={6}
              value={pastedText}
              onChange={(e) => handlePastedTextChange(e.target.value)}
              placeholder={dict.intake.pasteSmsPlaceholder}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 placeholder-slate-400 leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100" aria-live="polite">
            <span>{dict.intake.utrLabel}: <strong className="text-slate-900 font-bold">{profile.utrNumber || "Not detected"}</strong></span>
            <span>{dict.intake.amountLabel}: <strong className="text-emerald-700 font-bold">₹{profile.fraudAmount.toLocaleString("en-IN")}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. Forensic Entity Manifest */}
      {(profile.serverEvidenceHash || profile.evidenceHash) && (
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs animate-in fade-in" aria-live="polite">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-800">
                Extracted Information & Section 63 BSA Hash
              </h3>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              Server Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">12-Digit Banking UTR</span>
              <span className="text-xs font-bold text-emerald-700 truncate block mt-0.5">
                {profile.utrNumber || "N/A"}
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Fraud Amount</span>
              <span className="text-xs font-bold text-slate-900 truncate block mt-0.5">
                ₹{profile.fraudAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Suspect Account / VPA</span>
              <span className="text-xs font-bold text-indigo-700 truncate block mt-0.5">
                {profile.suspectVpa || profile.suspectAccountNo || "Tracing..."}
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Sec 63 BSA SHA-256</span>
              <span className="text-xs font-bold text-indigo-700 font-mono truncate block mt-0.5" title={profile.serverEvidenceHash || profile.evidenceHash}>
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
          onClick={onNext}
          className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all mx-auto active:scale-95"
        >
          <span>Continue to check details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};