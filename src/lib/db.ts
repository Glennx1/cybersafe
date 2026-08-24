import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { IncidentProfile, ForensicAuditReport, DispatchPayload, FlowType } from './types';

export interface User {
  id: string;
  phone: string;
  password: string; // Stored securely
  name: string;
  createdAt: string;
}

export type LedgerEventType = 
  | 'case_created' 
  | 'case_updated' 
  | 'evidence_uploaded' 
  | 'status_changed' 
  | 'document_generated';

export interface CaseLedgerEntry {
  caseId: string;
  sequenceNumber: number;
  timestamp: string; // Server-generated ISO string
  eventType: LedgerEventType;
  payloadHash: string; // SHA-256 of the event's data
  previousEntryHash: string;
  entryHash: string; // SHA-256 of (previousEntryHash + eventType + payloadHash + timestamp)
}

export interface UserSessionRecord {
  id: string;
  userId: string;
  flowType: FlowType;
  profile: IncidentProfile;
  auditReport?: ForensicAuditReport;
  payload?: DispatchPayload | null;
  screenshotDataUrl?: string;
  isSubmitted: boolean;
  status: 'DRAFT' | 'AUDITED' | 'DISPATCHED';
  createdAt: string;
  updatedAt: string;
}

interface DatabaseSchema {
  users: User[];
  sessions: UserSessionRecord[];
  ledger?: Record<string, CaseLedgerEntry[]>;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cybersafe_db.json');

export function computeSha256(data: string | object): string {
  const content = typeof data === 'string' ? data : JSON.stringify(data);
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function computeEntryHash(
  previousEntryHash: string,
  eventType: LedgerEventType,
  payloadHash: string,
  timestamp: string
): string {
  return crypto
    .createHash('sha256')
    .update(`${previousEntryHash}:${eventType}:${payloadHash}:${timestamp}`)
    .digest('hex');
}

// Ensure data directory exists
function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      users: [
        {
          id: 'USR-DEFAULT-001',
          phone: '9999999999',
          password: 'password123',
          name: 'Citizen Demo User',
          createdAt: new Date().toISOString()
        }
      ],
      sessions: [],
      ledger: {}
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readDb(): DatabaseSchema {
  ensureDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed: DatabaseSchema = JSON.parse(data);
    if (!parsed.ledger) {
      parsed.ledger = {};
    }
    return parsed;
  } catch (e) {
    console.error('Error reading database file, recreating:', e);
    ensureDb();
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed: DatabaseSchema = JSON.parse(data);
    if (!parsed.ledger) {
      parsed.ledger = {};
    }
    return parsed;
  }
}

function writeDb(data: DatabaseSchema) {
  ensureDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Ledger Append & Verification Functions
export function getLedgerByCaseId(caseId: string): CaseLedgerEntry[] {
  const db = readDb();
  return db.ledger?.[caseId] || [];
}

export function appendLedgerEntry(
  caseId: string,
  eventType: LedgerEventType,
  eventData: any
): CaseLedgerEntry {
  const db = readDb();
  if (!db.ledger) {
    db.ledger = {};
  }
  if (!db.ledger[caseId]) {
    db.ledger[caseId] = [];
  }

  const chain = db.ledger[caseId];
  const sequenceNumber = chain.length;
  const timestamp = new Date().toISOString(); // Server-generated
  const payloadHash = computeSha256(eventData);
  const previousEntryHash = sequenceNumber === 0 
    ? '0000000000000000000000000000000000000000000000000000000000000000' 
    : chain[sequenceNumber - 1].entryHash;

  const entryHash = computeEntryHash(previousEntryHash, eventType, payloadHash, timestamp);

  const newEntry: CaseLedgerEntry = {
    caseId,
    sequenceNumber,
    timestamp,
    eventType,
    payloadHash,
    previousEntryHash,
    entryHash
  };

  chain.push(newEntry);
  writeDb(db);
  return newEntry;
}

export function verifyLedger(caseId: string): { valid: boolean; brokenAtSequence?: number; count: number; reason?: string } {
  const db = readDb();
  const chain = db.ledger?.[caseId] || [];

  if (chain.length === 0) {
    return { valid: true, count: 0 };
  }

  let expectedPrevHash = '0000000000000000000000000000000000000000000000000000000000000000';

  for (let i = 0; i < chain.length; i++) {
    const entry = chain[i];

    // Check sequence alignment
    if (entry.sequenceNumber !== i) {
      return { valid: false, brokenAtSequence: i, count: chain.length, reason: `Sequence gap at index ${i}` };
    }

    // Check previous hash link
    if (entry.previousEntryHash !== expectedPrevHash) {
      return { valid: false, brokenAtSequence: i, count: chain.length, reason: `Previous hash mismatch at sequence ${i}` };
    }

    // Recompute entry hash
    const recomputedHash = computeEntryHash(
      entry.previousEntryHash,
      entry.eventType,
      entry.payloadHash,
      entry.timestamp
    );

    if (entry.entryHash !== recomputedHash) {
      return { valid: false, brokenAtSequence: i, count: chain.length, reason: `Cryptographic hash validation failed at sequence ${i}` };
    }

    expectedPrevHash = entry.entryHash;
  }

  return { valid: true, count: chain.length };
}

// User CRUD
export function findUserByPhone(phone: string): User | undefined {
  const db = readDb();
  const normalizedPhone = phone.replace(/[^0-9]/g, '');
  return db.users.find(u => u.phone.replace(/[^0-9]/g, '') === normalizedPhone);
}

export function findUserById(id: string): User | undefined {
  const db = readDb();
  return db.users.find(u => u.id === id);
}

export function createUser(phone: string, password: string, name: string): User {
  const db = readDb();
  const normalizedPhone = phone.replace(/[^0-9]/g, '');
  const existing = db.users.find(u => u.phone.replace(/[^0-9]/g, '') === normalizedPhone);
  if (existing) {
    throw new Error('An account with this phone number already exists.');
  }

  const newUser: User = {
    id: `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    phone: normalizedPhone,
    password,
    name: name || 'Citizen User',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

// Session CRUD
export function getSessionsByUserId(userId: string): UserSessionRecord[] {
  const db = readDb();
  return db.sessions
    .filter(s => s.userId === userId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getSessionById(sessionId: string): UserSessionRecord | undefined {
  const db = readDb();
  return db.sessions.find(s => s.id === sessionId);
}

export function saveUserSession(sessionData: {
  id: string;
  userId: string;
  flowType: FlowType;
  profile: IncidentProfile;
  auditReport?: ForensicAuditReport;
  payload?: DispatchPayload | null;
  screenshotDataUrl?: string;
  isSubmitted?: boolean;
}): UserSessionRecord {
  const db = readDb();
  const now = new Date().toISOString();
  const existingIndex = db.sessions.findIndex(s => s.id === sessionData.id);

  const status: 'DRAFT' | 'AUDITED' | 'DISPATCHED' = sessionData.isSubmitted
    ? 'DISPATCHED'
    : sessionData.auditReport && sessionData.auditReport.overallCompletenessScore > 0
    ? 'AUDITED'
    : 'DRAFT';

  if (existingIndex >= 0) {
    const existing = db.sessions[existingIndex];
    const isStatusChanged = existing.status !== status;
    const isEvidenceAdded = !existing.profile?.evidenceHash && !!sessionData.profile?.evidenceHash;

    const updated: UserSessionRecord = {
      ...existing,
      ...sessionData,
      screenshotDataUrl: sessionData.screenshotDataUrl || existing.screenshotDataUrl,
      isSubmitted: sessionData.isSubmitted ?? existing.isSubmitted,
      status,
      updatedAt: now
    };
    db.sessions[existingIndex] = updated;
    writeDb(db);

    // Determine eventType for audit ledger
    let eventType: LedgerEventType = 'case_updated';
    if (isStatusChanged) {
      eventType = 'status_changed';
    } else if (isEvidenceAdded) {
      eventType = 'evidence_uploaded';
    }

    appendLedgerEntry(sessionData.id, eventType, {
      profile: sessionData.profile,
      status,
      isSubmitted: updated.isSubmitted,
      auditCompletenessScore: sessionData.auditReport?.overallCompletenessScore
    });

    return updated;
  } else {
    const newSession: UserSessionRecord = {
      id: sessionData.id,
      userId: sessionData.userId,
      flowType: sessionData.flowType,
      profile: sessionData.profile,
      auditReport: sessionData.auditReport,
      payload: sessionData.payload || null,
      screenshotDataUrl: sessionData.screenshotDataUrl,
      isSubmitted: sessionData.isSubmitted || false,
      status,
      createdAt: now,
      updatedAt: now
    };
    db.sessions.push(newSession);
    writeDb(db);

    // Append initial genesis creation block to audit ledger
    appendLedgerEntry(sessionData.id, 'case_created', {
      userId: sessionData.userId,
      flowType: sessionData.flowType,
      profile: sessionData.profile,
      status,
      createdAt: now
    });

    return newSession;
  }
}

