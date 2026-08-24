/**
 * Client-Side IndexedDB Storage Engine for Zero-Network Covert Help Session Capture.
 * Operates completely offline without any API/network request during the call.
 */

export interface CovertNote {
  id: string;
  text: string;
  deviceTimestamp: string; // ISO string from local device clock
}

export interface CovertSession {
  id: string;
  startedAt: string; // ISO string from local device clock
  notes: CovertNote[];
  status: 'ACTIVE' | 'MERGED';
}

const DB_NAME = 'cybersafe_covert_vault';
const STORE_NAME = 'covert_sessions';
const DB_VERSION = 1;

function openCovertDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieves the currently active covert session, or creates a new one if none exists.
 */
export async function getOrCreateCovertSession(): Promise<CovertSession> {
  const db = await openCovertDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getAllReq = store.getAll();

    getAllReq.onsuccess = () => {
      const all: CovertSession[] = getAllReq.result || [];
      const active = all.find((s) => s.status === 'ACTIVE');
      if (active) {
        resolve(active);
      } else {
        const newSession: CovertSession = {
          id: `COVERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          startedAt: new Date().toISOString(),
          notes: [],
          status: 'ACTIVE'
        };
        store.put(newSession);
        resolve(newSession);
      }
    };

    getAllReq.onerror = () => reject(getAllReq.error);
  });
}

/**
 * Appends a quick-note to the active covert session in IndexedDB.
 */
export async function appendCovertNote(text: string): Promise<CovertSession> {
  const db = await openCovertDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getAllReq = store.getAll();

    getAllReq.onsuccess = () => {
      const all: CovertSession[] = getAllReq.result || [];
      let active = all.find((s) => s.status === 'ACTIVE');

      if (!active) {
        active = {
          id: `COVERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          startedAt: new Date().toISOString(),
          notes: [],
          status: 'ACTIVE'
        };
      }

      const note: CovertNote = {
        id: `NOTE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        text: text.trim(),
        deviceTimestamp: new Date().toISOString()
      };

      active.notes.push(note);
      store.put(active);
      resolve(active);
    };

    getAllReq.onerror = () => reject(getAllReq.error);
  });
}

/**
 * Checks if there are any unmerged active covert sessions.
 */
export async function getUnmergedCovertSessions(): Promise<CovertSession[]> {
  try {
    const db = await openCovertDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getAllReq = store.getAll();

      getAllReq.onsuccess = () => {
        const all: CovertSession[] = getAllReq.result || [];
        const unmerged = all.filter((s) => s.status === 'ACTIVE' && s.notes.length > 0);
        resolve(unmerged);
      };

      getAllReq.onerror = () => reject(getAllReq.error);
    });
  } catch (err) {
    console.warn('Covert IndexedDB check skipped:', err);
    return [];
  }
}

/**
 * Clears or marks a covert session as MERGED in IndexedDB.
 */
export async function clearCovertSession(sessionId: string): Promise<void> {
  try {
    const db = await openCovertDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(sessionId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to clear covert session from IndexedDB:', err);
  }
}
