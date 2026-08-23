import jsPDF from "jspdf";
import { IncidentProfile, ForensicAuditReport } from "./types";

export function generateBankFreezePdf(profile: IncidentProfile, audit: ForensicAuditReport) {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

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

  // Date & Ref
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Ref UTR / RRN: ${profile.utrNumber}`, 140, 35);

  // Address
  doc.setFont("helvetica", "normal");
  doc.text("To,", 15, 45);
  doc.setFont("helvetica", "bold");
  doc.text(`The Branch Manager / Principal Nodal Officer`, 15, 50);
  doc.text(`${profile.victimBank}`, 15, 55);
  doc.text(`Location: ${profile.cityState}`, 15, 60);

  // Subject
  doc.setFillColor(254, 242, 242); // Rose-50
  doc.rect(15, 66, 180, 14, "F");
  doc.setDrawColor(248, 113, 113);
  doc.rect(15, 66, 180, 14, "S");

  doc.setTextColor(153, 27, 27); // Rose-900
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(`SUBJECT: EMERGENCY LIEN MARKING & FREEZE REQUEST FOR FRAUDULENT TRANSACTIONS`, 18, 72);
  doc.text(`TRANSACTION AMOUNT: RS. ${profile.fraudAmount.toLocaleString("en-IN")} | UTR: ${profile.utrNumber}`, 18, 77);

  // Body
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const p1 = `Respected Sir/Madam,\n\nI am writing to formally report an unauthorized fraudulent cyber transaction involving my bank account (${profile.victimAccountMasked}) held with your branch. The incident occurred on ${new Date(profile.transactionTime).toLocaleString("en-IN")}, wherein an amount of Rs. ${profile.fraudAmount.toLocaleString("en-IN")} was illegally debited via UTR / RRN ${profile.utrNumber} without my consent.`;
  doc.text(doc.splitTextToSize(p1, 180), 15, 87);

  // Table of Suspect Details
  doc.setFillColor(241, 245, 249);
  doc.rect(15, 115, 180, 32, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, 115, 180, 32, "S");

  doc.setFont("helvetica", "bold");
  doc.text("FORENSIC TRANSACTION IDENTIFIERS", 18, 122);
  doc.setFont("helvetica", "normal");
  doc.text(`â€¢ Victim Account: ${profile.victimAccountMasked} (${profile.victimBank})`, 18, 128);
  doc.text(`â€¢ Fraud Amount: Rs. ${profile.fraudAmount.toLocaleString("en-IN")}`, 18, 134);
  doc.text(`â€¢ Suspect Beneficiary VPA / A/C: ${profile.suspectVpa || profile.suspectAccountNo}`, 18, 140);
  doc.text(`â€¢ Suspect Bank IFSC: ${profile.suspectBankIfsc || "Under Inter-Bank Switch Trace"}`, 18, 146);

  // Legal Basis
  doc.setFont("helvetica", "bold");
  doc.text("STATUTORY & REGULATORY OBLIGATIONS:", 15, 155);
  
  doc.setFont("helvetica", "normal");
  const legalText = `1. RBI Master Direction (DPSS.CO.PD.No.1417/02.14.006/2017-18): Entitles zero customer liability as this incident was reported immediately within the Golden Hour window.\n\n2. Section 91 BNSS 2023 (Sec 91 CrPC): Authorizes bank nodal officers to produce documents and freeze accounts implicated in active criminal investigations.\n\n3. Request to Bank: You are requested to immediately mark an urgent LIEN / FREEZE on the suspect beneficiary account node to prevent further laundering of funds.`;
  doc.text(doc.splitTextToSize(legalText, 180), 15, 163);

  // Signature Block
  doc.setFont("helvetica", "bold");
  doc.text("Complainant / Victim Signature:", 15, 215);
  doc.text(`${profile.victimName}`, 15, 222);
  doc.setFont("helvetica", "normal");
  doc.text(`Contact: ${profile.victimPhone}`, 15, 227);
  doc.text(`National Cyber Crime Helpline Ref: 1930 Active`, 15, 232);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated via CyberRakshak 1930 â€¢ Citizen Emergency Anti-Fraud Copilot", 15, 280);

  doc.save(`Bank_Freeze_Notice_${profile.utrNumber}.pdf`);
}

export function generatePoliceFirPdf(profile: IncidentProfile, audit: ForensicAuditReport) {
  const doc = new jsPDF();
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

  // Date & Ref
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Incident Ref: ${profile.id}`, 140, 35);

  // Address
  doc.setFont("helvetica", "normal");
  doc.text("To,", 15, 45);
  doc.setFont("helvetica", "bold");
  doc.text("The Officer-in-Charge / Station House Officer (SHO)", 15, 50);
  doc.text("Cyber Crime Police Station", 15, 55);
  doc.text(`Jurisdiction: ${profile.cityState}`, 15, 60);

  // Subject
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
  const stmt = `I, ${profile.victimName}, residing at ${profile.cityState}, submit this formal complaint regarding a cyber financial crime committed against me on ${new Date(profile.transactionTime).toLocaleString("en-IN")}.\n\nScam Taxonomy: ${profile.scamCategory.replace(/_/g, " ")}\n\nSTATEMENT OF INCIDENT:\nThe suspect fraudulently induced me into transacting an amount of Rs. ${profile.fraudAmount.toLocaleString("en-IN")} via banking transaction UTR ${profile.utrNumber}. The digital screenshot of the fraudulent transaction has been recorded by the cyber forensic engine and is attached as Annexure-A to this complaint.`;

  const splitStmt = doc.splitTextToSize(stmt, 180);
  doc.text(splitStmt, 15, 87);

  const nextY = 87 + (splitStmt.length * 5) + 15; // Dynamic spacing based on text length

  // Evidence Table
  doc.setFont("helvetica", "bold");
  doc.text("FORENSIC EVIDENCE & SUSPECT DETAILS:", 15, nextY);

  doc.setFont("helvetica", "normal");
  doc.text(`â€¢ 12-Digit Banking UTR/RRN: ${profile.utrNumber}`, 15, nextY + 7);
  doc.text(`â€¢ Victim Account: ${profile.victimAccountMasked} (${profile.victimBank})`, 15, nextY + 13);
  doc.text(`â€¢ Suspect VPA: ${profile.suspectVpa || "N/A"}`, 15, nextY + 19);
  doc.text(`â€¢ Suspect Bank IFSC: ${profile.suspectBankIfsc || "N/A"}`, 15, nextY + 25);
  doc.text(`â€¢ Suspect Account: ${profile.suspectAccountNo || "N/A"}`, 15, nextY + 31);

  // Sec 63 BSA 2023 Evidence Hash
  doc.setFont("helvetica", "bold");
  doc.text("SEC 63 BSA 2023 ELECTRONIC EVIDENCE HASH (SHA-256):", 15, nextY + 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  doc.text(`File: ${profile.evidenceFileName || "Attached Digital Evidence"}\nDate: ${profile.evidenceFileDate || "N/A"}\nSHA-256 Hash: ${profile.evidenceHash || "N/A"}`, 15, nextY + 52);
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);

  // Prayer / Demand
  doc.setFont("helvetica", "bold");
  doc.text("PRAYER & RELIEF SOUGHT:", 15, nextY + 75);
  doc.setFont("helvetica", "normal");
  const prayer = `1. Register a formal First Information Report (FIR) under BNS Sections 318(4), 319 and IT Act Sections 66C, 66D.\n2. Issue urgent directions under Section 91 BNSS 2023 to the suspect bank node to freeze the destination account and recover the stolen money.\n3. Provide a certified copy of the FIR / NCR acknowledgement for insurance and RBI claims.`;
  doc.text(doc.splitTextToSize(prayer, 180), 15, nextY + 83);

  // Signature
  doc.setFont("helvetica", "bold");
  doc.text("Complainant Signature:", 15, nextY + 125);
  doc.text(`${profile.victimName}`, 15, nextY + 132);
  doc.setFont("helvetica", "normal");
  doc.text(`Mobile: ${profile.victimPhone}`, 15, nextY + 137);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated via CyberRakshak 1930 â€¢ Citizen Emergency Anti-Fraud Copilot", 15, 280);

  doc.save(`Police_FIR_Dossier_${profile.utrNumber}.pdf`);
}

export function generateMagistratePetitionPdf(profile: IncidentProfile) {
  const doc = new jsPDF();
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

  // Body
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Location: ${profile.cityState}`, 140, 35);

  doc.setFont("helvetica", "normal");
  const courtText = `To,\nThe Hon'ble Judicial Magistrate First Class,\nJurisdiction Court: ${profile.cityState}`;
  doc.text(courtText, 15, 45);

  doc.setFont("helvetica", "bold");
  doc.text(`IN THE MATTER OF:`, 15, 65);
  doc.setFont("helvetica", "normal");
  doc.text(`Complainant/Applicant: ${profile.victimName}`, 15, 72);
  doc.text(`Crime Category: Cyber Financial Fraud (Sec 318(4) BNS)`, 15, 79);
  doc.text(`FIR Reference: ${profile.id}`, 15, 86);
  doc.text(`Subject Amount: Rs. ${profile.fraudAmount.toLocaleString("en-IN")}`, 15, 93);

  doc.setFont("helvetica", "bold");
  doc.text(`PRAYER FOR DE-FREEZING OF FUNDS`, 15, 110);
  doc.setFont("helvetica", "normal");
  const petitionBody = `Most Respectfully Showeth:\n\n1. That the applicant is the bona fide victim of a cyber fraud incident occurring on ${new Date(profile.transactionTime).toLocaleDateString()}, wherein an amount of Rs. ${profile.fraudAmount.toLocaleString("en-IN")} was fraudulently debited via UTR ${profile.utrNumber}.\n\n2. That pursuant to the prompt complaint filed on the National Cyber Crime Reporting Portal (NCRP 1930), the stolen funds have been successfully traced and frozen in the suspect account (${profile.suspectAccountNo || "Unknown Target Account"}) by the concerned bank nodal officer.\n\n3. That the said funds are the legitimate, hard-earned money of the applicant and are not required for any further physical forensic examination by the Investigating Officer as the transaction trail is entirely digital and preserved in bank logs.\n\n4. That the applicant undertakes to furnish an indemnity bond/surety to the satisfaction of this Hon'ble Court if required.`;
  
  doc.text(doc.splitTextToSize(petitionBody, 180), 15, 120);

  doc.setFont("helvetica", "bold");
  doc.text(`RELIEF SOUGHT:`, 15, 185);
  doc.setFont("helvetica", "normal");
  const relief = `It is therefore respectfully prayed that this Hon'ble Court may be pleased to issue directions under Section 503 BNSS 2023 to the concerned Bank Manager / Investigating Officer to de-freeze the aforementioned amount and return the interim custody of the funds to the applicant's bank account in the interest of justice.`;
  doc.text(doc.splitTextToSize(relief, 180), 15, 193);

  // Signature
  doc.setFont("helvetica", "bold");
  doc.text("Applicant Signature:", 15, 235);
  doc.text(profile.victimName, 15, 242);
  doc.setFont("helvetica", "normal");
  doc.text(`Mobile: ${profile.victimPhone}`, 15, 247);

  doc.save(`Sec503_Magistrate_Petition_${profile.utrNumber}.pdf`);
}

export function generateDigitalArrestFirPdf(profile: IncidentProfile) {
  const doc = new jsPDF();
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

  // Date & Header
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Date: ${dateStr}`, 15, 35);
  doc.text(`Incident Ref: ${profile.id}`, 140, 35);

  doc.setFont("helvetica", "normal");
  const toText = `To,\nThe Station House Officer (SHO) / Cyber Crime Police Station,\nJurisdiction: ${profile.cityState}`;
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

  // Body
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const p1 = `Respected Sir/Madam,\n\nI, ${profile.victimName} (Mobile: ${profile.victimPhone}), residing at ${profile.cityState}, wish to lodge a formal criminal complaint against unknown cyber criminals who contacted me impersonating high-ranking officials of ${profile.impersonatedAgency || "CBI / Police"}.\n\nThe accused placed me under illegal confinement by claiming I was placed under 'Digital Arrest' for fictitious money laundering/narcotics charges. They demanded an extortion payment of Rs. ${(profile.extortionDemandAmount || profile.fraudAmount || 250000).toLocaleString("en-IN")} via coerced bank transfer to clear my name.`;
  
  const splitP1 = doc.splitTextToSize(p1, 180);
  doc.text(splitP1, 15, 84);

  const nextY = 84 + (splitP1.length * 5) + 8;

  // Accused / Caller Identifiers Table
  doc.setFillColor(241, 245, 249);
  doc.rect(15, nextY - 5, 180, 42, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, nextY - 5, 180, 42, "S");

  doc.setFont("helvetica", "bold");
  doc.text("FORENSIC ACCUSED & EVIDENCE IDENTIFIERS:", 18, nextY + 1);
  doc.setFont("helvetica", "normal");
  doc.text(`• Impersonator Caller ID / WhatsApp: ${profile.scammerCallerId || "VoIP Virtual Gateway"}`, 18, nextY + 8);
  doc.text(`• Impersonated Official Identity: ${profile.impersonatedAgency || "CBI / Mumbai Police / Customs Officer"}`, 18, nextY + 14);
  doc.text(`• Extortion Amount Demanded: Rs. ${(profile.extortionDemandAmount || profile.fraudAmount || 250000).toLocaleString("en-IN")}`, 18, nextY + 20);
  doc.text(`• Evidence File: ${profile.evidenceFileName || "Forged Summons / Video Call Screenshot"}`, 18, nextY + 26);
  doc.text(`• Sec 63 BSA SHA-256 Hash: ${profile.evidenceHash || "Cryptographically Verified"}`, 18, nextY + 32);

  // Prayer
  doc.setFont("helvetica", "bold");
  doc.text("PRAYER & IMMEDIATE RELIEF SOUGHT:", 15, nextY + 48);
  doc.setFont("helvetica", "normal");
  const prayer = `1. Register FIR under Section 204 BNS (Personating Public Servant), Section 308(2) BNS (Extortion), Section 319 BNS (Cheating by Personation), and Section 66D IT Act.\n2. Issue directions to Telecom Service Providers and DoT Chakshu to immediately block and seize the associated SIM card, IMEI, and WhatsApp VoIP gateways.\n3. Provide a certified copy of the FIR acknowledgment for records.`;
  doc.text(doc.splitTextToSize(prayer, 180), 15, nextY + 56);

  // Signature
  doc.setFont("helvetica", "bold");
  doc.text("Complainant Signature:", 15, nextY + 85);
  doc.text(`${profile.victimName}`, 15, nextY + 92);
  doc.setFont("helvetica", "normal");
  doc.text(`Mobile: ${profile.victimPhone}`, 15, nextY + 97);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated via CyberRakshak 1930 • Citizen Digital Arrest Defense Terminal", 15, 280);

  doc.save(`Digital_Arrest_FIR_Complaint_${profile.id}.pdf`);
}
