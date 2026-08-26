"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Loader2, RefreshCw, Shield, ArrowRight, Building, Lock, FileText, Check } from "lucide-react";
import { DispatchPayload, IncidentProfile } from "@/lib/types";
import { CaseLedgerBadge } from "./CaseLedgerBadge";

interface IncidentTrackerProps {
  payload: DispatchPayload | null;
  profile: IncidentProfile;
  onReset: () => void;
}

export const IncidentTracker: React.FC<IncidentTrackerProps> = ({
  payload,
  profile,
  onReset,
}) => {
  const [activeStage, setActiveStage] = useState(1);

  // Sequentially advance through the 4 live tracking stages
  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStage(2), 1800);
    const timer2 = setTimeout(() => setActiveStage(3), 3800);
    const timer3 = setTimeout(() => setActiveStage(4), 5800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const stages = [
    {
      num: 1,
      title: "1. Incident Recorded on National Portal",
      desc: `Acknowledgement Token: ${payload?.ackToken || 'I4C-NCRP-2026-9081A'}`,
      detail: "Your complaint details and 12-digit UTR have been sent to the National Cybercrime Portal (1930) to create your official case record."
    },
    {
      num: 2,
      title: "2. Alert Sent to Banks",
      desc: `Your Bank: ${profile.victimBank} • Suspect Bank: ${profile.suspectBankIfsc || 'Beneficiary Node'}`,
      detail: "An urgent notification is sent to both your bank and the recipient bank to trace where the money was routed."
    },
    {
      num: 3,
      title: "3. Requesting Account Freeze",
      desc: `Lien Tracking Ref: ${payload?.bankFreezeLienReference || 'LIEN-NOTICE-BANK-8819'}`,
      detail: "A legal request under Section 91 BNSS is submitted to the recipient bank to lock the funds so the scammer cannot withdraw or transfer them."
    },
    {
      num: 4,
      title: "4. Police Complaint & Investigation Record",
      desc: `Helpline Case Ref: ${payload?.helplineReference || '1930-TICKET-88194'}`,
      detail: "Your incident is queued with the Cyber Police Cell. Keep this reference number for all future communications and bank refund follow-ups."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-300">
      <div className="bg-surface-card text-text-primary rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-5 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse" />
              <span className="text-xs text-brand-success font-bold uppercase tracking-wider">
                Live Status Tracker
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">
              Incident Status & Account Freeze Progress
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <p className="text-xs text-text-muted">
                Case ID: <strong className="font-mono text-text-primary">{profile.id}</strong> • Transaction UTR: <strong className="font-mono text-text-primary">{profile.utrNumber || "N/A"}</strong>
              </p>
              <CaseLedgerBadge caseId={profile.id} />
            </div>
          </div>

          <div className="bg-surface-section p-3 sm:px-4 sm:py-2.5 rounded-2xl border border-stone-200/60 text-left sm:text-right shrink-0">
            <div className="text-[11px] text-text-muted font-medium">Disputed Amount</div>
            <div className="text-2xl font-extrabold text-text-primary">
              ₹{profile.fraudAmount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* 4 Stage Timeline */}
        <div className="space-y-4">
          {stages.map((stage) => {
            const isDone = activeStage > stage.num || (activeStage === 4 && stage.num <= 4);
            const isCurrent = activeStage === stage.num && activeStage < 4;

            return (
              <div
                key={stage.num}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isDone
                    ? "bg-surface-section border-emerald-200 text-text-primary"
                    : isCurrent
                    ? "bg-indigo-50/60 border-brand-primary text-text-primary ring-2 ring-brand-primary/10"
                    : "bg-surface-section/40 border-stone-200/60 text-text-muted"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-7 h-7 rounded-full bg-indigo-50 text-brand-primary flex items-center justify-center font-bold">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-surface-card border border-stone-200 text-text-muted flex items-center justify-center font-bold text-xs">
                      {stage.num}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-bold text-sm ${isDone ? "text-text-primary" : isCurrent ? "text-text-primary" : "text-text-muted"}`}>
                      {stage.title}
                    </h3>
                    {isDone ? (
                      <span className="text-[10px] font-bold text-brand-success bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        Completed
                      </span>
                    ) : isCurrent ? (
                      <span className="text-[10px] font-bold text-brand-primary bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 shrink-0">
                        In Progress...
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-text-muted shrink-0">
                        Queued
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono font-medium text-text-muted mt-1">
                    {stage.desc}
                  </div>

                  <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* What To Do Next (Real-World Cyber Crime Action Checklist) */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-brand-primary" />
            <h3 className="text-sm font-bold text-text-primary">
              What should you do next? (Recommended Next Steps)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Step 1: Stay Calm & Do Not Panic */}
            <div className="p-4 rounded-2xl bg-surface-section border border-stone-200/60 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-emerald-50 text-brand-success flex items-center justify-center shrink-0 font-bold">
                1
              </div>
              <div>
                <strong className="text-text-primary font-bold block mb-0.5">Stay Calm & Disconnect</strong>
                <p className="text-text-muted leading-relaxed">
                  You have already flagged the transaction. Do not engage further with the scammer, answer suspicious follow-up calls, or pay any "processing fee" to unlock money.
                </p>
              </div>
            </div>

            {/* Step 2: Secure Your Banking & Apps */}
            <div className="p-4 rounded-2xl bg-surface-section border border-stone-200/60 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-amber-50 text-brand-warning flex items-center justify-center shrink-0 font-bold">
                2
              </div>
              <div>
                <strong className="text-text-primary font-bold block mb-0.5">Secure Your Accounts & Passwords</strong>
                <p className="text-text-muted leading-relaxed">
                  Immediately change your UPI MPIN, NetBanking passwords, and email passwords. If any remote-access app (e.g. AnyDesk, TeamViewer) was installed, uninstall it immediately.
                </p>
              </div>
            </div>

            {/* Step 3: Visit Home Bank Branch */}
            <div className="p-4 rounded-2xl bg-surface-section border border-stone-200/60 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center shrink-0 font-bold">
                3
              </div>
              <div>
                <strong className="text-text-primary font-bold block mb-0.5">Visit Your Home Bank Branch</strong>
                <p className="text-text-muted leading-relaxed">
                  Within 24–48 hours, visit your home branch manager. Submit the printed <strong>Bank Lien Letter</strong> and ask them to confirm if the recipient node has been marked with a lien.
                </p>
              </div>
            </div>

            {/* Step 4: Keep Police & SMS Acknowledgements */}
            <div className="p-4 rounded-2xl bg-surface-section border border-stone-200/60 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center shrink-0 font-bold">
                4
              </div>
              <div>
                <strong className="text-text-primary font-bold block mb-0.5">Save Acknowledgement & Visit Police Cell</strong>
                <p className="text-text-muted leading-relaxed">
                  Keep SMS acknowledgements received from <strong>1930 / NCRP</strong> safe. If requested, visit your local Cyber Crime Police Station with your bank statement to obtain an official FIR copy.
                </p>
              </div>
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="mt-4 p-3.5 bg-surface-section border border-stone-200/80 rounded-2xl flex items-center justify-between gap-3 text-xs text-text-primary shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
              <span><strong>Remember:</strong> Genuine police or bank officers will never call asking for your OTP, PIN, or to transfer money to another account.</span>
            </div>
          </div>
        </div>

        {/* Footer info & Reset button */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-text-muted text-center sm:text-left">
            Need immediate police assistance? You can also dial helpline <strong className="text-brand-success font-bold">1930</strong> toll-free anytime.
          </div>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Report Another Incident</span>
          </button>
        </div>
      </div>
    </div>
  );
};
