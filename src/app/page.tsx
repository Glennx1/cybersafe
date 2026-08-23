"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WizardStep1Intake } from "@/components/WizardStep1Intake";
import { WizardStep2Audit } from "@/components/WizardStep2Audit";
import { WizardStep3Action } from "@/components/WizardStep3Action";
import { DigitalArrestStep1Intake } from "@/components/DigitalArrestStep1Intake";
import { DigitalArrestStep2Audit } from "@/components/DigitalArrestStep2Audit";
import { DigitalArrestStep3Action } from "@/components/DigitalArrestStep3Action";
import { TeleScriptModal } from "@/components/TeleScriptModal";
import { IncidentTracker } from "@/components/IncidentTracker";
import { EmergencyVoiceGuide } from "@/components/EmergencyVoiceGuide";
import {
  Language,
  FlowType,
  IncidentProfile,
  ForensicAuditReport,
  DispatchPayload
} from "@/lib/types";
import { runForensicAudit, generateDispatchPayload } from "@/lib/forensicEngine";
import { generateBankFreezePdf, generatePoliceFirPdf, generateMagistratePetitionPdf, generateDigitalArrestFirPdf } from "@/lib/pdfGenerator";
import { Shield, Sparkles, Code2, X, Zap, ShieldAlert, CheckCircle2, ArrowRight, Radio } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const emptyProfile: IncidentProfile = {
    id: `INC-${Date.now()}`,
    victimName: "Citizen",
    victimPhone: "+91-9999999999",
    victimAccountMasked: "XXXX-XXXX-0000",
    scamCategory: "UPI_PHISHING",
    cityState: "New Delhi, DL",
    utrNumber: "",
    fraudAmount: 0,
    suspectVpa: "",
    suspectBankIfsc: "",
    suspectAccountNo: "",
    transactionTime: new Date().toISOString(),
    victimBank: "Unknown Bank",
    evidenceFileName: "",
    rawEvidenceText: "",
    impersonatedAgency: "Central Bureau of Investigation (CBI)",
    scammerCallerId: "",
    extortionDemandAmount: 250000
  };

  const [language, setLanguage] = useState<Language>("en");
  const [flowType, setFlowType] = useState<FlowType>("financial_fraud");
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [profile, setProfile] = useState<IncidentProfile>(emptyProfile);

  const [auditReport, setAuditReport] = useState<ForensicAuditReport>(runForensicAudit(emptyProfile));
  const [syntheticPayload, setSyntheticPayload] = useState<DispatchPayload | null>(null);

  // Modals
  const [showTeleScript, setShowTeleScript] = useState<boolean>(false);
  const [showPayloadModal, setShowPayloadModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Re-calculate audit report whenever profile changes
  useEffect(() => {
    const report = runForensicAudit(profile);
    const payload = generateDispatchPayload(profile, report);
    setAuditReport(report);
    setSyntheticPayload(payload);
  }, [profile]);

  const handleDispatchSubmission = async () => {
    try {
      const response = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syntheticPayload)
      });
      if (response.ok) {
        setShowPayloadModal(false);
        setIsSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Backend integration failed: server returned error.");
      }
    } catch (e) {
      console.error("Integration error", e);
      alert("Failed to reach backend API.");
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setProfile(emptyProfile);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#070A11] text-slate-100 font-sans tactical-grid">
      {/* Emergency Sticky Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        flowType={flowType}
        currentStep={currentStep}
        onStepClick={(step) => {
          setIsSubmitted(false);
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        transactionTime={profile.transactionTime}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1">
        {/* TACTICAL CRISIS SWITCHBOARD HERO (Only shown on Step 1: Tell us what happened) */}
        {!isSubmitted && currentStep === 1 && (
          <div className="pt-8 pb-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>SELECT ACTIVE INCIDENT VECTOR</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                SEC 91 BNSS // BSA SEC 63 COMPLIANT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {/* Option 1: Financial Cyber Fraud */}
              <div
                onClick={() => {
                  setFlowType("financial_fraud");
                  setCurrentStep(1);
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border relative overflow-hidden flex flex-col justify-between ${
                  flowType === "financial_fraud"
                    ? "bg-slate-900/90 border-rose-500/80 shadow-2xl shadow-rose-950/40 ring-1 ring-rose-500/30 border-t-2 border-t-rose-500"
                    : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 opacity-60 hover:opacity-100"
                }`}
              >
                {flowType === "financial_fraud" && (
                  <div className="absolute top-0 right-0 bg-rose-600 text-white text-[9px] font-mono font-bold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>ACTIVE_CHANNEL</span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold ${
                      flowType === "financial_fraud"
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 border border-rose-400"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white tracking-tight">
                        Financial Cyber Fraud
                      </h3>
                      <span className="text-[10px] font-mono text-rose-400 font-bold block">
                        PROTOCOL: 1930_CFCFRMS_INTERCEPT
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Unauthorized UPI debits, GPay/PhonePe phishing, or netbanking theft. Extract 12-digit UTR and trigger a <strong>Sec 91 BNSS Inter-Bank Lien Freeze</strong> before cashout.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono text-slate-400 pt-3 border-t border-slate-800">
                  <span className="bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">3-Sec OCR Intake</span>
                  <span className="bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">Sec 91 Bank Lien</span>
                  <span className="bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">Sec 503 BNSS Petition</span>
                </div>
              </div>

              {/* Option 2: Digital Arrest & Extortion Shield */}
              <div
                onClick={() => {
                  setFlowType("digital_arrest");
                  setCurrentStep(1);
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border relative overflow-hidden flex flex-col justify-between ${
                  flowType === "digital_arrest"
                    ? "bg-slate-900/90 border-amber-500/80 shadow-2xl shadow-amber-950/40 ring-1 ring-amber-500/30 border-t-2 border-t-amber-500"
                    : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 opacity-60 hover:opacity-100"
                }`}
              >
                {flowType === "digital_arrest" && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-mono font-bold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                    <span>ACTIVE_CHANNEL</span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold ${
                      flowType === "digital_arrest"
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 border border-amber-300"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}>
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white tracking-tight">
                        Digital Arrest & Extortion Shield
                      </h3>
                      <span className="text-[10px] font-mono text-amber-400 font-bold block">
                        PROTOCOL: DOT_CHAKSHU_EXTORTION_SHIELD
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Threatened by scammers impersonating CBI, ED, Police, or Customs via WhatsApp/Skype. Prove document forgery and initiate <strong>DoT Chakshu SIM bans</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono text-slate-400 pt-3 border-t border-slate-800">
                  <span className="bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">AI Forgery Radar</span>
                  <span className="bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">Legal Proof Room</span>
                  <span className="bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">DoT Chakshu SIM Ban</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If submitted, show 4-Stage Live Dispatch Tracker */}
        {isSubmitted ? (
          <IncidentTracker
            payload={syntheticPayload}
            profile={profile}
            onReset={handleReset}
          />
        ) : (
          <div>
            {/* === FLOW 1: FINANCIAL CYBER FRAUD === */}
            {flowType === "financial_fraud" && (
              <>
                {currentStep === 1 && (
                  <WizardStep1Intake
                    profile={profile}
                    language={language}
                    onProfileChange={setProfile}
                    onNext={() => {
                      setCurrentStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}

                {currentStep === 2 && (
                  <WizardStep2Audit
                    auditReport={auditReport}
                    profile={profile}
                    language={language}
                    onProfileChange={setProfile}
                    onBack={() => {
                      setCurrentStep(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onNext={() => {
                      setCurrentStep(3);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}

                {currentStep === 3 && (
                  <WizardStep3Action
                    profile={profile}
                    auditReport={auditReport}
                    payload={syntheticPayload}
                    language={language}
                    onDownloadBankFreeze={() => generateBankFreezePdf(profile, auditReport)}
                    onDownloadPoliceFir={() => generatePoliceFirPdf(profile, auditReport)}
                    onDownloadMagistratePetition={() => generateMagistratePetitionPdf(profile)}
                    onOpenTeleScript={() => setShowTeleScript(true)}
                    onSubmitDispatch={handleDispatchSubmission}
                    onOpenPayloadModal={() => setShowPayloadModal(true)}
                    onBack={() => {
                      setCurrentStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}
              </>
            )}

            {/* === FLOW 2: DIGITAL ARREST & EXTORTION SHIELD === */}
            {flowType === "digital_arrest" && (
              <>
                {currentStep === 1 && (
                  <DigitalArrestStep1Intake
                    profile={profile}
                    language={language}
                    onProfileChange={setProfile}
                    onNext={() => {
                      setCurrentStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}

                {currentStep === 2 && (
                  <DigitalArrestStep2Audit
                    profile={profile}
                    language={language}
                    onProfileChange={setProfile}
                    onBack={() => {
                      setCurrentStep(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onNext={() => {
                      setCurrentStep(3);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}

                {currentStep === 3 && (
                  <DigitalArrestStep3Action
                    profile={profile}
                    language={language}
                    onDownloadDigitalArrestFir={() => generateDigitalArrestFirPdf(profile)}
                    onBack={() => {
                      setCurrentStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Floating Vernacular Emergency Audio Guide */}
      <EmergencyVoiceGuide
        profile={profile}
        auditReport={auditReport}
        language={language}
        currentStep={currentStep}
      />

      {/* Tactical Dark Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080C14] py-6 mt-12 text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="text-slate-300">
              <strong>CyberRakshak 1930</strong> // Dual-Engine Citizen Cyber Command
            </span>
          </div>
          <div className="text-slate-500 text-center sm:text-right text-[11px]">
            DPDP Act 2023 Compliant • On-Device Cryptographic Hashing • Sec 63 BSA Certified
          </div>
        </div>
      </footer>

      {/* 1930 Helpline Tele-Script Modal */}
      <TeleScriptModal
        isOpen={showTeleScript}
        profile={profile}
        onClose={() => setShowTeleScript(false)}
      />

      {/* Raw Payload Inspector Modal */}
      {showPayloadModal && syntheticPayload && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setShowPayloadModal(false)}
        >
          <div
            className="bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[85vh] flex flex-col font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  I4C Standard Dispatch Schema (JSON-LD)
                </h3>
              </div>
              <button
                onClick={() => setShowPayloadModal(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-rose-300/90 leading-relaxed">
              <pre>{JSON.stringify(syntheticPayload, null, 2)}</pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
              <span>Standard 1930 / CFCFRMS Sandbox Payload</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(syntheticPayload, null, 2));
                  alert("Payload copied to clipboard!");
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold"
              >
                Copy JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}