"use client";

import React from "react";
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
  HelpCircle
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";

interface DigitalArrestStep2AuditProps {
  profile: IncidentProfile;
  language: Language;
  onProfileChange: (updated: IncidentProfile) => void;
  onBack: () => void;
  onNext: () => void;
}

export const DigitalArrestStep2Audit: React.FC<DigitalArrestStep2AuditProps> = ({
  profile,
  language,
  onProfileChange,
  onBack,
  onNext,
}) => {
  const comparisonData = [
    {
      scammerMyth: "You are under 'Digital Arrest' and cannot leave your room.",
      legalReality: "The term 'Digital Arrest' has 0% legal standing in Indian Law. Neither BNSS 2023 nor IT Act permits arrest via video call.",
      statute: "MHA Advisory / BNSS Sec 41A"
    },
    {
      scammerMyth: "Keep WhatsApp/Skype video camera active 24x7 or police will raid.",
      legalReality: "Summons must be served physically in writing by a designated IO. Confinement via video call is criminal extortion.",
      statute: "Sec 308(2) BNS 2023"
    },
    {
      scammerMyth: "Transfer funds to 'RBI Security Escrow' for clearance/verification.",
      legalReality: "No court, police agency, or RBI ever asks citizens to transfer money to clear their name.",
      statute: "Sec 319 BNS & 66D IT Act"
    },
    {
      scammerMyth: "National Security secrecy: Do not contact family or lawyers.",
      legalReality: "Every citizen has a fundamental right under Constitution Art 22 & Sec 36 BNSS to consult an advocate.",
      statute: "Art 22 & Sec 36 BNSS"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Hero De-escalation Shield */}
      <div className="bg-slate-900/90 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-2xl mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PROOF_ROOM // STATUTORY DECONSTRUCTION</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-lg font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% EXEMPT FROM LEGAL JEOPARDY</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          Psychological Threat Neutralization Deck
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
          The extortionists weaponize fear, fake police uniforms, and forged court seals. Below is the statutory legal deconstruction proving why their demands are 100% unlawful.
        </p>
      </div>

      {/* 2. Side-by-Side Deconstruction Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800 font-mono">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>SCAMMER CLAIMS VS. ACTUAL BHARATIYA NYAYA SANHITA (BNS 2023)</span>
          </span>
        </div>

        <div className="space-y-3">
          {comparisonData.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80"
            >
              {/* Scammer Myth */}
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-400 block">
                    What Scammers Threaten:
                  </span>
                  <p className="text-xs text-slate-300 font-medium font-sans mt-0.5">{item.scammerMyth}</p>
                </div>
              </div>

              {/* Legal Reality */}
              <div className="flex items-start gap-2.5 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Actual Law (The Reality):
                    </span>
                    <span className="text-[8px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                      {item.statute}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium font-sans mt-0.5">{item.legalReality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Citizen & Extortionist Profile Verification */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm font-mono">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <UserCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>VERIFY COMPLAINANT IDENTIFIERS FOR POLICE FIR DOSSIER</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Your Full Legal Name
            </label>
            <input
              type="text"
              placeholder="e.g. Aditya Sharma"
              value={profile.victimName}
              onChange={(e) => onProfileChange({ ...profile, victimName: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Your Mobile Number
            </label>
            <input
              type="text"
              placeholder="e.g. 9876543210"
              value={profile.victimPhone}
              onChange={(e) => onProfileChange({ ...profile, victimPhone: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Your City & State
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Maharashtra"
              value={profile.cityState}
              onChange={(e) => onProfileChange({ ...profile, cityState: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Scammer's Calling ID / WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="e.g. +92 300 1234567"
              value={profile.scammerCallerId || ""}
              onChange={(e) => onProfileChange({ ...profile, scammerCallerId: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
            />
          </div>
        </div>
      </div>

      {/* 4. Navigation Buttons */}
      <div className="flex items-center justify-between font-mono">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK_TO_SCANNER</span>
        </button>

        <button
          onClick={onNext}
          className="h-13 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all active:scale-95"
        >
          <span>LAUNCH_ACTION_SHIELD</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};