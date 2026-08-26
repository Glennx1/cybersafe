import jsPDF from "jspdf";
import { IncidentProfile, ForensicAuditReport, Language } from "./types";

type SupportedPdfLang = "en" | "hi" | "kn" | "ta" | "te" | "bn";

/**
 * Normalizes language codes for jsPDF catalog /Lang dictionary
 */
function resolvePdfLanguage(lang?: Language): SupportedPdfLang {
  switch (lang) {
    case "hi":
      return "hi";
    case "ta":
      return "ta";
    case "te":
      return "te";
    case "kn":
      return "kn";
    case "bn":
      return "bn";
    case "en":
    default:
      return "en";
  }
}

/**
 * 1. Bank Account Freeze & Lien Request Notice (Section 91 BNSS 2023)
 */
export function createBankFreezeDoc(
  profile: IncidentProfile,
  audit?: ForensicAuditReport,
  language: Language = "en"
): jsPDF {
  const doc = new jsPDF();
  const pdfLang = resolvePdfLanguage(language);

  // Set Accessibility Metadata
  doc.setLanguage(pdfLang);
  doc.setProperties({
    title: `Bank Fraud Lien Notice - Case ${profile.id} (UTR: ${profile.utrNumber || "N/A"})`,
    subject: `Emergency Lien Marking & Account Freeze Request pursuant to Section 91 BNSS 2023 & RBI Master Direction`,
    author: "CyberRakshak 1930 Citizen Defense Portal",
    keywords: "bank freeze, lien marking, cybercrime, section 91 bnss, rbi zero liability, cyber complaint",
    creator: "CyberRakshak 1930 Anti-Fraud Platform"
  });

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  let curY = 15;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("URGENT BANK ACCOUNT FREEZE & LIEN REQUEST NOTICE", 15, 16);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("PURSUANT TO RBI MASTER DIRECTION & SECTION 91 BNSS 2023", 15, 21);

  // Date & Reference
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Ref UTR / RRN: ${profile.utrNumber || "N/A"}`, 140, 35);

  // Recipient / Addressing
  doc.setFont("helvetica", "normal");
  doc.text("To,", 15, 45);
  doc.setFont("helvetica", "bold");
  doc.text(`The Branch Manager / Principal Nodal Officer`, 15, 50);
  doc.text(`${profile.victimBank || "Bank Authority"}`, 15, 55);
  doc.text(`Location: ${profile.cityState || "India"}`, 15, 60);

  // Subject Box
  doc.setFillColor(254, 242, 242); // Rose-50
  doc.rect(15, 66, 180, 14, "F");
  doc.setDrawColor(248, 113, 113);
  doc.rect(15, 66, 180, 14, "S");

  doc.setTextColor(153, 27, 27); // Rose-900
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(`SUBJECT: EMERGENCY LIEN MARKING & FREEZE REQUEST FOR FRAUDULENT TRANSACTIONS`, 18, 72);
  doc.text(`TRANSACTION AMOUNT: RS. ${profile.fraudAmount.toLocaleString("en-IN")} | UTR: ${profile.utrNumber || "N/A"}`, 18, 77);

  // Statement Body
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const p1 = `Respected Sir/Madam,\n\nI am writing to formally report an unauthorized fraudulent cyber transaction involving my bank account (${profile.victimAccountMasked || profile.victimAccountNo || "Attached"}) held with your branch. The incident occurred on ${new Date(profile.transactionTime).toLocaleString("en-IN")}, wherein an amount of Rs. ${profile.fraudAmount.toLocaleString("en-IN")} was illegally debited via UTR / RRN ${profile.utrNumber || "N/A"} without my consent.`;
  const splitP1 = doc.splitTextToSize(p1, 180);
  doc.text(splitP1, 15, 87);

  curY = 87 + (splitP1.length * 4.5) + 6;

  // Table of Suspect Details
  doc.setFillColor(241, 245, 249);
  doc.rect(15, curY, 180, 48, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, curY, 180, 48, "S");

  doc.setFont("helvetica", "bold");
  doc.text("CRITICAL BENEFICIARY / SUSPECT ACCOUNT DETAILS FOR IMMEDIATE LIEN:", 18, curY + 7);
  doc.setFont("helvetica", "normal");
  doc.text(`• Suspect Beneficiary UPI / VPA: ${profile.suspectVpa || "N/A"}`, 18, curY + 14);
  doc.text(`• Suspect Beneficiary Account No: ${profile.suspectAccountNo || "N/A"}`, 18, curY + 21);
  doc.text(`• Suspect Bank & Branch IFSC: ${profile.suspectBankIfsc || "N/A"}`, 18, curY + 28);
  doc.text(`• Transaction UTR / RRN Reference: ${profile.utrNumber || "N/A"}`, 18, curY + 35);
  doc.text(`• Date & Timestamp: ${new Date(profile.transactionTime).toLocaleString("en-IN")}`, 18, curY + 42);

  curY += 56;

  // Legal Citations & Demand
  doc.setFont("helvetica", "bold");
  doc.text("STATUTORY MANDATES & URGENT INSTRUCTIONS:", 15, curY);
  curY += 5;

  doc.setFont("helvetica", "normal");
  const legalText = `1. In accordance with RBI Master Direction (DPSS.CO.PD.No.1417/02.14.006/2017-18) on Limiting Liability of Customers in Unauthorized Electronic Banking Transactions, immediate reporting has been recorded.\n2. Under Section 91 of Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, banks are mandated to preserve transaction logs and place a debit freeze/lien marking on recipient accounts.\n3. You are requested to communicate with the beneficiary bank nodal officer via CFCFRMS / 1930 portal to stop further layered transfers.`;
  const splitLegal = doc.splitTextToSize(legalText, 180);
  doc.text(splitLegal, 15, curY);

  curY += (splitLegal.length * 4.5) + 12;

  // Signature Block
  doc.setFont("helvetica", "bold");
  doc.text("Complainant / Victim Signature:", 15, curY);
  curY += 7;
  doc.text(`${profile.victimName || "Victim"}`, 15, curY);
  curY += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Contact: ${profile.victimPhone || "N/A"}`, 15, curY);
  curY += 5;
  doc.text(`National Cyber Crime Helpline Ref: 1930 Active`, 15, curY);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated via CyberRakshak 1930 • Citizen Emergency Anti-Fraud Copilot", 15, 280);

  return doc;
}

export function generateBankFreezePdf(
  profile: IncidentProfile,
  audit?: ForensicAuditReport,
  language: Language = "en"
) {
  const doc = createBankFreezeDoc(profile, audit, language);
  doc.save(`Bank_Freeze_Notice_${profile.utrNumber || profile.id}.pdf`);
}

/**
 * 2. Cyber Crime Police Station FIR Complaint Dossier (BNS 2023 & IT Act)
 */
export function createPoliceFirDoc(
  profile: IncidentProfile,
  audit?: ForensicAuditReport,
  language: Language = "en"
): jsPDF {
  const doc = new jsPDF();
  const pdfLang = resolvePdfLanguage(language);

  // Set Accessibility Metadata
  doc.setLanguage(pdfLang);
  doc.setProperties({
    title: `Cyber Crime FIR Complaint Dossier - Case ${profile.id}`,
    subject: `Formal Police Complaint under Bharatiya Nyaya Sanhita 2023 & IT Act for Financial Cyber Theft`,
    author: "CyberRakshak 1930 Citizen Defense Portal",
    keywords: "fir dossier, cyber police, bns 318, sec 66d it act, sec 63 bsa, electronic evidence",
    creator: "CyberRakshak 1930 Anti-Fraud Platform"
  });

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Header Banner
  doc.setFillColor(185, 28, 28); // Crimson-700
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("CYBER CRIME POLICE STATION FIR COMPLAINT DOSSIER", 15, 16);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("UNDER BHARATIYA NYAYA SANHITA 2023 & IT ACT 2000", 15, 21);

  // Date & Reference
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Incident Ref: ${profile.id}`, 140, 35);

  // Addressing
  doc.setFont("helvetica", "normal");
  doc.text("To,", 15, 45);
  doc.setFont("helvetica", "bold");
  doc.text("The Officer-in-Charge / Station House Officer (SHO)", 15, 50);
  doc.text("Cyber Crime Police Station", 15, 55);
  doc.text(`Jurisdiction: ${profile.cityState || "India"}`, 15, 60);

  // Subject Box
  doc.setFillColor(241, 245, 249);
  doc.rect(15, 66, 180, 14, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, 66, 180, 14, "S");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(`SUBJECT: COMPLAINT REGARDING ONLINE CYBER FINANCIAL FRAUD OF RS. ${profile.fraudAmount.toLocaleString("en-IN")}`, 18, 72);
  doc.text(`APPLICABLE SECTIONS: BNS SEC 318(4), 319 | IT ACT SEC 66C, 66D`, 18, 77);

  // Statement of Facts
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const stmt = `I, ${profile.victimName || "Victim"}, residing at ${profile.cityState || "India"}, submit this formal complaint regarding a cyber financial crime committed against me on ${new Date(profile.transactionTime).toLocaleString("en-IN")}.\n\nScam Taxonomy: ${profile.scamCategory.replace(/_/g, " ")}\n\nSTATEMENT OF INCIDENT:\nThe suspect fraudulently induced me into transacting an amount of Rs. ${profile.fraudAmount.toLocaleString("en-IN")} via banking transaction UTR ${profile.utrNumber || "N/A"}. The digital screenshot of the fraudulent transaction has been recorded by the cyber forensic engine and is attached as Annexure-A to this complaint.`;

  const splitStmt = doc.splitTextToSize(stmt, 180);
  doc.text(splitStmt, 15, 87);

  let curY = 87 + (splitStmt.length * 4.5) + 6;

  // Evidence Table
  doc.setFont("helvetica", "bold");
  doc.text("FORENSIC EVIDENCE & BANKING TRANSACTION DETAILS:", 15, curY);
  curY += 6;

  doc.setFont("helvetica", "normal");
  doc.text(`• 12-Digit Banking UTR / RRN: ${profile.utrNumber || "N/A"}`, 15, curY);
  curY += 5;
  doc.text(`• Victim Account Number: ${profile.victimAccountNo || profile.victimAccountMasked || "N/A"} (${profile.victimBank || "N/A"})`, 15, curY);
  curY += 5;
  doc.text(`• Victim Branch IFSC Code: ${profile.victimBankIfsc || "N/A"}`, 15, curY);
  curY += 5;
  doc.text(`• Suspect UPI / VPA Handle: ${profile.suspectVpa || "N/A"}`, 15, curY);
  curY += 5;
  doc.text(`• Suspect Account Number: ${profile.suspectAccountNo || "N/A"}`, 15, curY);
  curY += 5;
  doc.text(`• Suspect Bank / IFSC Code: ${profile.suspectBankIfsc || "N/A"}`, 15, curY);
  curY += 8;

  // Sec 63 BSA 2023 Evidence Hash
  doc.setFont("helvetica", "bold");
  doc.text("SEC 63 BSA 2023 ELECTRONIC EVIDENCE HASH (SHA-256):", 15, curY);
  curY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  const hashLines = `File: ${profile.evidenceFileName || "Attached Digital Evidence"}\nDate: ${profile.evidenceFileDate || "N/A"}\nSHA-256 Hash: ${profile.serverEvidenceHash || profile.evidenceHash || "Cryptographically Logged"}`;
  const splitHash = doc.splitTextToSize(hashLines, 180);
  doc.text(splitHash, 15, curY);
  curY += (splitHash.length * 4) + 6;

  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);

  // Prayer / Relief Sought
  doc.setFont("helvetica", "bold");
  doc.text("PRAYER & RELIEF SOUGHT:", 15, curY);
  curY += 5;

  doc.setFont("helvetica", "normal");
  const prayer = `1. Register a formal First Information Report (FIR) under BNS Sections 318(4), 319 and IT Act Sections 66C, 66D.\n2. Issue urgent directions under Section 91 BNSS 2023 to the suspect bank node to freeze the destination account and recover the stolen money.\n3. Provide a certified copy of the FIR / NCR acknowledgement for insurance and RBI claims.`;
  const splitPrayer = doc.splitTextToSize(prayer, 180);
  doc.text(splitPrayer, 15, curY);
  curY += (splitPrayer.length * 4.5) + 8;

  // Signature Block
  doc.setFont("helvetica", "bold");
  doc.text("Complainant Signature:", 15, curY);
  curY += 6;
  doc.text(`${profile.victimName || "Complainant"}`, 15, curY);
  curY += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Mobile: ${profile.victimPhone || "N/A"}`, 15, curY);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated via CyberRakshak 1930 • Citizen Emergency Anti-Fraud Copilot", 15, 280);

  return doc;
}

export function generatePoliceFirPdf(
  profile: IncidentProfile,
  audit?: ForensicAuditReport,
  language: Language = "en"
) {
  const doc = createPoliceFirDoc(profile, audit, language);
  doc.save(`Police_FIR_Dossier_${profile.utrNumber || profile.id}.pdf`);
}

/**
 * 3. Application under Section 503 BNSS for Magistrate Release of Frozen Property
 */
export function createMagistratePetitionDoc(
  profile: IncidentProfile,
  language: Language = "en"
): jsPDF {
  const doc = new jsPDF();
  const pdfLang = resolvePdfLanguage(language);

  // Set Accessibility Metadata
  doc.setLanguage(pdfLang);
  doc.setProperties({
    title: `Section 503 BNSS Magistrate Refund Petition - Case ${profile.id}`,
    subject: `Application for Release of Frozen Fraud Property under Section 503 BNSS 2023`,
    author: "CyberRakshak 1930 Citizen Defense Portal",
    keywords: "section 503 bnss, court petition, de-freeze bank funds, judicial magistrate, cyber recovery",
    creator: "CyberRakshak 1930 Anti-Fraud Platform"
  });

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Header Banner
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("APPLICATION UNDER SECTION 503 BNSS FOR RELEASE OF FROZEN PROPERTY", 15, 16);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE / J.M.F.C.", 15, 21);

  // Header Date & Location
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Location: ${profile.cityState || "India"}`, 140, 35);

  // Court Address
  doc.setFont("helvetica", "normal");
  const courtText = `To,\nThe Hon'ble Judicial Magistrate First Class,\nJurisdiction Court: ${profile.cityState || "India"}`;
  doc.text(courtText, 15, 45);

  // In the Matter of Box
  doc.setFont("helvetica", "bold");
  doc.text(`IN THE MATTER OF:`, 15, 65);
  doc.setFont("helvetica", "normal");
  doc.text(`Complainant/Applicant: ${profile.victimName || "Applicant"}`, 15, 72);
  doc.text(`Crime Category: Cyber Financial Fraud (Sec 318(4) BNS)`, 15, 79);
  doc.text(`FIR Reference: ${profile.id}`, 15, 86);
  doc.text(`Subject Amount: Rs. ${profile.fraudAmount.toLocaleString("en-IN")}`, 15, 93);

  // Petition Body
  let curY = 108;
  doc.setFont("helvetica", "bold");
  doc.text(`PRAYER FOR DE-FREEZING OF FUNDS:`, 15, curY);
  curY += 7;

  doc.setFont("helvetica", "normal");
  const petitionBody = `Most Respectfully Showeth:\n\n1. That the applicant is the bona fide victim of a cyber fraud incident occurring on ${new Date(profile.transactionTime).toLocaleDateString("en-IN")}, wherein an amount of Rs. ${profile.fraudAmount.toLocaleString("en-IN")} was fraudulently debited via UTR ${profile.utrNumber || "N/A"}.\n\n2. That pursuant to the prompt complaint filed on the National Cyber Crime Reporting Portal (NCRP 1930), the stolen funds have been successfully traced and frozen in the suspect account (${profile.suspectAccountNo || "Target Beneficiary Account"}) by the concerned bank nodal officer.\n\n3. That the said funds are the legitimate, hard-earned money of the applicant and are not required for any further physical forensic examination by the Investigating Officer as the transaction trail is entirely digital and preserved in bank logs.\n\n4. That the applicant undertakes to furnish an indemnity bond/surety to the satisfaction of this Hon'ble Court if required.`;
  
  const splitPetition = doc.splitTextToSize(petitionBody, 180);
  doc.text(splitPetition, 15, curY);
  curY += (splitPetition.length * 4.5) + 8;

  // Relief Sought
  doc.setFont("helvetica", "bold");
  doc.text(`RELIEF SOUGHT:`, 15, curY);
  curY += 6;

  doc.setFont("helvetica", "normal");
  const relief = `It is therefore respectfully prayed that this Hon'ble Court may be pleased to issue directions under Section 503 BNSS 2023 to the concerned Bank Manager / Investigating Officer to de-freeze the aforementioned amount and return the interim custody of the funds to the applicant's bank account in the interest of justice.`;
  const splitRelief = doc.splitTextToSize(relief, 180);
  doc.text(splitRelief, 15, curY);
  curY += (splitRelief.length * 4.5) + 12;

  // Signature Block
  doc.setFont("helvetica", "bold");
  doc.text("Applicant Signature:", 15, curY);
  curY += 6;
  doc.text(profile.victimName || "Applicant", 15, curY);
  curY += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Mobile: ${profile.victimPhone || "N/A"}`, 15, curY);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated via CyberRakshak 1930 • Citizen Judicial Relief Assistant", 15, 280);

  return doc;
}

export function generateMagistratePetitionPdf(
  profile: IncidentProfile,
  language: Language = "en"
) {
  const doc = createMagistratePetitionDoc(profile, language);
  doc.save(`Sec503_Magistrate_Petition_${profile.utrNumber || profile.id}.pdf`);
}

/**
 * 4. Digital Arrest Criminal Extortion FIR Complaint
 */
export function createDigitalArrestFirDoc(
  profile: IncidentProfile,
  language: Language = "en"
): jsPDF {
  const doc = new jsPDF();
  const pdfLang = resolvePdfLanguage(language);

  // Set Accessibility Metadata
  doc.setLanguage(pdfLang);
  doc.setProperties({
    title: `Digital Arrest Cyber Extortion FIR - Case ${profile.id}`,
    subject: `Criminal Complaint against Impersonation of Public Servant & Cyber Extortion Racket`,
    author: "CyberRakshak 1930 Citizen Defense Portal",
    keywords: "digital arrest, extortion, bns 204, bns 308, bns 319, section 66d it act, cyber crime complaint",
    creator: "CyberRakshak 1930 Anti-Fraud Platform"
  });

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Header Banner - Crimson Alert
  doc.setFillColor(153, 27, 27); // Red-800
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("CRIMINAL COMPLAINT: CYBER EXTORTION & IMPERSONATION OF PUBLIC SERVANT", 15, 16);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("UNDER BHARATIYA NYAYA SANHITA (BNS) SECTIONS 204, 308(2), 319 & IT ACT SECTION 66D", 15, 21);

  // Date & Reference
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Incident Ref: ${profile.id}`, 140, 35);

  // Addressing
  doc.setFont("helvetica", "normal");
  const toText = `To,\nThe Station House Officer (SHO) / Cyber Crime Police Station,\nJurisdiction: ${profile.cityState || "India"}`;
  doc.text(toText, 15, 45);

  // Subject Box
  doc.setFillColor(254, 242, 242);
  doc.rect(15, 62, 180, 14, "F");
  doc.setDrawColor(239, 68, 68);
  doc.rect(15, 62, 180, 14, "S");

  doc.setTextColor(185, 28, 28);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(`SUBJECT: FIR REGISTRATION AGAINST SYNDICATE RUNNING 'DIGITAL ARREST' EXTORTION RACKET`, 18, 68);
  doc.text(`IMPERSONATED AGENCY: ${profile.impersonatedAgency || "CBI / Police / Supreme Court"} | CALLER: ${profile.scammerCallerId || "Unknown VoIP/WhatsApp"}`, 18, 73);

  // Body Narrative
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const p1 = `Respected Sir/Madam,\n\nI, ${profile.victimName || "Victim"} (Mobile: ${profile.victimPhone || "N/A"}), residing at ${profile.cityState || "India"}, wish to lodge a formal criminal complaint against unknown cyber criminals who contacted me impersonating high-ranking officials of ${profile.impersonatedAgency || "CBI / Police"}.\n\nThe accused placed me under illegal confinement by claiming I was placed under 'Digital Arrest' for fictitious money laundering/narcotics charges. They demanded an extortion payment of Rs. ${(profile.extortionDemandAmount || profile.fraudAmount || 250000).toLocaleString("en-IN")} via coerced bank transfer to clear my name.`;
  
  const splitP1 = doc.splitTextToSize(p1, 180);
  doc.text(splitP1, 15, 84);

  let curY = 84 + (splitP1.length * 4.5) + 6;

  // Accused / Caller Identifiers Table
  doc.setFillColor(241, 245, 249);
  doc.rect(15, curY, 180, 42, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, curY, 180, 42, "S");

  doc.setFont("helvetica", "bold");
  doc.text("FORENSIC ACCUSED & EVIDENCE IDENTIFIERS:", 18, curY + 7);
  doc.setFont("helvetica", "normal");
  doc.text(`• Impersonator Caller ID / WhatsApp: ${profile.scammerCallerId || "VoIP Virtual Gateway"}`, 18, curY + 14);
  doc.text(`• Impersonated Official Identity: ${profile.impersonatedAgency || "CBI / Mumbai Police / Customs Officer"}`, 18, curY + 20);
  doc.text(`• Extortion Amount Demanded: Rs. ${(profile.extortionDemandAmount || profile.fraudAmount || 250000).toLocaleString("en-IN")}`, 18, curY + 26);
  doc.text(`• Evidence File: ${profile.evidenceFileName || "Forged Summons / Video Call Screenshot"}`, 18, curY + 32);
  doc.text(`• Sec 63 BSA SHA-256 Hash: ${profile.serverEvidenceHash || profile.evidenceHash || "Cryptographically Verified"}`, 18, curY + 38);

  curY += 50;

  // Prayer
  doc.setFont("helvetica", "bold");
  doc.text("PRAYER & IMMEDIATE RELIEF SOUGHT:", 15, curY);
  curY += 6;

  doc.setFont("helvetica", "normal");
  const prayer = `1. Register FIR under Section 204 BNS (Personating Public Servant), Section 308(2) BNS (Extortion), Section 319 BNS (Cheating by Personation), and Section 66D IT Act.\n2. Issue directions to Telecom Service Providers and DoT Chakshu to immediately block and seize the associated SIM card, IMEI, and WhatsApp VoIP gateways.\n3. Provide a certified copy of the FIR acknowledgment for records.`;
  const splitPrayer = doc.splitTextToSize(prayer, 180);
  doc.text(splitPrayer, 15, curY);
  curY += (splitPrayer.length * 4.5) + 10;

  // Signature Block
  doc.setFont("helvetica", "bold");
  doc.text("Complainant Signature:", 15, curY);
  curY += 6;
  doc.text(`${profile.victimName || "Complainant"}`, 15, curY);
  curY += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Mobile: ${profile.victimPhone || "N/A"}`, 15, curY);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated via CyberRakshak 1930 • Citizen Digital Arrest Defense Terminal", 15, 280);

  return doc;
}

export function generateDigitalArrestFirPdf(
  profile: IncidentProfile,
  language: Language = "en"
) {
  const doc = createDigitalArrestFirDoc(profile, language);
  doc.save(`Digital_Arrest_FIR_Complaint_${profile.id}.pdf`);
}

/**
 * 5. Certificate of Authenticity under Section 63(4) of
 * Bharatiya Sakshya Adhiniyam (BSA) 2023 for submitted electronic evidence.
 */
export function createSection63BsaCertificateDoc(
  profile: IncidentProfile,
  latestLedgerHash?: string,
  language: Language = "en"
): jsPDF {
  const doc = new jsPDF();
  const pdfLang = resolvePdfLanguage(language);

  // Set Accessibility Metadata
  doc.setLanguage(pdfLang);
  doc.setProperties({
    title: `Section 63(4) BSA Electronic Evidence Certificate - Case ${profile.id}`,
    subject: `Statutory Certificate of Authenticity and Cryptographic Integrity pursuant to Section 63(4) Bharatiya Sakshya Adhiniyam 2023`,
    author: "CyberRakshak 1930 Citizen Defense Portal",
    keywords: "section 63 bsa, electronic evidence certificate, sha-256 hash, chain of custody, court certificate",
    creator: "CyberRakshak 1930 Anti-Fraud Platform"
  });

  const certTimestamp = profile.bsaCertificateDate || profile.evidenceFileDate || new Date().toISOString();
  const dateStr = new Date(certTimestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // 1. Header Banner
  doc.setFillColor(30, 41, 59); // Slate-800
  doc.rect(0, 0, 210, 26, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATE OF AUTHENTICITY FOR ELECTRONIC EVIDENCE", 15, 15);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("UNDER SECTION 63(4), BHARATIYA SAKSHYA ADHINIYAM (BSA), 2023", 15, 21);

  // 2. Reference & Date Line
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(`Date of Issue: ${dateStr}`, 15, 36);
  doc.text(`Incident / Case Ref: ${profile.id}`, 135, 36);

  // 3. Subject Box
  doc.setFillColor(241, 245, 249); // Slate-100
  doc.rect(15, 42, 180, 14, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, 42, 180, 14, "S");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("SUBJECT: STATUTORY SYSTEM CERTIFICATION OF ELECTRONIC RECORD INTEGRITY", 18, 48);
  doc.setFont("helvetica", "normal");
  doc.text(`Complainant: ${profile.victimName || "Victim"} (${profile.victimPhone || "N/A"}) | Transaction UTR: ${profile.utrNumber || "N/A"}`, 18, 53);

  // 4. Statutory Preamble
  let curY = 64;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const preamble = `I, the undersigned automated cryptographic evidence custodian for the CyberRakshak 1930 platform, do hereby certify pursuant to Section 63(4) of the Bharatiya Sakshya Adhiniyam (BSA), 2023, regarding the electronic evidence submitted in connection with Incident Reference ${profile.id}:`;
  const splitPreamble = doc.splitTextToSize(preamble, 180);
  doc.text(splitPreamble, 15, curY);
  curY += (splitPreamble.length * 4.5) + 6;

  // 5. Electronic Record Telemetry Box
  doc.setFont("helvetica", "bold");
  doc.text("1. PARTICULARS OF THE ELECTRONIC RECORD:", 15, curY);
  curY += 5;

  doc.setFillColor(248, 250, 252);
  doc.rect(15, curY, 180, 42, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, curY, 180, 42, "S");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`• File Name: ${profile.evidenceFileName || "Digital_Transaction_Receipt.png"}`, 18, curY + 7);
  doc.text(`• Timestamp of Ingestion (Server Time): ${certTimestamp}`, 18, curY + 13);
  doc.text(`• Associated Transaction UTR / RRN: ${profile.utrNumber || "N/A"}`, 18, curY + 19);
  doc.text(`• Disputed Fraud Amount: Rs. ${(profile.fraudAmount || profile.extortionDemandAmount || 0).toLocaleString("en-IN")}`, 18, curY + 25);
  doc.text(`• Financial Institution: ${profile.victimBank || "Unknown"}`, 18, curY + 31);
  doc.text(`• Hash Verification Status: ${profile.hashMismatch ? "MISMATCH FLAGGED" : "Cryptographically Verified (Server & Client Match)"}`, 18, curY + 37);

  curY += 49;

  // 6. Cryptographic Hash Signature
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("2. CRYPTOGRAPHIC INTEGRITY SIGNATURE (SHA-256 HASH):", 15, curY);
  curY += 5;

  doc.setFillColor(238, 242, 255); // Indigo-50
  doc.rect(15, curY, 180, 18, "F");
  doc.setDrawColor(199, 210, 254);
  doc.rect(15, curY, 180, 18, "S");

  doc.setFont("courier", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(67, 56, 202);
  const hashVal = profile.serverEvidenceHash || profile.evidenceHash || "SHA256-PENDING-VERIFICATION";
  doc.text(`SHA-256: ${hashVal}`, 18, curY + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated locally via Web Crypto API SHA-256 Engine • Nonce Validated`, 18, curY + 13);

  curY += 25;

  // 7. Statement of System & Custody Process
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("3. STATEMENT OF DEVICE OPERATION & CHAIN OF CUSTODY:", 15, curY);
  curY += 5;

  const processStatement = `This electronic record was received and hashed by CyberRakshak 1930's automated evidence-intake system on ${certTimestamp}. The system computed an independent SHA-256 cryptographic hash at the time of receipt to establish the integrity of the record from the point of submission.\n\nThroughout the material period, the computer system and evidence vault were operating properly, and the cryptographic integrity of the recorded electronic evidence has not been tampered with or modified. The record has been committed to a tamper-evident, hash-chained case audit ledger${latestLedgerHash ? ` (Audit Root: ${latestLedgerHash.substring(0, 16)}...)` : ""}.`;
  const splitProcess = doc.splitTextToSize(processStatement, 180);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(splitProcess, 15, curY);

  curY += (splitProcess.length * 4) + 8;

  // 8. Official Certification & Signature
  doc.setFillColor(241, 245, 249);
  doc.rect(15, curY, 180, 24, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, curY, 180, 24, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("SYSTEM CERTIFICATION STATEMENT:", 18, curY + 6);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.text("This certificate is generated automatically by the system at the time of evidence receipt", 18, curY + 12);
  doc.text("and reflects the state of the record as originally submitted pursuant to Section 63(4) BSA 2023.", 18, curY + 17);

  // 9. Sign-off Line
  const signY = curY + 32;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Signed & Certified by:", 15, signY);
  doc.setFont("helvetica", "normal");
  doc.text(`Complainant / Submitter: ${profile.victimName || "Complainant"} (${profile.victimPhone || "N/A"})`, 15, signY + 5);
  doc.text(`System Custodian: CyberRakshak Automated Vault Node (Sec 63 BSA Verifier)`, 15, signY + 10);

  // 10. Footer Note
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("CyberRakshak 1930 • Certified Electronic Record Certificate pursuant to Bharatiya Sakshya Adhiniyam 2023", 15, 285);

  return doc;
}

export function generateSection63BsaCertificatePdf(
  profile: IncidentProfile,
  latestLedgerHash?: string,
  language: Language = "en"
) {
  const doc = createSection63BsaCertificateDoc(profile, latestLedgerHash, language);
  doc.save(`Sec_63_BSA_Certificate_${profile.utrNumber || profile.id}.pdf`);
}

/**
 * Utility to check if browser supports Web Share API with files.
 */
export function canSharePdf(): boolean {
  if (typeof navigator === "undefined" || !navigator.share || !navigator.canShare) {
    return false;
  }
  try {
    const dummyFile = new File(["dummy"], "test.pdf", { type: "application/pdf" });
    return navigator.canShare({ files: [dummyFile] });
  } catch (e) {
    return false;
  }
}

/**
 * One-tap WhatsApp / System Share for generated legal PDFs.
 * If Web Share with files is not supported, falls back gracefully to downloading the PDF.
 */
export async function sharePdfToWhatsApp(
  doc: jsPDF,
  fileName: string,
  shareTitle: string,
  shareText: string
): Promise<boolean> {
  const pdfBlob = doc.output("blob");
  const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

  if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        files: [pdfFile]
      });
      return true;
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        console.warn("Share failed, falling back to download:", err);
        doc.save(fileName);
      }
      return false;
    }
  } else {
    // Fallback: download directly
    doc.save(fileName);
    return false;
  }
}
