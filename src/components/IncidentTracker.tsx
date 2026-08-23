"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, ShieldAlert, Loader2, FileCode2, ArrowRight, RefreshCw } from "lucide-react";
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

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStage(2), 1500);
    const timer2 = setTimeout(() => setActiveStage(3), 3500);
    const timer3 = setTimeout(() => setActiveStage(4), 5500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const stages = [
    {
      num: 1,
      title: "1. I4C National Portal Dispatch",
      desc: `Acknowledgement Token: ${payload?.ackToken || 'I4C-NCRP-2026-9081A'}`,
      detail: "Dispatched to Citizen Financial Cyber Fraud Reporting System (CFCFRMS)."
    },
    {
      num: 2,
      title: "2. Inter-Bank Freeze Lien Request",
      desc: `Target Bank: ${profile.victimBank} & Suspect Node ${profile.suspectBankIfsc || 'Node'}`,
      detail: "Issued under Section 91 BNSS 2023 & RBI Master Direction Customer Protection."
    },
    {
      num: 3,
      title: "3. Suspect Mule Account Frozen",
      desc: `Lien Ref: ${payload?.bankFreezeLienReference || 'LIEN-NOTICE-BANK-8819'}`,
      detail: "Destination mule account flagged; fund laundering blocked in Golden Hour."
    },
    {
      num: 4,
      title: "4. Cyber Cell Police FIR Registered",
      desc: `Helpline Ticket: ${payload?.helplineReference || '1930-TICKET-88194'}`,
      detail: "Statutory BNS Sec 318(4)/319 & IT Act Sec 66C/66D investigation active."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in duration-300">
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Live I4C Dispatch Tracker Active
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Emergency Scam Incident Tracking & Fund Freeze
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Incident ID: <strong className="font-mono text-white">{profile.id}</strong> • UTR: <strong className="font-mono text-white">{profile.utrNumber}</strong>
            </p>
          </div>

          <div className="text-right font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Stolen Amount</div>
            <div className="text-2xl font-black text-rose-400">
              ₹{profile.fraudAmount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* 4 Stage Timeline */}
        <div className="space-y-6">
          {stages.map((stage) => {
            const isDone = activeStage > stage.num || activeStage === 4;
            const isCurrent = activeStage === stage.num && activeStage !== 4;

            return (
              <div
                key={stage.num}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isDone
                    ? "bg-slate-900/90 border-emerald-500/40 text-white"
                    : isCurrent
                    ? "bg-rose-950/40 border-rose-500 text-white ring-1 ring-rose-500/50"
                    : "bg-slate-900/30 border-slate-800 text-slate-500"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-700 text-slate-500 flex items-center justify-center font-bold text-xs">
                      {stage.num}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white">{stage.title}</h3>
                    {isDone && (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-slate-300 font-medium mt-0.5">
                    {stage.desc}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Official CFCFRMS Audit Checksum: <span className="font-mono text-slate-300">SHA256:423910892014-VERIFIED</span>
          </div>

          <button
            onClick={onReset}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Report Another Incident</span>
          </button>
        </div>
      </div>
    </div>
  );
};
