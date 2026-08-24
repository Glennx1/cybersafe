"use client";

import React, { useState, useEffect } from "react";
import { X, FolderClock, ArrowRight, ShieldAlert, Zap, Calendar, CheckCircle2, FileText, Download } from "lucide-react";
import { UserSessionRecord } from "@/lib/db";
import { generateBankFreezePdf, generatePoliceFirPdf, generateMagistratePetitionPdf, generateDigitalArrestFirPdf, generateSection63BsaCertificatePdf } from "@/lib/pdfGenerator";
import { CaseLedgerBadge } from "./CaseLedgerBadge";

interface SavedCasesModalProps {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
  onSelectSession: (session: UserSessionRecord) => void;
}

export const SavedCasesModal: React.FC<SavedCasesModalProps> = ({
  isOpen,
  userId,
  onClose,
  onSelectSession
}) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-800 border border-slate-200 rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-7 max-h-[85vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold">
              <FolderClock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Your Linked Incident Cases
              </h3>
              <p className="text-xs text-slate-500">
                Stored persistently in the database under your phone account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Loading your linked sessions from database...
            </div>
          ) : sessions.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <p className="font-bold text-slate-700">No past cases recorded yet.</p>
              <p>When you enter incident details or upload screenshots, they will automatically save to your database.</p>
            </div>
          ) : (
            sessions.map((sess) => {
              const isFinancial = sess.flowType === "financial_fraud";
              return (
                <div
                  key={sess.id}
                  className="bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-xl p-4 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isFinancial ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-800"
                      }`}>
                        {isFinancial ? <Zap className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">
                          {isFinancial ? "Financial Cyber Theft" : "Extortion & Digital Arrest"}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(sess.updatedAt).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CaseLedgerBadge caseId={sess.id} />
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        sess.status === "DISPATCHED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200"
                      }`}>
                        {sess.status === "DISPATCHED" ? "Dispatched" : "Saved Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Fraud Amount</span>
                      <strong className="text-slate-900 font-bold">
                        ₹{(sess.profile.fraudAmount || sess.profile.extortionDemandAmount || 0).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Banking UTR</span>
                      <strong className="text-slate-900 font-mono font-bold truncate block">
                        {sess.profile.utrNumber || "N/A"}
                      </strong>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Bank Name</span>
                      <strong className="text-slate-900 truncate block">
                        {sess.profile.victimBank || "Unknown"}
                      </strong>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Evidence File</span>
                      <strong className="text-emerald-700 truncate block">
                        {sess.profile.evidenceFileName ? "Screenshot Attached" : "Manual Log"}
                      </strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {isFinancial ? (
                        <>
                          <button
                            type="button"
                            onClick={() => sess.auditReport && generateBankFreezePdf(sess.profile, sess.auditReport)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                          >
                            <Download className="w-3 h-3 text-indigo-600" />
                            <span>Bank Notice PDF</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => sess.auditReport && generatePoliceFirPdf(sess.profile, sess.auditReport)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                          >
                            <Download className="w-3 h-3 text-slate-600" />
                            <span>FIR PDF</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => generateDigitalArrestFirPdf(sess.profile)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                        >
                          <Download className="w-3 h-3 text-amber-600" />
                          <span>Extortion Complaint PDF</span>
                        </button>
                      )}

                      {/* Section 63 BSA Certificate */}
                      {(sess.profile.evidenceHash || sess.profile.serverEvidenceHash) && (
                        <button
                          type="button"
                          onClick={() => generateSection63BsaCertificatePdf(sess.profile)}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-medium flex items-center gap-1"
                          title="Statutory Certificate under Section 63(4) Bharatiya Sakshya Adhiniyam 2023"
                        >
                          <Download className="w-3 h-3 text-emerald-700" />
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
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition-all active:scale-95"
                    >
                      <span>Resume Case</span>
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
