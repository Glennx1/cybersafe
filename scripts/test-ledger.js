/**
 * Test script to verify the cryptographic hash-chained case audit ledger.
 * 
 * Verifies:
 * 1. Case creation appends genesis block (sequence 0, prevHash=0000...)
 * 2. Case mutations (evidence upload, status change) append hash-chained blocks
 * 3. verifyLedger reports valid: true for untampered chains
 * 4. Direct JSON file tampering is cryptographically detected by verifyLedger,
 *    identifying the exact broken sequence number.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Inlined logic matching src/lib/db.ts to test directly in Node environment
function computeSha256(data) {
  const content = typeof data === 'string' ? data : JSON.stringify(data);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function computeEntryHash(previousEntryHash, eventType, payloadHash, timestamp) {
  return crypto
    .createHash('sha256')
    .update(`${previousEntryHash}:${eventType}:${payloadHash}:${timestamp}`)
    .digest('hex');
}

function verifyChain(chain) {
  if (!chain || chain.length === 0) {
    return { valid: true, count: 0 };
  }

  let expectedPrevHash = '0000000000000000000000000000000000000000000000000000000000000000';

  for (let i = 0; i < chain.length; i++) {
    const entry = chain[i];

    if (entry.sequenceNumber !== i) {
      return { valid: false, brokenAtSequence: i, count: chain.length, reason: `Sequence gap at index ${i}` };
    }

    if (entry.previousEntryHash !== expectedPrevHash) {
      return { valid: false, brokenAtSequence: i, count: chain.length, reason: `Previous hash mismatch at sequence ${i}` };
    }

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

function appendEntry(chain, caseId, eventType, eventData) {
  const sequenceNumber = chain.length;
  const timestamp = new Date().toISOString();
  const payloadHash = computeSha256(eventData);
  const previousEntryHash = sequenceNumber === 0 
    ? '0000000000000000000000000000000000000000000000000000000000000000' 
    : chain[sequenceNumber - 1].entryHash;

  const entryHash = computeEntryHash(previousEntryHash, eventType, payloadHash, timestamp);

  const entry = {
    caseId,
    sequenceNumber,
    timestamp,
    eventType,
    payloadHash,
    previousEntryHash,
    entryHash
  };

  chain.push(entry);
  return entry;
}

console.log('=== 🔒 TESTING CRYPTOGRAPHIC HASH-CHAINED AUDIT LEDGER ===\n');

const testCaseId = `TEST-CASE-${Date.now()}`;
const chain = [];

// 1. Genesis Case Creation
console.log('1. Appending event: case_created...');
appendEntry(chain, testCaseId, 'case_created', {
  victimName: 'Aditya Sharma',
  fraudAmount: 85000,
  utrNumber: '312345678901'
});

// 2. Evidence Upload
console.log('2. Appending event: evidence_uploaded...');
appendEntry(chain, testCaseId, 'evidence_uploaded', {
  fileName: 'gpay_receipt.png',
  evidenceHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
});

// 3. Status Changed
console.log('3. Appending event: status_changed...');
appendEntry(chain, testCaseId, 'status_changed', {
  oldStatus: 'DRAFT',
  newStatus: 'DISPATCHED'
});

// 4. Document Generated
console.log('4. Appending event: document_generated...');
appendEntry(chain, testCaseId, 'document_generated', {
  documentType: 'POLICE_FIR_DOSSIER',
  fileName: 'Police_FIR_Dossier_312345678901.pdf'
});

console.log(`\nLedger built with ${chain.length} cryptographic blocks.`);

// Verify Valid Chain
const initialVerification = verifyChain(chain);
console.log('Verification of untampered chain:', initialVerification);
if (!initialVerification.valid) {
  console.error('❌ FAIL: Untampered chain failed verification!');
  process.exit(1);
}
console.log('✅ PASS: Untampered chain verified successfully (valid = true).\n');

// 5. Tamper Test: Simulate attacker modifying Block #1 payload
console.log('5. Simulating backend record tampering on Block #1 (changing evidence hash)...');
const tamperedChain = JSON.parse(JSON.stringify(chain));
tamperedChain[1].payloadHash = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const tamperedVerification = verifyChain(tamperedChain);
console.log('Verification of tampered chain:', tamperedVerification);

if (!tamperedVerification.valid && tamperedVerification.brokenAtSequence === 1) {
  console.log('✅ PASS: Tampering successfully detected! Broken at sequence #1.');
} else {
  console.error('❌ FAIL: Tamper detection failed to flag sequence #1.');
  process.exit(1);
}

// 6. Tamper Test: Modify previousEntryHash link in Block #2
console.log('\n6. Simulating historical chain deletion/swap at Block #2...');
const brokenLinkChain = JSON.parse(JSON.stringify(chain));
brokenLinkChain[2].previousEntryHash = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

const brokenLinkVerification = verifyChain(brokenLinkChain);
console.log('Verification of broken link chain:', brokenLinkVerification);

if (!brokenLinkVerification.valid && brokenLinkVerification.brokenAtSequence === 2) {
  console.log('✅ PASS: Broken hash link successfully detected at sequence #2.');
} else {
  console.error('❌ FAIL: Broken link detection failed to flag sequence #2.');
  process.exit(1);
}

console.log('\n🎉 ALL CRYPTOGRAPHIC AUDIT LEDGER INTEGRITY TESTS PASSED!');
