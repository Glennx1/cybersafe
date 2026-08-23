import { NextResponse } from 'next/server';
import { getSessionsByUserId, saveUserSession, getSessionById } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      const session = getSessionById(sessionId);
      if (!session) {
        return NextResponse.json({ success: false, message: 'Session not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, session });
    }

    if (!userId) {
      return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
    }

    const sessions = getSessionsByUserId(userId);
    return NextResponse.json({ success: true, sessions });
  } catch (error: any) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, id, flowType, profile, auditReport, payload, screenshotDataUrl, isSubmitted } = body;

    if (!userId || !id || !profile) {
      return NextResponse.json({ success: false, message: 'Missing required session parameters' }, { status: 400 });
    }

    const session = saveUserSession({
      id,
      userId,
      flowType: flowType || 'financial_fraud',
      profile,
      auditReport,
      payload,
      screenshotDataUrl,
      isSubmitted
    });

    return NextResponse.json({ success: true, session });
  } catch (error: any) {
    console.error('Error saving session:', error);
    return NextResponse.json({ success: false, message: 'Failed to save session' }, { status: 500 });
  }
}
