import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { appendLedgerEntry } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const clientHash = formData.get('clientHash') as string | null;
    const caseId = formData.get('caseId') as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // 1. Server-side independent SHA-256 computation
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const serverHash = crypto.createHash('sha256').update(buffer).digest('hex');

    const serverTimestamp = new Date().toISOString();
    const hashMismatch = !!clientHash && clientHash.toLowerCase() !== serverHash.toLowerCase();

    // 2. Log in cryptographic case audit ledger if caseId is provided
    let ledgerEntry = null;
    if (caseId) {
      ledgerEntry = appendLedgerEntry(caseId, 'evidence_uploaded', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        serverHash,
        clientHash: clientHash || null,
        hashMismatch,
        serverTimestamp
      });
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'image/png',
      serverHash,
      clientHash,
      hashMismatch,
      serverTimestamp,
      ledgerEntry
    });
  } catch (error: any) {
    console.error('Error processing evidence upload & server hashing:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Server hashing failed' },
      { status: 500 }
    );
  }
}
