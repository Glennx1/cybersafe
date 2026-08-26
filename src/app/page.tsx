"use client";

import React, { useState, useEffect } from "react";
import { SkipToContent } from "@/components/SkipToContent";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { SignLanguageSlot } from "@/components/SignLanguageSlot";
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
import { LiveCaptureOverlay } from "@/components/LiveCaptureOverlay";
import { getUnmergedCovertSessions, clearCovertSession, CovertSession } from "@/lib/covertStore";
import { UserSessionRecord } from "@/lib/db";
import {
  Language,
  FlowType,
  IncidentProfile,
  ForensicAuditReport,
  DispatchPayload
} from "@/lib/types";
import { runForensicAudit, generateDispatchPayload } from "@/lib/forensicEngine";
import { getDictionary } from "@/lib/i18n";
import { generateBankFreezePdf, generatePoliceFirPdf, generateMagistratePetitionPdf, generateDigitalArrestFirPdf } from "@/lib/pdfGenerator";
import { Shield, Sparkles, Code2, X, Zap, ShieldAlert, CheckCircle2, ArrowRight, Radio, EyeOff, FileText, Mic, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const emptyProfile: IncidentProfile = {
    id: `INC-${Date.now()}`,
    victimName: "Aditya Sharma",
    victimPhone: "9876543210",
    victimAccountMasked: "XXXX-XXXX-8821",
    victimAccountNo: "918273645501",
    victimBank: "State Bank of India (SBI)",
    victimBankIfsc: "SBIN0001234",
    fraudAmount: 85500,
    transactionTime: new Date(Date.now() - 15 * 60000).toISOString(),
    utrNumber: "312345678901",
    scamCategory: "UPI_PHISHING",
    suspectVpa: "ramesh.traders@okaxis",
    suspectAccountNo: "987654321098",
    suspectBankIfsc: "PYTM0123456",
    cityState: "Mumbai, Maharashtra",
    evidenceFileName: "",
    evidenceHash: "",
    rawEvidenceText: "",
    impersonatedAgency: "Central Bureau of Investigation (CBI)",
    scammerCallerId: "",
    extortionDemandAmount: 250000
  };

  const [language, setLanguage] = useState<Language>("en");
  const [audioFirstMode, setAudioFirstMode] = useState<boolean>(false);
  const [showSignLanguage, setShowSignLanguage] = useState<boolean>(false);
  const dict = getDictionary(language);
  const [flowType, setFlowType] = useState<FlowType>("digital_arrest");
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Authenticated User State (starts as null)
  const [currentUser, setCurrentUser] = useState<{ id: string; phone: string; name: string } | null>(null);

  // Live Emergency Audio & Quick Note Capture Overlay control
  const [showLiveCaptureOverlay, setShowLiveCaptureOverlay] = useState(false);

  // Unmerged Covert Notes detected on login
  const [pendingCovertSessions, setPendingCovertSessions] = useState<CovertSession[]>([]);
  const [showCovertMergeModal, setShowCovertMergeModal] = useState(false);
  const [selectedMergeFlow, setSelectedMergeFlow] = useState<FlowType>("digital_arrest");

  const [profile, setProfile] = useState<IncidentProfile>(emptyProfile);
  const [auditReport, setAuditReport] = useState<ForensicAuditReport>(runForensicAudit(emptyProfile));
  const [syntheticPayload, setSyntheticPayload] = useState<DispatchPayload | null>(null);

  // Modals
  const [showTeleScript, setShowTeleScript] = useState<boolean>(false);
  const [showPayloadModal, setShowPayloadModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showSavedCasesModal, setShowSavedCasesModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Quick Sign In form states for unauthenticated landing screen
  const [loginPhone, setLoginPhone] = useState("9999999999");
  const [loginPassword, setLoginPassword] = useState("password123");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Check for unsynced covert sessions on user login
  useEffect(() => {
    if (currentUser) {
      getUnmergedCovertSessions().then((sessions) => {
        if (sessions && sessions.length > 0) {
          setPendingCovertSessions(sessions);
          setShowCovertMergeModal(true);
        }
      });
    }
  }, [currentUser]);

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: loginPhone,
          password: loginPassword,
          isRegister: false
        })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        setProfile(prev => ({
          ...prev,
          victimPhone: data.user.phone,
          victimName: data.user.name || prev.victimName
        }));
      } else {
        setLoginError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setLoginError("Failed to connect to authentication server.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAcceptCovertMerge = async () => {
    if (pendingCovertSessions.length === 0) return;
    const sessionToMerge = pendingCovertSessions[0];

    const notesSummary = sessionToMerge.notes
      .map((n, i) => `[Note ${i + 1} @ ${new Date(n.deviceTimestamp).toLocaleTimeString()}]: ${n.text}`)
      .join("\n");

    const audioNotice = sessionToMerge.audioBlob
      ? `\n[Live Emergency Audio Recording Attached: ${sessionToMerge.audioDurationSeconds || 0}s duration]`
      : "";

    const fullEvidenceText = `${notesSummary}${audioNotice}`.trim();
    const syncedAt = new Date().toISOString();

    setFlowType(selectedMergeFlow);
    setProfile(prev => ({
      ...prev,
      rawEvidenceText: fullEvidenceText,
      evidenceFileName: sessionToMerge.audioBlob ? `Live_Scam_Recording_${sessionToMerge.id}.webm` : prev.evidenceFileName,
      covertSessionId: sessionToMerge.id,
      covertNotes: sessionToMerge.notes,
      covertSyncedAt: syncedAt,
      scamCategory: selectedMergeFlow === "digital_arrest" ? "DIGITAL_ARREST" : "UPI_PHISHING"
    }));

    // Clear IndexedDB session
    await clearCovertSession(sessionToMerge.id);
    setShowCovertMergeModal(false);
    setPendingCovertSessions([]);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDismissCovertMerge = async () => {
    if (pendingCovertSessions.length > 0) {
      await clearCovertSession(pendingCovertSessions[0].id);
    }
    setShowCovertMergeModal(false);
    setPendingCovertSessions([]);
  };

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

        const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
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
    <>
      <SkipToContent />
      <main className="min-h-screen flex flex-col justify-between bg-surface-page text-text-primary font-sans">
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

        <div id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1">
          {/* === CASE A: NOT LOGGED IN -> REQUIRE SIGN IN FIRST === */}
          {!currentUser ? (
            <div className="py-12 flex flex-col items-center justify-center animate-in fade-in">
              <div className="bg-surface-card border border-stone-200/80 rounded-3xl shadow-xl max-w-lg w-full p-8 sm:p-10 relative">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-brand-primary border border-indigo-100 flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <Shield className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
                    Sign in to CyberRakshak 1930
                  </h1>
                  <p className="text-xs sm:text-sm text-text-muted mt-1">
                    Access your secure dashboard to file cyber incidents, generate freeze notices, and manage cases.
                  </p>
                </div>

                {/* Demo Credentials Box */}
                <div className="bg-surface-section border border-stone-200/80 rounded-2xl p-4 mb-6 text-xs text-text-muted">
                  <div className="flex items-center justify-between font-bold text-text-primary mb-2">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-success" aria-hidden="true" />
                      Demo Credentials Ready
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginPhone("9999999999");
                        setLoginPassword("password123");
                        setLoginError(null);
                      }}
                      className="text-xs text-brand-primary hover:text-indigo-800 font-bold underline"
                    >
                      Auto-Fill
                    </button>
                  </div>
                  <div className="text-xs text-text-muted grid grid-cols-2 gap-2 bg-surface-card p-2.5 rounded-xl border border-stone-200/60">
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase">Phone</span>
                      <strong className="text-text-primary font-mono">9999999999</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block uppercase">Password</span>
                      <strong className="text-text-primary font-mono">password123</strong>
                    </div>
                  </div>
                </div>

              {loginError && (
                <div role="alert" className="mb-4 p-3 bg-red-50 border border-brand-urgent/40 text-brand-urgent rounded-xl text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleInitialLogin} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="login-phone" className="block text-text-primary font-bold mb-1.5">Mobile Phone Number</label>
                  <input
                    id="login-phone"
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full px-3.5 py-3 bg-surface-card border border-stone-200 rounded-xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-brand-primary text-text-primary"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-text-primary font-bold mb-1.5">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-3.5 py-3 bg-surface-card border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-primary text-text-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50 mt-2"
                >
                  <span>{loginLoading ? "Authenticating..." : "Sign In & Begin Case"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-stone-100 text-center text-xs text-text-muted">
                Need a new account?{" "}
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="text-brand-primary font-bold hover:underline"
                >
                  Register Here
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* === CASE B: LOGGED IN -> SHOW MAIN WORKFLOW === */
          <>
            {/* HERO OPTION BANNERS (Only shown on Step 1: Tell us what happened) */}
            {!isSubmitted && currentStep === 1 && (
              <div className="pt-8 pb-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                    {dict.common.flowSelectTitle}
                  </h1>
                  <p className="text-text-muted text-sm mt-1">
                    {dict.common.flowSelectSubtitle}
                  </p>
                </div>

                {/* ISL Video Explainer Slot (Roadmap Preview) */}
                {showSignLanguage && (
                  <SignLanguageSlot
                    slotTitle="Citizen Emergency Response Overview"
                    className="max-w-4xl mx-auto"
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                  {/* Option 1: Financial Cyber Fraud */}
                  <div
                    onClick={() => {
                      setFlowType("financial_fraud");
                      setCurrentStep(1);
                    }}
                    className={`p-6 rounded-2xl cursor-pointer transition-all relative flex flex-col justify-between ${
                      flowType === "financial_fraud"
                        ? "bg-surface-card border border-brand-primary shadow-md ring-2 ring-brand-primary/20"
                        : "bg-surface-card border border-stone-200/80 hover:border-indigo-300 hover:shadow-md"
                    }`}
                  >
                    {flowType === "financial_fraud" && (
                      <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        {dict.common.selected}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
                          flowType === "financial_fraud"
                            ? "bg-indigo-50 text-brand-primary border border-indigo-100"
                            : "bg-stone-100 text-stone-500 border border-stone-200"
                        }`}>
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-text-primary">
                            {dict.common.financialCardTitle}
                          </h3>
                          <span className="text-xs text-brand-primary font-semibold block">
                            {dict.common.financialCardSubtitle}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-text-muted leading-relaxed mb-4">
                        {dict.common.financialCardDesc}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted pt-3 border-t border-stone-100">
                      <span className="bg-stone-100 px-2.5 py-1 rounded-md">{dict.common.financialTag1}</span>
                      <span className="bg-stone-100 px-2.5 py-1 rounded-md">{dict.common.financialTag2}</span>
                      <span className="bg-stone-100 px-2.5 py-1 rounded-md">{dict.common.financialTag3}</span>
                    </div>
                  </div>

                  {/* Option 2: Digital Arrest & Extortion Shield */}
                  <div
                    onClick={() => {
                      setFlowType("digital_arrest");
                      setCurrentStep(1);
                    }}
                    className={`p-6 rounded-2xl cursor-pointer transition-all relative flex flex-col justify-between ${
                      flowType === "digital_arrest"
                        ? "bg-surface-card border border-brand-primary shadow-md ring-2 ring-brand-primary/20"
                        : "bg-surface-card border border-stone-200/80 hover:border-amber-300 hover:shadow-md"
                    }`}
                  >
                    {flowType === "digital_arrest" && (
                      <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        {dict.common.selected}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
                          flowType === "digital_arrest"
                            ? "bg-amber-50 text-brand-warning border border-amber-100"
                            : "bg-stone-100 text-stone-500 border border-stone-200"
                        }`}>
                          <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-text-primary">
                            {dict.common.digitalCardTitle}
                          </h3>
                          <span className="text-xs text-brand-warning font-semibold block">
                            {dict.common.digitalCardSubtitle}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-text-muted leading-relaxed mb-4">
                        {dict.common.digitalCardDesc}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted pt-3 border-t border-stone-100">
                      <span className="bg-stone-100 px-2.5 py-1 rounded-md">{dict.common.digitalTag1}</span>
                      <span className="bg-stone-100 px-2.5 py-1 rounded-md">{dict.common.digitalTag2}</span>
                      <span className="bg-stone-100 px-2.5 py-1 rounded-md">{dict.common.digitalTag3}</span>
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
                    audioFirstMode={audioFirstMode}
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
                    audioFirstMode={audioFirstMode}
                    showSignLanguage={showSignLanguage}
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
                    audioFirstMode={audioFirstMode}
                    showSignLanguage={showSignLanguage}
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
      </>
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
      <footer className="border-t border-indigo-950/60 bg-brand-navy py-6 mt-12 text-xs text-indigo-200/60 font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-primary" />
            <span className="text-slate-200">
              <strong>CyberRakshak 1930</strong> // Dual-Engine Citizen Cyber Command
            </span>
          </div>
          <div className="text-indigo-200/60 text-center sm:text-right text-[11px]">
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
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setShowPayloadModal(false)}
        >
          <div
            className="bg-indigo-950 text-slate-100 border border-indigo-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[85vh] flex flex-col font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-indigo-800 mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-brand-primary" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  I4C Standard Dispatch Schema (JSON-LD)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPayloadModal(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-brand-navy p-4 rounded-xl border border-indigo-900 text-xs text-indigo-200 leading-relaxed">
              <pre>{JSON.stringify(syntheticPayload, null, 2)}</pre>
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-800 flex justify-between items-center text-[11px] text-indigo-300">
              <span>Standard 1930 / CFCFRMS Sandbox Payload</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(syntheticPayload, null, 2));
                  alert("Payload copied to clipboard!");
                }}
                className="px-3 py-1.5 bg-brand-primary hover:bg-indigo-600 text-white rounded-lg font-bold"
              >
                Copy JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Covert Session Post-Crisis Merge Modal */}
      {showCovertMergeModal && pendingCovertSessions.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="covert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowCovertMergeModal(false)}
        >
          <div
            className="bg-surface-card text-text-primary border border-stone-200 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 max-h-[85vh] flex flex-col font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-brand-primary flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 id="covert-modal-title" className="text-base font-bold text-text-primary">
                  Unsaved Covert Notes Found
                </h3>
                <p className="text-xs text-text-muted">
                  Notes captured on this device on {new Date(pendingCovertSessions[0].startedAt).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-text-muted mb-6">
              <p className="leading-relaxed">
                We found <strong>{pendingCovertSessions[0].notes.length} note(s)</strong> captured during a covert session on this device. Would you like to start a case from them?
              </p>

              {/* Notes Preview Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 max-h-40 overflow-y-auto space-y-2 font-mono text-[11px]">
                {pendingCovertSessions[0].notes.map((note, idx) => (
                  <div key={note.id} className="pb-1.5 border-b border-stone-200/60 last:border-none last:pb-0">
                    <div className="text-[10px] text-text-muted font-sans">
                      Note #{idx + 1} • {new Date(note.deviceTimestamp).toLocaleTimeString()} (Device Timestamp)
                    </div>
                    <div className="text-text-primary font-bold mt-0.5">{note.text}</div>
                  </div>
                ))}
              </div>

              {/* Flow Selector */}
              <div>
                <label className="font-bold text-text-primary block mb-1.5">
                  Select Incident Flow to Open:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMergeFlow("digital_arrest")}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedMergeFlow === "digital_arrest"
                        ? "bg-indigo-50/80 border-brand-primary text-brand-primary shadow-xs ring-2 ring-brand-primary/20"
                        : "bg-stone-50 border-stone-200 text-text-muted hover:border-stone-300"
                    }`}
                  >
                    <span className="block font-bold">Digital Arrest</span>
                    <span className="text-[10px] text-text-muted font-normal">Fake video calls & extortion</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMergeFlow("financial_fraud")}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedMergeFlow === "financial_fraud"
                        ? "bg-indigo-50/80 border-brand-primary text-brand-primary shadow-xs ring-2 ring-brand-primary/20"
                        : "bg-stone-50 border-stone-200 text-text-muted hover:border-stone-300"
                    }`}
                  >
                    <span className="block font-bold">Financial Cyber Theft</span>
                    <span className="text-[10px] text-text-muted font-normal">UPI, bank, card fraud</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleDismissCovertMerge}
                className="px-4 py-2 text-xs font-bold text-text-muted hover:text-text-primary"
              >
                Discard Notes
              </button>
              <button
                type="button"
                onClick={handleAcceptCovertMerge}
                className="px-5 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Import & Start Case</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setShowAuthModal(false);
        }}
      />

      {/* Saved Cases / FIR Dossier Modal */}
      {currentUser && (
        <SavedCasesModal
          isOpen={showSavedCasesModal}
          userId={currentUser.id}
          onClose={() => setShowSavedCasesModal(false)}
          onSelectSession={handleResumeSession}
        />
      )}

      {/* Floating Action: 'Being scammed right now? Record live.' */}
      {!showLiveCaptureOverlay && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 animate-in fade-in">
          {/* Unobtrusive Calm Pill Label */}
          {!currentUser && (
            <button
              type="button"
              onClick={() => setShowLiveCaptureOverlay(true)}
              className="bg-surface-card/95 hover:bg-surface-card text-text-primary border border-stone-200/90 shadow-sm px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 backdrop-blur-xs group"
            >
              <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
              <span>Being scammed right now? <strong className="text-brand-primary group-hover:underline">Record live</strong></span>
            </button>
          )}

          {/* Floating Live Capture Trigger Button (Unified with brand-navy pill family) */}
          <button
            type="button"
            onClick={() => setShowLiveCaptureOverlay(true)}
            className="h-11 px-4 rounded-full bg-brand-navy hover:bg-indigo-950 text-white shadow-lg border border-indigo-900/60 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-xs group"
            title="Start live emergency recording & quick evidence capture"
            aria-label="Record live scam call"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-300/60 shrink-0" />
            <Mic className="w-4 h-4 text-indigo-200 group-hover:text-white" />
            <span className="text-xs font-bold font-sans">Record Live</span>
          </button>
        </div>
      )}

      {/* Direct-to-Capture Live Recording & Note Vault Modal Overlay */}
      <LiveCaptureOverlay
        isOpen={showLiveCaptureOverlay}
        language={language}
        onClose={() => setShowLiveCaptureOverlay(false)}
        onNavigateToLogin={() => {
          setShowLiveCaptureOverlay(false);
          setShowAuthModal(true);
        }}
      />

      {/* Persistent Accessibility & Language Opt-In Panel */}
      <AccessibilityPanel
        currentLanguage={language}
        onLanguageChange={setLanguage}
        onAudioFirstModeChange={setAudioFirstMode}
        onShowSignLanguageChange={setShowSignLanguage}
      />
    </main>
    </>
  );
}