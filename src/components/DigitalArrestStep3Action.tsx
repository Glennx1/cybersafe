import React, { useState } from "react";
import {
  generateSection63BsaCertificatePdf,
  createDigitalArrestFirDoc,
  generateDigitalArrestFirPdf,
  createSection63BsaCertificateDoc,
  sharePdfToWhatsApp
} from "@/lib/pdfGenerator";
import { logCaseAction } from "@/lib/actionLogger";
import {
  Download,
  Phone,
  Send,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  FileCheck,
  XCircle,
  PhoneOff,
  Radio,
  ExternalLink,
  Copy,
  Check,
  Building2,
  AlertTriangle,
  Share2
} from "lucide-react";
import { IncidentProfile, Language } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";

interface DigitalArrestStep3ActionProps {
  profile: IncidentProfile;
  language: Language;
  onDownloadDigitalArrestFir: () => void;
  onBack: () => void;
}

export const DigitalArrestStep3Action: React.FC<DigitalArrestStep3ActionProps> = ({
  profile,
  language,
  onDownloadDigitalArrestFir,
  onBack,
}) => {
  const dict = getDictionary(language);
  const [copiedChakshu, setCopiedChakshu] = useState(false);
  const [sharingFir, setSharingFir] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleCopyChakshuDetails = () => {
    const text = `SUSPECT IMPERSONATOR DETAILS FOR CHAKSHU BLOCK:\n- Caller ID / WhatsApp: ${profile.scammerCallerId || "Unknown"}\n- Impersonated Official: ${profile.impersonatedAgency || "CBI / Police"}\n- Extortion Demand: Rs. ${(profile.extortionDemandAmount || 250000).toLocaleString("en-IN")}\n- Crime Category: Fake Digital Arrest / Cyber Extortion (Sec 319 BNS)`;
    navigator.clipboard.writeText(text);
    setCopiedChakshu(true);
    setTimeout(() => setCopiedChakshu(false), 2500);
  };

  const handleShareDigitalArrestFir = async () => {
    setSharingFir(true);
    const doc = createDigitalArrestFirDoc(profile);
    const fileName = `Digital_Arrest_FIR_Complaint_${profile.id}.pdf`;
    const title = `Digital Arrest Criminal Complaint - ${profile.id}`;
    const text = `Formal criminal complaint regarding cyber extortion and impersonation of ${profile.impersonatedAgency || "police officials"} (BNS 204, 308, 319).`;

    logCaseAction(profile.id, "user_shared_document", {
      docType: "digital_arrest_fir",
      fileName,
      channel: "whatsapp_web_share"
    });

    const shared = await sharePdfToWhatsApp(doc, fileName, title, text);
    if (shared) {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }
    setSharingFir(false);
  };

  const chakshuUrl = "https://sancharsaathi.gov.in/sfc/";

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in duration-300">
      {/* 1. Hero Reassurance Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200 w-fit">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{dict.digitalArrest.safeTakeActionBadge}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {dict.digitalArrest.step3NextStepsTitle}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
          {dict.digitalArrest.step3NextStepsSubtitle}
        </p>
      </div>

      {/* 2. Step-by-Step Safety Steps */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2">
          <PhoneOff className="w-4 h-4 text-rose-600" />
          <span>{dict.step3Action.whatNextTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center mb-2">
              1
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">{dict.digitalArrest.safetyStep1Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.digitalArrest.safetyStep1Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center mb-2">
              2
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">{dict.digitalArrest.safetyStep2Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.digitalArrest.safetyStep2Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mb-2">
              3
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">{dict.digitalArrest.safetyStep3Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.digitalArrest.safetyStep3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Action 1: Download FIR PDF */}
        <div className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 font-medium">BNS Sec 204 & 308</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {dict.digitalArrest.safetyStep3Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {dict.digitalArrest.safetyStep3Desc}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareDigitalArrestFir}
                disabled={sharingFir}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{shareSuccess ? "Shared!" : dict.common.shareWhatsApp}</span>
              </button>

              <button
                onClick={onDownloadDigitalArrestFir}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{dict.common.downloadPdf}</span>
              </button>
            </div>

            {(profile.serverEvidenceHash || profile.evidenceHash) && (
              <button
                type="button"
                onClick={() => generateSection63BsaCertificatePdf(profile)}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-all active:scale-95"
                title="Section 63(4) BSA 2023 Certificate of Authenticity for submitted evidence"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700" />
                <span>Download Sec 63 BSA Certificate</span>
              </button>
            )}
          </div>
        </div>

        {/* Action 2: DoT Chakshu SIM Blocking */}
        <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 font-medium">DoT Sanchar Saathi</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {dict.digitalArrest.safetyStep2Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {dict.digitalArrest.safetyStep2Desc}
            </p>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleCopyChakshuDetails}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 transition-all"
            >
              {copiedChakshu ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedChakshu ? dict.digitalArrest.chakshuCopiedBtn : dict.digitalArrest.copyChakshuBtn}</span>
            </button>
            <a
              href={chakshuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <span>{dict.digitalArrest.openChakshuBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Real Verified Central Control Room Directory */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-indigo-600" />
          <span>Official Verified Helplines & Numbers</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <span className="text-slate-500 block text-xs font-medium">National Cybercrime Helpline:</span>
            <span className="text-emerald-700 text-sm font-bold mt-0.5 block">1930 (Toll Free)</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">24x7 Citizen Cyber Defense</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <span className="text-slate-500 block text-xs font-medium">CBI Control Room:</span>
            <span className="text-slate-900 text-xs font-bold mt-0.5 block">011-24362755</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">HQ Lodhi Road, New Delhi</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <span className="text-slate-500 block text-xs font-medium">Enforcement Directorate (ED):</span>
            <span className="text-slate-900 text-xs font-bold mt-0.5 block">011-23339100</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Headquarters, New Delhi</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Legal Reality</span>
        </button>
      </div>
    </div>
  );
};