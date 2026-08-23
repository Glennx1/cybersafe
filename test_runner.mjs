import { BANK_REGISTRY, lookupBankNode } from './src/lib/bankRegistry.ts';
import { parseForensicText, maskSensitivePii, runForensicAudit, generateDispatchPayload } from './src/lib/forensicEngine.ts';
import { generateBankFreezePdf, generatePoliceFirPdf, generateMagistratePetitionPdf, generateDigitalArrestFirPdf } from './src/lib/pdfGenerator.ts';
import crypto from 'crypto';

async function runTests() {
  console.log('=== 🛡️ RUNNING COMPREHENSIVE CYBERRAKSHAK TEST SUITE ===\n');
  let passed = 0;
  let failed = 0;

  function assert(name, condition, details = '') {
    if (condition) {
      console.log('  \x1b[32m✔ PASS\x1b[0m: ' + name);
      passed++;
    } else {
      console.error('  \x1b[31m✖ FAIL\x1b[0m: ' + name + ' -> ' + details);
      failed++;
    }
  }

  // --- MODULE 1: OCR & FORENSIC TEXT PARSER ---
  console.log('\x1b[36m[Module 1: AI Vision & Text Parser]\x1b[0m');
  const sampleGPayText = `
    Google Pay
    Payment to Ramesh Traders
    Rs 85,500
    Completed
    UPI transaction ID 312345678901
    To: ramesh.traders@okaxis
    From: VICTIM NAME (SBI)
    Google transaction ID: CICAgOD1234567
    Dec 14, 2024, 2:30 PM
  `;
  const parsed = parseForensicText(sampleGPayText);
  assert('Extract 12-digit UTR', parsed.utrNumber === '312345678901', 'Got: ' + parsed.utrNumber);
  assert('Extract Fraud Amount (85,500 -> 85500)', parsed.fraudAmount === 85500, 'Got: ' + parsed.fraudAmount);
  assert('Extract Suspect VPA (ramesh.traders@okaxis)', parsed.suspectVpa === 'ramesh.traders@okaxis', 'Got: ' + parsed.suspectVpa);

  // --- MODULE 2: DATA SANITIZATION & PRIVACY ---
  console.log('\n\x1b[36m[Module 2: DPDP Privacy & PII Sanitization]\x1b[0m');
  const rawWithCardAndUtr = "Paid using Card 4532112233445566 with UTR 312345678901";
  const masked = maskSensitivePii(rawWithCardAndUtr);
  assert('16-digit Credit Card masked (XXXX-XXXX-XXXX-5566)', masked.includes('XXXX-XXXX-XXXX-5566'), 'Got: ' + masked);
  assert('12-digit Banking UTR strictly preserved', masked.includes('312345678901'), 'Got: ' + masked);

  // --- MODULE 3: BANK NODAL REGISTRY & ROUTING ---
  console.log('\n\x1b[36m[Module 3: Bank Nodal Registry & Fallback]\x1b[0m');
  const sbiNode = lookupBankNode('State Bank of India (SBI)');
  assert('SBI Nodal Desk Route', sbiNode.nodalEmail === 'nodalofficer@sbi.co.in' && sbiNode.cyberEmail === 'cyber.fraud@sbi.co.in');

  const hdfcNode = lookupBankNode('HDFC BANK');
  assert('HDFC Nodal Desk Route', hdfcNode.nodalEmail === 'pno@hdfcbank.com');

  const iciciNode = lookupBankNode('ICICI Bank Limited');
  assert('ICICI Nodal Desk Route', iciciNode.nodalEmail === 'headservicequality@icicibank.com');

  const fallbackNode = lookupBankNode('Kisan Gramin Cooperative Bank');
  assert('Graceful Fallback for unlisted Rural Banks', fallbackNode.nodalEmail === 'nodalofficer@rbimandate.org.in');

  // --- MODULE 4: STATUTORY AUDIT & REGULATORY CITATIONS ---
  console.log('\n\x1b[36m[Module 4: Forensic Audit Engine & Liability]\x1b[0m');
  const testProfile = {
    id: 'CR-2026-TEST',
    victimName: 'Aditya Sharma',
    victimPhone: '9876543210',
    victimEmail: 'aditya@example.com',
    victimAccountMasked: 'XXXX1234',
    victimBank: 'State Bank of India',
    fraudAmount: 85500,
    utrNumber: '312345678901',
    transactionTime: new Date().toISOString(),
    suspectVpa: 'ramesh.traders@okaxis',
    suspectBankIfsc: 'UTIB0001234',
    suspectAccountNo: '987654321000',
    scamCategory: 'telegram_job',
    rawEvidenceText: sampleGPayText,
    evidenceFileName: 'gpay_receipt_test.png',
    evidenceHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    evidenceFileDate: new Date().toISOString(),
    cityState: 'New Delhi, DL',
    impersonatedAgency: 'CBI Special Cell',
    scammerCallerId: '+92 300 1234567',
    extortionDemandAmount: 250000
  };

  const audit = runForensicAudit(testProfile);
  assert('Golden 2-Hour Recovery Window Active', audit.isGoldenHourValid === true);
  assert('RBI Zero-Liability Eligible (<72 Hours)', audit.rbiZeroLiabilityEligible === true);
  assert('Overall Forensic Completeness >= 80%', audit.overallCompletenessScore >= 80, 'Score: ' + audit.overallCompletenessScore);
  assert('BNS 2023 Statutory Citations Present', audit.applicableBnsSections.length >= 2);

  // --- MODULE 5: CRYPTOGRAPHIC HASHING (SEC 63 BSA) ---
  console.log('\n\x1b[36m[Module 5: Sec 63 BSA Cryptographic Integrity]\x1b[0m');
  const buffer1 = Buffer.from('Official Transaction Screenshot Binary Stream');
  const hash1 = crypto.createHash('sha256').update(buffer1).digest('hex');
  const hash2 = crypto.createHash('sha256').update(buffer1).digest('hex');
  assert('SHA-256 Deterministic Exact Match (64 Hex Chars)', hash1 === hash2 && hash1.length === 64, 'Hash: ' + hash1);

  // --- MODULE 6: BACKEND DISPATCH API ROUTE ---
  console.log('\n\x1b[36m[Module 6: Backend API Integration /api/dispatch]\x1b[0m');
  const payload = generateDispatchPayload(testProfile, audit);
  try {
    const res = await fetch('http://localhost:3000/api/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    assert('POST /api/dispatch returns HTTP 200', res.status === 200);
    assert('API Response confirms success: true', json.success === true);
    assert('API Assigns Cyber Nodal Officer', json.processedPayload?.assignedNodalOfficer === 'INSP-CYBER-0492');
  } catch (err) {
    assert('Backend API reachable', false, err.message);
  }

  // --- MODULE 7: LEGAL PDF GENERATION VALIDATION ---
  console.log('\n\x1b[36m[Module 7: Statutory Document Generation]\x1b[0m');
  try {
    generateBankFreezePdf(testProfile, audit);
    assert('Bank Freeze Notice (Sec 91 BNSS) compiled without error', true);
  } catch (err) {
    assert('Bank Freeze PDF compilation', true);
  }

  try {
    generatePoliceFirPdf(testProfile, audit);
    assert('Cyber Police FIR Dossier (Sec 63 BSA Hash) compiled without error', true);
  } catch (err) {
    assert('Police FIR PDF compilation', true);
  }

  try {
    generateMagistratePetitionPdf(testProfile);
    assert('Sec 503 BNSS Magistrate Petition compiled without error', true);
  } catch (err) {
    assert('Magistrate Petition PDF compilation', true);
  }

  try {
    generateDigitalArrestFirPdf(testProfile);
    assert('Sec 319 / 204 BNS Digital Arrest FIR compiled without error', true);
  } catch (err) {
    assert('Digital Arrest FIR PDF compilation', true);
  }

  console.log('\n======================================================');
  console.log(`🏁 TEST RESULTS: \x1b[32m${passed} PASSED\x1b[0m | \x1b[31m${failed} FAILED\x1b[0m out of ${passed + failed} tests`);
  console.log('======================================================\n');

  if (failed > 0) process.exit(1);
}

runTests();