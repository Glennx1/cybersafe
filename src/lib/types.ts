export type Language = "en" | "hi" | "kn" | "ta" | "te";

export type FlowType = "financial_fraud" | "digital_arrest";

export type ScamCategory = 
  | "UPI_PHISHING" 
  | "DIGITAL_ARREST" 
  | "PART_TIME_JOB" 
  | "INVESTMENT_CRYPTO" 
  | "SIM_SWAP_APK";

export interface IncidentProfile {
  id: string;
  victimName: string;
  victimPhone: string;
  victimBank: string;
  victimAccountNo?: string;
  victimBankIfsc?: string;
  victimAccountMasked: string;
  utrNumber: string; // 12-digit UTR/RRN
  fraudAmount: number;
  transactionTime: string;
  suspectVpa: string;
  suspectBankIfsc: string;
  suspectAccountNo: string;
  scamCategory: ScamCategory;
  rawEvidenceText: string;
  // Section 63 BSA 2023 Forensic Telemetry
  evidenceFileName?: string;
  evidenceHash?: string; // Client-computed hash
  serverEvidenceHash?: string; // Server-verified hash
  hashMismatch?: boolean; // Flagged if client and server hashes differ
  evidenceFileDate?: string;
  bsaCertificateDate?: string;
  cityState: string;

  // Digital Arrest specific telemetry
  impersonatedAgency?: string;
  scammerCallerId?: string;
  extortionDemandAmount?: number;
  forgeryConfidence?: number;
  forgeryFlags?: string[];

  // Covert Capture Metadata
  covertSessionId?: string;
  covertNotes?: Array<{ text: string; deviceTimestamp: string }>;
  covertSyncedAt?: string;
}

export interface ForensicVector {
  vectorName: string;
  label: string;
  score: number;
  status: "PASSED" | "WARNING" | "FAILED";
  details: string;
  iconName: string;
}

export interface ForensicAuditReport {
  overallCompletenessScore: number;
  isGoldenHourValid: boolean;
  minutesElapsed: number;
  rbiZeroLiabilityEligible: boolean;
  rbiRuleCitation: string;
  applicableBnsSections: string[];
  applicableItActSections: string[];
  summaryVerdict: string;
  vectors: ForensicVector[];
  actionPlan: string[];
}

export interface DispatchPayload {
  ackToken: string;
  timestamp: string;
  helplineReference: string;
  i4cNodeTarget: string;
  utrChecksum: string;
  bankFreezeLienReference: string;
  status: "SUBMITTED" | "BANK_FREEZE_SENT" | "CYBER_CELL_LOGGED" | "ESCROW_LOCKED";
}