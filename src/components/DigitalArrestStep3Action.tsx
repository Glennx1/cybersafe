"use client";

import React, { useState } from "react";
import {
  Download,
  Phone,
  Send,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  FileCheck,
  XCircle,
  PhoneOff,
  Radio,
  ExternalLink,
  Copy,
  Check,
  Building2,
  AlertTriangle
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";

interface DigitalArrestStep3ActionProps {
  profile: IncidentProfile;
  language: Language;
  onDownloadDigitalArrestFir: () => void;
  onBack: () => void;
}

export const DigitalArrestStep3Action: React.FC<DigitalArrestStep3ActionProps> = ({
  profile,
  language,
  onDownloadDigitalArrestFir,
  onBack,
}) => {
  const [copiedChakshu, setCopiedChakshu] = useState(false);

  const handleCopyChakshuDetails = () => {
    const text = `SUSPECT IMPERSONATOR DETAILS FOR CHAKSHU BLOCK:\n- Caller ID / WhatsApp: ${profile.scammerCallerId || "Unknown"}\n- Impersonated Official: ${profile.impersonatedAgency || "CBI / Police"}\n- Extortion Demand: Rs. ${(profile.extortionDemandAmount || 250000).toLocaleString("en-IN")}\n- Crime Category: Fake Digital Arrest / Cyber Extortion (Sec 319 BNS)`;
    navigator.clipboard.writeText(text);
    setCopiedChakshu(true);
    setTimeout(() => setCopiedChakshu(false), 2500);
  };

  const chakshuUrl = "https://sancharsaathi.gov.in/sfc/";

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Hero Reassurance Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200 w-fit">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>You are Safe. Take Action Below.</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Recommended Next Steps
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
          The scammers attempting to intimidate you have no legal authority. Follow these 3 immediate safety steps and file your official reports.
        </p>
      </div>

      {/* 2. Step-by-Step Safety Steps */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2">
          <PhoneOff className="w-4 h-4 text-rose-600" />
          <span>Immediate Safety Recommendations</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center mb-2">
              1
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">Hang Up the Call</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Disconnect any Skype or WhatsApp video calls immediately. Real police officers never conduct interrogations or arrest citizens over video.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center mb-2">
              2
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">Block the Caller</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Block the caller's phone number and messaging accounts. They have no jurisdiction and cannot send police to your home.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mb-2">
              3
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">Speak to Family or Friends</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Talk to a family member or trusted friend. Scammers rely on keeping you in secret panic to force transfers.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Action 1: Download FIR PDF */}
        <div className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 font-medium">BNS Sec 204 & 308</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              Police Impersonation Complaint Draft
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Download a pre-formatted legal complaint citing Impersonation of Public Servant and Extortion ready for your local police cyber cell or 1930 portal.
            </p>
          </div>
          <button
            onClick={onDownloadDigitalArrestFir}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Police Complaint PDF</span>
          </button>
        </div>

        {/* Action 2: DoT Chakshu SIM Blocking */}
        <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 font-medium">DoT Sanchar Saathi</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              Block Scammer on DoT Chakshu
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Report fraudulent numbers to the Department of Telecommunications Chakshu portal to have the scammer's SIM card and phone IMEI blocked.
            </p>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleCopyChakshuDetails}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 transition-all"
            >
              {copiedChakshu ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedChakshu ? "Details Copied!" : "Copy Scammer Details"}</span>
            </button>
            <a
              href={chakshuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Chakshu Portal</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Real Verified Central Control Room Directory */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-indigo-600" />
          <span>Official Verified Helplines & Numbers</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <span className="text-slate-500 block text-xs font-medium">National Cybercrime Helpline:</span>
            <span className="text-emerald-700 text-sm font-bold mt-0.5 block">1930 (Toll Free)</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">24x7 Citizen Cyber Defense</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <span className="text-slate-500 block text-xs font-medium">CBI Control Room:</span>
            <span className="text-slate-900 text-xs font-bold mt-0.5 block">011-24362755</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">HQ Lodhi Road, New Delhi</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <span className="text-slate-500 block text-xs font-medium">Enforcement Directorate (ED):</span>
            <span className="text-slate-900 text-xs font-bold mt-0.5 block">011-23339100</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Headquarters, New Delhi</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Legal Reality</span>
        </button>
      </div>
    </div>
  );
};