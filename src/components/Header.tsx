"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Phone, Clock, Zap, ShieldCheck, Check, ChevronRight, Radio } from "lucide-react";
import { Language, FlowType } from "@/lib/types";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  flowType: FlowType;
  currentStep: number;
  onStepClick: (step: number) => void;
  transactionTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  flowType,
  currentStep,
  onStepClick,
  transactionTime,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(7200); // 2 Hours = 7200 secs

  useEffect(() => {
    const tx = new Date(transactionTime).getTime();
    const updateTimer = () => {
      const elapsedSecs = Math.floor((Date.now() - tx) / 1000);
      const remaining = Math.max(0, 7200 - elapsedSecs);
      setSecondsRemaining(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [transactionTime]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const financialSteps = [
    { num: 1, label: "01. Intake Telemetry" },
    { num: 2, label: "02. Forensic Audit" },
    { num: 3, label: "03. Legal Action Pack" },
  ];

  const digitalArrestSteps = [
    { num: 1, label: "01. Forgery Scanner" },
    { num: 2, label: "02. Legal Proof Room" },
    { num: 3, label: "03. Action & FIR" },
  ];

  const steps = flowType === "digital_arrest" ? digitalArrestSteps : financialSteps;

  return (
    <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      {/* 1. Top Emergency Signal Bar */}
      <div className={`text-[10px] py-1 px-4 font-mono font-bold tracking-wider transition-all border-b border-black/40 ${
        flowType === "digital_arrest"
          ? "bg-amber-950/80 text-amber-300 border-amber-800/40"
          : "bg-rose-950/80 text-rose-300 border-rose-800/40"
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span>I4C NATIONAL CFCFRMS NODE // HELPLINE <strong>1930</strong> (24x7 TOLL FREE)</span>
          </div>

          <div className="flex items-center gap-2">
            {flowType === "digital_arrest" ? (
              <span className="flex items-center gap-1.5 text-amber-200">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>MHA ADVISORY: DIGITAL ARREST IS 100% UNLAWFUL</span>
              </span>
            ) : (
              <>
                <Clock className="w-3 h-3 text-rose-400" />
                <span className="hidden sm:inline">RBI GOLDEN HOUR WINDOW:</span>
                <span className="font-mono bg-black/60 px-2 py-0.5 rounded text-amber-300 font-bold border border-amber-500/30">
                  {formatTimer(secondsRemaining)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Terminal Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Government Identification */}
        <div className="flex items-center gap-3 shrink-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black font-mono text-sm shadow-md border ${
            flowType === "digital_arrest"
              ? "bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/20"
              : "bg-rose-600 text-white border-rose-400 shadow-rose-600/20"
          }`}>
            1930
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight text-white font-sans">
                CyberRakshak
              </span>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                flowType === "digital_arrest"
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                  : "bg-rose-500/10 text-rose-300 border-rose-500/30"
              }`}>
                {flowType === "digital_arrest" ? "EXTORTION_SHIELD" : "CRISIS_COPILOT"}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Ministry of Home Affairs I4C Protocol v2.4</p>
          </div>
        </div>

        {/* Right: Step Sequence Track */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <React.Fragment key={step.num}>
                <button
                  onClick={() => onStepClick(step.num)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                    isActive
                      ? flowType === "digital_arrest"
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                      : isCompleted
                      ? "text-emerald-400 hover:bg-slate-800"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-mono ${
                      isCompleted
                        ? "bg-emerald-500 text-slate-950 font-bold"
                        : isActive
                        ? flowType === "digital_arrest" ? "bg-slate-950 text-amber-400" : "bg-white text-rose-700"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : step.num}
                  </span>
                  <span className="hidden sm:inline text-[11px]">{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-700 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};