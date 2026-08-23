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
import { AuthModal } from "@/components/AuthModal";
import { SavedCasesModal } from "@/components/SavedCasesModal";
import { UserSessionRecord } from "@/lib/db";
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
    victimBank: "State Bank of India (SBI)",
    evidenceFileName: "",
    rawEvidenceText: "",
    impersonatedAgency: "Central Bureau of Investigation (CBI)",
    scammerCallerId: "",
    extortionDemandAmount: 250000
  };

  const [language, setLanguage] = useState<Language>("en");
  const [flowType, setFlowType] = useState<FlowType>("financial_fraud");
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Authenticated User State (default seed demo user)
  const [currentUser, setCurrentUser] = useState<{ id: string; phone: string; name: string } | null>({
    id: "USR-DEFAULT-001",
    phone: "9999999999",
    name: "Citizen Demo User"
  });

  const [profile, setProfile] = useState<IncidentProfile>(emptyProfile);
  const [auditReport, setAuditReport] = useState<ForensicAuditReport>(runForensicAudit(emptyProfile));
  const [syntheticPayload, setSyntheticPayload] = useState<DispatchPayload | null>(null);

  // Modals
  const [showTeleScript, setShowTeleScript] = useState<boolean>(false);
  const [showPayloadModal, setShowPayloadModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showSavedCasesModal, setShowSavedCasesModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Re-calculate audit report & Auto-save to Local Database
  useEffect(() => {
    const report = runForensicAudit(profile);
    const payload = generateDispatchPayload(profile, report);
    setAuditReport(report);
    setSyntheticPayload(payload);

    // Auto-save session if user is logged in
    if (currentUser?.id && profile.id) {
      fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: profile.id,
          userId: currentUser.id,
          flowType,
          profile,
          auditReport: report,
          payload,
          isSubmitted
        })
      }).catch((e) => console.error("Session auto-save failed", e));
    }
  }, [profile, flowType, isSubmitted, currentUser]);

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

        // Update database with submitted status
        if (currentUser?.id && profile.id) {
          fetch("/api/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: profile.id,
              userId: currentUser.id,
              flowType,
              profile,
              auditReport,
              payload: syntheticPayload,
              isSubmitted: true
            })
          }).catch(console.error);
        }

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
    setProfile({
      ...emptyProfile,
      id: `INC-${Date.now()}`
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResumeSession = (savedSession: UserSessionRecord) => {
    setProfile(savedSession.profile);
    setFlowType(savedSession.flowType);
    if (savedSession.auditReport) {
      setAuditReport(savedSession.auditReport);
    }
    if (savedSession.payload) {
      setSyntheticPayload(savedSession.payload);
    }
    setIsSubmitted(savedSession.isSubmitted);
    setCurrentStep(savedSession.isSubmitted ? 3 : 2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 font-sans">
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
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenSavedCases={() => setShowSavedCasesModal(true)}
        onLogout={() => setCurrentUser(null)}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1">
        {/* HERO OPTION BANNERS (Only shown on Step 1: Tell us what happened) */}
        {!isSubmitted && currentStep === 1 && (
          <div className="pt-8 pb-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tell us what happened
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Choose the option that best matches your situation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {/* Option 1: Financial Cyber Fraud */}
              <div
                onClick={() => {
                  setFlowType("financial_fraud");
                  setCurrentStep(1);
                }}
                className={`p-6 rounded-2xl cursor-pointer transition-all border relative flex flex-col justify-between ${
                  flowType === "financial_fraud"
                    ? "bg-white border-indigo-600 shadow-lg ring-2 ring-indigo-500/20"
                    : "bg-white/80 border-slate-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                {flowType === "financial_fraud" && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Selected
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
                      flowType === "financial_fraud"
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}>
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">
                        Money was sent or deducted without my permission
                      </h3>
                      <span className="text-xs text-rose-600 font-semibold block">
                        Payment, UPI, card, or bank-transfer fraud
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Add the payment details you have, then use the next steps to contact your bank and the cybercrime helpline.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Screenshot Helper</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Bank Lien Request</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Magistrate Petition</span>
                </div>
              </div>

              {/* Option 2: Digital Arrest & Extortion Shield */}
              <div
                onClick={() => {
                  setFlowType("digital_arrest");
                  setCurrentStep(1);
                }}
                className={`p-6 rounded-2xl cursor-pointer transition-all border relative flex flex-col justify-between ${
                  flowType === "digital_arrest"
                    ? "bg-white border-amber-500 shadow-lg ring-2 ring-amber-500/20"
                    : "bg-white/80 border-slate-200 hover:border-amber-300 hover:shadow-md"
                }`}
              >
                {flowType === "digital_arrest" && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Selected
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
                      flowType === "digital_arrest"
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}>
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">
                        Suspicious calls, messages, or fake documents
                      </h3>
                      <span className="text-xs text-amber-700 font-semibold block">
                        Fake law-enforcement calls, blackmail, or digital arrest threats
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Save the caller details and messages. We'll guide you through the safest reporting steps.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Document Check</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Complaint Draft</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">SIM Block Guidance</span>
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

      {/* Account Login Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Saved Cases History Modal */}
      {currentUser && (
        <SavedCasesModal
          isOpen={showSavedCasesModal}
          userId={currentUser.id}
          onClose={() => setShowSavedCasesModal(false)}
          onSelectSession={handleResumeSession}
        />
      )}
    </main>
  );
}