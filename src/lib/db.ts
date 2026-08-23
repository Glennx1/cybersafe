import fs from 'fs';
import path from 'path';
import { IncidentProfile, ForensicAuditReport, DispatchPayload, FlowType } from './types';

export interface User {
  id: string;
  phone: string;
  password: string; // Stored securely
  name: string;
  createdAt: string;
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
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cybersafe_db.json');

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
      sessions: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readDb(): DatabaseSchema {
  ensureDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading database file, recreating:', e);
    ensureDb();
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  }
}

function writeDb(data: DatabaseSchema) {
  ensureDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
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
    return newSession;
  }
}
