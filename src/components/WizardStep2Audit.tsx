"use client";

import React from "react";
import {
  ShieldCheck,
  Clock,
  UserX,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Edit3,
  CheckCircle2,
  FileText,
  Building,
  Scale
} from "lucide-react";
import { ForensicAuditReport, IncidentProfile, Language } from "@/lib/types";

interface WizardStep2AuditProps {
  auditReport: ForensicAuditReport;
  profile: IncidentProfile;
  language: Language;
  onProfileChange: (updated: IncidentProfile) => void;
  onBack: () => void;
  onNext: () => void;
}

export const WizardStep2Audit: React.FC<WizardStep2AuditProps> = ({
  auditReport,
  profile,
  language,
  onProfileChange,
  onBack,
  onNext,
}) => {
  const score = auditReport.overallCompletenessScore;
  const isGoldenHour = auditReport.isGoldenHourValid;

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Hero Diagnostic Banner */}
      <div className="bg-slate-900/90 text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-5">
          {/* Circular Score Gauge */}
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-rose-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - score / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black font-mono text-white">
                {score}%
              </span>
              <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">SCORE</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                AUDIT_VERIFIED
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Forensic Incident Evidence Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed font-sans">
              {auditReport.summaryVerdict}
            </p>
          </div>
        </div>

        <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-xs shrink-0 space-y-1 font-mono">
          <div className="text-slate-500 font-bold text-[9px] uppercase tracking-wider">STATUTORY LIABILITY</div>
          <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>RBI ZERO-LIABILITY VALID</span>
          </div>
        </div>
      </div>

      {/* 2. Key Forensic Fields Quick Inspector & Editor */}
      <div className="mt-6 bg-slate-900/80 p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
            FORENSIC IDENTIFIER VERIFICATION // EDITABLE TELEMETRY
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <Edit3 className="w-3 h-3 text-rose-400" />
            <span>Tap to edit if OCR missed digits</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              12-Digit Banking UTR / RRN
            </label>
            <input
              type="text"
              placeholder="e.g. 312345678901"
              value={profile.utrNumber}
              onChange={(e) => onProfileChange({ ...profile, utrNumber: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-emerald-400 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Fraud Amount (INR)
            </label>
            <input
              type="number"
              placeholder="e.g. 85500"
              value={profile.fraudAmount || ""}
              onChange={(e) => onProfileChange({ ...profile, fraudAmount: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-amber-400 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Victim Bank Name
            </label>
            <input
              type="text"
              placeholder="e.g. State Bank of India (SBI)"
              value={profile.victimBank}
              onChange={(e) => onProfileChange({ ...profile, victimBank: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Suspect VPA / UPI ID
            </label>
            <input
              type="text"
              placeholder="e.g. ramesh.traders@okaxis"
              value={profile.suspectVpa}
              onChange={(e) => onProfileChange({ ...profile, suspectVpa: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-cyan-400 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Complainant Legal Name
            </label>
            <input
              type="text"
              placeholder="e.g. Aditya Sharma"
              value={profile.victimName}
              onChange={(e) => onProfileChange({ ...profile, victimName: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              Complainant Mobile
            </label>
            <input
              type="text"
              placeholder="e.g. 9876543210"
              value={profile.victimPhone}
              onChange={(e) => onProfileChange({ ...profile, victimPhone: e.target.value })}
              className="w-full p-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
            />
          </div>
        </div>
      </div>

      {/* 3. Four Core Forensic Vectors */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {auditReport.vectors.map((vec, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {vec.label}
                </span>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase ${
                  vec.status === "PASSED" ? "bg-emerald-950 text-emerald-400 border-emerald-800" :
                  vec.status === "WARNING" ? "bg-amber-950 text-amber-400 border-amber-800" :
                  "bg-rose-950 text-rose-400 border-rose-800"
                }`}>
                  {vec.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {vec.details}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>WEIGHT: 25%</span>
              <span className="font-bold text-white">SCORE: {vec.score}/100</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Statutory Legal Framework Citing */}
      <div className="mt-6 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-rose-400 mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>STATUTORY CRIMINAL OFFENSES IDENTIFIED</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          {auditReport.applicableBnsSections.map((sec, i) => (
            <div key={i} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-slate-300">
              • {sec}
            </div>
          ))}
          {auditReport.applicableItActSections.map((sec, i) => (
            <div key={i} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-slate-300">
              • {sec}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Navigation CTAs */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK_TO_INTAKE</span>
        </button>

        <button
          onClick={onNext}
          className="h-13 px-8 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-mono font-bold text-sm flex items-center gap-2 shadow-xl shadow-rose-600/20 transition-all active:scale-95"
        >
          <span>PROCEED_TO_ACTION_PACK</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};