/**
 * CyberRakshak 1930 — 1-Minute (60-Second) Hackathon Video Pitch Script Generator
 * Generates an ultra-crisp, dot-to-dot two-column video script PDF (30s Fraud + 30s Digital Arrest).
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
  title: "CyberRakshak 1930 — 1-Minute Video Pitch Script",
  subject: "60-Second Dot-to-Dot Hackathon Demo Script",
  author: "Team CyberRakshak",
  creator: "CyberRakshak Script Generator",
});

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_L = 14;
const MARGIN_R = 14;
const COL_LEFT_W = 75;  // stage direction column
const COL_RIGHT_X = MARGIN_L + COL_LEFT_W + 5;
const COL_RIGHT_W = PAGE_W - COL_RIGHT_X - MARGIN_R;
const LINE_H = 4.0;

let y = 0;

function checkPage(needed: number) {
  if (y + needed > PAGE_H - 18) {
    doc.addPage();
    y = 18;
    doc.setDrawColor(30, 27, 75);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_L, 14, PAGE_W - MARGIN_R, 14);
  }
}

function drawTitle() {
  doc.setFillColor(30, 27, 75); // brand-navy
  doc.rect(0, 0, PAGE_W, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("CYBERRAKSHAK 1930", MARGIN_L, 12);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("1-MINUTE (60s) HACKATHON VIDEO PITCH — 30s FRAUD + 30s DIGITAL ARREST", MARGIN_L, 18);
  doc.setFontSize(7.5);
  doc.text("Strict 60 Seconds | Dot-to-Dot Screen Actions + Spoken Narration | Live at cybersafe-azure.vercel.app", MARGIN_L, 24);
  y = 35;
  doc.setTextColor(0, 0, 0);
}

function sectionHeader(timestamp: string, title: string, badge: string) {
  checkPage(12);
  doc.setFillColor(238, 242, 255); // indigo-50
  doc.rect(MARGIN_L, y - 1, PAGE_W - MARGIN_L - MARGIN_R, 7.5, "F");
  doc.setDrawColor(30, 27, 75);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_L, y - 1, MARGIN_L, y + 6.5);

  doc.setTextColor(30, 27, 75);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text(`${timestamp}  ${title}`, MARGIN_L + 3, y + 4);

  doc.setFontSize(7.5);
  doc.setTextColor(79, 70, 229);
  doc.text(`[${badge}]`, PAGE_W - MARGIN_R - 35, y + 4);

  y += 10;
  doc.setTextColor(0, 0, 0);
}

function colHeaders() {
  checkPage(8);
  doc.setFillColor(245, 245, 245);
  doc.rect(MARGIN_L, y - 1, COL_LEFT_W, 5.5, "F");
  doc.rect(COL_RIGHT_X, y - 1, COL_RIGHT_W, 5.5, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 100);
  doc.text("EXACT SCREEN ACTION (SHOW THIS)", MARGIN_L + 2, y + 3);
  doc.text("EXACT SPOKEN NARRATION (SAY THIS)", COL_RIGHT_X + 2, y + 3);
  y += 7.5;
  doc.setTextColor(0, 0, 0);
}

function twoCol(stageDir: string, narration: string, isBold?: boolean) {
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  const leftLines: string[] = doc.splitTextToSize(stageDir, COL_LEFT_W - 2);

  doc.setFont("helvetica", isBold ? "bold" : "normal");
  const rightLines: string[] = doc.splitTextToSize(narration, COL_RIGHT_W - 2);

  const maxLines = Math.max(leftLines.length, rightLines.length);
  const blockH = maxLines * LINE_H + 2.5;
  checkPage(blockH);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(leftLines, MARGIN_L + 1, y + LINE_H - 1);

  if (isBold) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
  } else {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
  }
  doc.text(rightLines, COL_RIGHT_X + 1, y + LINE_H - 1);

  y += blockH;
  doc.setTextColor(0, 0, 0);
}

function statCard(stat: string, label: string) {
  checkPage(11);
  doc.setFillColor(248, 250, 252);
  doc.rect(MARGIN_L, y, PAGE_W - MARGIN_L - MARGIN_R, 8.5, "F");
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.rect(MARGIN_L, y, PAGE_W - MARGIN_L - MARGIN_R, 8.5, "S");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(79, 70, 229);
  doc.text(stat, MARGIN_L + 3, y + 5.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(label, MARGIN_L + 32, y + 5.5);

  y += 11;
}

drawTitle();

// ── PART 1: 0:00 - 0:30 FINANCIAL FRAUD ──────────────
sectionHeader("0:00 – 0:30", "PART 1: FINANCIAL THEFT & 2-HOUR GOLDEN WINDOW", "30 SECONDS");
colHeaders();

twoCol(
  "1. Start on Home screen. Show top header 'Financial Cyber Theft' flow selected. Tap 'Citizen Demo Login' to show instant account link.",
  "When an Indian citizen loses money to cyber theft, they panic. CyberRakshak 1930 is the dual-engine citizen command that turns that panic into immediate statutory recovery.",
  true
);

twoCol(
  "2. Paste bank SMS: 'Rs 85,500 debited via UPI Ref 312345678901 to ramesh.traders@okaxis'. Click 'Run AI Audit'.",
  "Step 1: Intake. We paste the raw debit SMS. Our on-device parser extracts the 12-digit UTR, amount of 85,500 rupees, and suspect UPI in milliseconds.",
  false
);

twoCol(
  "3. Page moves to Step 2 (Audit). Point cursor to Golden 2-Hour Recovery badge & RBI Zero-Liability card. Click 'Continue to Action'.",
  "Step 2: Audit. The engine activates the Golden 2-Hour Recovery Window and checks RBI Zero-Liability rules under DPDP Act privacy safeguards.",
  false
);

twoCol(
  "4. Page moves to Step 3 (Action). Click 'Read Teleprompter Script' then click 'Email Bank Now' to show Gmail Webmail & Section 91 BNSS freeze PDF.",
  "Step 3: Action. The citizen gets a live 1930 helpline teleprompter script, 1-tap Gmail freeze requisition under Section 91 BNSS, and instant WhatsApp evidence sharing!",
  true
);

statCard("PART 1 OUTCOME:", "12-Digit UTR parsed -> Golden Window activated -> Sec 91 BNSS Notice dispatched in under 30s.");

// ── PART 2: 0:30 - 1:00 DIGITAL ARREST ──────────────
sectionHeader("0:30 – 1:00", "PART 2: DIGITAL ARREST EXTORTION DEFENSE", "30 SECONDS");
colHeaders();

twoCol(
  "1. Switch top toggle to 'Extortion & Digital Arrest'. Select CBI impersonation and enter caller ID + extortion demand of Rs 2,50,000.",
  "Now Part 2: The terrifying epidemic of Digital Arrest. Scammers impersonate police on video calls demanding verification bonds.",
  true
);

twoCol(
  "2. Point to the top-right Accessibility Panel: Switch language to Telugu (తెలుగు) or Hindi (हिन्दी). Show entire screen translate dynamically.",
  "We built full accessibility in 6 regional languages so any citizen can understand their statutory rights in their mother tongue.",
  false
);

twoCol(
  "3. Click 'Audit Extortion Threat'. Step 2 shows the Legal Fact Check Matrix: 'Digital Arrest does NOT exist under Indian Law'. Click 'Listen to Fact Check Aloud'.",
  "Step 2: Reality Check. Our legal engine myth-busts the extortion in real time, proving through Supreme Court law that digital arrest is 100% illegal.",
  false
);

twoCol(
  "4. Move to Step 3 Action: Show 'DoT Chakshu SIM Block' button, 'Download FIR PDF (BNS 204 & 308)', 'Download Sec 63 BSA Certificate' and official CBI/ED helplines.",
  "Step 3: Defense. 1-tap DoT Chakshu SIM blocking, instant BNS 204/308 FIR complaint PDF, cryptographic Section 63 BSA certificate, and verified CBI control room directory.",
  true
);

twoCol(
  "5. Show persistent footer: DPDP Compliant • On-Device Cryptographic Hashing. Smile and conclude.",
  "CyberRakshak 1930: Protecting India's digital citizens with real law, real tech, and zero friction. Thank you!",
  true
);

statCard("PART 2 OUTCOME:", "Extortion debunked -> DoT SIM blocked -> BNS 204/308 FIR + Sec 63 BSA Certificate generated.");

// ── JUDGE RAPID FIRE ─────────────────────────────────
sectionHeader("BONUS", "RAPID-FIRE JUDGE Q&A (1-LINERS)", "CHEAT SHEET");
colHeaders();

twoCol(
  "Q: How do you prevent fraudulent data tampering?",
  "Every evidence screenshot and note generates an on-device SHA-256 hash certified under Section 63(4) Bharatiya Sakshya Adhiniyam 2023.",
  false
);

twoCol(
  "Q: How does bank email freeze work across rural/private banks?",
  "We maintain a comprehensive central directory of nodal fraud desk emails for SBI, HDFC, ICICI, Paytm, and unlisted banks with pre-formatted Sec 91 BNSS notices.",
  false
);

twoCol(
  "Q: Why two distinct flows?",
  "Financial fraud requires speed to lock mule accounts; Digital arrest requires psychological legal reassurance, SIM blocking, and extortion prosecution.",
  false
);

// ── Save PDF ─────────────────────────────────────────
const totalPages = doc.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text(
    `CyberRakshak 1930 — 1-Minute Hackathon Pitch Script — Page ${i} of ${totalPages}`,
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
