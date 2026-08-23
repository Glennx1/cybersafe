export interface BankRegistryNode {
  name: string;
  nodalEmail: string;
  cyberEmail: string;
  phone?: string;
}

export const BANK_REGISTRY: Record<string, BankRegistryNode> = {
  "STATE BANK OF INDIA": {
    name: "State Bank of India (SBI)",
    nodalEmail: "nodalofficer@sbi.co.in",
    cyberEmail: "cyber.fraud@sbi.co.in",
    phone: "1800111109"
  },
  "SBI": {
    name: "State Bank of India (SBI)",
    nodalEmail: "nodalofficer@sbi.co.in",
    cyberEmail: "cyber.fraud@sbi.co.in",
    phone: "1800111109"
  },
  "HDFC": {
    name: "HDFC Bank",
    nodalEmail: "pno@hdfcbank.com",
    cyberEmail: "cybercell@hdfcbank.com",
    phone: "18002664060"
  },
  "ICICI": {
    name: "ICICI Bank",
    nodalEmail: "headservicequality@icicibank.com",
    cyberEmail: "antifraud@icicibank.com",
    phone: "18001080"
  },
  "AXIS": {
    name: "Axis Bank",
    nodalEmail: "pno@axisbank.com",
    cyberEmail: "cyber.cell@axisbank.com",
    phone: "18004195959"
  },
  "KOTAK": {
    name: "Kotak Mahindra Bank",
    nodalEmail: "nodalofficer@kotak.com",
    cyberEmail: "fraud.control@kotak.com",
    phone: "18002090000"
  },
  "PUNJAB NATIONAL BANK": {
    name: "Punjab National Bank (PNB)",
    nodalEmail: "nodalofficer@pnb.co.in",
    cyberEmail: "cyberfraud@pnb.co.in",
    phone: "18001802222"
  },
  "PNB": {
    name: "Punjab National Bank (PNB)",
    nodalEmail: "nodalofficer@pnb.co.in",
    cyberEmail: "cyberfraud@pnb.co.in",
    phone: "18001802222"
  },
  "BANK OF BARODA": {
    name: "Bank of Baroda (BOB)",
    nodalEmail: "nodal.officer@bankofbaroda.com",
    cyberEmail: "fraudcell@bankofbaroda.com",
    phone: "18002584455"
  },
  "BOB": {
    name: "Bank of Baroda (BOB)",
    nodalEmail: "nodal.officer@bankofbaroda.com",
    cyberEmail: "fraudcell@bankofbaroda.com",
    phone: "18002584455"
  },
  "CANARA": {
    name: "Canara Bank",
    nodalEmail: "nodalofficer@canarabank.com",
    cyberEmail: "cybercell@canarabank.com",
    phone: "18004250018"
  },
  "UNION BANK": {
    name: "Union Bank of India",
    nodalEmail: "customercare@unionbankofindia.bank",
    cyberEmail: "cybercell@unionbankofindia.bank",
    phone: "1800222244"
  },
  "INDUSIND": {
    name: "IndusInd Bank",
    nodalEmail: "nodalofficer@indusind.com",
    cyberEmail: "cyberfraud@indusind.com",
    phone: "18602677777"
  },
  "YES BANK": {
    name: "Yes Bank",
    nodalEmail: "principal.nodal@yesbank.in",
    cyberEmail: "fraudmanagement@yesbank.in",
    phone: "18001200"
  },
  "FEDERAL BANK": {
    name: "Federal Bank",
    nodalEmail: "support@federalbank.co.in",
    cyberEmail: "cybercell@federalbank.co.in",
    phone: "18004251199"
  },
  "IDBI": {
    name: "IDBI Bank",
    nodalEmail: "customercare@idbi.co.in",
    cyberEmail: "antifraud@idbi.co.in",
    phone: "18002094324"
  },
  "PAYTM": {
    name: "Paytm Payments Bank",
    nodalEmail: "nodalofficer@paytmbank.com",
    cyberEmail: "cybercell@paytmbank.com",
    phone: "01204456456"
  },
  "PHONEPE": {
    name: "PhonePe",
    nodalEmail: "nodalofficer@phonepe.com",
    cyberEmail: "cybercell@phonepe.com",
    phone: "08068727374"
  },
  "GOOGLE PAY": {
    name: "Google Pay (NPCI Grievance Desk)",
    nodalEmail: "gpay-grievance@google.com",
    cyberEmail: "npci.grievance@npci.org.in",
    phone: "18004190157"
  },
  "GPAY": {
    name: "Google Pay (NPCI Grievance Desk)",
    nodalEmail: "gpay-grievance@google.com",
    cyberEmail: "npci.grievance@npci.org.in",
    phone: "18004190157"
  }
};

export function lookupBankNode(bankName: string): BankRegistryNode {
  if (!bankName) {
    return {
      name: "RBI Nodal Authority (Central Desk)",
      nodalEmail: "nodalofficer@rbimandate.org.in",
      cyberEmail: "cyberfraud@rbimandate.org.in",
      phone: "14440"
    };
  }
  const upper = bankName.toUpperCase();
  for (const key of Object.keys(BANK_REGISTRY)) {
    if (upper.includes(key)) return BANK_REGISTRY[key];
  }
  // Default fallback if bank not specifically mapped
  return {
    name: bankName,
    nodalEmail: "nodalofficer@rbimandate.org.in",
    cyberEmail: "cyberfraud@rbimandate.org.in",
    phone: "14440"
  };
}
