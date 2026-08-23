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
      {/* 1. Hero Threat Neutralization Banner */}
      <div className="bg-slate-900/90 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-2xl mb-6 font-mono">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30 w-fit">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>THREAT_NEUTRALIZED // EXTORTION DEFEATED</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 font-sans">
          You are 100% Safe. Take Immediate Action.
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-sans">
          The extortion syndicate attempting to intimidate you has no legal authority. Follow the 3 critical steps below to report the impersonators and ban their SIM cards.
        </p>
      </div>

      {/* 2. Step-by-Step De-escalation Protocol */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
        <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <PhoneOff className="w-3.5 h-3.5 text-rose-400" />
          <span>IMMEDIATE SAFETY & CALL-DROP PROTOCOL</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40">
            <div className="w-6 h-6 rounded-md bg-rose-500 text-white text-xs font-bold flex items-center justify-center mb-2">
              01
            </div>
            <h4 className="text-xs font-bold text-rose-400 mb-1">Hang Up Video Call</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Disconnect all Skype or WhatsApp video calls immediately. Real police officers NEVER conduct interrogations on video.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-900/40">
            <div className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center mb-2">
              02
            </div>
            <h4 className="text-xs font-bold text-amber-400 mb-1">Block Number & Caller</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Block the scammer's number on WhatsApp and Phone dialer. They cannot send any local police team to your house.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-900/40">
            <div className="w-6 h-6 rounded-md bg-blue-500 text-white text-xs font-bold flex items-center justify-center mb-2">
              03
            </div>
            <h4 className="text-xs font-bold text-cyan-400 mb-1">Break the Isolation</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Inform family or friends. Scammers rely on keeping you in secret panic to coerce money transfers.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Action 1: Download FIR PDF */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center font-bold border border-slate-700">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase">SEC 319 / 204 BNS</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">
              Police Impersonation FIR Dossier
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
              Formal criminal complaint citing Impersonation of a Public Servant (Sec 204), Extortion (Sec 308), and Sec 66D IT Act with the SHA-256 evidence hash.
            </p>
          </div>
          <button
            onClick={onDownloadDigitalArrestFir}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD_IMPERSONATION_FIR</span>
          </button>
        </div>

        {/* Action 2: DoT Chakshu SIM Blocking */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/60 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center font-bold border border-blue-500/30">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase">DOT SANCHAR SAATHI</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">
              Block Scammer on DoT Chakshu Portal
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
              Report the caller ID directly to the Department of Telecommunications (DoT) Chakshu facility to revoke their SIM card and block their IMEI nationwide.
            </p>
          </div>
          <div className="space-y-2 font-mono">
            <button
              onClick={handleCopyChakshuDetails}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-800 transition-all"
            >
              {copiedChakshu ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedChakshu ? "COPIED_DETAILS!" : "COPY_SCAMMER_ID"}</span>
            </button>
            <a
              href={chakshuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LAUNCH_CHAKSHU_PORTAL</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Real Verified Central Control Room Directory */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-md font-mono">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>REAL OFFICIAL VERIFIED GOVERNMENT HOTLINES (CROSS-VERIFICATION)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 block text-[9px] uppercase font-bold">CBI Headquarters Control Room:</span>
            <span className="font-mono text-white text-xs font-bold mt-1 block">011-24362755</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Lodhi Road, New Delhi</span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 block text-[9px] uppercase font-bold">National Cybercrime Helpline:</span>
            <span className="font-mono text-emerald-400 text-xs font-bold mt-1 block">1930 (Toll Free)</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">MHA 24x7 I4C Operations</span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Enforcement Directorate (ED):</span>
            <span className="font-mono text-white text-xs font-bold mt-1 block">011-23339100</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Pravachan Bhawan, New Delhi</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between font-mono">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK_TO_PROOF_ROOM</span>
        </button>
      </div>
    </div>
  );
};