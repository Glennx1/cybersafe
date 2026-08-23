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
      {/* 1. Audit Summary Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-100"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-indigo-600 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - score / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-slate-900">
                {score}%
              </span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase">Score</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Details Checked
              </span>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Incident Summary & Evidence
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md leading-relaxed">
              {auditReport.summaryVerdict}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 text-xs shrink-0 space-y-1">
          <div className="text-slate-500 font-medium text-[10px]">RECOVERY ELIGIBILITY</div>
          <div className="font-bold text-emerald-700 flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Eligible for Bank Freeze</span>
          </div>
        </div>
      </div>

      {/* 2. Key Fields Inspector & Editor */}
      <div className="mt-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="text-xs font-bold text-slate-800">
            Verify & Edit Incident Identifiers
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Click to update any detail</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-slate-600 font-medium block mb-1">
              12-Digit Banking UTR / RRN
            </label>
            <input
              type="text"
              placeholder="e.g. 312345678901"
              value={profile.utrNumber}
              onChange={(e) => onProfileChange({ ...profile, utrNumber: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-700 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              Fraud Amount (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 85500"
              value={profile.fraudAmount || ""}
              onChange={(e) => onProfileChange({ ...profile, fraudAmount: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              Suspect Account / VPA ID
            </label>
            <input
              type="text"
              placeholder="e.g. suspect@upi"
              value={profile.suspectVpa}
              onChange={(e) => onProfileChange({ ...profile, suspectVpa: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-indigo-700 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              Victim Full Name
            </label>
            <input
              type="text"
              value={profile.victimName}
              onChange={(e) => onProfileChange({ ...profile, victimName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              Contact Phone Number
            </label>
            <input
              type="text"
              value={profile.victimPhone}
              onChange={(e) => onProfileChange({ ...profile, victimPhone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              Victim Bank Name
            </label>
            <select
              value={profile.victimBank}
              onChange={(e) => onProfileChange({ ...profile, victimBank: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Evidentiary Checkpoints */}
      <div className="mt-6 space-y-3">
        <h3 className="text-xs font-bold text-slate-700 px-1 uppercase tracking-wider">
          Evidence Checklist
        </h3>

        <div className="space-y-3">
          {auditReport.findings.map((finding: any) => {
            return (
              <div
                key={finding.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3.5 transition-all"
              >
                <div className="mt-0.5 shrink-0">
                  {finding.status === "PASS" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : finding.status === "WARNING" ? (
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">
                      {finding.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      finding.status === "PASS"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : finding.status === "WARNING"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      {finding.status === "PASS" ? "Verified" : finding.status === "WARNING" ? "Attention" : "Urgent"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {finding.description}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Guideline: <strong>{finding.legalRef}</strong></span>
                    <span className="text-slate-400">{finding.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Statutory Compliance Notice */}
      <div className="mt-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <h4 className="font-bold text-slate-800 mb-1">Notice on Cyber Safety Actions</h4>
        <p>
          The generated documents are formatted according to Indian Cyber Crime Coordination Centre (I4C) guidelines. You can submit these directly to your bank or the 1930 Helpline.
        </p>
      </div>

      {/* 5. Navigation Controls */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Intake</span>
        </button>

        <button
          onClick={onNext}
          className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <span>Continue to Get Help</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};