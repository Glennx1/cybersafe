"use client";

import React, { useState, useEffect } from "react";
import { X, FolderClock, ArrowRight, ShieldAlert, Zap, Calendar, FileText, Download } from "lucide-react";
import { UserSessionRecord } from "@/lib/db";
import { generateBankFreezePdf, generatePoliceFirPdf, generateDigitalArrestFirPdf, generateSection63BsaCertificatePdf } from "@/lib/pdfGenerator";
import { CaseLedgerBadge } from "./CaseLedgerBadge";
import { Language } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";

interface SavedCasesModalProps {
  isOpen: boolean;
  userId: string;
  language?: Language;
  onClose: () => void;
  onSelectSession: (session: UserSessionRecord) => void;
}

export const SavedCasesModal: React.FC<SavedCasesModalProps> = ({
  isOpen,
  userId,
  language = "en",
  onClose,
  onSelectSession
}) => {
  const dict = getDictionary(language);
  const [sessions, setSessions] = useState<UserSessionRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      setLoading(true);
      fetch(`/api/sessions?userId=${encodeURIComponent(userId)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.sessions) {
            setSessions(data.sessions);
          }
        })
        .catch(err => console.error("Failed to load sessions", err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-text-primary border border-stone-200/80 rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-7 max-h-[85vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-brand-primary border border-indigo-100 flex items-center justify-center font-bold">
              <FolderClock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-text-primary">
                {dict.modals.savedCases.title}
              </h3>
              <p className="text-xs text-text-muted">
                {dict.modals.savedCases.subtitle}
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

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-12 text-center text-xs text-text-muted">
              {dict.modals.savedCases.loading}
            </div>
          ) : sessions.length === 0 ? (
            <div className="py-12 text-center text-xs text-text-muted space-y-2">
              <p className="font-bold text-text-primary">{dict.modals.savedCases.emptyTitle}</p>
              <p>{dict.modals.savedCases.emptyDesc}</p>
            </div>
          ) : (
            sessions.map((sess) => {
              const isFinancial = sess.flowType === "financial_fraud";
              return (
                <div
                  key={sess.id}
                  className="bg-surface-section border border-stone-200/60 hover:border-brand-primary rounded-xl p-4 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isFinancial ? "bg-indigo-50 text-brand-primary" : "bg-amber-50 text-brand-warning"
                      }`}>
                        {isFinancial ? <Zap className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-text-primary block">
                          {isFinancial ? dict.modals.covertMerge.financialOption : dict.modals.covertMerge.digitalArrestOption}
                        </span>
                        <span className="text-[11px] text-text-muted flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          {new Date(sess.updatedAt).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CaseLedgerBadge caseId={sess.id} />
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        sess.status === "DISPATCHED"
                          ? "bg-emerald-50 text-brand-success border-emerald-200"
                          : "bg-indigo-50 text-brand-primary border-indigo-200"
                      }`}>
                        {sess.status === "DISPATCHED" ? dict.common.verified : "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-surface-card p-2 rounded-lg border border-stone-200/60">
                      <span className="text-[10px] text-text-muted block">{dict.intake.amountLabel}</span>
                      <strong className="text-text-primary font-bold">
                        ₹{(sess.profile.fraudAmount || sess.profile.extortionDemandAmount || 0).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="bg-surface-card p-2 rounded-lg border border-stone-200/60">
                      <span className="text-[10px] text-text-muted block">{isFinancial ? dict.intake.utrLabel : dict.digitalArrest.callerIdLabel}</span>
                      <strong className="text-text-primary font-mono font-bold truncate block">
                        {isFinancial ? (sess.profile.utrNumber || "N/A") : (sess.profile.scammerCallerId || "N/A")}
                      </strong>
                    </div>

                    <div className="bg-surface-card p-2 rounded-lg border border-stone-200/60">
                      <span className="text-[10px] text-text-muted block">{dict.audit.victimBankLabel}</span>
                      <strong className="text-text-primary truncate block">
                        {sess.profile.victimBank || "Unknown"}
                      </strong>
                    </div>

                    <div className="bg-surface-card p-2 rounded-lg border border-stone-200/60">
                      <span className="text-[10px] text-text-muted block">{dict.audit.victimNameLabel}</span>
                      <strong className="text-brand-success truncate block">
                        {sess.profile.victimName || "Anonymous"}
                      </strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {isFinancial ? (
                        <>
                          <button
                            type="button"
                            onClick={() => sess.auditReport && generateBankFreezePdf(sess.profile, sess.auditReport)}
                            className="px-2.5 py-1 bg-surface-card hover:bg-stone-50 text-text-primary border border-stone-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                          >
                            <Download className="w-3 h-3 text-brand-primary" />
                            <span>Bank Notice PDF</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => sess.auditReport && generatePoliceFirPdf(sess.profile, sess.auditReport)}
                            className="px-2.5 py-1 bg-surface-card hover:bg-stone-50 text-text-primary border border-stone-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                          >
                            <Download className="w-3 h-3 text-text-muted" />
                            <span>FIR PDF</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => generateDigitalArrestFirPdf(sess.profile)}
                          className="px-2.5 py-1 bg-surface-card hover:bg-stone-50 text-text-primary border border-stone-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                        >
                          <Download className="w-3 h-3 text-brand-warning" />
                          <span>Extortion Complaint PDF</span>
                        </button>
                      )}

                      {/* Section 63 BSA Certificate */}
                      {(sess.profile.evidenceHash || sess.profile.serverEvidenceHash) && (
                        <button
                          type="button"
                          onClick={() => generateSection63BsaCertificatePdf(sess.profile)}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-brand-success border border-emerald-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                          title="Statutory Certificate under Section 63(4) Bharatiya Sakshya Adhiniyam 2023"
                        >
                          <Download className="w-3 h-3 text-brand-success" />
                          <span>Sec 63 BSA Cert</span>
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectSession(sess);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95"
                    >
                      <span>{dict.modals.savedCases.resumeBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
