"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  Copy,
  Check,
  Share2,
  Download,
  AlertCircle,
  Clock,
  Send,
  Sparkles,
  ExternalLink,
  X,
  FileCheck
} from "lucide-react";
import { IncidentProfile, ForensicAuditReport, Language } from "@/lib/types";
import { lookupBankNode } from "@/lib/bankRegistry";
import { logCaseAction } from "@/lib/actionLogger";
import { getDictionary } from "@/lib/i18n";
import {
  createBankFreezeDoc,
  generateBankFreezePdf,
  createPoliceFirDoc,
  generatePoliceFirPdf,
  createMagistratePetitionDoc,
  generateMagistratePetitionPdf,
  createSection63BsaCertificateDoc,
  generateSection63BsaCertificatePdf,
  sharePdfToWhatsApp
} from "@/lib/pdfGenerator";

interface OneTapActionPanelProps {
  profile: IncidentProfile;
  auditReport: ForensicAuditReport;
  language?: Language;
  onOpenTeleScript?: () => void;
}

export const OneTapActionPanel: React.FC<OneTapActionPanelProps> = ({
  profile,
  auditReport,
  language = "en",
  onOpenTeleScript
}) => {
  const dict = getDictionary(language);
  // Tele-script toggle state
  const [showInlineScript, setShowInlineScript] = useState(true);

  // Email dispatch modal & copy states
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedEmailBody, setCopiedEmailBody] = useState(false);

  // Document share states
  const [sharingDoc, setSharingDoc] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  const bank = lookupBankNode(profile.victimBank);
  const fraudDeskEmail = bank.cyberEmail || bank.nodalEmail || "cybercell@bank.com";

  // Pre-formatted legal email text
  const emailSubject = `URGENT: Section 91 BNSS Lien Request — Account ${profile.victimAccountMasked} — UTR ${profile.utrNumber || "N/A"}`;
  const emailBody = `To: Principal Nodal Officer & Cyber Fraud Desk, ${bank.name}

SUBJECT: IMMEDIATE LIEN MARKING & BENEFICIARY ACCOUNT FREEZE UNDER SECTION 91 BNSS 2023 & RBI ZERO LIABILITY RULES

Respected Sir/Madam,

I am formally reporting an unauthorized, fraudulent cyber transaction originating from my account and request an IMMEDIATE LIEN/FREEZE on the suspect beneficiary account node.

CRITICAL TRANSACTION FORENSICS:
• Victim Account: ${profile.victimAccountMasked} (${profile.victimBank})
• Complainant Name: ${profile.victimName} (Phone: ${profile.victimPhone})
• Stolen Amount: INR ${profile.fraudAmount.toLocaleString("en-IN")}
• 12-Digit Banking UTR / RRN: ${profile.utrNumber || "N/A"}
• Incident Time: ${new Date(profile.transactionTime).toLocaleString("en-IN")}
• Suspect Beneficiary UPI / VPA: ${profile.suspectVpa || "N/A"}
• Suspect Account Number: ${profile.suspectAccountNo || "N/A"}
• Suspect Bank IFSC: ${profile.suspectBankIfsc || "N/A"}

STATUTORY CITATION:
Reported within the Golden Recovery Window pursuant to RBI Master Direction (DPSS.CO.PD.No.1417/02.14.006/2017-18) & Section 91 BNSS 2023. Full Section 91 BNSS Notice & Evidence Dossier attached.

Complainant: ${profile.victimName}
Helpline 1930 Reference Active.`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(fraudDeskEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const mailtoUrl = `mailto:${encodeURIComponent(fraudDeskEmail)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // 1. Call 1930 action
  const handleCall1930 = () => {
    logCaseAction(profile.id, "user_initiated_1930_call", {
      phoneDialed: "1930",
      utr: profile.utrNumber,
      fraudAmount: profile.fraudAmount
    });
  };

  // 2. Email Bank Actions
  const handleEmailBank = () => {
    logCaseAction(profile.id, "user_emailed_bank", {
      bankName: bank.name,
      toEmail: fraudDeskEmail,
      utr: profile.utrNumber
    });

    // Open options modal so user can pick Gmail webmail, mail client, or copy text
    setShowEmailModal(true);

    // Attempt direct mailto client as well
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Handled via modal
    }
  };

  const handleCopyBankEmail = () => {
    navigator.clipboard.writeText(fraudDeskEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyEmailBody = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopiedEmailBody(true);
    setTimeout(() => setCopiedEmailBody(false), 2500);
  };

  // 3. WhatsApp / Web Share Handler
  const handleShareDoc = async (
    docType: "freeze" | "fir" | "court" | "bsa"
  ) => {
    setSharingDoc(docType);
    let doc;
    let fileName = "";
    let title = "";
    let text = "";

    if (docType === "freeze") {
      doc = createBankFreezeDoc(profile, auditReport);
      fileName = `Bank_Freeze_Notice_${profile.utrNumber}.pdf`;
      title = `Section 91 BNSS Bank Freeze Notice - UTR ${profile.utrNumber}`;
      text = `Urgent statutory freeze notice for fraudulent transaction Rs. ${profile.fraudAmount.toLocaleString("en-IN")} (UTR: ${profile.utrNumber}).`;
    } else if (docType === "fir") {
      doc = createPoliceFirDoc(profile, auditReport);
      fileName = `Police_FIR_Dossier_${profile.utrNumber}.pdf`;
      title = `Cyber Police FIR Dossier - ${profile.id}`;
      text = `Formal Cyber Police FIR complaint dossier under BNS 318(4) & IT Act 66D for fraud of Rs. ${profile.fraudAmount.toLocaleString("en-IN")}.`;
    } else if (docType === "court") {
      doc = createMagistratePetitionDoc(profile);
      fileName = `Sec503_Court_Petition_${profile.utrNumber}.pdf`;
      title = `Section 503 BNSS Court Refund Petition`;
      text = `Magistrate Court Petition for release and refund of frozen funds (UTR: ${profile.utrNumber}).`;
    } else {
      doc = createSection63BsaCertificateDoc(profile);
      fileName = `Sec63_BSA_Certificate_${profile.utrNumber || profile.id}.pdf`;
      title = `Section 63(4) BSA 2023 Certificate of Electronic Evidence`;
      text = `Statutory Section 63 BSA 2023 certificate verifying SHA-256 cryptographic chain of custody.`;
    }

    logCaseAction(profile.id, "user_shared_document", {
      docType,
      fileName,
      channel: "whatsapp_web_share"
    });

    const shared = await sharePdfToWhatsApp(doc, fileName, title, text);
    if (shared) {
      setShareSuccess(docType);
      setTimeout(() => setShareSuccess(null), 3000);
    }
    setSharingDoc(null);
  };

  return (
    <div className="bg-white border-2 border-indigo-500/80 rounded-3xl p-6 sm:p-7 shadow-lg mb-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              {dict.common.goldenHourBadge}
            </span>
            <span className="text-xs text-slate-500 font-medium">One-Tap Action Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
            {dict.actions.heroTitle}
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            {dict.actions.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Action 1: Call 1930 Now (Urgency #1) */}
      <div className="bg-surface-card border border-stone-200/80 rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold shadow-xs shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-brand-primary bg-indigo-50 px-2 py-0.5 rounded-md uppercase">
                  {dict.actions.step1Tag}
                </span>
                <span className="text-xs text-text-muted">{dict.actions.step1Time}</span>
              </div>
              <h3 className="text-base font-bold text-text-primary mt-0.5">
                {dict.actions.step1HelplineTitle}
              </h3>
              <p className="text-xs text-text-muted">
                {dict.actions.step1HelplineDesc}
              </p>
            </div>
          </div>

          <a
            href="tel:1930"
            onClick={handleCall1930}
            className="w-full sm:w-auto px-6 py-3.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 shrink-0"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>{dict.actions.call1930NowBtn}</span>
          </a>
        </div>

        {/* Call Script Prompter directly on-screen */}
        <div className="mt-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-text-primary flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              {dict.actions.livePrompterTitle}
            </span>
            <button
              type="button"
              onClick={() => setShowInlineScript(!showInlineScript)}
              className="text-[11px] text-brand-primary font-bold hover:underline"
            >
              {showInlineScript ? dict.actions.collapseScript : dict.actions.showScript}
            </button>
          </div>

          {showInlineScript && (
            <div className="bg-surface-section text-text-primary p-4 rounded-xl font-mono text-xs leading-relaxed space-y-2 border border-stone-200/80 animate-in fade-in">
              <p className="text-brand-success font-bold">
                "{dict.actions.teleprompterHello}{profile.fraudAmount.toLocaleString("en-IN")}."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 text-text-muted">
                <div>• Banking UTR / RRN: <strong className="text-text-primary font-bold">{profile.utrNumber || "N/A"}</strong></div>
                <div>• Debited Bank: <strong className="text-text-primary">{profile.victimBank}</strong></div>
                <div>• Debited Account: <strong className="text-text-primary">{profile.victimAccountMasked}</strong></div>
                <div>• Time: <strong className="text-text-primary">{new Date(profile.transactionTime).toLocaleTimeString()}</strong></div>
                {profile.suspectVpa && <div>• Suspect UPI: <strong className="text-brand-warning">{profile.suspectVpa}</strong></div>}
                {profile.suspectAccountNo && <div>• Suspect A/C: <strong className="text-brand-warning">{profile.suspectAccountNo}</strong></div>}
              </div>
              <p className="text-brand-warning text-[11px] pt-1">
                "{dict.actions.teleprompterClosing}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action 2: Email Bank Fraud Desk Now (Urgency #2) */}
      <div className="bg-surface-card border border-stone-200/80 rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-success text-white flex items-center justify-center font-bold shadow-xs shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-brand-success bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
                  {dict.actions.step2Tag}
                </span>
                <span className="text-xs text-text-muted">{dict.actions.step2Time}</span>
              </div>
              <h3 className="text-base font-bold text-text-primary mt-0.5">
                {dict.actions.emailBankTitle}
              </h3>
              <p className="text-xs text-text-muted">
                {dict.actions.emailBankDesc} <strong className="text-text-primary font-mono">{fraudDeskEmail}</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleEmailBank}
              className="px-6 py-3.5 bg-brand-success hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>{dict.actions.emailBankBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => generateBankFreezePdf(profile, auditReport)}
              className="px-4 py-3 bg-surface-card hover:bg-stone-50 text-text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-200 shadow-xs transition-all active:scale-95"
              title="Download full Section 91 BNSS notice PDF to attach"
            >
              <Download className="w-3.5 h-3.5 text-text-muted" />
              <span>{dict.actions.downloadPdfAttachBtn}</span>
            </button>
          </div>
        </div>

        {/* Quick Send Options Drawer */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg flex items-center gap-1.5 border border-red-200 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-red-600" />
            <span>Open in Gmail (Web)</span>
            <ExternalLink className="w-3 h-3 text-red-400" />
          </a>

          <a
            href={mailtoUrl}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-brand-primary font-bold rounded-lg flex items-center gap-1.5 border border-indigo-200 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-brand-primary" />
            <span>Open in Default Mail App</span>
          </a>

          <button
            type="button"
            onClick={handleCopyBankEmail}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-text-primary font-bold rounded-lg flex items-center gap-1.5 border border-stone-200 transition-all"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-brand-success" /> : <Copy className="w-3.5 h-3.5 text-text-muted" />}
            <span>{copiedEmail ? "Email Copied!" : "Copy Bank Email"}</span>
          </button>
        </div>
      </div>

      {/* Action 3: Share Documents via WhatsApp (Urgency #3) */}
      <div className="bg-surface-card border border-stone-200/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-brand-success flex items-center justify-center font-bold text-xs">
            <Share2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-text-primary">
              {dict.actions.shareDocsTitle}
            </h3>
            <p className="text-[11px] text-text-muted">
              {dict.actions.shareDocsSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1" aria-live="polite">
          {/* Doc 1: Bank Lien Notice */}
          <div className="p-3 bg-surface-section rounded-xl border border-stone-200/60 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-brand-success uppercase block">{dict.actions.docBankFreeze}</span>
              <span className="text-xs font-bold text-text-primary">{dict.actions.docBankFreezeSub}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("freeze")}
                disabled={sharingDoc === "freeze"}
                aria-label="Share Bank Freeze Notice via WhatsApp"
                className="flex-1 py-2 bg-brand-success hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "freeze" ? "Shared!" : dict.common.shareWhatsApp}</span>
              </button>
              <button
                type="button"
                onClick={() => generateBankFreezePdf(profile, auditReport)}
                aria-label="Download Bank Freeze Notice PDF"
                className="p-2 bg-surface-card hover:bg-stone-100 text-text-primary rounded-lg border border-stone-200"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Doc 2: Police FIR Dossier */}
          <div className="p-3 bg-surface-section rounded-xl border border-stone-200/60 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-brand-primary uppercase block">{dict.actions.docPoliceFir}</span>
              <span className="text-xs font-bold text-text-primary">{dict.actions.docPoliceFirSub}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("fir")}
                disabled={sharingDoc === "fir"}
                aria-label="Share Police FIR Dossier via WhatsApp"
                className="flex-1 py-2 bg-brand-success hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "fir" ? "Shared!" : dict.common.shareWhatsApp}</span>
              </button>
              <button
                type="button"
                onClick={() => generatePoliceFirPdf(profile, auditReport)}
                aria-label="Download Police FIR Dossier PDF"
                className="p-2 bg-surface-card hover:bg-stone-100 text-text-primary rounded-lg border border-stone-200"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Doc 3: Court Petition */}
          <div className="p-3 bg-surface-section rounded-xl border border-stone-200/60 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-brand-primary uppercase block">{dict.actions.docCourtRefund}</span>
              <span className="text-xs font-bold text-text-primary">{dict.actions.docCourtRefundSub}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("court")}
                disabled={sharingDoc === "court"}
                aria-label="Share Court Refund Petition via WhatsApp"
                className="flex-1 py-2 bg-brand-success hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "court" ? "Shared!" : dict.common.shareWhatsApp}</span>
              </button>
              <button
                type="button"
                onClick={() => generateMagistratePetitionPdf(profile)}
                aria-label="Download Court Refund Petition PDF"
                className="p-2 bg-surface-card hover:bg-stone-100 text-text-primary rounded-lg border border-stone-200"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Doc 4: Sec 63 BSA Certificate */}
          <div className="p-3 bg-surface-section rounded-xl border border-stone-200/60 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-brand-primary uppercase block">{dict.actions.docEvidenceCert}</span>
              <span className="text-xs font-bold text-text-primary">{dict.actions.docEvidenceCertSub}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("bsa")}
                disabled={sharingDoc === "bsa"}
                aria-label="Share Section 63 BSA Certificate via WhatsApp"
                className="flex-1 py-2 bg-brand-success hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "bsa" ? "Shared!" : dict.common.shareWhatsApp}</span>
              </button>
              <button
                type="button"
                onClick={() => generateSection63BsaCertificatePdf(profile)}
                aria-label="Download Section 63 BSA Certificate PDF"
                className="p-2 bg-surface-card hover:bg-stone-100 text-text-primary rounded-lg border border-stone-200"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Email Dispatch Modal */}
      {showEmailModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bank-email-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-surface-card text-text-primary border border-stone-200 rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-7 max-h-[85vh] flex flex-col font-sans relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg bg-surface-section text-text-muted hover:text-text-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-success border border-emerald-100 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 id="bank-email-modal-title" className="text-base font-bold text-text-primary">
                  Email Bank Fraud Desk (Section 91 BNSS)
                </h3>
                <p className="text-xs text-text-muted">
                  Dispatched to {bank.name} Nodal Cyber Cell
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-5 flex-1 overflow-y-auto pr-1">
              <div className="bg-surface-section p-3 rounded-xl border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-muted font-bold">To Recipient:</span>
                  <button
                    type="button"
                    onClick={handleCopyBankEmail}
                    className="text-[11px] text-brand-primary font-bold hover:underline flex items-center gap-1"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-brand-success" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                  </button>
                </div>
                <div className="font-mono text-xs font-bold text-text-primary bg-white p-2 rounded-lg border border-stone-200">
                  {fraudDeskEmail}
                </div>
              </div>

              <div className="bg-surface-section p-3 rounded-xl border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-muted font-bold">Subject:</span>
                </div>
                <div className="font-mono text-[11px] font-semibold text-text-primary bg-white p-2 rounded-lg border border-stone-200">
                  {emailSubject}
                </div>
              </div>

              <div className="bg-surface-section p-3 rounded-xl border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-muted font-bold">Pre-composed Statutory Body:</span>
                  <button
                    type="button"
                    onClick={handleCopyEmailBody}
                    className="text-[11px] text-brand-primary font-bold hover:underline flex items-center gap-1"
                  >
                    {copiedEmailBody ? <Check className="w-3 h-3 text-brand-success" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmailBody ? "Copied Entire Notice!" : "Copy Body"}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-text-primary bg-white p-3 rounded-lg border border-stone-200 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {emailBody}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => generateBankFreezePdf(profile, auditReport)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-text-primary rounded-xl text-xs font-bold flex items-center gap-1.5 border border-stone-200"
              >
                <Download className="w-3.5 h-3.5 text-brand-primary" />
                <span>Download PDF to Attach</span>
              </button>

              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send with Gmail (Web)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={mailtoUrl}
                className="px-4 py-2.5 bg-brand-success hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Mail App</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

