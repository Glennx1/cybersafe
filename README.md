# 🛡️ CyberRakshak 1930 — Citizen Cyber Defense Terminal

An on-device, zero-form emergency cyber fraud response & statutory legal action copilot for **Helpline 1930** and **cybercrime.gov.in**.

Built for national hackathons to eliminate human panic, UTR typos, court evidence dismissals, and post-freeze escrow purgatory.

---

## ⚡ Quick Start for Developers

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Clone or extract repository, then enter directory
cd hackathon

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 4. Run Automated Test Suite
To verify that all 21 forensic, cryptographic, PDF, and routing modules are working:
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📱 Covert Help Mode & PWA Disguise

CyberRakshak 1930 features an unauthenticated **Covert Help Mode** designed for single-device emergency situations (e.g. an active Digital Arrest extortion call):

- **Disguised PWA Front-Door**: The application manifests as a fully functional, standard phone **Calculator** in standalone display mode (hiding browser address bars when added to the home screen).
- **Silent Unlock Sequence**: Typing **`1930`** followed by **`=`** secretly activates the offline covert note-logging vault without visual UI alterations.
- **Sub-10s Quick Note Capture**: Tap `M+` or the discreet indicator to quickly log numbers, caller handles, or amounts into offline **IndexedDB** with local device timestamps (zero network calls during the call).
- **Access Normal App**: Press and hold the **`C`** (Clear) button for **2 seconds** to navigate to the normal phone + password login screen.
- **Post-Crisis Merge**: On subsequent normal login, the app automatically detects unsynced covert notes and offers a 1-click import into a new case draft with honest evidentiary labeling (original device timestamps + server sync time).

> [!CAUTION]
> **Remote-Access Advisory**: If the scammer has coerced the victim into installing screen-sharing software (*AnyDesk, TeamViewer, QuickSupport, RustDesk*), they can view the victim's screen in real time. In such situations, victims must **not** use the infected device to seek help, and should instead use a secondary device or alert someone nearby.

---

## 🚀 Key Architectural Features

1. **Dual-Engine Crisis Architecture:**
   - `⚡ Financial Cyber Fraud`: 3-second OCR intake, 12-digit UTR regex, Sec 91 BNSS bank freeze notice, Sec 503 BNSS magistrate petition.
   - `🛡️ Digital Arrest & Extortion Shield`: AI forgery radar, legal deconstruction proof room, DoT Chakshu SIM revocation relay, Sec 204/319 BNS impersonation FIR.
2. **On-Device Cryptographic Integrity (Sec 63 BSA 2023):**
   - Calculates native `SHA-256` checksums on all uploaded evidence via Web Crypto API.
3. **Verified Bank Nodal Registry (`src/lib/bankRegistry.ts`):**
   - Built-in directory of 15+ Indian Bank Cyber Fraud desks with direct Gmail / Outlook web dispatch deep links.
4. **Live 1930 Speech Teleprompter:**
   - Uses browser Web Speech API to provide real-time word-matching highlights as the citizen speaks to the 1930 operator.
5. **DPDP Act 2023 Compliant:**
   - 100% client-side WASM OCR and hashing. Zero citizen banking PII stored on remote cloud servers.

---

## 📁 Key File Map

- `src/app/page.tsx` — Main Dual-Engine State Router & Hero Crisis Switchboard
- `src/components/Header.tsx` — Emergency Ticker & Adaptive Stepper
- `src/components/WizardStep1Intake.tsx` — Financial Fraud OCR Intake Bay
- `src/components/WizardStep2Audit.tsx` — Forensic Vector Audit & Verification Matrix
- `src/components/WizardStep3Action.tsx` — 4-Stage Judicial Roadmap & PDF Legal Slips
- `src/components/DigitalArrestStep1Intake.tsx` — Forgery Radar Scanner
- `src/components/DigitalArrestStep2Audit.tsx` — Statutory Deconstruction & Legal Proof Room
- `src/components/DigitalArrestStep3Action.tsx` — Extortion De-escalation & DoT Chakshu Ban
- `src/components/BankEmailDispatchModal.tsx` — 1-Click Bank Fraud Desk Email Dispatcher
- `src/components/TeleScriptModal.tsx` — Web Speech 1930 Operator Teleprompter
- `src/lib/bankRegistry.ts` — Indian Bank Fraud Nodal Officer Registry
- `src/lib/pdfGenerator.ts` — Statutory jsPDF Legal Document Engines (BNS & BNSS 2023)
- `src/lib/forensicEngine.ts` — PII Sanitizer & RBI Zero-Liability Calculation Engine
- `test_runner.mjs` — Comprehensive 21-test automated verification suite