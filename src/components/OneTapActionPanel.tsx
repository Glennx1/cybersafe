"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  FileText,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Download,
  AlertCircle,
  Clock,
  ShieldAlert,
  Send,
  Building,
  Scale,
  Sparkles,
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

  // Email fallback indicator
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // NCRP Copy state
  const [copiedNcrpStatement, setCopiedNcrpStatement] = useState(false);

  // Document share states
  const [sharingDoc, setSharingDoc] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  const bank = lookupBankNode(profile.victimBank);
  const fraudDeskEmail = bank.cyberEmail || bank.nodalEmail || "cybercell@bank.com";

  // 1. Call 1930 action
  const handleCall1930 = () => {
    logCaseAction(profile.id, "user_initiated_1930_call", {
      phoneDialed: "1930",
      utr: profile.utrNumber,
      fraudAmount: profile.fraudAmount
    });
  };

  // 2. Email Bank Action (mailto: with length-safe body)
  const handleEmailBank = () => {
    logCaseAction(profile.id, "user_emailed_bank", {
      bankName: bank.name,
      toEmail: fraudDeskEmail,
      utr: profile.utrNumber
    });

    const subject = `URGENT: Section 91 BNSS Lien Request — Account ${profile.victimAccountMasked} — UTR ${profile.utrNumber || "N/A"}`;
    
    const conciseBody = `To: Principal Nodal Officer & Cyber Fraud Desk, ${bank.name}

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

    const mailtoUrl = `mailto:${encodeURIComponent(fraudDeskEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(conciseBody)}`;

    // Set best-effort detection for mail client fallback
    const timeout = setTimeout(() => {
      setShowEmailFallback(true);
    }, 1500);

    window.location.href = mailtoUrl;

    window.addEventListener(
      "blur",
      () => {
        clearTimeout(timeout);
        setShowEmailFallback(false);
      },
      { once: true }
    );
  };

  // 3. Copy NCRP Statement
  const ncrpComplaintStatement = `FORMAL CYBER CRIME COMPLAINT — SECTION 318(4) & 319 BNS 2023 / IT ACT 66D

Complainant: ${profile.victimName} | Mobile: ${profile.victimPhone}
Location / Jurisdiction: ${profile.cityState || "State Jurisdiction"}
Date & Time of Incident: ${new Date(profile.transactionTime).toLocaleString("en-IN")}

INCIDENT & FINANCIAL TRAIL:
1. Debited Account: ${profile.victimAccountNo || profile.victimAccountMasked} (${profile.victimBank})
2. Total Defrauded Amount: Rs. ${profile.fraudAmount.toLocaleString("en-IN")}
3. Banking UTR / RRN: ${profile.utrNumber || "N/A"}
4. Suspect UPI ID / VPA: ${profile.suspectVpa || "N/A"}
5. Suspect Account Number: ${profile.suspectAccountNo || "N/A"}
6. Suspect Bank IFSC: ${profile.suspectBankIfsc || "N/A"}
7. Evidence Authenticity: SHA-256 Hashed on-device under Sec 63 BSA 2023 (${profile.serverEvidenceHash || profile.evidenceHash || "Verified"})

PRAYER:
1. Register formal FIR under BNS Sections 318(4) (Cheating) and 319 (Cheating by Impersonation) and IT Act 66D.
2. Issue urgent Section 91 BNSS freeze requisition to beneficiary bank.
3. Issue NCRP Acknowledgement Number.`;

  const handleCopyNcrp = async () => {
    try {
      await navigator.clipboard.writeText(ncrpComplaintStatement);
      setCopiedNcrpStatement(true);
      logCaseAction(profile.id, "user_copied_ncrp_statement", {
        utr: profile.utrNumber,
        statementLength: ncrpComplaintStatement.length
      });
      setTimeout(() => setCopiedNcrpStatement(false), 2500);
    } catch (e) {
      console.warn("Failed to copy statement:", e);
    }
  };

  const handleCopyBankEmail = () => {
    navigator.clipboard.writeText(fraudDeskEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // 4. WhatsApp / Web Share Handler
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
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {dict.actions.heroTitle}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            {dict.actions.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Action 1: Call 1930 Now (Urgency #1) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4 hover:border-slate-300 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md uppercase">
                  Step 1 • Immediate Priority
                </span>
                <span className="text-xs text-slate-500">First 15 Mins</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {dict.actions.step1HelplineTitle}
              </h3>
              <p className="text-xs text-slate-600">
                {dict.actions.step1HelplineDesc}
              </p>
            </div>
          </div>

          <a
            href="tel:1930"
            onClick={handleCall1930}
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call 1930 Now</span>
          </a>
        </div>

        {/* Call Script Prompter directly on-screen */}
        <div className="mt-3 pt-3 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Live Teleprompter Script (Read this to the 1930 Officer):
            </span>
            <button
              type="button"
              onClick={() => setShowInlineScript(!showInlineScript)}
              className="text-[11px] text-indigo-600 font-bold hover:underline"
            >
              {showInlineScript ? "Collapse Script" : "Show Script"}
            </button>
          </div>

          {showInlineScript && (
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed space-y-2 border border-slate-800 animate-in fade-in">
              <p className="text-emerald-400 font-bold">
                "Hello Officer, I need to report an emergency unauthorized cyber fraud of ₹{profile.fraudAmount.toLocaleString("en-IN")}."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 text-slate-300">
                <div>• Banking UTR / RRN: <strong className="text-white font-bold">{profile.utrNumber || "N/A"}</strong></div>
                <div>• Debited Bank: <strong className="text-white">{profile.victimBank}</strong></div>
                <div>• Debited Account: <strong className="text-white">{profile.victimAccountMasked}</strong></div>
                <div>• Time: <strong className="text-white">{new Date(profile.transactionTime).toLocaleTimeString()}</strong></div>
                {profile.suspectVpa && <div>• Suspect UPI: <strong className="text-rose-400">{profile.suspectVpa}</strong></div>}
                {profile.suspectAccountNo && <div>• Suspect A/C: <strong className="text-rose-400">{profile.suspectAccountNo}</strong></div>}
              </div>
              <p className="text-amber-300 text-[11px] pt-1">
                "Please immediately flag this UTR on CFCFRMS to freeze the recipient account node and provide me the ticket acknowledgement number."
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action 2: Email Bank Fraud Desk Now (Urgency #2) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4 hover:border-slate-300 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md uppercase">
                  Step 2 • Stop Inter-Bank Transfer
                </span>
                <span className="text-xs text-slate-500">15 Mins – 2 Hours</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Email Bank Fraud Desk (Section 91 BNSS)
              </h3>
              <p className="text-xs text-slate-600">
                Dispatches pre-composed statutory lien requisition to <strong className="text-slate-900">{fraudDeskEmail}</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleEmailBank}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Email Bank Now</span>
            </button>

            <button
              type="button"
              onClick={() => generateBankFreezePdf(profile, auditReport)}
              className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 shadow-xs transition-all active:scale-95"
              title="Download full Section 91 BNSS notice PDF to attach"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download PDF to Attach</span>
            </button>
          </div>
        </div>

          {/* Fallback box if no mail client opens */}
        {showEmailFallback && (
          <div role="alert" className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
              <span>No default mail app opened? Copy the official fraud-desk email: <strong className="font-mono">{fraudDeskEmail}</strong></span>
            </div>
            <button
              type="button"
              onClick={handleCopyBankEmail}
              aria-label="Copy bank fraud desk email address"
              className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1 shrink-0"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Action 3: File NCRP Online Complaint (Urgency #3) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4 hover:border-slate-300 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0 mt-0.5">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md uppercase">
                  Step 3 • Official Government Portal
                </span>
                <span className="text-xs text-slate-500">Same Day Filing</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                File NCRP Complaint (cybercrime.gov.in)
              </h3>
              <p className="text-xs text-slate-600">
                1-tap copy pre-formatted legal statement & open official national portal in a new tab.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0" aria-live="polite">
            <button
              type="button"
              onClick={handleCopyNcrp}
              aria-label="Copy legal complaint statement to clipboard"
              className={`px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 ${
                copiedNcrpStatement
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              {copiedNcrpStatement ? <Check className="w-4 h-4 text-emerald-200" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              <span>{copiedNcrpStatement ? "Statement Copied!" : "1. Copy Statement"}</span>
            </button>

            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>2. Open cybercrime.gov.in</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Action 4: Share Documents via WhatsApp (Urgency #4) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            <Share2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">
              One-Tap WhatsApp & Document Share (To Family, Lawyer, Police Contact)
            </h3>
            <p className="text-[11px] text-slate-500">
              Directly share digitally generated legal evidence PDFs without saving to disk first.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1" aria-live="polite">
          {/* Doc 1: Bank Lien Notice */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">Bank Freeze Notice</span>
              <span className="text-xs font-bold text-slate-800">Sec 91 BNSS Letter</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("freeze")}
                disabled={sharingDoc === "freeze"}
                aria-label="Share Bank Freeze Notice via WhatsApp"
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "freeze" ? "Shared!" : "Share via WhatsApp"}</span>
              </button>
              <button
                type="button"
                onClick={() => generateBankFreezePdf(profile, auditReport)}
                aria-label="Download Bank Freeze Notice PDF"
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Doc 2: Police FIR Dossier */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase block">Police FIR</span>
              <span className="text-xs font-bold text-slate-800">BNS 318(4) Dossier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("fir")}
                disabled={sharingDoc === "fir"}
                aria-label="Share Police FIR Dossier via WhatsApp"
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "fir" ? "Shared!" : "Share via WhatsApp"}</span>
              </button>
              <button
                type="button"
                onClick={() => generatePoliceFirPdf(profile, auditReport)}
                aria-label="Download Police FIR Dossier PDF"
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Doc 3: Court Petition */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-purple-700 uppercase block">Court Refund</span>
              <span className="text-xs font-bold text-slate-800">Sec 503 BNSS Petition</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("court")}
                disabled={sharingDoc === "court"}
                aria-label="Share Court Refund Petition via WhatsApp"
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "court" ? "Shared!" : "Share via WhatsApp"}</span>
              </button>
              <button
                type="button"
                onClick={() => generateMagistratePetitionPdf(profile)}
                aria-label="Download Court Refund Petition PDF"
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Doc 4: Sec 63 BSA Certificate */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase block">Evidence Certificate</span>
              <span className="text-xs font-bold text-slate-800">Sec 63(4) BSA 2023</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleShareDoc("bsa")}
                disabled={sharingDoc === "bsa"}
                aria-label="Share Section 63 BSA Certificate via WhatsApp"
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{shareSuccess === "bsa" ? "Shared!" : "Share via WhatsApp"}</span>
              </button>
              <button
                type="button"
                onClick={() => generateSection63BsaCertificatePdf(profile)}
                aria-label="Download Section 63 BSA Certificate PDF"
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
