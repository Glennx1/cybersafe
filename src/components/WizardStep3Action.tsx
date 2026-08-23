"use client";

import React, { useState } from "react";
import {
  Download,
  Phone,
  Send,
  Code2,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  FileCheck,
  Mail,
  Clock,
  Building,
  Scale,
  ChevronRight,
  AlertCircle,
  FileText
} from "lucide-react";
import { IncidentProfile, ForensicAuditReport, DispatchPayload, Language } from "@/lib/types";
import { BankEmailDispatchModal } from "./BankEmailDispatchModal";

interface WizardStep3ActionProps {
  profile: IncidentProfile;
  auditReport: ForensicAuditReport;
  payload: DispatchPayload | null;
  language: Language;
  onDownloadBankFreeze: () => void;
  onDownloadPoliceFir: () => void;
  onDownloadMagistratePetition: () => void;
  onOpenTeleScript: () => void;
  onSubmitDispatch: () => void;
  onOpenPayloadModal: () => void;
  onBack: () => void;
}

export const WizardStep3Action: React.FC<WizardStep3ActionProps> = ({
  profile,
  auditReport,
  payload,
  language,
  onDownloadBankFreeze,
  onDownloadPoliceFir,
  onDownloadMagistratePetition,
  onOpenTeleScript,
  onSubmitDispatch,
  onOpenPayloadModal,
  onBack,
}) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<number>(2);

  const stages = [
    {
      step: 1,
      title: "1930 / I4C Portal Ticket",
      time: "0–15 Mins",
      status: "COMPLETED",
      desc: "Emergency ticket registered with Central CFCFRMS switch. UTR and victim accounts flagged.",
      action: "Read Teleprompter Script"
    },
    {
      step: 2,
      title: "Sec 91 Bank Lien Freeze",
      time: "15 Mins – 2 Hours",
      status: "ACTIVE NOW",
      desc: "Notice served to suspect receiving bank nodal desk to freeze beneficiary account before cashout.",
      action: "Send Email & Download Freeze Letter"
    },
    {
      step: 3,
      title: "Police Station FIR & NOC",
      time: "Days 1 – 5",
      status: "IN PROGRESS",
      desc: "Police convert NCRP ticket into formal FIR under Sec 318(4) BNS and issue fund seizure certificate.",
      action: "Submit Police FIR Dossier"
    },
    {
      step: 4,
      title: "Sec 503 BNSS Court Refund",
      time: "Days 7 – 15",
      status: "READY TO FILE",
      desc: "Magistrate issues order directing bank to reverse frozen suspense funds directly to victim.",
      action: "File Magistrate Court Petition"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Hero Action Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
        <div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Target Fraud Amount To Recover
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            ₹{profile.fraudAmount.toLocaleString("en-IN")}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            Banking UTR: <strong className="text-slate-900 font-bold">{profile.utrNumber || "N/A"}</strong> • Bank: <strong className="text-slate-900 font-bold">{profile.victimBank}</strong>. Download your official documents below or submit a digital dispatch directly to helpline 1930.
          </p>
        </div>
      </div>

      {/* 2. Recovery Roadmap */}
      <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900">
              Recovery Steps (From Loss to Account Refund)
            </h3>
          </div>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {stages.map((st) => (
            <div
              key={st.step}
              onClick={() => setSelectedStage(st.step)}
              className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                selectedStage === st.step
                  ? "bg-indigo-50/60 border-indigo-500 shadow-xs"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-indigo-600">
                  Step {st.step}
                </span>
                <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  {st.time}
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 leading-snug mb-1">
                {st.title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL_BANK_FRAUD_DESK</span>
          </button>

          <button
            onClick={onOpenTeleScript}
            className="flex-1 h-12 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>1930_SPEECH_TELEPROMPTER</span>
          </button>

          <button
            onClick={onSubmitDispatch}
            className="flex-1 h-12 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>DISPATCH_I4C_NOTICE</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK_TO_AUDIT</span>
          </button>

          <button
            onClick={onOpenPayloadModal}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1.5 py-1 px-2 font-mono"
          >
            <Code2 className="w-3.5 h-3.5 text-rose-400" />
            <span>INSPECT_I4C_SCHEMA</span>
          </button>
        </div>
      </div>

      {/* Bank Email Dispatch Modal */}
      <BankEmailDispatchModal
        isOpen={isEmailModalOpen}
        profile={profile}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
};