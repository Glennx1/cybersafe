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
import { CyberFirRegistrationModal } from "./CyberFirRegistrationModal";

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
  const [isFirModalOpen, setIsFirModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<number>(2);

  const stages = [
    {
      step: 1,
      title: "Report to 1930 Helpline",
      time: "First 15 Mins",
      status: "COMPLETED",
      desc: "An emergency ticket is registered on the National Cybercrime Portal to flag your transaction UTR.",
      action: "Read Teleprompter Script"
    },
    {
      step: 2,
      title: "Freeze Recipient Bank Account",
      time: "15 Mins – 2 Hours",
      status: "ACTIVE NOW",
      desc: "An urgent notice is sent to the scammer's bank to lock the funds before they can withdraw or transfer them.",
      action: "Send Email & Download Freeze Letter"
    },
    {
      step: 3,
      title: "Register Police Cyber FIR",
      time: "Days 1 – 5",
      status: "IN PROGRESS",
      desc: "The complaint is converted into an official FIR by the Cyber Police to legally seize the held money.",
      action: "Submit Police FIR Dossier"
    },
    {
      step: 4,
      title: "Money Refunded to Your Account",
      time: "Days 7 – 15",
      status: "READY TO FILE",
      desc: "The court or bank issues an order to transfer the frozen funds safely back into your bank account.",
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
            Banking UTR: <strong className="text-slate-900 font-bold">{profile.utrNumber || "N/A"}</strong> • Bank: <strong className="text-slate-900 font-bold">{profile.victimBank}</strong>. Complete your emergency actions below to freeze funds and file an official FIR.
          </p>
        </div>
      </div>

      {/* 2. Core Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Action 1: Register Cyber Police FIR */}
        <div className="bg-white border-2 border-indigo-500/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold border border-indigo-100">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                Primary Legal Action
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Register Cyber Police FIR
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              File your formal police complaint online via NCRP (cybercrime.gov.in) or download the pre-filled signed FIR Dossier for your local Cyber Crime Police Station.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsFirModalOpen(true)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Open Cyber FIR Registration Guide</span>
          </button>
        </div>

        {/* Action 2: Bank Fraud Desk Email & Freeze Notice */}
        <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-100">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Stop Money Transfer
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Email Bank Fraud Desk
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Send Section 91 BNSS lien requisition notice directly to the nodal officers of {profile.victimBank} and beneficiary bank to freeze recipient accounts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEmailModalOpen(true)}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Email Bank Fraud Desk</span>
          </button>
        </div>
      </div>

      {/* 3. Recovery Roadmap */}
      <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900">
              How Your Money Gets Recovered (Step-by-Step)
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
            onClick={onOpenTeleScript}
            className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 text-indigo-600" />
            <span>1930 Helpline Call Script</span>
          </button>

          <button
            onClick={onSubmitDispatch}
            className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Send Online Cyber Alert</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs mt-3">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Details</span>
          </button>

          <button
            onClick={onOpenPayloadModal}
            className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1.5 py-1 px-2 font-medium"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect Raw Payload</span>
          </button>
        </div>
      </div>

      {/* 4. What Should You Do Next Checklist */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">
            What should you do next? (Recommended Next Steps)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Step 1: Stay Calm & Disconnect */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Stay Calm & Disconnect</strong>
              <p className="text-slate-600 leading-relaxed">
                Do not panic or engage further with the scammer. Never pay any secondary "unfreeze charge" or "processing fee" to recover money.
              </p>
            </div>
          </div>

          {/* Step 2: Secure Your Banking */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Secure Your Accounts & Passwords</strong>
              <p className="text-slate-600 leading-relaxed">
                Immediately change your UPI MPIN, NetBanking passwords, and email passwords. Uninstall any screen-sharing apps (e.g. AnyDesk, TeamViewer) if installed.
              </p>
            </div>
          </div>

          {/* Step 3: Visit Home Bank Branch */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Visit Your Home Bank Branch</strong>
              <p className="text-slate-600 leading-relaxed">
                Within 24–48 hours, visit your home branch manager with a copy of the <strong>Bank Lien Letter</strong> to ensure the dispute is recorded on the bank nodal switch.
              </p>
            </div>
          </div>

          {/* Step 4: Keep Acknowledgement & Visit Police Station */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold">
              4
            </div>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Save Acknowledgement & Visit Cyber Police</strong>
              <p className="text-slate-600 leading-relaxed">
                Save the SMS acknowledgement from <strong>1930 / cybercrime.gov.in</strong>. If needed, take your bank statement to the local Cyber Police Station to get a certified FIR copy.
              </p>
            </div>
          </div>
        </div>

        {/* Golden Rule Callout */}
        <div className="mt-4 p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl flex items-center justify-between gap-3 text-xs text-indigo-950">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span><strong>Remember:</strong> Genuine police officers or bank staff will never ask for your OTP, PIN, or to transfer money to another account.</span>
          </div>
        </div>
      </div>

      {/* Bank Email Dispatch Modal */}
      <BankEmailDispatchModal
        isOpen={isEmailModalOpen}
        profile={profile}
        onClose={() => setIsEmailModalOpen(false)}
      />

      {/* Cyber Police FIR Registration Modal */}
      <CyberFirRegistrationModal
        isOpen={isFirModalOpen}
        profile={profile}
        auditReport={auditReport}
        onClose={() => setIsFirModalOpen(false)}
      />
    </div>
  );
};