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
      {/* 1. Hero Emergency Action Banner */}
      <div className="bg-slate-900/90 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-2xl relative overflow-hidden mb-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-mono font-bold mb-3 border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>ACTION_CENTER // STATUTORY 1-TAP ACTION PACK</span>
          </div>

          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            TARGET RECOVERY STOLEN AMOUNT
          </div>

          <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono tracking-tight mb-2">
            ₹{profile.fraudAmount.toLocaleString("en-IN")}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-sans">
            Banking UTR: <strong className="font-mono text-emerald-400">{profile.utrNumber || "N/A"}</strong> • Victim Bank: <strong className="text-white">{profile.victimBank}</strong>. All documents below are formatted with official BNSS 2023 & RBI statutory mandates.
          </p>
        </div>
      </div>

      {/* 2. End-to-End Citizen Fund Recovery Roadmap */}
      <div className="bg-slate-900/80 text-white border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2 font-mono">
            <Scale className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Judicial Fund Recovery Lifecycle (From Loss to Account Refund)
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            SEC 503 BNSS PROTOCOL
          </span>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {stages.map((st) => (
            <div
              key={st.step}
              onClick={() => setSelectedStage(st.step)}
              className={`p-3.5 rounded-xl cursor-pointer transition-all border font-mono ${
                selectedStage === st.step
                  ? "bg-slate-950 border-rose-500 shadow-lg ring-1 ring-rose-500/40"
                  : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center">
                  0{st.step}
                </span>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase ${
                  st.status === "COMPLETED" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                  st.status === "ACTIVE NOW" ? "bg-rose-950 text-rose-400 border border-rose-800 animate-pulse" :
                  st.status === "IN PROGRESS" ? "bg-amber-950 text-amber-400 border border-amber-800" :
                  "bg-blue-950 text-blue-400 border border-blue-800"
                }`}>
                  {st.status}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 mb-1">{st.title}</div>
              <div className="text-[10px] text-slate-500">{st.time}</div>
            </div>
          ))}
        </div>

        {/* Selected Stage Detail Callout */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-wider block">
              Stage 0{selectedStage} Directive:
            </span>
            <p className="text-slate-300 leading-relaxed max-w-xl font-sans text-xs">
              {stages[selectedStage - 1].desc}
            </p>
          </div>
          <div className="shrink-0 text-slate-400 text-[10px] font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Action: <strong className="text-emerald-400">{stages[selectedStage - 1].action}</strong>
          </div>
        </div>
      </div>

      {/* 3. Official Statutory Legal Slips (PDF Generation) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Slip 1: Bank Freeze */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-rose-500/60 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold border border-rose-500/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase">SEC 91 BNSS</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">
              Bank Manager Freeze Notice
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
              Statutory notice under RBI Master Direction ordering immediate debit lien on suspect account.
            </p>
          </div>
          <button
            onClick={onDownloadBankFreeze}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD_NOTICE</span>
          </button>
        </div>

        {/* Slip 2: Police FIR */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold border border-slate-700">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase">SEC 63 BSA</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">
              Cyber Police FIR Dossier
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
              Police complaint with statement of facts, UTR table, and Sec 63 BSA SHA-256 hash manifest.
            </p>
          </div>
          <button
            onClick={onDownloadPoliceFir}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD_DOSSIER</span>
          </button>
        </div>

        {/* Slip 3: Magistrate Petition */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase">SEC 503 BNSS</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">
              Court Money Refund Petition
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
              Judicial Magistrate petition to order the bank to release frozen funds back to the victim.
            </p>
          </div>
          <button
            onClick={onDownloadMagistratePetition}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD_PETITION</span>
          </button>
        </div>
      </div>

      {/* 4. Action Command Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3 font-mono">
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