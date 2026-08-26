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
import { getDictionary } from "@/lib/i18n";

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
  const dict = getDictionary(language);

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

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Hero Summary Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{dict.digitalArrest.factCheckBadge}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{dict.digitalArrest.notInDangerBadge}</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {dict.digitalArrest.step2Title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {dict.digitalArrest.step2Subtitle}
        </p>
      </div>

      {/* 2. Side-by-Side Deconstruction Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            <span>{dict.digitalArrest.claimVsRealityTitle}</span>
          </span>
        </div>

        <div className="space-y-3">
          {comparisonData.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200"
            >
              {/* Scammer Myth */}
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-rose-700 block">
                    {dict.digitalArrest.scammerClaimLabel}:
                  </span>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{item.scammerMyth}</p>
                </div>
              </div>

              {/* Legal Reality */}
              <div className="flex items-start gap-2.5 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-800">
                      {dict.digitalArrest.legalRealityLabel}:
                    </span>
                    <span className="text-[10px] bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      {item.statute}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 mt-0.5 leading-relaxed">{item.legalReality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Complainant & Threat Verification */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-indigo-600" />
          <span>{dict.audit.verifyEditTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-600 font-medium block mb-1">
              {dict.audit.victimNameLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. Aditya Sharma"
              value={profile.victimName}
              onChange={(e) => onProfileChange({ ...profile, victimName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              {dict.audit.contactPhoneLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. 9876543210"
              value={profile.victimPhone}
              onChange={(e) => onProfileChange({ ...profile, victimPhone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              City & State
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Maharashtra"
              value={profile.cityState}
              onChange={(e) => onProfileChange({ ...profile, cityState: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              {dict.digitalArrest.callerIdLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. +91 98765 43210"
              value={profile.scammerCallerId || ""}
              onChange={(e) => onProfileChange({ ...profile, scammerCallerId: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>

      {/* 4. Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict.step3Action.backToDetails}</span>
        </button>

        <button
          onClick={onNext}
          className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <span>{dict.digitalArrest.continueToSafetyBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};