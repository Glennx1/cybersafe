"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, Copy, Check, ExternalLink, ShieldCheck, Building2, Send, PhoneCall } from "lucide-react";
import { IncidentProfile } from "@/lib/types";
import { lookupBankNode } from "@/lib/bankRegistry";

interface BankEmailDispatchModalProps {
  isOpen: boolean;
  profile: IncidentProfile;
  onClose: () => void;
}

export const BankEmailDispatchModal: React.FC<BankEmailDispatchModalProps> = ({
  isOpen,
  profile,
  onClose,
}) => {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bank = lookupBankNode(profile.victimBank);
  const subject = `URGENT: SEC 91 BNSS ACCOUNT FREEZE & LIEN REQUEST | UTR: ${profile.utrNumber}`;
  
  const body = `To,
Principal Nodal Officer & Cyber Fraud Desk,
${bank.name},

SUBJECT: IMMEDIATE LIEN MARKING & BENEFICIARY ACCOUNT FREEZE UNDER SECTION 91 BNSS 2023 & RBI MASTER DIRECTIONS

Respected Sir/Madam,

I am writing to formally report an unauthorized, fraudulent cyber transaction originating from my bank account held with your institution, and demand an IMMEDIATE EMERGENCY LIEN/FREEZE on the beneficiary account node to prevent dissipation of stolen funds.

TRANSACTION FORENSIC IDENTIFIERS:
• Victim Account Number: ${profile.victimAccountMasked}
• Complainant Name: ${profile.victimName}
• Complainant Mobile: ${profile.victimPhone}
• Stolen Fraud Amount: INR ${profile.fraudAmount.toLocaleString("en-IN")}
• 12-Digit Banking UTR / RRN: ${profile.utrNumber}
• Incident Date & Time: ${new Date(profile.transactionTime).toLocaleString("en-IN")}
• Suspect Beneficiary VPA / UPI: ${profile.suspectVpa || "N/A"}
• Suspect Account Number: ${profile.suspectAccountNo || "N/A"}
• Suspect Bank IFSC: ${profile.suspectBankIfsc || "N/A"}

STATUTORY MANDATES & REGULATORY OBLIGATIONS:
1. RBI Master Direction (DPSS.CO.PD.No.1417/02.14.006/2017-18): Entitles zero customer liability as this incident has been reported immediately within the Golden Window.
2. Section 91 BNSS 2023 (formerly Sec 91 CrPC): Legally empowers and directs financial institutions to preserve electronic records and mark liens on accounts involved in active criminal investigations.
3. National Cyber Crime Reporting Portal Ref: 1930 / I4C Active Ticket.

You are requested to:
a) Immediately mark an urgent debit freeze / lien on the suspect destination account.
b) Provide an official acknowledgment email with internal Grievance Reference Number.
c) Escalate this notice to your Bank Fraud Management System (FMS).

Regards,
${profile.victimName}
Mobile: ${profile.victimPhone}
Location: ${profile.cityState}
(Generated via CyberRakshak 1930 Citizen Anti-Fraud Copilot)`;

  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(bank.nodalEmail)}&cc=${encodeURIComponent(bank.cyberEmail)}&su=${encSubject}&body=${encBody}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(bank.nodalEmail)}&cc=${encodeURIComponent(bank.cyberEmail)}&subject=${encSubject}&body=${encBody}`;
  const mailtoUrl = `mailto:${bank.nodalEmail}?cc=${bank.cyberEmail}&subject=${encSubject}&body=${encBody}`;

  const copyToClipboard = (text: string, type: 'subject' | 'body' | 'all') => {
    navigator.clipboard.writeText(text);
    if (type === 'subject') {
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } else if (type === 'body') {
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-800 border border-slate-200 rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-7 max-h-[90vh] overflow-y-auto font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Email Bank Fraud Desk
              </h3>
              <p className="text-xs text-slate-500">
                Send a formal Section 91 BNSS freeze request to your bank
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bank Registry Target Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4" />
            <span>Target Bank Nodal Hub</span>
          </div>
          <div className="text-sm font-bold text-slate-900 mb-2">{bank.name}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-white rounded-lg p-2.5 border border-slate-200">
              <span className="text-slate-500 block text-[10px] font-bold">To (Principal Nodal Officer):</span>
              <span className="text-indigo-700 select-all font-bold text-xs truncate block">{bank.nodalEmail}</span>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-slate-200">
              <span className="text-slate-500 block text-[10px] font-bold">CC (Cyber Fraud Cell):</span>
              <span className="text-slate-800 select-all font-bold text-xs truncate block">{bank.cyberEmail}</span>
            </div>
          </div>
          {bank.phone && (
            <div className="mt-2 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>Emergency Hotline: <strong>{bank.phone}</strong></span>
            </div>
          )}
        </div>

        {/* Dispatch Options */}
        <div className="space-y-2.5 mb-5">
          <div className="text-xs font-bold text-slate-700">
            Choose Client to Dispatch:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Gmail Web */}
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Gmail</span>
            </a>

            {/* Outlook Web */}
            <a
              href={outlookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Outlook</span>
            </a>

            {/* Default Mail App */}
            <a
              href={mailtoUrl}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Default Mail App</span>
            </a>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => copyToClipboard(`TO: ${bank.nodalEmail}\nCC: ${bank.cyberEmail}\nSUBJECT: ${subject}\n\n${body}`, 'all')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition-all"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? "Copied Full Notice!" : "Copy Full Notice & Addresses"}</span>
          </button>
        </div>

        {/* Notice Preview */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              Notice Text Preview
            </span>
            <button
              onClick={() => copyToClipboard(body, 'body')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
            >
              {copiedBody ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBody ? "Copied" : "Copy Text"}</span>
            </button>
          </div>
          <div className="text-xs text-slate-700 bg-white rounded-lg p-3 max-h-44 overflow-y-auto whitespace-pre-wrap border border-slate-200 leading-relaxed font-mono">
            {body}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3.5 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Under RBI Master Directions, sending this written notice establishes timestamp proof of your reporting.
          </span>
        </div>
      </div>
    </div>
  );
};