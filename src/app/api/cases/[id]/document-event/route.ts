import { NextResponse } from 'next/server';
import { appendLedgerEntry, getSessionById } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseId, documentType, fileName, metadata } = body;

    if (!caseId || !documentType) {
      return NextResponse.json(
        { success: false, message: 'Missing caseId or documentType' },
        { status: 400 }
      );
    }

    const session = getSessionById(caseId);
    const entry = appendLedgerEntry(caseId, 'document_generated', {
      documentType,
      fileName: fileName || `${documentType}_${caseId}.pdf`,
      metadata: metadata || {},
      generatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: `Document generation logged in audit ledger`,
      entry
    });
  } catch (error: any) {
    console.error('Error logging document generation in ledger:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record document event' },
      { status: 500 }
    );
  }
}
