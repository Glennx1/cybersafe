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
      <div 
        role="status" 
        aria-live="polite" 
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-section text-text-muted text-[10px] font-medium border border-stone-200/80 ${className}`}
      >
        <Loader2 className="w-3 h-3 animate-spin text-brand-primary" aria-hidden="true" />
        <span>Verifying Ledger Chain...</span>
      </div>
    );
  }

  if (valid === true) {
    return (
      <div 
        role="status" 
        aria-live="polite" 
        className={`inline-flex flex-col gap-1 ${className}`}
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-brand-success text-[11px] font-bold border border-emerald-200 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-success shrink-0" aria-hidden="true" />
          <span>Chain of Custody: Verified ✓</span>
          {entryCount > 0 && (
            <span className="text-[10px] bg-emerald-100 text-brand-success px-1.5 py-0.2 rounded-full font-mono">
              {entryCount} {entryCount === 1 ? 'block' : 'blocks'}
            </span>
          )}
        </div>
        {showDetails && latestHash && (
          <span className="text-[10px] font-mono text-text-muted truncate max-w-[280px]">
            Root Hash: {latestHash.substring(0, 16)}...
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-brand-urgent text-[11px] font-bold border border-red-200 shadow-xs">
        <ShieldAlert className="w-3.5 h-3.5 text-brand-urgent shrink-0" />
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
