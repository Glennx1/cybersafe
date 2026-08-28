/**
 * CyberRakshak 1930 — Hackathon Video Script PDF Generator
 * Generates a professional two-column video script PDF
 * Run: npx tsx scripts/generate-pitch-script.mts
 */
import jsPDFModule from "jspdf";
import { writeFileSync } from "fs";
import { join } from "path";

// Handle ESM/CJS interop
const jsPDF = (jsPDFModule as any).default || jsPDFModule;

const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

// ── Metadata ──────────────────────────────────────────
doc.setProperties({
  title: "CyberRakshak 1930 — 2-Minute Hackathon Video Script",
  subject: "Hackathon Presentation Script with Stage Directions",
  author: "Team CyberRakshak",
  creator: "CyberRakshak Script Generator",
});

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_L = 14;
const MARGIN_R = 14;
const COL_LEFT_W = 68;  // stage direction column
const COL_RIGHT_X = MARGIN_L + COL_LEFT_W + 4;
const COL_RIGHT_W = PAGE_W - COL_RIGHT_X - MARGIN_R;
const LINE_H = 4.2;

let y = 0;

// ── Helpers ───────────────────────────────────────────
function checkPage(needed: number) {
  if (y + needed > PAGE_H - 18) {
    doc.addPage();
    y = 18;
    // subtle header repeat
    doc.setDrawColor(30, 27, 75);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_L, 14, PAGE_W - MARGIN_R, 14);
    y = 18;
  }
}

function drawTitle() {
  // Header band
  doc.setFillColor(30, 27, 75); // brand-navy
  doc.rect(0, 0, PAGE_W, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("CYBERRAKSHAK 1930", MARGIN_L, 14);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("2-MINUTE HACKATHON VIDEO SCRIPT — STAGE DIRECTIONS + NARRATION", MARGIN_L, 20);
  doc.setFontSize(8);
  doc.text("Format: Two Presenters | Strict 2:00 | Live Demo at cybersafe-azure.vercel.app", MARGIN_L, 26);
  y = 38;
  doc.setTextColor(0, 0, 0);
}

function sectionHeader(timestamp: string, title: string, presenter?: string) {
  checkPage(14);
  // colored bar
  doc.setFillColor(238, 242, 255); // indigo-50
  doc.rect(MARGIN_L, y - 1, PAGE_W - MARGIN_L - MARGIN_R, 8, "F");
  doc.setDrawColor(30, 27, 75);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_L, y - 1, MARGIN_L, y + 7);

  doc.setTextColor(30, 27, 75);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const headerText = presenter
    ? `${timestamp}  ${title}    [${presenter}]`
    : `${timestamp}  ${title}`;
  doc.text(headerText, MARGIN_L + 3, y + 4);
  y += 11;
  doc.setTextColor(0, 0, 0);
}

function colHeaders() {
  checkPage(8);
  doc.setFillColor(245, 245, 245);
  doc.rect(MARGIN_L, y - 1, COL_LEFT_W, 6, "F");
  doc.rect(COL_RIGHT_X, y - 1, COL_RIGHT_W, 6, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 100);
  doc.text("STAGE DIRECTION", MARGIN_L + 2, y + 3);
  doc.text("SPOKEN NARRATION", COL_RIGHT_X + 2, y + 3);
  y += 8;
  doc.setTextColor(0, 0, 0);
}

function twoCol(stageDir: string, narration: string, isBold?: boolean) {
  doc.setFontSize(7.5);

  // Wrap both columns
  doc.setFont("helvetica", "italic");
  const leftLines = doc.splitTextToSize(stageDir, COL_LEFT_W - 4);

  doc.setFont("helvetica", isBold ? "bold" : "normal");
  const rightLines = doc.splitTextToSize(narration, COL_RIGHT_W - 4);

  const maxLines = Math.max(leftLines.length, rightLines.length);
  const blockH = maxLines * LINE_H + 2;
  checkPage(blockH + 2);

  // Light divider
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.15);
  doc.line(MARGIN_L, y - 1, PAGE_W - MARGIN_R, y - 1);

  // Stage direction (gray italic)
  doc.setFont("helvetica", "italic");
  doc.setTextColor(80, 80, 80);
  for (let i = 0; i < leftLines.length; i++) {
    doc.text(leftLines[i], MARGIN_L + 2, y + 2 + i * LINE_H);
  }

  // Narration (black)
  doc.setFont("helvetica", isBold ? "bold" : "normal");
  doc.setTextColor(20, 20, 20);
  for (let i = 0; i < rightLines.length; i++) {
    doc.text(rightLines[i], COL_RIGHT_X + 2, y + 2 + i * LINE_H);
  }

  // Vertical separator
  doc.setDrawColor(30, 27, 75);
  doc.setLineWidth(0.2);
  doc.line(COL_RIGHT_X - 2, y - 1, COL_RIGHT_X - 2, y + blockH);

  y += blockH + 1;
}

function pauseMarker() {
  checkPage(6);
  doc.setFillColor(255, 243, 224); // warm amber bg
  doc.rect(COL_RIGHT_X, y - 1, 30, 5, "F");
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.3);
  doc.rect(COL_RIGHT_X, y - 1, 30, 5, "S");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 83, 9);
  doc.text("(PAUSE — let it land)", COL_RIGHT_X + 2, y + 2.5);
  y += 7;
  doc.setTextColor(0, 0, 0);
}

function fullWidthNote(text: string) {
  checkPage(10);
  const w = PAGE_W - MARGIN_L - MARGIN_R;
  doc.setFillColor(240, 253, 244); // green-50
  doc.rect(MARGIN_L, y, w, 6, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 101, 52);
  doc.text(text, MARGIN_L + 3, y + 4);
  y += 9;
  doc.setTextColor(0, 0, 0);
}

// ══════════════════════════════════════════════════════
// BUILD THE SCRIPT
// ══════════════════════════════════════════════════════

drawTitle();

// ── MINUTE 1 HEADER ──
doc.setFillColor(30, 27, 75);
doc.rect(MARGIN_L, y, PAGE_W - MARGIN_L - MARGIN_R, 7, "F");
doc.setTextColor(255, 255, 255);
doc.setFontSize(9);
doc.setFont("helvetica", "bold");
doc.text("MINUTE 1 — THE CITIZEN JOURNEY (0:00–1:00)  •  LIVE DEMO  •  [PRESENTER 1]", MARGIN_L + 3, y + 5);
y += 11;
doc.setTextColor(0, 0, 0);

// ── BEAT 1 ──
sectionHeader("(0:00–0:12)", "BEAT 1 — OPEN WITH THE REAL PROBLEM", "PRESENTER 1");
colHeaders();

twoCol(
  "[Camera on Presenter 1. No slides. Laptop shows cybersafe-azure.vercel.app landing page behind them. Presenter speaks directly to camera.]",
  ""
);

twoCol(
  "[Steady eye contact with camera. No smiling — this is serious.]",
  "In January 2024, a retired ISRO scientist received a video call from someone claiming to be a CBI officer. They told him he was under 'digital arrest.' In 48 hours, he transferred 1.2 crore rupees — his entire life savings — to accounts he would never recover."
);

twoCol(
  "[Slight lean forward. Shift tone from story to conviction.]",
  "Every tool that exists today gave that person a form to fill. We had 10 minutes to save their money. Here is what we built."
);

// ── BEAT 2 ──
sectionHeader("(0:12–0:25)", "BEAT 2 — RECORD LIVE (PRE-LOGIN)", "PRESENTER 1");
colHeaders();

twoCol(
  "[Turn to screen. Point to the floating pill at bottom-right: 'Being scammed right now? Record Live'. Click it. Show the Live Capture overlay opening.]",
  "This button exists before you sign in. Zero friction. A victim mid-scam-call app-switches to this page, hits record, whispers key details — the caller ID, the demand amount, what they said."
);

twoCol(
  "[Show the REC indicator counting up. Point at the 'Saved to device only' badge.]",
  "Audio goes only to on-device IndexedDB. Zero network traffic. The scammer never knows. No account needed. When the victim is safe and signs in later, the app auto-detects unsaved covert recordings and merges them into the official case."
);

twoCol(
  "[Tap 'Stop & Save Evidence'. Close overlay.]",
  ""
);

// ── BEAT 3 ──
sectionHeader("(0:25–0:35)", "BEAT 3 — LOGIN + FLOW SELECTION", "PRESENTER 1");
colHeaders();

twoCol(
  "[Click 'Login / Resume Case'. Enter demo credentials: Phone 9999999999, Password password123. Sign in. Flow selector appears with two cards.]",
  "Demo credentials — real auth would use OTP. Two flows: Financial Payment Fraud, and Digital Arrest — the fastest-growing cybercrime category in India right now."
);

twoCol(
  "[Click the 'Digital Arrest & Extortion Shield' card. Navigate into the flow.]",
  "We'll start with Digital Arrest."
);

// ── BEAT 4 ──
sectionHeader("(0:35–0:52)", "BEAT 4 — LEGAL FACT CHECK MATRIX", "PRESENTER 1");
colHeaders();

twoCol(
  "[Navigate to Step 2: the Legal Fact Check Matrix. Scroll slowly through the Myth vs. Reality columns. Point at each row.]",
  "This is the most important feature we built. Digital arrest scams work because they weaponise institutional trust — 79% of Indians trust government authority by default. The scammer knows this."
);

twoCol(
  "[Point at the 'MYTH' column, then sweep to the 'REALITY + LAW' column.]",
  "Our Fact Check Matrix dismantles each threat with the actual statute that disproves it. 'Digital arrest' has zero legal standing in Indian law. BNS 2023 does not define it. No Indian court has ever issued one. We show the victim this — in their own language — in real time."
);

pauseMarker();

twoCol(
  "[If time permits: quickly tap the language selector to Telugu or Hindi to show instant translation of the entire matrix.]",
  "All six Indian regional languages — native script, not machine-translated labels."
);

// ── BEAT 5 ──
sectionHeader("(0:52–1:00)", "BEAT 5 — OCR + EVIDENCE + ONE-TAP DISPATCH", "PRESENTER 1");
colHeaders();

twoCol(
  "[Navigate back to the flow selector. Click 'Financial Cyber Fraud — UPI/NEFT'. Upload a demo screenshot. Show OCR extracting UTR, amount, and VPA. Then navigate to Step 3: Take Action. Show the 1-Tap action buttons.]",
  "Tesseract.js extracts the UTR, amount, and suspect VPA on-device — nothing leaves the phone. A SHA-256 hash and a Section 63(4) BSA 2023 certificate auto-generate for court admissibility. Then — one tap calls 1930 with the script on screen. One tap emails the bank's nodal fraud desk a pre-composed Section 91 BNSS freeze notice. One tap copies the NCRP complaint."
);

// ── HANDOFF ──
fullWidthNote("HANDOFF POINT — Presenter 1 steps back. Presenter 2 steps to camera.");

// ── MINUTE 2 HEADER ──
doc.setFillColor(30, 27, 75);
doc.rect(MARGIN_L, y, PAGE_W - MARGIN_L - MARGIN_R, 7, "F");
doc.setTextColor(255, 255, 255);
doc.setFontSize(9);
doc.setFont("helvetica", "bold");
doc.text("MINUTE 2 — HOW AND WHY WE BUILT IT (1:00–2:00)  •  [PRESENTER 2]", MARGIN_L + 3, y + 5);
y += 11;
doc.setTextColor(0, 0, 0);

// ── BEAT 6 ──
sectionHeader("(1:00–1:18)", "BEAT 6 — THE CORE TECHNICAL CHOICES AND WHY", "PRESENTER 2");
colHeaders();

twoCol(
  "[Presenter 2 speaks to camera. Confident, measured pace. Can gesture at laptop showing the architecture or the app.]",
  "Three core technical decisions — and the reasoning behind each."
);

twoCol(
  "[Hold up one finger.]",
  "First: client-side OCR and on-device hashing. We chose Tesseract.js over a server-side OCR API because evidence files should never leave the victim's device — DPDP Act 2023 compliance — and because a panicking user should not have to trust a server they've never heard of with their banking screenshots."
);

twoCol(
  "[Two fingers.]",
  "Second: a hash-chained case ledger instead of a flat database. Every case mutation — field edit, document generated, action taken — is recorded in an append-only hash chain. This directly addresses the documented failure mode of existing systems: officials closing cases as 'resolved' without acting. The chain makes that detectable."
);

twoCol(
  "[Three fingers.]",
  "Third: Section 63(4) BSA 2023 certificate auto-generation. This is the certificate required for electronic evidence to be admissible in an Indian court. Most lawyers charge to produce it. We auto-generate it at evidence upload. We included it because we read the statute — not because it was in any tutorial."
);

pauseMarker();

// ── BEAT 7 ──
sectionHeader("(1:18–1:33)", "BEAT 7 — END-TO-END THINKING", "PRESENTER 2");
colHeaders();

twoCol(
  "[Speak steadily. This section demonstrates depth.]",
  "This is not just a frontend. The backend runs an independent SHA-256 re-computation on every uploaded file — if the client hash and server hash don't match, the system flags it. Case state flows through a REST API with session persistence."
);

twoCol(
  "[Optional: briefly point at a generated PDF on screen to show structured content.]",
  "Generated PDFs are tagged with correct reading order and document metadata — language tags, logical structure — so a screen reader can parse a blind victim's own FIR aloud. The 1930 call links, the mailto deep links — these are not decorative. They are the difference between a victim completing an action and abandoning it mid-panic."
);

// ── BEAT 8 ──
sectionHeader("(1:33–1:45)", "BEAT 8 — ACCESSIBILITY AS A PRODUCT DECISION", "PRESENTER 2");
colHeaders();

twoCol(
  "[Deliberate, slower delivery. Let the point register.]",
  "We targeted WCAG 2.2 AA because our actual users are not young and tech-savvy. They are elderly. They are panicking. They may be using a screen reader, or need the UI in Kannada, or need text three times larger than default."
);

twoCol(
  "",
  "The Accessibility panel, the 6-language TTS voice readback, the Simplified Panic mode toggle — these are not features we added at the end. They are the product."
);

// ── BEAT 9 ──
sectionHeader("(1:45–2:00)", "BEAT 9 — HONEST LIMITATIONS + CLOSE", "PRESENTER 2");
colHeaders();

twoCol(
  "[Shift to direct, confident honesty. Do not apologize — state facts.]",
  "Three honest limitations."
);

twoCol(
  "",
  "One: demo credentials are hardcoded for judging — real auth would use OTP-based phone verification."
);

twoCol(
  "",
  "Two: the ISL sign language video slots are scaffolded but empty. We did not fake AI-generated signing because it would be linguistically wrong for Deaf users — and that matters more than checking a box."
);

twoCol(
  "",
  "Three: the audio recorder captures the victim's own voice narrating details, not the scammer's call audio — that is an OS-level constraint no web app can bypass. We tell users this explicitly in the UI rather than pretending otherwise."
);

pauseMarker();

twoCol(
  "[Final line. Look directly at camera. Do not rush.]",
  "We did not build a form. We built the thing that exists between a panicking victim and the 10-minute window where their money can still be saved."
);

// ══════════════════════════════════════════════════════
// BACKUP JUDGE Q&A LINES
// ══════════════════════════════════════════════════════
checkPage(60);
y += 4;
doc.setFillColor(30, 27, 75);
doc.rect(MARGIN_L, y, PAGE_W - MARGIN_L - MARGIN_R, 7, "F");
doc.setTextColor(255, 255, 255);
doc.setFontSize(9);
doc.setFont("helvetica", "bold");
doc.text("BACKUP LINES — JUDGE Q&A (One-Sentence Answers)", MARGIN_L + 3, y + 5);
y += 11;
doc.setTextColor(0, 0, 0);

const qaItems = [
  {
    q: "How do you prevent false FIR generation?",
    a: "Every document is hash-chained with timestamps — fabricated evidence breaks the chain and is cryptographically detectable."
  },
  {
    q: "How is this different from cybercrime.gov.in?",
    a: "NCRP is the destination — we are the pre-composed, legally-structured, evidence-certified package that arrives there ready to act on."
  },
  {
    q: "Who is the real target user?",
    a: "A 58-year-old non-English-speaking parent who just lost money and has never filed a police complaint online."
  },
  {
    q: "Why not a native app?",
    a: "A victim mid-panic will not download an app — a URL shared via WhatsApp opens instantly with zero install friction."
  },
  {
    q: "What's in the next version?",
    a: "Real OTP auth, certified ISL sign language video clips, and direct API integration with RBI's CIMS fraud-reporting pipeline."
  }
];

for (const item of qaItems) {
  checkPage(16);

  doc.setFillColor(248, 250, 252);
  const qLines = doc.splitTextToSize(item.q, PAGE_W - MARGIN_L - MARGIN_R - 10);
  const aLines = doc.splitTextToSize(item.a, PAGE_W - MARGIN_L - MARGIN_R - 10);
  const blockH = (qLines.length + aLines.length) * LINE_H + 6;
  doc.rect(MARGIN_L, y, PAGE_W - MARGIN_L - MARGIN_R, blockH, "F");

  // Q
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 27, 75);
  doc.text("Q:", MARGIN_L + 3, y + 4);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  for (let i = 0; i < qLines.length; i++) {
    doc.text(qLines[i], MARGIN_L + 10, y + 4 + i * LINE_H);
  }

  // A
  const aY = y + 4 + qLines.length * LINE_H + 1;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 101, 52);
  doc.text("A:", MARGIN_L + 3, aY);
  doc.setTextColor(20, 20, 20);
  for (let i = 0; i < aLines.length; i++) {
    doc.text(aLines[i], MARGIN_L + 10, aY + i * LINE_H);
  }

  y += blockH + 3;
}

// ── Footer on all pages ──
const totalPages = doc.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text(
    `CyberRakshak 1930 — Hackathon Video Script — Page ${i} of ${totalPages}`,
    PAGE_W / 2,
    PAGE_H - 8,
    { align: "center" }
  );
  doc.text(
    "cybersafe-azure.vercel.app",
    PAGE_W - MARGIN_R,
    PAGE_H - 8,
    { align: "right" }
  );
}

// ── Save ──
const outputPath = join(process.cwd(), "CyberRakshak_Hackathon_Video_Script.pdf");
const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
writeFileSync(outputPath, pdfBuffer);

console.log(`\n✅ PDF generated successfully: ${outputPath}`);
console.log(`   Pages: ${totalPages}`);
console.log(`   Size: ${(pdfBuffer.length / 1024).toFixed(1)} KB\n`);
