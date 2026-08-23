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
  const [isExtracting, setIsExtracting] = useState(false);
  const [pastedText, setPastedText] = useState(profile.rawEvidenceText);

  const handleFileUpload = async (file: File) => {
    setIsExtracting(true);
    try {
      // 1. Calculate Cryptographic Hash (Sec 63 BSA)
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const fileDate = new Date(file.lastModified).toISOString();

      // 2. Perform OCR
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      const parsed = parseForensicText(text);

      onProfileChange({
        ...profile,
        evidenceFileName: file.name,
        evidenceHash: hashHex,
        evidenceFileDate: fileDate,
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
          Let's secure your transaction details
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl mx-auto font-sans">
          Upload a screenshot of your bank debit SMS or UPI receipt (GPay / PhonePe / Paytm), or paste the message text below.
        </p>
      </div>

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
                <span className="text-sm font-bold text-slate-900 block">Reading receipt...</span>
                <span className="text-xs text-indigo-600">Extracting UTR & payment details</span>
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
                Drop Payment Receipt / Debit SMS
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-xs leading-relaxed">
                PNG, JPG, or PDF scans from PhonePe, GPay, Paytm, or NetBanking.
              </p>
              <label className="cursor-pointer px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95">
                <span>Upload Screenshot</span>
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
                  <span>Uploaded: {profile.evidenceFileName}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Text / SMS Raw Input */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Or Paste SMS / Transaction Text</span>
              </label>
            </div>
            <textarea
              rows={6}
              value={pastedText}
              onChange={(e) => handlePastedTextChange(e.target.value)}
              placeholder="Paste debit message e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901 to VPA ramesh.traders@okaxis...'"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 placeholder-slate-400 leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
            <span>UTR: <strong className="text-slate-900 font-bold">{profile.utrNumber || "Not detected"}</strong></span>
            <span>Amount: <strong className="text-emerald-700 font-bold">₹{profile.fraudAmount.toLocaleString("en-IN")}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. Forensic Entity Manifest */}
      {profile.evidenceHash && (
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800">
                Extracted Information
              </span>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              Verified
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
              <span className="text-[10px] text-slate-500 block">File Checksum</span>
              <span className="text-xs font-bold text-slate-700 truncate block mt-0.5">
                {profile.evidenceHash.substring(0, 16)}...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Action CTA */}
      <div className="text-center pt-2">
        <button
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