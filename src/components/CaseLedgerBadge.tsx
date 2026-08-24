"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, Loader2, Link2, Hash } from "lucide-react";

interface CaseLedgerBadgeProps {
  caseId: string;
  className?: string;
  showDetails?: boolean;
}

export const CaseLedgerBadge: React.FC<CaseLedgerBadgeProps> = ({
  caseId,
  className = "",
  showDetails = false
}) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [brokenAtSequence, setBrokenAtSequence] = useState<number | undefined>(undefined);
  const [entryCount, setEntryCount] = useState<number>(0);
  const [latestHash, setLatestHash] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!caseId) return;

    setLoading(true);
    fetch(`/api/cases/${encodeURIComponent(caseId)}/verify`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.verification) {
          setValid(data.verification.valid);
          setBrokenAtSequence(data.verification.brokenAtSequence);
          setEntryCount(data.verification.count ?? data.ledgerLength ?? 0);
          setLatestHash(data.latestHash);
        } else {
          setValid(false);
        }
      })
      .catch((err) => {
        console.error("Ledger verification check failed:", err);
        if (isMounted) setValid(false);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [caseId]);

  if (loading) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-medium border border-slate-200 ${className}`}>
        <Loader2 className="w-3 h-3 animate-spin text-indigo-600" />
        <span>Verifying Ledger Chain...</span>
      </div>
    );
  }

  if (valid === true) {
    return (
      <div className={`inline-flex flex-col gap-1 ${className}`}>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Chain of Custody: Verified ✓</span>
          {entryCount > 0 && (
            <span className="text-[10px] bg-emerald-100/80 text-emerald-900 px-1.5 py-0.2 rounded-full font-mono">
              {entryCount} {entryCount === 1 ? 'block' : 'blocks'}
            </span>
          )}
        </div>
        {showDetails && latestHash && (
          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[280px]">
            Root Hash: {latestHash.substring(0, 16)}...
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 text-[11px] font-bold border border-rose-200 shadow-xs">
        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
        <span>
          Integrity Check Failed
          {brokenAtSequence !== undefined ? ` (Broken at Block #${brokenAtSequence})` : ""}
        </span>
      </div>
      {showDetails && (
        <span className="text-[10px] text-rose-600 font-medium">
          Cryptographic proof mismatch: Record was modified outside verifiable ledger.
        </span>
      )}
    </div>
  );
};
