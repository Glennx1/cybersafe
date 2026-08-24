import { NextResponse } from 'next/server';
import { verifyLedger, getLedgerByCaseId, getSessionById } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const caseId = params.id;
    if (!caseId) {
      return NextResponse.json(
        { success: false, message: 'Case ID is required' },
        { status: 400 }
      );
    }

    const session = getSessionById(caseId);
    const verification = verifyLedger(caseId);
    const ledger = getLedgerByCaseId(caseId);

    return NextResponse.json({
      success: true,
      caseId,
      exists: !!session,
      verification,
      ledgerLength: ledger.length,
      latestHash: ledger.length > 0 ? ledger[ledger.length - 1].entryHash : null,
      ledger
    });
  } catch (error: any) {
    console.error('Error verifying case ledger:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
