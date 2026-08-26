"use client";

import React from "react";
import { Phone, Check, ChevronRight, Shield } from "lucide-react";
import { Language, FlowType } from "@/lib/types";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  flowType: FlowType;
  currentStep: number;
  onStepClick: (step: number) => void;
  transactionTime: string;
  currentUser?: { id: string; phone: string; name: string } | null;
  onOpenAuth: () => void;
  onOpenSavedCases: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  flowType,
  currentStep,
  onStepClick,
  currentUser,
  onOpenAuth,
  onOpenSavedCases,
  onLogout,
}) => {
  const financialSteps = [
    { num: 1, label: "1. Tell us what happened" },
    { num: 2, label: "2. Check the details" },
    { num: 3, label: "3. Get help now" },
  ];

  const digitalArrestSteps = [
    { num: 1, label: "1. Tell us what happened" },
    { num: 2, label: "2. Review proof & report" },
    { num: 3, label: "3. Take action" },
  ];

  const steps = flowType === "digital_arrest" ? digitalArrestSteps : financialSteps;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* 1. Top Gentle Emergency Banner */}
      <div className="bg-slate-950/90 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>Reporting quickly can improve the chance of stopping the transfer.</span>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={onOpenSavedCases}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-full font-bold transition-all border border-slate-700 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>My Cases</span>
                </button>
                <span className="text-slate-400 hidden md:inline font-mono">
                  {currentUser.phone}
                </span>
                <button
                  onClick={onLogout}
                  className="text-slate-500 hover:text-slate-300 underline text-[11px]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full text-xs font-bold transition-all border border-slate-700"
              >
                Sign In
              </button>
            )}

            {/* Prominent Always Visible Call 1930 Emergency Button */}
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-xs transition-all shadow-sm shrink-0"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Call 1930</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                CyberRakshak 1930
              </span>
            </div>
            <p className="text-xs text-slate-400">A guided cyber-fraud assistant</p>
          </div>
        </div>

        {/* Right: Clean Step Sequence Track */}
        <nav aria-label="Incident Reporting Steps" className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <React.Fragment key={step.num}>
                <button
                  type="button"
                  onClick={() => onStepClick(step.num)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`${step.label}${isCompleted ? " (Completed)" : isActive ? " (Current Step)" : ""}`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : isCompleted
                      ? "text-emerald-400 hover:bg-slate-700/70"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCompleted
                        ? "bg-emerald-500 text-slate-950"
                        : isActive
                        ? "bg-white text-indigo-700"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : step.num}
                  </span>
                  <span className="hidden sm:inline text-xs">{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight aria-hidden="true" className="w-3.5 h-3.5 text-slate-600 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};