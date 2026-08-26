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
  Scale,
  ShieldAlert
} from "lucide-react";
import { ForensicAuditReport, IncidentProfile, Language } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { VoiceInputButton } from "@/components/VoiceInputButton";

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
  const dict = getDictionary(language);
  const score = auditReport.overallCompletenessScore;

  // Localized vector helper
  const getLocalizedVector = (vecName: string, status: string, originalDetails: string) => {
    switch (vecName) {
      case "utr_validation":
        return {
          label: dict.audit.vectorUtrLabel,
          details: status === "PASSED" ? `${dict.audit.vectorUtrPassed}: ${profile.utrNumber}` : dict.audit.vectorUtrFailed
        };
      case "golden_hour_window":
        return {
          label: dict.audit.vectorGoldenHourLabel,
          details: status === "PASSED" ? dict.audit.vectorGoldenHourPassed : dict.audit.vectorGoldenHourWarning
        };
      case "suspect_node":
        return {
          label: dict.audit.vectorSuspectLabel,
          details: status === "PASSED" ? `${dict.audit.vectorSuspectPassed} ${profile.suspectVpa || profile.suspectAccountNo || ""}` : dict.audit.vectorSuspectWarning
        };
      case "rbi_protection":
        return {
          label: dict.audit.vectorRbiLabel,
          details: dict.audit.vectorRbiDetails
        };
      default:
        return { label: vecName, details: originalDetails };
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Hero Score Banner */}
      <div className="bg-surface-card rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-stone-200"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-brand-primary transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - score / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-text-primary">
                {score}%
              </span>
              <span className="text-[9px] text-text-muted font-semibold uppercase">{dict.audit.scoreLabel}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-brand-success font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {dict.audit.detailsChecked}
              </span>
              <h2 className="text-lg font-bold text-text-primary tracking-tight">
                {dict.audit.summaryTitle}
              </h2>
            </div>
            <p className="text-xs text-text-muted max-w-md leading-relaxed">
              {dict.audit.summaryVerdict}
            </p>
          </div>
        </div>

        <div className="bg-surface-section px-4 py-3 rounded-xl border border-stone-200/60 text-xs shrink-0 space-y-1">
          <div className="text-text-muted font-medium text-[10px] uppercase">{dict.audit.recoveryEligibility}</div>
          <div className="font-bold text-brand-success flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-brand-success" />
            <span>{dict.audit.eligibleForBankFreeze}</span>
          </div>
        </div>
      </div>

      {/* 2. Key Fields Inspector & Editor */}
      <div className="mt-6 bg-surface-card p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
          <div className="text-xs font-bold text-text-primary">
            {dict.audit.verifyEditTitle}
          </div>
          <div className="text-xs text-text-muted flex items-center gap-1">
            <Edit3 className="w-3.5 h-3.5 text-brand-primary" />
            <span>{dict.audit.clickToUpdate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-text-muted font-medium">
                {dict.audit.utrLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="UTR Number"
                buttonTitle="Dictate UTR Number"
                onTranscript={(text) => onProfileChange({ ...profile, utrNumber: text.replace(/[^0-9]/g, "") })}
              />
            </div>
            <input
              type="text"
              placeholder="e.g. 312345678901"
              value={profile.utrNumber}
              onChange={(e) => onProfileChange({ ...profile, utrNumber: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-bold text-brand-success focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-text-muted font-medium">
                {dict.audit.fraudAmountLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Fraud Amount"
                buttonTitle="Dictate fraud amount"
                onTranscript={(text) => {
                  const cleaned = Number(text.replace(/[^0-9]/g, ""));
                  if (cleaned) {
                    onProfileChange({ ...profile, fraudAmount: cleaned });
                  }
                }}
              />
            </div>
            <input
              type="number"
              placeholder="e.g. 85500"
              value={profile.fraudAmount || ""}
              onChange={(e) => onProfileChange({ ...profile, fraudAmount: Number(e.target.value) })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-bold text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-text-muted font-medium">
                {dict.audit.suspectVpaLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Suspect UPI ID"
                buttonTitle="Dictate suspect UPI"
                onTranscript={(text) => onProfileChange({ ...profile, suspectVpa: text.replace(/\s+/g, "") })}
              />
            </div>
            <input
              type="text"
              placeholder="e.g. suspect@upi"
              value={profile.suspectVpa}
              onChange={(e) => onProfileChange({ ...profile, suspectVpa: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-bold text-brand-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-text-muted font-medium">
                {dict.audit.suspectAccountNoLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Suspect Account Number"
                buttonTitle="Dictate suspect account number"
                onTranscript={(text) => onProfileChange({ ...profile, suspectAccountNo: text.replace(/[^0-9]/g, "") })}
              />
            </div>
            <input
              type="text"
              placeholder="e.g. 987654321098"
              value={profile.suspectAccountNo || ""}
              onChange={(e) => onProfileChange({ ...profile, suspectAccountNo: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-bold text-brand-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-text-muted font-medium">
                {dict.audit.suspectIfscLabel}
              </label>
              <VoiceInputButton
                language={language}
                fieldLabel="Suspect IFSC"
                buttonTitle="Dictate IFSC code"
                onTranscript={(text) => onProfileChange({ ...profile, suspectBankIfsc: text.replace(/\s+/g, "").toUpperCase() })}
              />
            </div>
            <input
              type="text"
              placeholder="e.g. PYTM0123456"
              value={profile.suspectBankIfsc || ""}
              onChange={(e) => onProfileChange({ ...profile, suspectBankIfsc: e.target.value.toUpperCase() })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-mono font-bold text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <label className="text-text-muted font-medium block mb-1">
              {dict.audit.victimBankLabel}
            </label>
            <select
              value={profile.victimBank}
              onChange={(e) => onProfileChange({ ...profile, victimBank: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
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

          <div>
            <label className="text-text-muted font-medium block mb-1">
              {dict.audit.victimAccountNoLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. 50100432198765"
              value={profile.victimAccountNo || (profile.victimAccountMasked && profile.victimAccountMasked !== "XXXX-XXXX-0000" ? profile.victimAccountMasked : "")}
              onChange={(e) => onProfileChange({
                ...profile,
                victimAccountNo: e.target.value,
                victimAccountMasked: e.target.value ? e.target.value.replace(/\d(?=\d{4})/g, "X") : profile.victimAccountMasked
              })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-bold text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <label className="text-text-muted font-medium block mb-1">
              {dict.audit.victimIfscLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. SBIN0001234"
              value={profile.victimBankIfsc || ""}
              onChange={(e) => onProfileChange({ ...profile, victimBankIfsc: e.target.value.toUpperCase() })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-mono font-bold text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <label className="text-text-muted font-medium block mb-1">
              {dict.audit.victimNameLabel}
            </label>
            <input
              type="text"
              value={profile.victimName}
              onChange={(e) => onProfileChange({ ...profile, victimName: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <label className="text-text-muted font-medium block mb-1">
              {dict.audit.contactPhoneLabel}
            </label>
            <input
              type="text"
              value={profile.victimPhone}
              onChange={(e) => onProfileChange({ ...profile, victimPhone: e.target.value })}
              className="w-full p-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
        </div>
      </div>

      {/* 3. Evidentiary Checkpoints */}
      <div className="mt-6 space-y-3">
        <h3 className="text-xs font-bold text-text-primary px-1 uppercase tracking-wider">
          {dict.audit.evidenceChecklistTitle}
        </h3>

        <div className="space-y-3">
          {auditReport.vectors.map((vec, idx) => {
            const localized = getLocalizedVector(vec.vectorName, vec.status, vec.details);
            return (
              <div
                key={idx}
                className="bg-surface-card p-4 rounded-xl border border-stone-200/80 shadow-xs flex items-start gap-3.5 transition-all"
              >
                <div className="mt-0.5 shrink-0">
                  {vec.status === "PASSED" ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-success" />
                  ) : vec.status === "WARNING" ? (
                    <AlertTriangle className="w-5 h-5 text-brand-warning" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 text-brand-urgent" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-text-primary">
                      {localized.label}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      vec.status === "PASSED"
                        ? "bg-emerald-50 text-brand-success border-emerald-200"
                        : vec.status === "WARNING"
                        ? "bg-amber-50 text-brand-warning border-amber-200/80"
                        : "bg-red-50 text-brand-urgent border-red-200"
                    }`}>
                      {vec.status === "PASSED" ? dict.audit.statusVerified : vec.status === "WARNING" ? dict.audit.statusAttention : dict.audit.statusUrgent}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {localized.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Statutory Compliance Notice */}
      <div className="mt-6 bg-surface-section p-5 rounded-2xl border border-stone-200/60 text-xs text-text-muted leading-relaxed shadow-sm">
        <h4 className="font-bold text-text-primary mb-1">{dict.audit.noticeCyberSafetyTitle}</h4>
        <p>
          {dict.audit.noticeCyberSafetyDesc}
        </p>
      </div>

      {/* 5. Navigation Controls */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-text-primary bg-surface-card border border-stone-200 hover:border-stone-300 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict.audit.backToIntake}</span>
        </button>

        <button
          onClick={onNext}
          className="h-12 px-8 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <span>{dict.audit.continueToGetHelp}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};