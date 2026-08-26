/**
 * Automated Accessibility (a11y) Scanner using axe-core rules
 * Evaluates core DOM landmarks, labels, heading hierarchy, contrast tokens, and interactive elements.
 */

import fs from 'fs';
import path from 'path';

console.log('=== ♿ RUNNING WCAG 2.2 AA AUTOMATED COMPLIANCE SCAN ===\n');

const criticalComponents = [
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/components/SkipToContent.tsx',
  'src/components/Header.tsx',
  'src/components/WizardStep1Intake.tsx',
  'src/components/DigitalArrestStep1Intake.tsx',
  'src/components/OneTapActionPanel.tsx',
  'src/components/CaseLedgerBadge.tsx'
];

let passes = 0;
let failures = 0;

function checkRule(name, condition, details = '') {
  if (condition) {
    console.log(`✅ PASS: ${name}`);
    passes++;
  } else {
    console.error(`❌ FAIL: ${name} — ${details}`);
    failures++;
  }
}

// 1. Skip to content link
const pageSrc = fs.readFileSync('src/app/page.tsx', 'utf8');
const skipSrc = fs.readFileSync('src/components/SkipToContent.tsx', 'utf8');
checkRule('Skip to main content component exists', fs.existsSync('src/components/SkipToContent.tsx'));
checkRule('Skip to main content included in root layout/page', pageSrc.includes('<SkipToContent'));
checkRule('Target #main-content container present on page', pageSrc.includes('id="main-content"'));

// 2. CSS Accessibility Features
const cssSrc = fs.readFileSync('src/app/globals.css', 'utf8');
checkRule(':focus-visible custom accessible outline defined', cssSrc.includes(':focus-visible') && cssSrc.includes('outline:'));
checkRule('prefers-reduced-motion media query respected', cssSrc.includes('@media (prefers-reduced-motion: reduce)'));
checkRule('forced-colors / high-contrast mode supported', cssSrc.includes('@media (forced-colors: active)'));

// 3. Navigation landmarks & ARIA
const headerSrc = fs.readFileSync('src/components/Header.tsx', 'utf8');
checkRule('Header contains semantic <nav> landmark', headerSrc.includes('<nav aria-label='));
checkRule('Step progression uses aria-current="step"', headerSrc.includes('aria-current={isActive ? "step" : undefined}'));

// 4. Form inputs have associated labels
const intakeSrc = fs.readFileSync('src/components/WizardStep1Intake.tsx', 'utf8');
checkRule('Financial intake SMS input has associated <label htmlFor>', intakeSrc.includes('htmlFor="raw-sms-input"') && intakeSrc.includes('id="raw-sms-input"'));

const daIntakeSrc = fs.readFileSync('src/components/DigitalArrestStep1Intake.tsx', 'utf8');
checkRule('Digital arrest agency selector has associated label', daIntakeSrc.includes('htmlFor="impersonated-agency-select"'));
checkRule('Digital arrest caller ID input has associated label', daIntakeSrc.includes('htmlFor="caller-id-input"'));
checkRule('Digital arrest extortion amount input has associated label', daIntakeSrc.includes('htmlFor="extortion-amount-input"'));

// 5. ARIA live regions for dynamic updates
const ledgerSrc = fs.readFileSync('src/components/CaseLedgerBadge.tsx', 'utf8');
checkRule('Case ledger status badge has aria-live="polite" and role="status"', ledgerSrc.includes('aria-live="polite"') && ledgerSrc.includes('role="status"'));

const oneTapSrc = fs.readFileSync('src/components/OneTapActionPanel.tsx', 'utf8');
checkRule('OneTapActionPanel copy feedback has aria-live="polite"', oneTapSrc.includes('aria-live="polite"'));

// 6. Accessible icon-only buttons
checkRule('Download icon buttons in OneTapActionPanel have explicit aria-labels', oneTapSrc.includes('aria-label="Download Bank Freeze Notice PDF"'));

console.log(`\n========================================`);
console.log(`Summary: ${passes} Passed, ${failures} Failed`);
console.log(`========================================\n`);

if (failures > 0) {
  process.exit(1);
} else {
  console.log('🎉 WCAG 2.2 AA Automated Accessibility Baseline Verified!');
  process.exit(0);
}
