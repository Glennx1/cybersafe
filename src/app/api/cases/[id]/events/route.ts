import { NextResponse } from 'next/server';
import { appendLedgerEntry, LedgerEventType } from '@/lib/db';

export async function POST(
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

    const body = await request.json();
    const eventType: LedgerEventType = body.eventType;
    const payload = body.payload || {};

    if (!eventType) {
      return NextResponse.json(
        { success: false, message: 'eventType is required' },
        { status: 400 }
      );
    }

    const entry = appendLedgerEntry(caseId, eventType, {
      ...payload,
      clientActionTimestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      caseId,
      entry
    });
  } catch (error: any) {
    console.error('Error logging case event:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to log event' },
      { status: 500 }
    );
  }
}
