import React from "react";
import { Phone, Check, ChevronRight, Shield } from "lucide-react";
import { Language, FlowType } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";

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
  language,
  flowType,
  currentStep,
  onStepClick,
  currentUser,
  onOpenAuth,
  onOpenSavedCases,
  onLogout,
}) => {
  const dict = getDictionary(language);

  const financialSteps = [
    { num: 1, label: dict.navigation.financialStep1 },
    { num: 2, label: dict.navigation.financialStep2 },
    { num: 3, label: dict.navigation.financialStep3 },
  ];

  const digitalArrestSteps = [
    { num: 1, label: dict.navigation.digitalArrestStep1 },
    { num: 2, label: dict.navigation.digitalArrestStep2 },
    { num: 3, label: dict.navigation.digitalArrestStep3 },
  ];

  const steps = flowType === "digital_arrest" ? digitalArrestSteps : financialSteps;

  return (
    <header className="sticky top-0 z-40 bg-brand-navy text-white border-b border-indigo-950/60 shadow-lg shadow-indigo-950/20">
      {/* 1. Top Gentle Emergency Banner */}
      <div className="bg-indigo-950/60 text-slate-300 text-xs py-2 px-4 border-b border-indigo-900/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-secondary shrink-0" />
            <span className="text-slate-300">Reporting quickly can improve the chance of stopping the transfer.</span>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={onOpenSavedCases}
                  className="px-2.5 py-1 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 rounded-full font-bold transition-all border border-indigo-800/60 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>{dict.common.myCases}</span>
                </button>
                <span className="text-slate-400 hidden md:inline font-mono">
                  {currentUser.phone}
                </span>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-slate-200 underline text-[11px]"
                >
                  {dict.common.signOut}
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1 bg-indigo-900/60 hover:bg-indigo-800 text-slate-200 rounded-full text-xs font-bold transition-all border border-indigo-800/60"
              >
                {dict.common.signIn}
              </button>
            )}

            {/* Prominent Always Visible Call 1930 Emergency Button (Warm Indigo / Primary CTA) */}
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary hover:bg-indigo-500 text-white rounded-full font-bold text-xs transition-all shadow-sm shrink-0"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{dict.common.call1930}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                {dict.common.appName}
              </span>
            </div>
            <p className="text-xs text-indigo-200/70">{dict.common.tagline}</p>
          </div>
        </div>

        {/* Right: Clean Step Sequence Track */}
        <nav aria-label="Incident Reporting Steps" className="flex items-center bg-indigo-950/80 p-1 rounded-xl border border-indigo-900/60 text-xs">
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
                      ? "bg-brand-primary text-white shadow-sm"
                      : isCompleted
                      ? "text-emerald-300 hover:bg-indigo-900/50"
                      : "text-indigo-200/70 hover:text-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCompleted
                        ? "bg-brand-secondary text-brand-navy"
                        : isActive
                        ? "bg-white text-brand-primary"
                        : "bg-indigo-900 text-indigo-300"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : step.num}
                  </span>
                  <span className="hidden sm:inline text-xs">{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight aria-hidden="true" className="w-3.5 h-3.5 text-indigo-400/50 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};