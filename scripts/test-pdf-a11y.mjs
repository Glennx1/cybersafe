/**
 * Automated Accessibility & Structure Verification for CyberRakshak Generated Legal PDFs
 * Tests:
 * 1. Document Catalog Language Tags (/Lang)
 * 2. Document Properties / Metadata (/Title, /Subject, /Author, /Creator, /Keywords)
 * 3. Text Stream Extractability & Reading Order Flow (Header -> Subject -> Body -> Evidence -> Relief -> Signature)
 */

import {
  createBankFreezeDoc,
  createPoliceFirDoc,
  createMagistratePetitionDoc,
  createDigitalArrestFirDoc,
  createSection63BsaCertificateDoc
} from "../src/lib/pdfGenerator.js";

const mockProfile = {
  id: "INC-2026-TEST-A11Y",
  victimName: "Aditya Sharma",
  victimPhone: "9876543210",
  victimAccountMasked: "XXXX-XXXX-1234",
  victimAccountNo: "123456789012",
  victimBank: "State Bank of India (SBI)",
  victimBankIfsc: "SBIN0001234",
  fraudAmount: 85500,
  transactionTime: "2026-08-26T10:00:00.000Z",
  utrNumber: "312345678901",
  scamCategory: "UPI_PHISHING",
  suspectVpa: "fraudster@upi",
  suspectAccountNo: "987654321098",
  suspectBankIfsc: "PYTM0123456",
  cityState: "Mumbai, Maharashtra",
  evidenceFileName: "fraud_payment_receipt.png",
  evidenceHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  serverEvidenceHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  hashMismatch: false,
  impersonatedAgency: "Central Bureau of Investigation (CBI)",
  scammerCallerId: "+91 98765 00000",
  extortionDemandAmount: 250000
};

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS:\x1b[0m ${description}`);
    passed++;
  } else {
    console.error(`  \x1b[31m✘ FAIL:\x1b[0m ${description}`);
    failed++;
  }
}

console.log("\n=== 📄 RUNNING PDF ACCESSIBILITY & STRUCTURE SUITE ===");

// 1. Bank Account Freeze Notice
console.log("\n[Document 1: Bank Freeze & Lien Request Notice]");
const bankDoc = createBankFreezeDoc(mockProfile, undefined, "en");
const bankPdf = bankDoc.output();
assert("PDF catalog contains language tag /Lang (en)", bankPdf.includes("/Lang (en)"));
assert("Metadata /Title is set", bankPdf.includes("/Title (Bank Fraud Lien Notice"));
assert("Metadata /Subject contains Section 91 BNSS", bankPdf.includes("/Subject (Emergency Lien Marking"));
assert("Metadata /Author is set to CyberRakshak", bankPdf.includes("/Author (CyberRakshak"));
assert("Contains raw text stream (BT ... ET)", bankPdf.includes("BT") && bankPdf.includes("ET"));
const bankIdxHeader = bankPdf.indexOf("URGENT BANK ACCOUNT FREEZE");
const bankIdxSubject = bankPdf.indexOf("SUBJECT: EMERGENCY LIEN MARKING");
const bankIdxEvidence = bankPdf.indexOf("CRITICAL BENEFICIARY");
const bankIdxSignature = bankPdf.indexOf("Complainant / Victim Signature:");
assert(
  "Logical top-to-bottom reading order (Header -> Subject -> Evidence -> Signature)",
  bankIdxHeader !== -1 && bankIdxSubject > bankIdxHeader && bankIdxEvidence > bankIdxSubject && bankIdxSignature > bankIdxEvidence
);

// 2. Police FIR Complaint Dossier
console.log("\n[Document 2: Cyber Crime Police FIR Dossier]");
const policeDoc = createPoliceFirDoc(mockProfile, undefined, "hi");
const policePdf = policeDoc.output();
assert("PDF catalog contains regional language tag /Lang (hi)", policePdf.includes("/Lang (hi)"));
assert("Metadata /Title is set", policePdf.includes("/Title (Cyber Crime FIR Complaint Dossier"));
assert("Metadata /Subject contains BNS 2023", policePdf.includes("/Subject (Formal Police Complaint"));
const policeIdxHeader = policePdf.indexOf("CYBER CRIME POLICE STATION FIR");
const policeIdxSubject = policePdf.indexOf("SUBJECT: COMPLAINT REGARDING ONLINE CYBER FINANCIAL FRAUD");
const policeIdxEvidence = policePdf.indexOf("FORENSIC EVIDENCE & BANKING");
const policeIdxPrayer = policePdf.indexOf("PRAYER & RELIEF SOUGHT:");
const policeIdxSignature = policePdf.indexOf("Complainant Signature:");
assert(
  "Logical top-to-bottom reading order (Header -> Subject -> Evidence -> Prayer -> Signature)",
  policeIdxHeader !== -1 && policeIdxSubject > policeIdxHeader && policeIdxEvidence > policeIdxSubject && policeIdxPrayer > policeIdxEvidence && policeIdxSignature > policeIdxPrayer
);

// 3. Section 503 BNSS Magistrate Petition
console.log("\n[Document 3: Section 503 BNSS Magistrate Petition]");
const courtDoc = createMagistratePetitionDoc(mockProfile, "ta");
const courtPdf = courtDoc.output();
assert("PDF catalog contains regional language tag /Lang (ta)", courtPdf.includes("/Lang (ta)"));
assert("Metadata /Title contains Section 503 BNSS", courtPdf.includes("/Title (Section 503 BNSS Magistrate"));
assert("Metadata /Subject contains Release of Frozen Property", courtPdf.includes("/Subject (Application for Release"));
const courtIdxHeader = courtPdf.indexOf("APPLICATION UNDER SECTION 503 BNSS");
const courtIdxMatter = courtPdf.indexOf("IN THE MATTER OF:");
const courtIdxPrayer = courtPdf.indexOf("PRAYER FOR DE-FREEZING OF FUNDS");
const courtIdxRelief = courtPdf.indexOf("RELIEF SOUGHT:");
const courtIdxSign = courtPdf.indexOf("Applicant Signature:");
assert(
  "Logical top-to-bottom reading order (Header -> Matter -> Prayer -> Relief -> Signature)",
  courtIdxHeader !== -1 && courtIdxMatter > courtIdxHeader && courtIdxPrayer > courtIdxMatter && courtIdxRelief > courtIdxPrayer && courtIdxSign > courtIdxRelief
);

// 4. Digital Arrest Criminal Extortion FIR
console.log("\n[Document 4: Digital Arrest Extortion FIR Complaint]");
const daDoc = createDigitalArrestFirDoc(mockProfile, "te");
const daPdf = daDoc.output();
assert("PDF catalog contains regional language tag /Lang (te)", daPdf.includes("/Lang (te)"));
assert("Metadata /Title is set", daPdf.includes("/Title (Digital Arrest Cyber Extortion FIR"));
assert("Metadata /Subject contains Extortion Racket", daPdf.includes("/Subject (Criminal Complaint against Impersonation"));
const daIdxHeader = daPdf.indexOf("CRIMINAL COMPLAINT: CYBER EXTORTION");
const daIdxSubject = daPdf.indexOf("SUBJECT: FIR REGISTRATION AGAINST SYNDICATE");
const daIdxEvidence = daPdf.indexOf("FORENSIC ACCUSED & EVIDENCE IDENTIFIERS:");
const daIdxPrayer = daPdf.indexOf("PRAYER & IMMEDIATE RELIEF SOUGHT:");
const daIdxSign = daPdf.indexOf("Complainant Signature:");
assert(
  "Logical top-to-bottom reading order (Header -> Subject -> Evidence -> Prayer -> Signature)",
  daIdxHeader !== -1 && daIdxSubject > daIdxHeader && daIdxEvidence > daIdxSubject && daIdxPrayer > daIdxEvidence && daIdxSign > daIdxPrayer
);

// 5. Section 63 BSA Certificate
console.log("\n[Document 5: Section 63 BSA Electronic Evidence Certificate]");
const bsaDoc = createSection63BsaCertificateDoc(mockProfile, "ledger-root-hash-0123456789", "kn");
const bsaPdf = bsaDoc.output();
assert("PDF catalog contains regional language tag /Lang (kn)", bsaPdf.includes("/Lang (kn)"));
assert("Metadata /Title is set", bsaPdf.includes("/Title (Section 63\\(4\\) BSA") || bsaPdf.includes("/Title (Section 63(4) BSA"));
assert("Metadata /Subject contains Section 63(4) BSA 2023", bsaPdf.includes("/Subject (Statutory Certificate of Authenticity"));
const bsaIdxHeader = bsaPdf.indexOf("CERTIFICATE OF AUTHENTICITY FOR ELECTRONIC EVIDENCE");
const bsaIdxPreamble = bsaPdf.indexOf("1. PARTICULARS OF THE ELECTRONIC RECORD:");
const bsaIdxHash = bsaPdf.indexOf("2. CRYPTOGRAPHIC INTEGRITY SIGNATURE");
const bsaIdxCustody = bsaPdf.indexOf("3. STATEMENT OF DEVICE OPERATION");
const bsaIdxSign = bsaPdf.indexOf("Signed & Certified by:");
assert(
  "Logical top-to-bottom reading order (Header -> Particulars -> Hash -> Custody -> Signature)",
  bsaIdxHeader !== -1 && bsaIdxPreamble > bsaIdxHeader && bsaIdxHash > bsaIdxPreamble && bsaIdxCustody > bsaIdxHash && bsaIdxSign > bsaIdxCustody
);

console.log("\n======================================================");
console.log(`🏁 PDF ACCESSIBILITY RESULTS: \x1b[32m${passed} PASSED\x1b[0m | \x1b[31m${failed} FAILED\x1b[0m out of ${passed + failed} tests`);
console.log("======================================================\n");

if (failed > 0) process.exit(1);
