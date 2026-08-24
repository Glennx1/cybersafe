/**
 * Helper to log one-tap user actions to the tamper-evident case ledger.
 * Non-blocking and fails gracefully if offline or unauthenticated.
 */
export async function logCaseAction(
  caseId: string,
  eventType: 
    | 'user_initiated_1930_call'
    | 'user_emailed_bank'
    | 'user_copied_ncrp_statement'
    | 'user_shared_document',
  payload: Record<string, any> = {}
): Promise<void> {
  if (!caseId) return;

  try {
    await fetch(`/api/cases/${caseId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, payload })
    });
  } catch (err) {
    console.warn(`[Audit Ledger] Failed to log action event ${eventType}:`, err);
  }
}
