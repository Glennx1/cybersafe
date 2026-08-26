"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  Shield,
  Download,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Building,
  Scale,
  Send,
  Lock,
  Printer
} from "lucide-react";
import { IncidentProfile, ForensicAuditReport } from "@/lib/types";
import { generatePoliceFirPdf, generateSection63BsaCertificatePdf } from "@/lib/pdfGenerator";

interface CyberFirRegistrationModalProps {
  isOpen: boolean;
  profile: IncidentProfile;
  auditReport: ForensicAuditReport;
  onClose: () => void;
}

export const CyberFirRegistrationModal: React.FC<CyberFirRegistrationModalProps> = ({
  isOpen,
  profile,
  auditReport,
  onClose,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"online" | "station">("online");

  if (!isOpen) return null;

  // Real-world official national portal URL
  const nationalPortalUrl = "https://cybercrime.gov.in/";

  // Pre-compiled narrative required by NCRP / Cyber Crime Police Stations
  const firNarrativeText = `To,\nThe Officer-in-Charge / Station House Officer (SHO)\nCyber Crime Police Station / National Cybercrime Reporting Portal (1930)\nJurisdiction: ${profile.cityState || "State Jurisdiction"}\n\nSUBJECT: FORMAL COMPLAINT FOR REGISTRATION OF CYBER CRIME FIRST INFORMATION REPORT (FIR) UNDER BHARATIYA NYAYA SANHITA (BNS 2023) SEC 318(4)/319 & IT ACT SEC 66C/66D\n\nRespected Officer,\n\nI, ${profile.victimName}, contact phone ${profile.victimPhone}, wish to report a cognizable financial cyber offense that took place on ${new Date(profile.transactionTime).toLocaleString("en-IN")}.\n\nINCIDENT & FRAUD SUMMARY:\n1. Victim Name: ${profile.victimName}\n2. Victim Bank & Branch: ${profile.victimBank}\n3. Victim Account Number: ${profile.victimAccountNo || profile.victimAccountMasked}\n4. Victim IFSC Code: ${profile.victimBankIfsc || "N/A"}\n5. Fraudulent Debited Amount: Rs. ${profile.fraudAmount.toLocaleString("en-IN")}\n6. Banking Transaction UTR / RRN: ${profile.utrNumber || "N/A"}\n\nSUSPECT / BENEFICIARY IDENTIFIERS:\n1. Suspect UPI / VPA ID: ${profile.suspectVpa || "N/A"}\n2. Suspect Account Number: ${profile.suspectAccountNo || "N/A"}\n3. Suspect Bank & IFSC Code: ${profile.suspectBankIfsc || "N/A"}\n4. Evidence Attached: Screenshot / Transaction Receipt (SHA-256 Hash: ${profile.evidenceHash || "Calculated On-Device"})\n\nPRAYER / STATUTORY RELIEF REQUESTED:\n1. Immediately register a First Information Report (FIR) under BNS Sections 318(4) (Cheating) and 319 (Cheating by Impersonation) along with Section 66C & 66D of Information Technology Act 2000.\n2. Issue statutory requisition under Section 91 BNSS 2023 to the beneficiary bank to freeze and hold the disputed amount of Rs. ${profile.fraudAmount.toLocaleString("en-IN")}.\n3. Provide an official NCRP Acknowledgement / FIR Number for insurance claim and bank court reversal filing.\n\nComplainant Signature:\n${profile.victimName}\nPhone: ${profile.victimPhone}\nDate: ${new Date().toLocaleDateString("en-IN")}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(firNarrativeText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-text-primary border border-stone-200/80 rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-7 max-h-[90vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-brand-primary border border-indigo-100 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-text-primary">
                  Register Cyber Police FIR
                </h3>
                <span className="text-[10px] font-bold bg-indigo-50 text-brand-primary border border-indigo-200 px-2 py-0.5 rounded-full">
                  Official Police Format
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Official filing pursuant to BNS Sec 318(4) & IT Act Sec 66D
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-section text-text-muted hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Method Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-surface-section rounded-xl mb-4 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setSelectedMethod("online")}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              selectedMethod === "online"
                ? "bg-surface-card text-brand-primary shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Option 1: National Cyber Portal (Online)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedMethod("station")}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              selectedMethod === "station"
                ? "bg-surface-card text-brand-primary shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Option 2: Cyber Police Station (Physical)</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-text-muted">
          {/* Key Identifiers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-section p-3 rounded-xl border border-stone-200/60">
            <div>
              <span className="text-[10px] text-text-muted block">Complainant</span>
              <strong className="text-text-primary font-bold truncate block">{profile.victimName}</strong>
            </div>
            <div>
              <span className="text-[10px] text-text-muted block">Fraud Amount</span>
              <strong className="text-brand-urgent font-bold block">₹{profile.fraudAmount.toLocaleString("en-IN")}</strong>
            </div>
            <div>
              <span className="text-[10px] text-text-muted block">Banking UTR</span>
              <strong className="text-text-primary font-mono font-bold truncate block">{profile.utrNumber || "Pending"}</strong>
            </div>
            <div>
              <span className="text-[10px] text-text-muted block">Suspect Account / VPA</span>
              <strong className="text-brand-primary font-mono font-bold truncate block">{profile.suspectVpa || profile.suspectAccountNo || "Extracted"}</strong>
            </div>
          </div>

          {selectedMethod === "online" ? (
            <div className="bg-surface-section border border-stone-200/80 rounded-xl p-4 space-y-2.5">
              <h4 className="font-bold text-text-primary flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                <span>How to file on cybercrime.gov.in (NCRP):</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-text-muted leading-relaxed text-xs">
                <li>Copy the pre-written legal narrative below.</li>
                <li>Open the official National Cyber Crime Reporting Portal.</li>
                <li>Click <strong>Report Other Cyber Crime &gt; Financial Fraud</strong>.</li>
                <li>Paste the complaint text and input your transaction UTR (<strong>{profile.utrNumber || "N/A"}</strong>).</li>
                <li>Upload your attached screenshot and submit to generate your instant police acknowledgement number.</li>
              </ol>
            </div>
          ) : (
            <div className="bg-surface-section border border-stone-200/80 rounded-xl p-4 space-y-2.5">
              <h4 className="font-bold text-text-primary flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-warning" />
                <span>How to file at your local Police Cyber Cell:</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-text-muted leading-relaxed text-xs">
                <li>Download the generated <strong>Police FIR Dossier PDF</strong> below.</li>
                <li>Print 2 copies and sign the Complainant Signature field.</li>
                <li>Submit to the Duty Officer / Station House Officer (SHO) at your nearest Cyber Police Station.</li>
                <li>Obtain a stamped copy with the General Diary (GD) / FIR reference number.</li>
              </ol>
            </div>
          )}

          {/* Pre-Compiled FIR Text Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-text-primary text-xs flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-brand-primary" />
                <span>Pre-Formatted FIR Complaint Statement:</span>
              </label>
              <button
                type="button"
                onClick={handleCopyText}
                className="px-2.5 py-1 bg-surface-card hover:bg-stone-50 text-text-primary border border-stone-200 rounded-md font-bold text-[11px] flex items-center gap-1 transition-all shadow-xs"
              >
                {copiedText ? <Check className="w-3 h-3 text-brand-success" /> : <Copy className="w-3 h-3" />}
                <span>{copiedText ? "Copied to Clipboard!" : "Copy Complaint Text"}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={7}
              value={firNarrativeText}
              className="w-full p-3 bg-surface-section border border-stone-200 rounded-xl text-[11px] font-mono text-text-primary leading-relaxed focus:outline-hidden resize-none"
            />
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-stone-100 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => generatePoliceFirPdf(profile, auditReport)}
              className="w-full sm:w-auto px-4 py-2.5 bg-surface-card hover:bg-stone-50 text-text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-stone-200 transition-all active:scale-95 shadow-xs"
            >
              <Download className="w-4 h-4 text-brand-primary" />
              <span>Download Signed FIR PDF</span>
            </button>

            {(profile.serverEvidenceHash || profile.evidenceHash) && (
              <button
                type="button"
                onClick={() => generateSection63BsaCertificatePdf(profile)}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-brand-success rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-all active:scale-95"
                title="Section 63(4) BSA 2023 Certificate of Authenticity for submitted evidence"
              >
                <Download className="w-4 h-4 text-brand-success" />
                <span>Sec 63 BSA Cert PDF</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={nationalPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>Open cybercrime.gov.in</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
