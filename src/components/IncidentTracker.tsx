"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Loader2, RefreshCw, Shield, ArrowRight, Building, Lock, FileText, Check } from "lucide-react";
import { DispatchPayload, IncidentProfile } from "@/lib/types";

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
      <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                Live Status Tracker
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Incident Status & Account Freeze Progress
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Case ID: <strong className="font-mono text-slate-800">{profile.id}</strong> • Transaction UTR: <strong className="font-mono text-slate-800">{profile.utrNumber || "N/A"}</strong>
            </p>
          </div>

          <div className="bg-slate-50 p-3 sm:px-4 sm:py-2.5 rounded-2xl border border-slate-200 text-left sm:text-right shrink-0">
            <div className="text-[11px] text-slate-500 font-medium">Disputed Amount</div>
            <div className="text-2xl font-extrabold text-slate-900">
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
                    ? "bg-slate-50/80 border-emerald-200 text-slate-900"
                    : isCurrent
                    ? "bg-indigo-50/60 border-indigo-400 text-slate-900 ring-2 ring-indigo-500/10"
                    : "bg-slate-50/40 border-slate-200 text-slate-400"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
                      {stage.num}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-bold text-sm ${isDone ? "text-slate-900" : isCurrent ? "text-indigo-950" : "text-slate-500"}`}>
                      {stage.title}
                    </h3>
                    {isDone ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        Completed
                      </span>
                    ) : isCurrent ? (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 shrink-0">
                        In Progress...
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 shrink-0">
                        Queued
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono font-medium text-slate-600 mt-1">
                    {stage.desc}
                  </div>

                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info & Reset button */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Need immediate police assistance? You can also dial helpline <strong className="text-emerald-700 font-bold">1930</strong> toll-free anytime.
          </div>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Report Another Incident</span>
          </button>
        </div>
      </div>
    </div>
  );
};
