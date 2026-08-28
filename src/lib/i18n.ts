import { Language } from "./types";

export interface TranslationDictionary {
  common: {
    appName: string;
    tagline: string;
    subtitle: string;
    topBannerAlert: string;
    goldenHourBadge: string;
    call1930: string;
    myCases: string;
    signIn: string;
    signOut: string;
    back: string;
    continue: string;
    cancel: string;
    close: string;
    copied: string;
    copy: string;
    shareWhatsApp: string;
    downloadPdf: string;
    verified: string;
    recordLiveCallout: string;
    recordLiveBtn: string;
    accessibilityBtn: string;
    voiceGuideBtn: string;
    speaking: string;
    // Flow selector cards
    flowSelectTitle: string;
    flowSelectSubtitle: string;
    selected: string;
    financialCardTitle: string;
    financialCardSubtitle: string;
    financialCardDesc: string;
    financialTag1: string;
    financialTag2: string;
    financialTag3: string;
    digitalCardTitle: string;
    digitalCardSubtitle: string;
    digitalCardDesc: string;
    digitalTag1: string;
    digitalTag2: string;
    digitalTag3: string;
    readDetailsAloud: string;
    stopAudio: string;
  };
  navigation: {
    financialStep1: string;
    financialStep2: string;
    financialStep3: string;
    digitalArrestStep1: string;
    digitalArrestStep2: string;
    digitalArrestStep3: string;
  };
  factCheck: {
    title: string;
    subtitle: string;
    myth1Title: string;
    myth1Reality: string;
    myth2Title: string;
    myth2Reality: string;
    myth3Title: string;
    myth3Reality: string;
  };
  intake: {
    financialTitle: string;
    financialSubtitle: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    uploadScreenshot: string;
    pasteSmsTitle: string;
    pasteSmsPlaceholder: string;
    utrLabel: string;
    amountLabel: string;
    serverVerified: string;
  };
  audit: {
    scoreLabel: string;
    detailsChecked: string;
    summaryTitle: string;
    summaryVerdict: string;
    recoveryEligibility: string;
    eligibleForBankFreeze: string;
    verifyEditTitle: string;
    clickToUpdate: string;
    utrLabel: string;
    fraudAmountLabel: string;
    suspectVpaLabel: string;
    suspectAccountNoLabel: string;
    suspectIfscLabel: string;
    victimBankLabel: string;
    victimAccountNoLabel: string;
    victimIfscLabel: string;
    victimNameLabel: string;
    contactPhoneLabel: string;
    evidenceChecklistTitle: string;
    statusVerified: string;
    statusAttention: string;
    statusUrgent: string;
    vectorUtrLabel: string;
    vectorUtrPassed: string;
    vectorUtrFailed: string;
    vectorGoldenHourLabel: string;
    vectorGoldenHourPassed: string;
    vectorGoldenHourWarning: string;
    vectorSuspectLabel: string;
    vectorSuspectPassed: string;
    vectorSuspectWarning: string;
    vectorRbiLabel: string;
    vectorRbiDetails: string;
    noticeCyberSafetyTitle: string;
    noticeCyberSafetyDesc: string;
    backToIntake: string;
    continueToGetHelp: string;
  };
  step3Action: {
    targetAmountLabel: string;
    bankingUtrLabel: string;
    bankLabel: string;
    actionBannerDesc: string;
    firGuideTag: string;
    firGuideTitle: string;
    firGuideDesc: string;
    openFirGuideBtn: string;
    noticeInspectorTag: string;
    bankNoticeTitle: string;
    bankNoticeDesc: string;
    inspectBankNoticeBtn: string;
    recoveryRoadmapTitle: string;
    stage1Title: string;
    stage1Time: string;
    stage1Desc: string;
    stage2Title: string;
    stage2Time: string;
    stage2Desc: string;
    stage3Title: string;
    stage3Time: string;
    stage3Desc: string;
    stage4Title: string;
    stage4Time: string;
    stage4Desc: string;
    helplineScriptBtn: string;
    sendCyberAlertBtn: string;
    backToDetails: string;
    inspectRawPayload: string;
    whatNextTitle: string;
    nextStep1Title: string;
    nextStep1Desc: string;
    nextStep2Title: string;
    nextStep2Desc: string;
    nextStep3Title: string;
    nextStep3Desc: string;
    nextStep4Title: string;
    nextStep4Desc: string;
    rememberTitle: string;
    rememberDesc: string;
  };
  digitalArrest: {
    heroTitle: string;
    heroSubtitle: string;
    impersonatedAgencyLabel: string;
    callerIdLabel: string;
    extortionDemandLabel: string;
    disconnectAdviceTitle: string;
    disconnectAdviceDesc: string;
    factCheckBadge: string;
    notInDangerBadge: string;
    step2Title: string;
    step2Subtitle: string;
    claimVsRealityTitle: string;
    scammerClaimLabel: string;
    legalRealityLabel: string;
    myth1Claim: string;
    myth1Truth: string;
    myth2Claim: string;
    myth2Truth: string;
    myth3Claim: string;
    myth3Truth: string;
    myth4Claim: string;
    myth4Truth: string;
    safeTakeActionBadge: string;
    step3NextStepsTitle: string;
    step3NextStepsSubtitle: string;
    safetyStep1Title: string;
    safetyStep1Desc: string;
    safetyStep2Title: string;
    safetyStep2Desc: string;
    copyChakshuBtn: string;
    chakshuCopiedBtn: string;
    openChakshuBtn: string;
    safetyStep3Title: string;
    safetyStep3Desc: string;
    downloadDigitalFirBtn: string;
    shareDigitalFirBtn: string;
    continueToSafetyBtn: string;
    // Step 1 Intake Cards
    callerThreatDetailsTitle: string;
    dropNoticeTitle: string;
    dropNoticeSubtitle: string;
    uploadDocumentBtn: string;
    pasteDemandTitle: string;
    pasteDemandPlaceholder: string;
    targetAgencyLabel: string;
    demandLabel: string;
    advisoryTitle: string;
    advisoryDesc: string;
    continueToReviewProof: string;
  };
  actions: {
    heroTitle: string;
    heroSubtitle: string;
    step1HelplineTitle: string;
    step1HelplineDesc: string;
    step1HelplineBtn: string;
    step2BankTitle: string;
    step2BankDesc: string;
    step2BankBtn: string;
    step3NcrpTitle: string;
    step3NcrpDesc: string;
    step3NcrpCopyBtn: string;
    step3NcrpPortalBtn: string;
    step4ShareTitle: string;
    livePrompterTitle: string;
    collapseScript: string;
    showScript: string;
    teleprompterHello: string;
    teleprompterClosing: string;
    step1Tag: string;
    step1Time: string;
    call1930NowBtn: string;
    step2Tag: string;
    step2Time: string;
    emailBankTitle: string;
    emailBankDesc: string;
    emailBankBtn: string;
    downloadPdfAttachBtn: string;
    noMailAppNotice: string;
    step3Tag: string;
    step3Time: string;
    ncrpTitle: string;
    ncrpDesc: string;
    copyStatementBtn: string;
    statementCopiedBtn: string;
    openPortalBtn: string;
    shareDocsTitle: string;
    shareDocsSubtitle: string;
    docBankFreeze: string;
    docBankFreezeSub: string;
    docPoliceFir: string;
    docPoliceFirSub: string;
    docCourtRefund: string;
    docCourtRefundSub: string;
    docEvidenceCert: string;
    docEvidenceCertSub: string;
  };
  a11y: {
    panelTitle: string;
    panelSubtitle: string;
    selectLanguage: string;
    textSize: string;
    sizeDefault: string;
    sizeLarge: string;
    sizeExtraLarge: string;
    panicModeTitle: string;
    panicModeDesc: string;
    readPageAloudTitle: string;
    readPageAloudDesc: string;
    readBtn: string;
    stopBtn: string;
    audioFirstTitle: string;
    audioFirstDesc: string;
    islTitle: string;
    islDesc: string;
  };
}

// 1. ENGLISH (EN)
const EN_DICT: TranslationDictionary = {
  common: {
    appName: "CyberRakshak 1930",
    tagline: "A guided cyber-fraud assistant & statutory action system",
    subtitle: "Turn fraudulent bank SMS or screenshots into 1-tap Bank Freeze Notices & Police FIRs in 60 seconds.",
    topBannerAlert: "Reporting quickly can improve the chance of stopping the transfer.",
    goldenHourBadge: "Golden 2-Hour Recovery Window Active",
    call1930: "Call 1930 Helpline",
    myCases: "My Cases",
    signIn: "Sign In",
    signOut: "Sign Out",
    back: "Back",
    continue: "Continue",
    cancel: "Cancel",
    close: "Close",
    copied: "Copied!",
    copy: "Copy",
    shareWhatsApp: "Share to WhatsApp",
    downloadPdf: "Download PDF",
    verified: "Verified",
    recordLiveCallout: "Being scammed right now? Record live",
    recordLiveBtn: "Record Live",
    accessibilityBtn: "Accessibility",
    voiceGuideBtn: "Voice Guide",
    speaking: "Speaking...",
    flowSelectTitle: "Tell us what happened",
    flowSelectSubtitle: "Choose the option that best matches your situation.",
    selected: "Selected",
    financialCardTitle: "Money was sent or deducted without my permission",
    financialCardSubtitle: "UPI, Card, or Bank Transfer Fraud",
    financialCardDesc: "Add the payment details you have, then use the next steps to contact your bank and the cybercrime helpline.",
    financialTag1: "Screenshot Helper",
    financialTag2: "Bank Lien Request",
    financialTag3: "Magistrate Petition",
    digitalCardTitle: "Suspicious calls, messages, or fake documents",
    digitalCardSubtitle: "Fake Law Enforcement Calls, Blackmail, or Digital Arrest Threats",
    digitalCardDesc: "Save the caller details and messages. We'll guide you through the safest reporting steps.",
    digitalTag1: "Document Check",
    digitalTag2: "Complaint Draft",
    digitalTag3: "SIM Block Guidance",
    readDetailsAloud: "Read Details Aloud",
    stopAudio: "Stop Audio"
  },
  navigation: {
    financialStep1: "1. Tell us what happened",
    financialStep2: "2. Check the details",
    financialStep3: "3. Get help now",
    digitalArrestStep1: "1. Tell us what happened",
    digitalArrestStep2: "2. Review proof & report",
    digitalArrestStep3: "3. Take action"
  },
  factCheck: {
    title: "Legal Fact Check: Know Your Rights",
    subtitle: "Real Indian Criminal Procedure (BNSS) vs Fake Police Threats",
    myth1Title: "Myth: 'You are under digital arrest on video call'",
    myth1Reality: "Reality: Indian Law (BNS/BNSS) has ZERO provision for 'Digital Arrest'. Police never interrogate or arrest citizens over Skype or WhatsApp.",
    myth2Title: "Myth: 'Transfer money to RBI verification account to prove innocence'",
    myth2Reality: "Reality: The RBI or Police NEVER ask for fund transfers for verification. Any demand for money is 100% Extortion.",
    myth3Title: "Myth: 'Supreme Court has issued immediate arrest warrant'",
    myth3Reality: "Reality: Arrest warrants are served in-person by local police with a valid FIR number, never sent as WhatsApp PDFs."
  },
  intake: {
    financialTitle: "Let's secure your transaction details",
    financialSubtitle: "Upload a screenshot of your bank debit SMS or UPI receipt, or paste the message text below.",
    dropzoneTitle: "Drop Payment Receipt / Debit SMS",
    dropzoneSubtitle: "PNG, JPG, or PDF scan from PhonePe, GPay, Paytm, or NetBanking.",
    uploadScreenshot: "Upload Screenshot",
    pasteSmsTitle: "Or Paste SMS / Transaction Text",
    pasteSmsPlaceholder: "Paste debit message e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
    utrLabel: "12-Digit Banking UTR / RRN",
    amountLabel: "Fraud Amount",
    serverVerified: "Server Verified (Sec 63 BSA)"
  },
  audit: {
    scoreLabel: "Score",
    detailsChecked: "Details checked",
    summaryTitle: "Incident Summary & Evidence",
    summaryVerdict: "Emergency incident data verified. Bank Lien Freeze Notice and Police FIR are ready for 1-tap dispatch.",
    recoveryEligibility: "Recovery Eligibility",
    eligibleForBankFreeze: "Eligible for Bank Freeze",
    verifyEditTitle: "Verify & Edit Incident Identifiers",
    clickToUpdate: "Click to update details",
    utrLabel: "12-Digit Banking UTR / RRN",
    fraudAmountLabel: "Fraud Amount (₹)",
    suspectVpaLabel: "Suspect UPI / VPA ID",
    suspectAccountNoLabel: "Suspect Account Number",
    suspectIfscLabel: "Suspect Account IFSC",
    victimBankLabel: "Victim Bank Name",
    victimAccountNoLabel: "Victim Account Number",
    victimIfscLabel: "Victim Account IFSC",
    victimNameLabel: "Victim Full Name",
    contactPhoneLabel: "Contact Phone Number",
    evidenceChecklistTitle: "Evidence Checklist",
    statusVerified: "Verified",
    statusAttention: "Attention",
    statusUrgent: "Urgent",
    vectorUtrLabel: "12-Digit UTR / RRN Identifier",
    vectorUtrPassed: "Valid 12-digit banking reference.",
    vectorUtrFailed: "UTR reference number missing or incomplete.",
    vectorGoldenHourLabel: "Golden 2-Hour Recovery Window",
    vectorGoldenHourPassed: "Incident reported within golden window. High probability (>80%) of fund lock.",
    vectorGoldenHourWarning: "Reported after window. Lien request will target suspect bank mule nodes.",
    vectorSuspectLabel: "Mule Account & VPA Telemetry",
    vectorSuspectPassed: "Target VPA / Account identified.",
    vectorSuspectWarning: "Suspect VPA details incomplete; bank will trace via UTR inter-bank switch.",
    vectorRbiLabel: "RBI Statutory Zero-Liability Rule",
    vectorRbiDetails: "Enforcement of RBI Master Circular for zero customer liability on 3rd party breaches.",
    noticeCyberSafetyTitle: "Notice on Cyber Safety Action",
    noticeCyberSafetyDesc: "Generated documents are formatted in accordance with Indian Cyber Crime Coordination Centre (I4C) guidelines. You can submit these directly to your bank or 1930 helpline.",
    backToIntake: "Back to Intake",
    continueToGetHelp: "Continue to Get Help"
  },
  step3Action: {
    targetAmountLabel: "Target Fraud Amount for Recovery",
    bankingUtrLabel: "Banking UTR",
    bankLabel: "Bank",
    actionBannerDesc: "Complete the emergency actions below to freeze funds and file the official FIR.",
    firGuideTag: "Complete FIR Guide",
    firGuideTitle: "Full Cyber Police FIR Workflow",
    firGuideDesc: "Get step-by-step guidance to submit your official complaint online or lodge it at your local station with signed annexures.",
    openFirGuideBtn: "Open Full FIR Guide & Annexures",
    noticeInspectorTag: "Notice Inspector",
    bankNoticeTitle: "Bank Nodal Email Inspector",
    bankNoticeDesc: "Review full legal text of Section 91 BNSS, copy individual paragraphs, and view nodal escalation phone numbers.",
    inspectBankNoticeBtn: "Inspect Full Bank Notice & Escalations",
    recoveryRoadmapTitle: "How Your Money Gets Back (Step-by-Step)",
    stage1Title: "Report to 1930 Helpline",
    stage1Time: "First 15 mins",
    stage1Desc: "An emergency ticket is registered on the National Cybercrime Portal to flag your transaction UTR.",
    stage2Title: "Freeze Beneficiary Bank Account",
    stage2Time: "15 mins – 2 hrs",
    stage2Desc: "An urgent notice is sent to the fraudster's bank to lock the funds before they can withdraw or transfer.",
    stage3Title: "File Police Cyber FIR",
    stage3Time: "Day 1 – 5",
    stage3Desc: "The complaint is converted into an official FIR by cyber police to legally seize the held money.",
    stage4Title: "Refund Back to Your Account",
    stage4Time: "Day 7 – 15",
    stage4Desc: "Court or bank issues an order to safely transfer the frozen funds back to your bank account.",
    helplineScriptBtn: "1930 Helpline Call Script",
    sendCyberAlertBtn: "Send Online Cyber Alert",
    backToDetails: "Back to Details",
    inspectRawPayload: "Inspect Raw Payload",
    whatNextTitle: "What Should You Do Next? (Recommended Steps)",
    nextStep1Title: "Stay Calm and Hang Up",
    nextStep1Desc: "Do not panic or engage further with the scammer. Never pay any 'unfreeze fee' or 'processing charge' to get money back.",
    nextStep2Title: "Secure Your Accounts & Passwords",
    nextStep2Desc: "Immediately change your UPI MPIN, NetBanking passwords, and email password. Uninstall any screen-sharing apps (AnyDesk, TeamViewer) if installed.",
    nextStep3Title: "Visit Your Home Bank Branch",
    nextStep3Desc: "Within 24-48 hours, meet your home branch manager with a copy of the Bank Lien letter to ensure dispute is logged on bank nodal switch.",
    nextStep4Title: "Keep Acknowledgements & Visit Cyber Police",
    nextStep4Desc: "Save SMS acknowledgements from 1930 / cybercrime.gov.in. If required, visit the local Cyber Police Station with bank statements to get certified FIR copy.",
    rememberTitle: "Remember:",
    rememberDesc: "Real police officers or bank employees will never ask for your OTP, PIN, or to transfer money to another account."
  },
  digitalArrest: {
    heroTitle: "Fake Digital Arrest & Police Impersonation Defense",
    heroSubtitle: "Immediate legal relief against fake CBI, Cyber Cell, Customs FedEx parcel, and video call extortion scams.",
    impersonatedAgencyLabel: "Impersonated Agency",
    callerIdLabel: "Caller ID / WhatsApp / Skype Handle",
    extortionDemandLabel: "Extortion Demand Amount (₹)",
    disconnectAdviceTitle: "Immediate Action: Disconnect Call Immediately",
    disconnectAdviceDesc: "You are completely safe. Real police officers never demand money on video calls.",
    factCheckBadge: "Legal Fact Check & Reality",
    notInDangerBadge: "You Are Not in Legal Danger",
    step2Title: "The Facts Behind Digital Arrest & Legal Truth",
    step2Subtitle: "Scammers use fake police uniforms, video calls, and forged seals to create fear. Learn how Indian law protects you.",
    claimVsRealityTitle: "Scammer Claims vs Real Legal Rights",
    scammerClaimLabel: "Scammer's Threat",
    legalRealityLabel: "Legal Reality",
    myth1Claim: "You are under 'Digital Arrest' and cannot leave your room.",
    myth1Truth: "Indian law has 0% legal recognition for 'Digital Arrest'. Neither BNSS nor IT Act permits arrest via video call.",
    myth2Claim: "Keep video camera on 24x7 or police will raid.",
    myth2Truth: "Summons must be served in-person in writing by an Investigating Officer. Confinement on video call is criminal extortion.",
    myth3Claim: "Transfer money to 'RBI Security Escrow' for verification.",
    myth3Truth: "No court, police, or RBI ever asks citizens to transfer money to clear their name.",
    myth4Claim: "National Security Secrecy: Do not contact family or lawyers.",
    myth4Truth: "Under Article 22 of Constitution & Section 36 BNSS, every citizen has the fundamental right to consult a lawyer.",
    safeTakeActionBadge: "You are safe. Take action below.",
    step3NextStepsTitle: "Recommended Next Steps",
    step3NextStepsSubtitle: "The scammers trying to intimidate you have zero legal authority. Follow these 3 safety steps and file your official report.",
    safetyStep1Title: "1. Disconnect All Video Calls & Block Caller",
    safetyStep1Desc: "End WhatsApp or Skype video calls immediately. Real law enforcement never threatens citizens over webcam.",
    safetyStep2Title: "2. Report Fake Number on Chakshu (DoT)",
    safetyStep2Desc: "Log the scammer's caller ID on Department of Telecommunications Chakshu portal to block the SIM and handset across India.",
    copyChakshuBtn: "1. Copy Scammer Details",
    chakshuCopiedBtn: "Details Copied!",
    openChakshuBtn: "2. Open Sanchar Saathi (Chakshu)",
    safetyStep3Title: "3. Download & File Digital Arrest Police FIR",
    safetyStep3Desc: "Generate criminal complaint under Bharatiya Nyaya Sanhita (BNS) Section 204 (Impersonating public servant) and Section 308 (Extortion).",
    downloadDigitalFirBtn: "Download FIR Complaint PDF",
    shareDigitalFirBtn: "Share FIR to WhatsApp",
    continueToSafetyBtn: "Continue to Safety Action",
    callerThreatDetailsTitle: "Caller & Threat Details",
    dropNoticeTitle: "Drop Suspicious Notice / Summons Image",
    dropNoticeSubtitle: "Image of forged CBI/Police letter received on WhatsApp or Skype",
    uploadDocumentBtn: "Upload Document",
    pasteDemandTitle: "Or Paste Message / Demand Text",
    pasteDemandPlaceholder: "Paste text e.g. 'You are under digital arrest by CBI Mumbai for drug parcel money laundering...'",
    targetAgencyLabel: "Target Agency",
    demandLabel: "Demand",
    advisoryTitle: "Official Cyber Security Advisory:",
    advisoryDesc: "Indian Law Enforcement Agencies (CBI, State Police, ED, Customs, Supreme Court) NEVER arrest citizens over Skype or WhatsApp video calls and NEVER demand money transfers to any \"verification account\". Do not send money.",
    continueToReviewProof: "Continue to Review Proof"
  },
  actions: {
    heroTitle: "Take Action Now — 1-Tap Direct Links",
    heroSubtitle: "Initiate all emergency actions in one tap without manual copy-paste.",
    step1HelplineTitle: "Call 1930 Helpline",
    step1HelplineDesc: "Direct connection to National Cyber Crime Citizen Helpline.",
    step1HelplineBtn: "Dial 1930 Now",
    step2BankTitle: "Email Bank Fraud Desk (Sec 91 BNSS)",
    step2BankDesc: "Sends pre-built statutory lien demand notice to:",
    step2BankBtn: "Email Bank Now",
    step3NcrpTitle: "File NCRP Complaint (cybercrime.gov.in)",
    step3NcrpDesc: "Copy 1-tap legal statement and open official national portal in new tab.",
    step3NcrpCopyBtn: "1. Copy Legal Statement",
    step3NcrpPortalBtn: "2. Open cybercrime.gov.in",
    step4ShareTitle: "1-Tap WhatsApp & Document Share",
    livePrompterTitle: "Live Teleprompter Script (Read this to the 1930 officer):",
    collapseScript: "Hide Script",
    showScript: "Show Script",
    teleprompterHello: "Hello Officer, I need to report an emergency unauthorized cyber fraud of ₹",
    teleprompterClosing: "Please flag this UTR on CFCFRMS immediately to freeze the recipient account node and provide me the acknowledgement number.",
    step1Tag: "Step 1 • Immediate Priority",
    step1Time: "First 15 mins",
    call1930NowBtn: "Call 1930 Now",
    step2Tag: "Step 2 • Halt Inter-Bank Transfer",
    step2Time: "15 mins – 2 hrs",
    emailBankTitle: "Email Bank Fraud Desk (Sec 91 BNSS)",
    emailBankDesc: "Sends pre-built statutory lien demand notice to:",
    emailBankBtn: "Email Bank Now",
    downloadPdfAttachBtn: "Download PDF to Attach",
    noMailAppNotice: "No default mail app opened? Copy the official fraud-desk email:",
    step3Tag: "Step 3 • Official Government Portal",
    step3Time: "Same Day Filing",
    ncrpTitle: "File NCRP Complaint (cybercrime.gov.in)",
    ncrpDesc: "Copy 1-tap legal statement and open official national portal in new tab.",
    copyStatementBtn: "1. Copy Legal Statement",
    statementCopiedBtn: "Statement Copied!",
    openPortalBtn: "2. Open cybercrime.gov.in",
    shareDocsTitle: "1-Tap WhatsApp & Document Share (To Family, Lawyer, Police Contact)",
    shareDocsSubtitle: "Share digitally compiled legal evidence PDFs directly without saving to disk first.",
    docBankFreeze: "Bank Freeze Notice",
    docBankFreezeSub: "Sec 91 BNSS Letter",
    docPoliceFir: "Police FIR",
    docPoliceFirSub: "BNS 318(4) Dossier",
    docCourtRefund: "Court Refund",
    docCourtRefundSub: "Sec 503 BNSS Petition",
    docEvidenceCert: "Evidence Certificate",
    docEvidenceCertSub: "Sec 63(4) BSA 2023"
  },
  a11y: {
    panelTitle: "Accessibility & Language",
    panelSubtitle: "Customise display & reading preferences",
    selectLanguage: "Select Language",
    textSize: "Text Size",
    sizeDefault: "Default (1x)",
    sizeLarge: "Large (1.25x)",
    sizeExtraLarge: "Extra Large (1.5x)",
    panicModeTitle: "Simplified / Panic Mode",
    panicModeDesc: "Reduces visual clutter, hides secondary options, and enlarges main buttons.",
    readPageAloudTitle: "Read Page Aloud",
    readPageAloudDesc: "Plays speech audio of the current page content via browser speech synthesis.",
    readBtn: "Read",
    stopBtn: "Stop",
    audioFirstTitle: "Audio-First Mode (Auto Read-Back)",
    audioFirstDesc: "Automatically speaks extracted OCR data and Legal Fact Check points aloud without tapping read-aloud buttons.",
    islTitle: "Indian Sign Language (ISL)",
    islDesc: "Shows sign language explainer video clips at key decision points."
  }
};

// 2. HINDI (HI)
const HI_DICT: TranslationDictionary = {
  common: {
    appName: "साइबर रक्षक 1930",
    tagline: "मार्गदर्शित साइबर-धोखाधड़ी सहायक और कानूनी कार्रवाई प्रणाली",
    subtitle: "धोखाधड़ी बैंक एसएमएस या स्क्रीनशॉट को 60 सेकंड में 1-टैप बैंक फ्रीज़ नोटिस और पुलिस एफआईआर में बदलें।",
    topBannerAlert: "जल्द रिपोर्ट करने से पैसे रोकने की संभावना बढ़ जाती है।",
    goldenHourBadge: "स्वर्णिम 2-घंटे का रिकवरी समय सक्रिय",
    call1930: "1930 पर कॉल करें",
    myCases: "मेरे मामले",
    signIn: "साइन इन करें",
    signOut: "साइन आउट",
    back: "पीछे जाएं",
    continue: "आगे बढ़ें",
    cancel: "रद्द करें",
    close: "बंद करें",
    copied: "कॉपी हो गया!",
    copy: "कॉपी करें",
    shareWhatsApp: "व्हाट्सएप पर शेयर करें",
    downloadPdf: "पीडीएफ डाउनलोड करें",
    verified: "सत्यापित",
    recordLiveCallout: "क्या अभी धोखाधड़ी कॉल पर हैं? लाइव रिकॉर्ड करें",
    recordLiveBtn: "लाइव रिकॉर्ड",
    accessibilityBtn: "पहुंचयोग्यता",
    voiceGuideBtn: "आवाज मार्गदर्शन",
    speaking: "बोल रहा है...",
    flowSelectTitle: "बताएं क्या हुआ",
    flowSelectSubtitle: "वह विकल्प चुनें जो आपकी स्थिति से सबसे अधिक मेल खाता हो।",
    selected: "चयनित",
    financialCardTitle: "मेरी अनुमति के बिना पैसे भेजे या काटे गए",
    financialCardSubtitle: "UPI, कार्ड या बैंक ट्रांसफर धोखाधड़ी",
    financialCardDesc: "आपके पास जो भुगतान विवरण हैं वो डालें, फिर अपने बैंक और साइबर क्राइम हेल्पलाइन से संपर्क करें।",
    financialTag1: "स्क्रीनशॉट सहायक",
    financialTag2: "बैंक लीन अनुरोध",
    financialTag3: "मजिस्ट्रेट याचिका",
    digitalCardTitle: "संदिग्ध कॉल, संदेश या नकली दस्तावेज़",
    digitalCardSubtitle: "फर्जी कानून प्रवर्तन, ब्लैकमेल या डिजिटल अरेस्ट की धमकी",
    digitalCardDesc: "कॉलर के विवरण और संदेश सहेजें। हम आपको सबसे सुरक्षित रिपोर्टिंग प्रक्रिया से मार्गदर्शन देंगे।",
    digitalTag1: "दस्तावेज़ जांच",
    digitalTag2: "शिकायत मसौदा",
    digitalTag3: "सिम ब्लॉक मार्गदर्शन",
    readDetailsAloud: "विवरण बोलकर सुनें",
    stopAudio: "आवाज रोकें"
  },
  navigation: {
    financialStep1: "1. बताएं क्या हुआ",
    financialStep2: "2. विवरण की जांच करें",
    financialStep3: "3. अभी मदद पाएं",
    digitalArrestStep1: "1. बताएं क्या हुआ",
    digitalArrestStep2: "2. साक्ष्य व रिपोर्ट देखें",
    digitalArrestStep3: "3. कानूनी कार्रवाई करें"
  },
  factCheck: {
    title: "कानूनी तथ्य जांच: अपने अधिकार जानें",
    subtitle: "वास्तविक भारतीय आपराधिक प्रक्रिया (BNSS) बनाम फर्जी पुलिस धमकियां",
    myth1Title: "भ्रम: 'आप वीडियो कॉल पर डिजिटल अरेस्ट में हैं'",
    myth1Reality: "सच्चाई: भारतीय कानून (BNS/BNSS) में 'डिजिटल अरेस्ट' का कोई प्रावधान नहीं है। पुलिस कभी भी स्काइप या व्हाट्सएप पर पूछताछ या गिरफ्तारी नहीं करती।",
    myth2Title: "भ्रम: 'निर्दोष साबित करने के लिए आरबीआई सत्यापन खाते में पैसे भेजें'",
    myth2Reality: "सच्चाई: आरबीआई या पुलिस कभी भी सत्यापन के लिए पैसे ट्रांसफर करने को नहीं कहती। पैसों की कोई भी मांग 100% जबरन वसूली (Extortion) है।",
    myth3Title: "भ्रम: 'सुप्रीम कोर्ट से तत्काल गिरफ्तारी वारंट जारी हुआ है'",
    myth3Reality: "सच्चाई: गिरफ्तारी वारंट स्थानीय पुलिस द्वारा वैध एफआईआर नंबर के साथ व्यक्तिगत रूप से दिया जाता है, व्हाट्सएप पर पीडीएफ नहीं भेजा जाता।"
  },
  intake: {
    financialTitle: "आइए आपके लेनदेन का विवरण सुरक्षित करें",
    financialSubtitle: "अपने बैंक डेबिट एसएमएस या यूपीआई रसीद का स्क्रीनशॉट अपलोड करें, या नीचे संदेश पेस्ट करें।",
    dropzoneTitle: "भुगतान रसीद / डेबिट एसएमएस अपलोड करें",
    dropzoneSubtitle: "PhonePe, GPay, Paytm या नेटबैंकिंग से PNG, JPG, या PDF स्कैन।",
    uploadScreenshot: "स्क्रीनशॉट अपलोड करें",
    pasteSmsTitle: "या एसएमएस / लेनदेन विवरण पेस्ट करें",
    pasteSmsPlaceholder: "डेबिट संदेश पेस्ट करें e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
    utrLabel: "12-अंकों का बैंकिंग UTR / RRN",
    amountLabel: "धोखाधड़ी राशि",
    serverVerified: "सर्वर सत्यापित (धारा 63 बीएसए)"
  },
  audit: {
    scoreLabel: "स्कोर",
    detailsChecked: "विवरण सत्यापित",
    summaryTitle: "घटना सारांश और साक्ष्य",
    summaryVerdict: "आपातकालीन घटना डेटा सत्यापित। बैंक लीन फ्रीज नोटिस और पुलिस एफआईआर 1-टैप डिस्पैच के लिए तैयार हैं।",
    recoveryEligibility: "रिकवरी पात्रता",
    eligibleForBankFreeze: "बैंक फ्रीज के लिए पात्र",
    verifyEditTitle: "घटना पहचानकर्ता सत्यापित व संपादित करें",
    clickToUpdate: "विवरण अपडेट करने के लिए क्लिक करें",
    utrLabel: "12-अंकों का बैंकिंग UTR / RRN",
    fraudAmountLabel: "धोखाधड़ी राशि (₹)",
    suspectVpaLabel: "संदिग्ध UPI / VPA आईडी",
    suspectAccountNoLabel: "संदिग्ध खाता संख्या",
    suspectIfscLabel: "संदिग्ध खाता IFSC कोड",
    victimBankLabel: "पीड़ित बैंक का नाम",
    victimAccountNoLabel: "पीड़ित खाता संख्या",
    victimIfscLabel: "पीड़ित खाता IFSC कोड",
    victimNameLabel: "पीड़ित का पूरा नाम",
    contactPhoneLabel: "संपर्क फोन नंबर",
    evidenceChecklistTitle: "साक्ष्य चेकलिस्ट",
    statusVerified: "सत्यापित",
    statusAttention: "ध्यान दें",
    statusUrgent: "अति आवश्यक",
    vectorUtrLabel: "12-अंकों का UTR / RRN पहचानकर्ता",
    vectorUtrPassed: "वैध 12-अंकीय बैंकिंग संदर्भ",
    vectorUtrFailed: "UTR संदर्भ संख्या गायब या अधूरी है।",
    vectorGoldenHourLabel: "स्वर्णिम 2-घंटे का रिकवरी समय",
    vectorGoldenHourPassed: "स्वर्णिम समय सीमा के भीतर रिपोर्ट की गई घटना। फंड लॉक होने की उच्च संभावना (>80%)।",
    vectorGoldenHourWarning: "घटना के बाद रिपोर्ट किया गया। लीन अनुरोध संदिग्ध बैंक म्यूल नोड्स को लक्षित करेगा।",
    vectorSuspectLabel: "म्यूल खाता और VPA टेलीमेट्री",
    vectorSuspectPassed: "लक्षित VPA / खाता पहचाना गया।",
    vectorSuspectWarning: "संदिग्ध VPA विवरण अधूरा है; बैंक UTR इंटर-बैंक स्विच के माध्यम से पता लगाएगा।",
    vectorRbiLabel: "आरबीआई वैधानिक शून्य-देयता नियम",
    vectorRbiDetails: "तृतीय-पक्ष उल्लंघनों में शून्य ग्राहक नुकसान के लिए RBI मास्टर निर्देश का प्रवर्तन।",
    noticeCyberSafetyTitle: "साइबर सुरक्षा कार्रवाई पर सूचना",
    noticeCyberSafetyDesc: "तैयार किए गए दस्तावेज़ भारतीय साइबर अपराध समन्वय केंद्र (I4C) के दिशानिर्देशों के अनुसार स्वरूपित हैं। आप इन्हें सीधे अपने बैंक या 1930 हेल्पलाइन पर जमा कर सकते हैं।",
    backToIntake: "वापस इनटेक पर जाएं",
    continueToGetHelp: "मदद पाने के लिए आगे बढ़ें"
  },
  step3Action: {
    targetAmountLabel: "वसूली के लिए लक्षित धोखाधड़ी राशि",
    bankingUtrLabel: "बैंकिंग UTR",
    bankLabel: "बैंक",
    actionBannerDesc: "फंड फ्रीज करने और आधिकारिक एफआईआर दर्ज करने के लिए नीचे दी गई आपातकालीन कार्रवाइयों को पूरा करें।",
    firGuideTag: "पूर्ण एफआईआर गाइड",
    firGuideTitle: "संपूर्ण साइबर पुलिस एफआईआर कार्यप्रवाह",
    firGuideDesc: "अपनी आधिकारिक शिकायत ऑनलाइन जमा करने या हस्ताक्षरित अनुलग्नकों के साथ अपने स्थानीय स्टेशन पर दर्ज करने के लिए चरण-दर-चरण मार्गदर्शन प्राप्त करें।",
    openFirGuideBtn: "पूर्ण एफआईआर गाइड और अनुलग्नक खोलें",
    noticeInspectorTag: "नोटिस निरीक्षक",
    bankNoticeTitle: "बैंक नोडल ईमेल निरीक्षक",
    bankNoticeDesc: "धारा 91 BNSS का पूरा कानूनी पाठ देखें, अलग-अलग पैराग्राफ कॉपी करें, और नोडल एस्केलेशन फोन नंबर देखें।",
    inspectBankNoticeBtn: "पूर्ण बैंक नोटिस और एस्केलेशन देखें",
    recoveryRoadmapTitle: "आपका पैसा कैसे वापस मिलता है (चरण-दर-चरण)",
    stage1Title: "1930 हेल्पलाइन पर रिपोर्ट करें",
    stage1Time: "पहले 15 मिनट",
    stage1Desc: "आपके लेनदेन UTR को फ्लैग करने के लिए राष्ट्रीय साइबर अपराध पोर्टल पर एक आपातकालीन टिकट दर्ज किया जाता है।",
    stage2Title: "प्राप्तकर्ता बैंक खाता फ्रीज करें",
    stage2Time: "15 मिनट – 2 घंटे",
    stage2Desc: "पैसे निकालने या ट्रांसफर करने से पहले फंड को लॉक करने के लिए धोखेबाज के बैंक को एक तत्काल नोटिस भेजा जाता है।",
    stage3Title: "पुलिस साइबर एफआईआर दर्ज करें",
    stage3Time: "दिन 1 – 5",
    stage3Desc: "रोके गए धन को कानूनी रूप से जब्त करने के लिए साइबर पुलिस द्वारा शिकायत को आधिकारिक प्राथमिकी में बदल दिया जाता है।",
    stage4Title: "आपके खाते में वापस रिफंड",
    stage4Time: "दिन 7 – 15",
    stage4Desc: "अदालत या बैंक रोके गए फंड को सुरक्षित रूप से आपके बैंक खाते में वापस स्थानांतरित करने का आदेश जारी करता है।",
    helplineScriptBtn: "1930 हेल्पलाइन कॉल स्क्रिप्ट",
    sendCyberAlertBtn: "ऑनलाइन साइबर अलर्ट भेजें",
    backToDetails: "वापस विवरण पर जाएं",
    inspectRawPayload: "रॉ पेलोड का निरीक्षण करें",
    whatNextTitle: "आगे क्या करना चाहिए? (अनुशंसित अगले कदम)",
    nextStep1Title: "शांत रहें और कॉल काटें",
    nextStep1Desc: "घबराएं नहीं या धोखेबाज से आगे बात न करें। पैसे वापस पाने के लिए कभी भी कोई 'अनफ्रीज शुल्क' या 'प्रोसेसिंग शुल्क' न दें।",
    nextStep2Title: "अपने खाते और पासवर्ड सुरक्षित करें",
    nextStep2Desc: "तुरंत अपना UPI MPIN, नेटबैंकिंग पासवर्ड और ईमेल पासवर्ड बदलें। यदि कोई स्क्रीन-शेयरिंग ऐप (जैसे AnyDesk, TeamViewer) इंस्टॉल है तो उसे हटा दें।",
    nextStep3Title: "अपनी मूल बैंक शाखा पर जाएं",
    nextStep3Desc: "24-48 घंटों के भीतर, बैंक लीन पत्र की प्रति के साथ अपनी होम शाखा प्रबंधक से मिलें ताकि विवाद बैंक नोडल स्विच पर दर्ज हो सके।",
    nextStep4Title: "पावती सुरक्षित रखें और साइबर पुलिस से मिलें",
    nextStep4Desc: "1930 / cybercrime.gov.in से एसएमएस पावती सहेजें। यदि आवश्यक हो, तो प्रमाणित प्राथमिकी प्रति प्राप्त करने के लिए बैंक विवरण के साथ स्थानीय साइबर पुलिस स्टेशन जाएं।",
    rememberTitle: "याद रखें:",
    rememberDesc: "असली पुलिस अधिकारी या बैंक कर्मचारी कभी भी आपका ओटीपी, पिन या किसी अन्य खाते में पैसे ट्रांसफर करने के लिए नहीं कहेंगे।"
  },
  digitalArrest: {
    heroTitle: "फर्जी डिजिटल अरेस्ट और पुलिस ढोंग से सुरक्षा",
    heroSubtitle: "फर्जी सीबीआई, साइबर सेल, कस्टम्स फेडेक्स पार्सल और वीडियो कॉल जबरन वसूली के खिलाफ तत्काल राहत।",
    impersonatedAgencyLabel: "नकली संस्था / अधिकारी",
    callerIdLabel: "कॉलर आईडी / व्हाट्सएप / स्काइप हैंडल",
    extortionDemandLabel: "जबरन वसूली मांग राशि (₹)",
    disconnectAdviceTitle: "तत्काल कदम: कॉल तुरंत काट दें",
    disconnectAdviceDesc: "आप पूरी तरह सुरक्षित हैं। असली पुलिस अधिकारी कभी भी वीडियो कॉल पर पैसे नहीं मांगते।",
    factCheckBadge: "कानूनी तथ्य जांच और वास्तविकता",
    notInDangerBadge: "आप कानूनी खतरे में नहीं हैं",
    step2Title: "डिजिटल अरेस्ट के पीछे के तथ्य और कानूनी सच्चाई",
    step2Subtitle: "धोखेबाज डर पैदा करने के लिए फर्जी पुलिस वर्दी, वीडियो कॉल और नकली मुहरों का उपयोग करते हैं। जानिए भारतीय कानून कैसे आपकी रक्षा करता है।",
    claimVsRealityTitle: "धोखेबाजों के दावे बनाम वास्तविक कानूनी अधिकार",
    scammerClaimLabel: "धोखेबाज की धमकी",
    legalRealityLabel: "कानूनी वास्तविकता",
    myth1Claim: "आप 'डिजिटल अरेस्ट' में हैं और अपना कमरा नहीं छोड़ सकते।",
    myth1Truth: "भारतीय कानून में 'डिजिटल अरेस्ट' की 0% कानूनी मान्यता है। न तो BNSS और न ही IT एक्ट वीडियो कॉल पर गिरफ्तारी की अनुमति देता है।",
    myth2Claim: "24x7 वीडियो कैमरा चालू रखें अन्यथा पुलिस छापा मारेगी।",
    myth2Truth: "समन जांच अधिकारी द्वारा लिखित रूप में व्यक्तिगत रूप से दिया जाना चाहिए। वीडियो कॉल पर रोकना आपराधिक जबरन वसूली है।",
    myth3Claim: "सत्यापन के लिए 'आरबीआई सुरक्षा एस्क्रो' में पैसे ट्रांसफर करें।",
    myth3Truth: "कोई भी अदालत, पुलिस या आरबीआई नाम साफ करने के लिए नागरिकों से पैसे ट्रांसफर करने को कभी नहीं कहता।",
    myth4Claim: "राष्ट्रीय सुरक्षा गोपनीयता: परिवार या वकीलों से संपर्क न करें।",
    myth4Truth: "संविधान के अनुच्छेद 22 और BNSS की धारा 36 के तहत हर नागरिक को वकील से परामर्श करने का मौलिक अधिकार है।",
    safeTakeActionBadge: "आप सुरक्षित हैं। नीचे कार्रवाई करें।",
    step3NextStepsTitle: "अनुशंसित अगले कदम",
    step3NextStepsSubtitle: "आपको डराने की कोशिश करने वाले धोखेबाजों के पास कोई कानूनी अधिकार नहीं है। इन 3 सुरक्षा कदमों का पालन करें और अपनी आधिकारिक रिपोर्ट दर्ज करें।",
    safetyStep1Title: "1. सभी वीडियो कॉल काटें और कॉलर को ब्लॉक करें",
    safetyStep1Desc: "व्हाट्सएप या स्काइप वीडियो कॉल तुरंत समाप्त करें। असली कानून प्रवर्तन अधिकारी कभी वेबकैम पर नागरिकों को धमकी नहीं देते।",
    safetyStep2Title: "2. चक्षु (DoT) पर फर्जी नंबर की रिपोर्ट करें",
    safetyStep2Desc: "भारत भर में सिम और हैंडसेट को ब्लॉक करने के लिए दूरसंचार विभाग के चक्षु पोर्टल पर धोखेबाज की कॉलर आईडी दर्ज करें।",
    copyChakshuBtn: "1. धोखेबाज का विवरण कॉपी करें",
    chakshuCopiedBtn: "विवरण कॉपी हो गया!",
    openChakshuBtn: "2. संचार साथी (चक्षु) खोलें",
    safetyStep3Title: "3. डिजिटल अरेस्ट पुलिस एफआईआर डाउनलोड और दर्ज करें",
    safetyStep3Desc: "भारतीय न्याय संहिता (BNS) धारा 204 (लोक सेवक का प्रतिरूपण) और धारा 308 (जबरन वसूली) के तहत आपराधिक शिकायत तैयार करें।",
    downloadDigitalFirBtn: "एफआईआर शिकायत पीडीएफ डाउनलोड करें",
    shareDigitalFirBtn: "व्हाट्सएप पर एफआईआर शेयर करें",
    continueToSafetyBtn: "सुरक्षा कार्रवाई के लिए आगे बढ़ें",
    callerThreatDetailsTitle: "कॉलर और धमकी विवरण",
    dropNoticeTitle: "संदिग्ध नोटिस / समन छवि अपलोड करें",
    dropNoticeSubtitle: "व्हाट्सएप या स्काइप पर प्राप्त जाली सीबीआई/पुलिस पत्र या स्क्रीनशॉट।",
    uploadDocumentBtn: "दस्तावेज़ अपलोड करें",
    pasteDemandTitle: "या संदेश / मांग विवरण पेस्ट करें",
    pasteDemandPlaceholder: "धमकी संदेश पेस्ट करें e.g. 'आप मनी लॉन्ड्रिंग के लिए सीबीआई द्वारा डिजिटल अरेस्ट में हैं। स्काइप कैमरे पर रहें और 2,50,000 रुपये जमा करें...'",
    targetAgencyLabel: "लक्षित संस्था",
    demandLabel: "मांग",
    advisoryTitle: "आधिकारिक साइबर सुरक्षा सलाह:",
    advisoryDesc: "भारतीय कानून प्रवर्तन एजेंसियां (CBI, राज्य पुलिस, ED, कस्टम्स, सुप्रीम कोर्ट) कभी भी स्काइप या व्हाट्सएप वीडियो कॉल पर नागरिकों को गिरफ्तार नहीं करती हैं और कभी भी किसी \"सत्यापन खाते\" में पैसे ट्रांसफर करने की मांग नहीं करती हैं। पैसे न भेजें।",
    continueToReviewProof: "साक्ष्य समीक्षा के लिए आगे बढ़ें"
  },
  actions: {
    heroTitle: "अभी कार्रवाई करें — 1-टैप डायरेक्ट लिंक्स",
    heroSubtitle: "बिना किसी मैन्युअल कॉपी-पेस्ट के एक टैप में सभी आपातकालीन कार्रवाई शुरू करें।",
    step1HelplineTitle: "हेल्पलाइन 1930 पर कॉल करें",
    step1HelplineDesc: "राष्ट्रीय साइबर अपराध नागरिक हेल्पलाइन से सीधा संपर्क।",
    step1HelplineBtn: "अभी 1930 डायल करें",
    step2BankTitle: "बैंक फ्रॉड डेस्क को ईमेल करें (धारा 91 BNSS)",
    step2BankDesc: "को पूर्व-निर्मित वैधानिक लीन मांग पत्र भेजता है:",
    step2BankBtn: "बैंक को अभी ईमेल करें",
    step3NcrpTitle: "NCRP शिकायत दर्ज करें (cybercrime.gov.in)",
    step3NcrpDesc: "1-टैप कानूनी बयान कॉपी करें और नए टैब में आधिकारिक राष्ट्रीय पोर्टल खोलें।",
    step3NcrpCopyBtn: "1. कानूनी बयान कॉपी करें",
    step3NcrpPortalBtn: "2. cybercrime.gov.in खोलें",
    step4ShareTitle: "1-टैप व्हाट्सएप व दस्तावेज साझा करें",
    livePrompterTitle: "लाइव टेलीप्रॉम्प्टर स्क्रिप्ट (1930 अधिकारी को यह पढ़ें):",
    collapseScript: "स्क्रिप्ट छिपाएं",
    showScript: "स्क्रिप्ट दिखाएं",
    teleprompterHello: "नमस्ते अधिकारी महोदय, मुझे आपातकालीन अनधिकृत साइबर धोखाधड़ी की रिपोर्ट करनी है, राशि ₹",
    teleprompterClosing: "कृपया प्राप्तकर्ता खाता नोड को फ्रीज करने के लिए CFCFRMS पर इस UTR को तुरंत फ्लैग करें और मुझे पावती संख्या प्रदान करें।",
    step1Tag: "चरण 1 • तत्काल प्राथमिकता",
    step1Time: "पहले 15 मिनट",
    call1930NowBtn: "अभी 1930 पर कॉल करें",
    step2Tag: "चरण 2 • अंतर-बैंक ट्रांसफर रोकें",
    step2Time: "15 मिनट – 2 घंटे",
    emailBankTitle: "बैंक फ्रॉड डेस्क को ईमेल करें (धारा 91 BNSS)",
    emailBankDesc: "को पूर्व-निर्मित वैधानिक लीन मांग पत्र भेजता है:",
    emailBankBtn: "बैंक को अभी ईमेल करें",
    downloadPdfAttachBtn: "संलग्न करने के लिए पीडीएफ डाउनलोड करें",
    noMailAppNotice: "कोई डिफ़ॉल्ट मेल ऐप नहीं खुला? आधिकारिक फ्रॉड-डेस्क ईमेल कॉपी करें:",
    step3Tag: "चरण 3 • आधिकारिक सरकारी पोर्टल",
    step3Time: "उसी दिन फाइलिंग",
    ncrpTitle: "NCRP शिकायत दर्ज करें (cybercrime.gov.in)",
    ncrpDesc: "1-टैप कानूनी बयान कॉपी करें और नए टैब में आधिकारिक राष्ट्रीय पोर्टल खोलें।",
    copyStatementBtn: "1. कानूनी बयान कॉपी करें",
    statementCopiedBtn: "बयान कॉपी हो गया!",
    openPortalBtn: "2. cybercrime.gov.in खोलें",
    shareDocsTitle: "1-टैप व्हाट्सएप व दस्तावेज़ साझा करें (परिवार, वकील, पुलिस संपर्क को)",
    shareDocsSubtitle: "पहले डिस्क में सेव किए बिना सीधे डिजिटल रूप से तैयार कानूनी साक्ष्य पीडीएफ साझा करें।",
    docBankFreeze: "बैंक फ्रीज नोटिस",
    docBankFreezeSub: "धारा 91 BNSS पत्र",
    docPoliceFir: "पुलिस एफआईआर",
    docPoliceFirSub: "BNS 318(4) डोजियर",
    docCourtRefund: "कोर्ट रिफंड",
    docCourtRefundSub: "धारा 503 BNSS याचिका",
    docEvidenceCert: "साक्ष्य प्रमाण पत्र",
    docEvidenceCertSub: "धारा 63(4) BSA 2023"
  },
  a11y: {
    panelTitle: "पहुंचयोग्यता और भाषा",
    panelSubtitle: "डिस्प्ले और पढ़ने की प्राथमिकताएं बदलें",
    selectLanguage: "भाषा चुनें",
    textSize: "अक्षर का आकार",
    sizeDefault: "सामान्य (1x)",
    sizeLarge: "बड़ा (1.25x)",
    sizeExtraLarge: "बहुत बड़ा (1.5x)",
    panicModeTitle: "सरल / पैनिक मोड",
    panicModeDesc: "अनावश्यक विकल्पों को छुपाता है और मुख्य बटनों को बड़ा करता है।",
    readPageAloudTitle: "पेज बोलकर सुनें",
    readPageAloudDesc: "ब्राउज़र स्पीच द्वारा पूरे पेज की सामग्री को ऑडियो में सुनाता है।",
    readBtn: "सुनें",
    stopBtn: "रोकें",
    audioFirstTitle: "ऑडियो-फर्स्ट मोड (स्वचालित वाचन)",
    audioFirstDesc: "बिना बटन दबाए एक्सट्रैक्टेड डेटा और कानूनी तथ्यों को अपने आप बोलकर सुनाता है।",
    islTitle: "भारतीय सांकेतिक भाषा (ISL)",
    islDesc: "महत्वपूर्ण चरणों पर सांकेतिक भाषा के वीडियो क्लिप दिखाता है।"
  }
};

// 3. TELUGU (TE)
const TE_DICT: TranslationDictionary = {
  common: {
    appName: "సైబర్ రక్షక్ 1930",
    tagline: "మార్గదర్శిత సైబర్-మోసాల సహాయక & చట్టబద్ధ చర్యల వ్యవస్థ",
    subtitle: "మోసపూరిత బ్యాంక్ SMS లేదా స్క్రీన్‌షాట్‌లను 60 సెకన్లలో 1-ట్యాప్ బ్యాంక్ ఫ్రీజ్ నోటీసులు & పోలీస్ FIRలుగా మార్చండి.",
    topBannerAlert: "త్వరగా రిపోర్ట్ చేయడం వల్ల డబ్బుల బదిలీని ఆపే అవకాశం పెరుగుతుంది.",
    goldenHourBadge: "గోల్డెన్ 2-గంటల రికవరీ సమయం యాక్టివ్‌గా ఉంది",
    call1930: "1930 కు కాల్ చేయండి",
    myCases: "నా కేసులు",
    signIn: "సైన్ ఇన్",
    signOut: "సైన్ అవుట్",
    back: "వెనుకకు",
    continue: "కొనసాగించండి",
    cancel: "రద్దు చేయండి",
    close: "మూసివేయండి",
    copied: "కాపీ చేయబడింది!",
    copy: "కాపీ చేయండి",
    shareWhatsApp: "వాట్సాప్‌లో షేర్ చేయండి",
    downloadPdf: "PDF డౌన్‌లోడ్ చేయండి",
    verified: "ధృవీకరించబడింది",
    recordLiveCallout: "ఇప్పుడే మోసపు కాల్‌లో ఉన్నారా? లైవ్ రికార్డ్ చేయండి",
    recordLiveBtn: "లైవ్ రికార్డ్",
    accessibilityBtn: "సౌలభ్యం",
    voiceGuideBtn: "వాయిస్ గైడ్",
    speaking: "మాట్లాడుతోంది...",
    flowSelectTitle: "ఏం జరిగిందో మాకు చెప్పండి",
    flowSelectSubtitle: "మీ పరిస్థితికి బాగా సరిపోయే ఎంపికను ఎంచుకోండి.",
    selected: "ఎంచుకోబడింది",
    financialCardTitle: "నా అనుమతి లేకుండా డబ్బు పంపబడింది లేదా తీసివేయబడింది",
    financialCardSubtitle: "UPI, కార్డు లేదా బ్యాంక్ బదిలీ మోసం",
    financialCardDesc: "మీ దగ్గర ఉన్న చెల్లింపు వివరాలను జోడించండి, ఆపై మీ బ్యాంక్ మరియు సైబర్ క్రైమ్ హెల్ప్‌లైన్‌ను సంప్రదించండి.",
    financialTag1: "స్క్రీన్‌షాట్ సహాయకం",
    financialTag2: "బ్యాంక్ లీన్ అభ్యర్థన",
    financialTag3: "మేజిస్ట్రేట్ పిటిషన్",
    digitalCardTitle: "అనుమానాస్పద కాల్‌లు, సందేశాలు లేదా నకిలీ పత్రాలు",
    digitalCardSubtitle: "నకిలీ చట్ట అమలు కాల్‌లు, బ్లాక్‌మెయిల్ లేదా డిజిటల్ అరెస్ట్ బెదిరింపులు",
    digitalCardDesc: "కాలర్ వివరాలు మరియు సందేశాలను సేవ్ చేయండి. సురక్షితమైన రిపోర్టింగ్ దశల ద్వారా మేము మీకు మార్గదర్శనం చేస్తాము.",
    digitalTag1: "పత్రాల తనిఖీ",
    digitalTag2: "ఫిర్యాదు ముసాయిదా",
    digitalTag3: "సిమ్ బ్లాక్ మార్గదర్శకత్వం",
    readDetailsAloud: "వివరాలను బిగ్గరగా చదవండి",
    stopAudio: "ఆడియో ఆపండి"
  },
  navigation: {
    financialStep1: "1. ఏం జరిగిందో చెప్పండి",
    financialStep2: "2. వివరాలను తనిఖీ చేయండి",
    financialStep3: "3. ఇప్పుడే సహాయం పొందండి",
    digitalArrestStep1: "1. ఏం జరిగిందో చెప్పండి",
    digitalArrestStep2: "2. ఆధారాలు & రిపోర్ట్ చూడండి",
    digitalArrestStep3: "3. చట్టపరమైన చర్య తీసుకోండి"
  },
  factCheck: {
    title: "చట్టపరమైన వాస్తవాల తనిఖీ: మీ హక్కులను తెలుసుకోండి",
    subtitle: "నిజమైన భారతీయ క్రిమినల్ విధానం (BNSS) వర్సెస్ నకిలీ పోలీసు బెదిరింపులు",
    myth1Title: "అపోహ: 'మీరు వీడియో కాల్‌లో డిజిటల్ అరెస్టులో ఉన్నారు'",
    myth1Reality: "వాస్తవం: భారతీయ చట్టంలో (BNS/BNSS) 'డిజిటల్ అరెస్ట్' అనే నిబంధన లేదు. పోలీసులు ఎప్పుడూ స్కైప్ లేదా వాట్సాప్‌లో అరెస్ట్ చేయరు.",
    myth2Title: "అపోహ: 'నిర్దోషిత్వాన్ని నిరూపించుకోవడానికి RBI ఖాతాకు డబ్బు బదిలీ చేయండి'",
    myth2Reality: "వాస్తవం: ధృవీకరణ కోసం డబ్బు బదిలీ చేయమని RBI లేదా పోలీసులు ఎప్పుడూ అడగరు. డబ్బు డిమాండ్ చేయడం 100% దోపిడీ (Extortion).",
    myth3Title: "అపోహ: 'సుప్రీంకోర్టు తక్షణ అరెస్ట్ వారెంట్ జారీ చేసింది'",
    myth3Reality: "వాస్తవం: అరెస్ట్ వారెంట్‌లను స్థానిక పోలీసులు వ్యక్తిగతంగా అందిస్తారు, వాట్సాప్ PDFల రూపంలో పంపరు."
  },
  intake: {
    financialTitle: "మీ లావాదేవీ వివరాలను సురక్షితం చేద్దాం",
    financialSubtitle: "మీ బ్యాంక్ డెబిట్ SMS లేదా UPI రసీదు స్క్రీన్‌షాట్‌ను అప్‌లోడ్ చేయండి లేదా కింద టెక్స్ట్ పేస్ట్ చేయండి.",
    dropzoneTitle: "చెల్లింపు రసీదు / డెబిట్ SMS అప్‌లోడ్ చేయండి",
    dropzoneSubtitle: "PhonePe, GPay, Paytm లేదా నెట్‌బ్యాంకింగ్ నుండి PNG, JPG, లేదా PDF స్కాన్.",
    uploadScreenshot: "స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి",
    pasteSmsTitle: "లేదా SMS / లావాదేవీ టెక్స్ట్‌ను పేస్ట్ చేయండి",
    pasteSmsPlaceholder: "డెబిట్ సందేశాన్ని పేస్ట్ చేయండి e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
    utrLabel: "12-అంకెల బ్యాంకింగ్ UTR / RRN",
    amountLabel: "మోసం మొత్తం",
    serverVerified: "సర్వర్ ధృవీకరించబడింది (సెక్షన్ 63 BSA)"
  },
  audit: {
    scoreLabel: "స్కోరు",
    detailsChecked: "వివరాలు తనిఖీ చేయబడ్డాయి",
    summaryTitle: "సంఘటన సారాంశం & సాక్ష్యం",
    summaryVerdict: "అత్యవసర సంఘటన డేటా ధృవీకరించబడింది. బ్యాంక్ లీన్ ఫ్రీజ్ నోటీస్ మరియు పోలీస్ FIR 1-ట్యాప్ పంపడానికి సిద్ధంగా ఉన్నాయి.",
    recoveryEligibility: "రికవరీ అర్హత",
    eligibleForBankFreeze: "బ్యాంక్ ఫ్రీజ్ చేయడానికి అర్హులు",
    verifyEditTitle: "సంఘటన గుర్తింపుదారులను ధృవీకరించండి & సవరించండి",
    clickToUpdate: "వివరాలను నవీకరించడానికి క్లిక్ చేయండి",
    utrLabel: "12-అంకెల బ్యాంకింగ్ UTR / RRN",
    fraudAmountLabel: "మోసం మొత్తం (₹)",
    suspectVpaLabel: "అనుమానిత UPI / VPA ID",
    suspectAccountNoLabel: "అనుమానిత ఖాతా సంఖ్య",
    suspectIfscLabel: "అనుమానిత ఖాతా IFSC",
    victimBankLabel: "బాధితుడి బ్యాంక్ పేరు",
    victimAccountNoLabel: "బాధితుడి ఖాతా సంఖ్య",
    victimIfscLabel: "బాధితుడి ఖాతా IFSC",
    victimNameLabel: "బాధితుడి పూర్తి పేరు",
    contactPhoneLabel: "సంప్రదింపు ఫోన్ నంబర్",
    evidenceChecklistTitle: "సాక్ష్యాల చెక్‌లిస్ట్",
    statusVerified: "ధృవీకరించబడింది",
    statusAttention: "శ్రద్ధ వహించండి",
    statusUrgent: "అత్యవసరం",
    vectorUtrLabel: "12-అంకెల UTR / RRN గుర్తింపుదారు",
    vectorUtrPassed: "చెల్లుబాటు అయ్యే 12-అంకెల బ్యాంకింగ్ రిఫరెన్స్.",
    vectorUtrFailed: "UTR రిఫరెన్స్ నంబర్ లేదు లేదా అసంపూర్ణంగా ఉంది.",
    vectorGoldenHourLabel: "గోల్డెన్ 2-గంటల రికవరీ విండో",
    vectorGoldenHourPassed: "గోల్డెన్ సమయంలో నివేదించబడింది. ఫండ్స్ లాక్ అయ్యే అవకాశం ఎక్కువ (>80%).",
    vectorGoldenHourWarning: "సమయం దాటిన తర్వాత నివేదించబడింది. లీన్ అభ్యర్థన మ్యూల్ ఖాతాలను టార్గెట్ చేస్తుంది.",
    vectorSuspectLabel: "మ్యూల్ ఖాతా & VPA టెలిమెట్రీ",
    vectorSuspectPassed: "టార్గెట్ VPA / ఖాతా గుర్తించబడింది.",
    vectorSuspectWarning: "అనుమానిత VPA వివరాలు అసంపూర్ణం; బ్యాంక్ ఇంటర్‌బ్యాంక్ స్విచ్ ద్వారా ట్రాక్ చేస్తుంది.",
    vectorRbiLabel: "RBI చట్టబద్ధ సున్నా-బాధ్యత నియమం",
    vectorRbiDetails: "కస్టమర్ నష్టం లేకుండా RBI మాస్టర్ సర్క్యులర్ అమలు.",
    noticeCyberSafetyTitle: "సైబర్ భద్రతా చర్యపై నోటీసు",
    noticeCyberSafetyDesc: "రూపొందించిన పత్రాలు ఇండియన్ సైబర్ క్రైమ్ కోఆర్డినేషన్ సెంటర్ (I4C) మార్గదర్శకాలకు అనుగుణంగా ఉన్నాయి. మీరు వీటిని నేరుగా మీ బ్యాంక్ లేదా 1930 హెల్ప్‌లైన్‌కు సమర్పించవచ్చు.",
    backToIntake: "ఇన్‌టేక్‌కు తిరిగి వెళ్లండి",
    continueToGetHelp: "సహాయం పొందడానికి కొనసాగించండి"
  },
  step3Action: {
    targetAmountLabel: "రికవర్ చేయవలసిన మోసం మొత్తం",
    bankingUtrLabel: "బ్యాంకింగ్ UTR",
    bankLabel: "బ్యాంక్",
    actionBannerDesc: "డబ్బును ఫ్రీజ్ చేయడానికి మరియు అధికారిక FIR నమోదు చేయడానికి కింది అత్యవసర చర్యలను పూర్తి చేయండి.",
    firGuideTag: "పూర్తి FIR గైడ్",
    firGuideTitle: "పూర్తి సైబర్ పోలీస్ FIR వర్క్‌ఫ్లో",
    firGuideDesc: "మీ అధికారిక ఫిర్యాదును ఆన్‌లైన్‌లో లేదా స్థానిక పోలీస్ స్టేషన్‌లో సమర్పించడానికి దశలవారీ మార్గదర్శకత్వం పొందండి.",
    openFirGuideBtn: "పూర్తి FIR గైడ్ & పత్రాలను తెరవండి",
    noticeInspectorTag: "నోటీసు ఇన్‌స్పెక్టర్",
    bankNoticeTitle: "బ్యాంక్ నోడల్ ఇమెయిల్ ఇన్‌స్పెక్టర్",
    bankNoticeDesc: "సెక్షన్ 91 BNSS పూర్తి చట్టపరమైన టెక్స్ట్‌ను సమీక్షించండి మరియు నోడల్ అధికారుల నంబర్లను చూడండి.",
    inspectBankNoticeBtn: "పూర్తి బ్యాంక్ నోటీసును చూడండి",
    recoveryRoadmapTitle: "మీ డబ్బు ఎలా రికవర్ అవుతుంది (దశల వారీగా)",
    stage1Title: "1930 హెల్ప్‌లైన్‌కు రిపోర్ట్ చేయండి",
    stage1Time: "మొదటి 15 నిమిషాలు",
    stage1Desc: "మీ లావాదేవీ UTRను ఫ్లాగ్ చేయడానికి జాతీయ సైబర్ క్రైమ్ పోర్టల్‌లో అత్యవసర టికెట్ నమోదు చేయబడుతుంది.",
    stage2Title: "లబ్ధిదారుడి బ్యాంక్ ఖాతాను ఫ్రీజ్ చేయండి",
    stage2Time: "15 నిమిషాలు – 2 గంటలు",
    stage2Desc: "మోసగాడు డబ్బును ఉపసంహరించుకోకముందే నిధులను లాక్ చేయడానికి వారి బ్యాంక్‌కు తక్షణ నోటీసు పంపబడుతుంది.",
    stage3Title: "పోలీస్ సైబర్ FIR నమోదు చేయండి",
    stage3Time: "రోజు 1 – 5",
    stage3Desc: "ఆపబడిన డబ్బును చట్టబద్ధంగా స్వాధీనం చేసుకోవడానికి ఫిర్యాదు అధికారిక FIRగా మార్చబడుతుంది.",
    stage4Title: "మీ ఖాతాకు తిరిగి రీఫండ్",
    stage4Time: "రోజు 7 – 15",
    stage4Desc: "కోర్టు లేదా బ్యాంక్ ఫ్రీజ్ చేసిన నిధులను తిరిగి మీ బ్యాంక్ ఖాతాకు బదిలీ చేయడానికి ఉత్తర్వులు జారీ చేస్తుంది.",
    helplineScriptBtn: "1930 హెల్ప్‌లైన్ కాల్ స్క్రిప్ట్",
    sendCyberAlertBtn: "ఆన్‌లైన్ సైబర్ హెచ్చరికను పంపండి",
    backToDetails: "వివరాలకు తిరిగి వెళ్లండి",
    inspectRawPayload: "రా పేలోడ్‌ను తనిఖీ చేయండి",
    whatNextTitle: "తర్వాత మీరు ఏమి చేయాలి? (సిఫార్సు చేసిన దశలు)",
    nextStep1Title: "ప్రశాంతంగా ఉండి కాల్ కట్ చేయండి",
    nextStep1Desc: "కంగారుపడవద్దు లేదా మోసగాడితో మాట్లాడవద్దు. డబ్బు తిరిగి పొందడానికి ఎప్పుడూ 'అన్‌ఫ్రీజ్ ఫీజు' చెల్లించవద్దు.",
    nextStep2Title: "మీ ఖాతాలు & పాస్‌వర్డ్‌లను సురక్షితం చేయండి",
    nextStep2Desc: "వెంటనే మీ UPI MPIN, నెట్‌బ్యాంకింగ్ మరియు ఇమెయిల్ పాస్‌వర్డ్‌లను మార్చండి. స్క్రీన్-షేరింగ్ యాప్‌లను తొలగించండి.",
    nextStep3Title: "మీ హోమ్ బ్యాంక్ బ్రాంచ్‌ను సందర్శించండి",
    nextStep3Desc: "24-48 గంటల్లో బ్యాంక్ లీన్ లెటర్ కాపీతో మీ బ్యాంక్ మేనేజర్‌ను కలవండి.",
    nextStep4Title: "రశీదులను భద్రపరచండి & సైబర్ పోలీసులను కలవండి",
    nextStep4Desc: "1930 / cybercrime.gov.in నుండి వచ్చే SMS రశీదులను సేవ్ చేయండి మరియు అవసరమైతే సర్టిఫైడ్ FIR కాపీ తీసుకోండి.",
    rememberTitle: "గుర్తుంచుకోండి:",
    rememberDesc: "నిజమైన పోలీసు అధికారులు లేదా బ్యాంక్ ఉద్యోగులు ఎప్పుడూ మీ OTP, PIN లేదా ఇతర ఖాతాలకు డబ్బు బదిలీ చేయమని అడగరు."
  },
  digitalArrest: {
    heroTitle: "నకిలీ డిజిటల్ అరెస్ట్ & పోలీస్ వంచన రక్షణ",
    heroSubtitle: "నకిలీ CBI, సైబర్ సెల్, కస్టమ్స్ ఫెడెక్స్ పార్సెల్ మరియు వీడియో కాల్ బెదిరింపుల నుండి తక్షణ రక్షణ.",
    impersonatedAgencyLabel: "నకిలీ సంస్థ / అధికారి",
    callerIdLabel: "కాలర్ ID / వాట్సాప్ / స్కైప్ హ్యాండిల్",
    extortionDemandLabel: "డిమాండ్ చేసిన మొత్తం (₹)",
    disconnectAdviceTitle: "తక్షణ చర్య: కాల్‌ను వెంటనే కట్ చేయండి",
    disconnectAdviceDesc: "మీరు పూర్తిగా సురక్షితంగా ఉన్నారు. నిజమైన పోలీసులు ఎప్పుడూ వీడియో కాల్‌లో డబ్బు అడగరు.",
    factCheckBadge: "చట్టపరమైన వాస్తవాల తనిఖీ",
    notInDangerBadge: "మీరు చట్టపరమైన ప్రమాదంలో లేరు",
    step2Title: "డిజిటల్ అరెస్ట్ వెనుక ఉన్న వాస్తవాలు & చట్టపరమైన నిజం",
    step2Subtitle: "మోసగాళ్ళు భయాన్ని సృష్టించడానికి నకిలీ యూనిఫారాలు, వీడియో కాల్‌లు ఉపయోగిస్తారు. చట్టం మిమ్మల్ని ఎలా రక్షిస్తుందో తెలుసుకోండి.",
    claimVsRealityTitle: "మోసగాళ్ల బెదిరింపులు వర్సెస్ నిజమైన చట్టపరమైన హక్కులు",
    scammerClaimLabel: "మోసగాడి బెదిరింపు",
    legalRealityLabel: "చట్టపరమైన వాస్తవం",
    myth1Claim: "మీరు 'డిజిటల్ అరెస్టు'లో ఉన్నారు, గదిని వదిలి వెళ్ళకూడదు.",
    myth1Truth: "భారత చట్టంలో 'డిజిటల్ అరెస్ట్'కు 0% గుర్తింపు ఉంది. వీడియో కాల్‌లో ఎవరినీ బంధించే హక్కు లేదు.",
    myth2Claim: "24x7 వీడియో కెమెరా ఆన్‌లో ఉంచండి లేకపోతే పోలీసులు వస్తారు.",
    myth2Truth: "సమన్లను లిఖితపూర్వకంగా నేరుగా ఇవ్వాలి. వీడియో కాల్‌లో నిర్బంధించడం నేరపూరిత దోపిడీ.",
    myth3Claim: "ధృవీకరణ కోసం 'RBI సెక్యూరిటీ ఎస్క్రో' ఖాతాకు డబ్బు బదిలీ చేయండి.",
    myth3Truth: "ఏ కోర్టు, పోలీసు లేదా RBI పౌరుల నుండి డబ్బు బదిలీ చేయమని ఎప్పుడూ కోరదు.",
    myth4Claim: "జాతీయ భద్రతా గోప్యత: కుటుంబానికి లేదా న్యాయవాదులకు చెప్పకూడదు.",
    myth4Truth: "రాజ్యాంగంలోని ఆర్టికల్ 22 ప్రకారం న్యాయవాదిని సంప్రదించే ప్రాథమిక హక్కు ప్రతి పౌరుడికి ఉంది.",
    safeTakeActionBadge: "మీరు సురక్షితంగా ఉన్నారు. కింద చర్య తీసుకోండి.",
    step3NextStepsTitle: "సిఫార్సు చేయబడిన తదుపరి దశలు",
    step3NextStepsSubtitle: "మిమ్మల్ని బెదిరించే మోసగాళ్లకు ఎటువంటి చట్టబద్ధమైన అధికారం లేదు. ఈ 3 రక్షణ దశలను అనుసరించండి.",
    safetyStep1Title: "1. అన్ని వీడియో కాల్‌లను కట్ చేసి కాలర్‌ను బ్లాక్ చేయండి",
    safetyStep1Desc: "వాట్సాప్ లేదా స్కైప్ వీడియో కాల్‌లను వెంటనే ముగించండి. నిజమైన పోలీసులు ఎప్పుడూ వెబ్‌క్యామ్‌లో బెదిరించరు.",
    safetyStep2Title: "2. చక్షు (DoT) పోర్టల్‌లో నకిలీ నంబర్‌ను నివేదించండి",
    safetyStep2Desc: "భారతదేశం అంతటా వారి సిమ్ మరియు ఫోన్‌ను బ్లాక్ చేయడానికి డిపార్ట్‌మెంట్ ఆఫ్ టెలికాం చక్షు పోర్టల్‌లో ఫిర్యాదు చేయండి.",
    copyChakshuBtn: "1. మోసగాడి వివరాలను కాపీ చేయండి",
    chakshuCopiedBtn: "వివరాలు కాపీ చేయబడ్డాయి!",
    openChakshuBtn: "2. సంచార్ సాథి (చక్షు) తెరవండి",
    safetyStep3Title: "3. డిజిటల్ అరెస్ట్ పోలీస్ FIR డౌన్‌లోడ్ చేసి నమోదు చేయండి",
    safetyStep3Desc: "భారతీయ న్యాయ సంహిత (BNS) సెక్షన్ 204 మరియు సెక్షన్ 308 కింద క్రిమినల్ ఫిర్యాదును సిద్ధం చేయండి.",
    downloadDigitalFirBtn: "FIR ఫిర్యాదు PDF డౌన్‌లోడ్ చేయండి",
    shareDigitalFirBtn: "వాట్సాప్‌లో FIR షేర్ చేయండి",
    continueToSafetyBtn: "రక్షణ చర్యలకు కొనసాగించండి",
    callerThreatDetailsTitle: "కాలర్ & బెదిరింపు వివరాలు",
    dropNoticeTitle: "అనుమానాస్పద నోటీసు / సమన్ చిత్రం అప్‌లోడ్ చేయండి",
    dropNoticeSubtitle: "వాట్సాప్ లేదా స్కైప్‌లో అందుకున్న నకిలీ CBI/పోలీస్ లేఖ లేదా స్క్రీన్‌షాట్.",
    uploadDocumentBtn: "పత్రం అప్‌లోడ్ చేయండి",
    pasteDemandTitle: "లేదా సందేశం / డిమాండ్ టెక్స్ట్‌ను పేస్ట్ చేయండి",
    pasteDemandPlaceholder: "బెదిరింపు సందేశాన్ని పేస్ట్ చేయండి e.g. 'మీరు మనీలాండరింగ్ కేసులో CBI డిజిటల్ అరెస్టులో ఉన్నారు. స్కైప్‌లో ఉండి రూ. 2.5 లక్షలు డిపాజిట్ చేయండి...'",
    targetAgencyLabel: "లక్ష్యిత సంస్థ",
    demandLabel: "డిమాండ్",
    advisoryTitle: "అధికారిక సైబర్ భద్రతా సలహా:",
    advisoryDesc: "భారతీయ చట్ట అమలు సంస్థలు (CBI, రాష్ట్ర పోలీసులు, ED, కస్టమ్స్, సుప్రీం కోర్టు) ఎప్పుడూ స్కైప్ లేదా వాట్సాప్ వీడియో కాల్‌లలో పౌరులను అరెస్టు చేయవు మరియు ఎటువంటి ధృవీకరణ ఖాతాకు డబ్బు డిమాండ్ చేయవు. డబ్బు పంపవద్దు.",
    continueToReviewProof: "ఆధారాలను సమీక్షించడానికి కొనసాగించండి"
  },
  actions: {
    heroTitle: "ఇప్పుడే చర్య తీసుకోండి — 1-ట్యాప్ డైరెక్ట్ లింక్‌లు",
    heroSubtitle: "మాన్యువల్ కాపీ-పేస్ట్ లేకుండా ఒకే ట్యాప్‌లో అన్ని అత్యవసర చర్యలను ప్రారంభించండి.",
    step1HelplineTitle: "1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి",
    step1HelplineDesc: "జాతీయ సైబర్ క్రైమ్ సిటిజన్ హెల్ప్‌లైన్‌కు నేరుగా కనెక్ట్ అవ్వండి.",
    step1HelplineBtn: "ఇప్పుడే 1930 డయల్ చేయండి",
    step2BankTitle: "బ్యాంక్ ఫ్రాడ్ డెస్క్‌కు ఇమెయిల్ చేయండి (సెక్షన్ 91 BNSS)",
    step2BankDesc: "ముందుగా రూపొందించిన చట్టబద్ధ లీన్ నోటీసును పంపుతుంది:",
    step2BankBtn: "బ్యాంకుకు ఇమెయిల్ చేయండి",
    step3NcrpTitle: "NCRP ఫిర్యాదు దాఖలు చేయండి (cybercrime.gov.in)",
    step3NcrpDesc: "1-ట్యాప్ చట్టపరమైన ప్రకటనను కాపీ చేసి జాతీయ పోర్టల్‌ను తెరవండి.",
    step3NcrpCopyBtn: "1. చట్టపరమైన ప్రకటనను కాపీ చేయండి",
    step3NcrpPortalBtn: "2. cybercrime.gov.in తెరవండి",
    step4ShareTitle: "1-ట్యాప్ వాట్సాప్ & పత్రాల భాగస్వామ్యం",
    livePrompterTitle: "లైవ్ టెలిప్రాంప్టర్ స్క్రిప్ట్ (1930 అధికారికి ఇది చదవండి):",
    collapseScript: "స్క్రిప్ట్ దాచండి",
    showScript: "స్క్రిప్ట్ చూపించు",
    teleprompterHello: "నమస్తే ఆఫీసర్, నేను అనధికారిక సైబర్ మోసాన్ని నివేదించాలి, మొత్తం ₹",
    teleprompterClosing: "గ్రహీత ఖాతాను ఫ్రీజ్ చేయడానికి దయచేసి CFCFRMS లో ఈ UTR ను ఫ్లాగ్ చేయండి మరియు రసీదు నంబర్ ఇవ్వండి.",
    step1Tag: "దశ 1 • తక్షణ ప్రాధాన్యత",
    step1Time: "మొదటి 15 నిమిషాలు",
    call1930NowBtn: "ఇప్పుడే 1930 కు కాల్ చేయండి",
    step2Tag: "దశ 2 • ఇంటర్-బ్యాంక్ బదిలీని ఆపండి",
    step2Time: "15 నిమిషాలు – 2 గంటలు",
    emailBankTitle: "బ్యాంక్ ఫ్రాడ్ డెస్క్‌కు ఇమెయిల్ చేయండి (సెక్షన్ 91 BNSS)",
    emailBankDesc: "ముందుగా రూపొందించిన చట్టబద్ధ లీన్ నోటీసును పంపుతుంది:",
    emailBankBtn: "బ్యాంకుకు ఇమెయిల్ చేయండి",
    downloadPdfAttachBtn: "జతచేయడానికి PDF డౌన్‌లోడ్ చేయండి",
    noMailAppNotice: "డిఫాల్ట్ మెయిల్ యాప్ తెరవలేదా? అధికారిక ఫ్రాడ్-డెస్క్ ఇమెయిల్‌ను కాపీ చేయండి:",
    step3Tag: "దశ 3 • అధికారిక ప్రభుత్వ పోర్టల్",
    step3Time: "అదే రోజు ఫైలింగ్",
    ncrpTitle: "NCRP ఫిర్యాదు దాఖలు చేయండి (cybercrime.gov.in)",
    ncrpDesc: "1-ట్యాప్ చట్టపరమైన ప్రకటనను కాపీ చేసి జాతీయ పోర్టల్‌ను తెరవండి.",
    copyStatementBtn: "1. చట్టపరమైన ప్రకటనను కాపీ చేయండి",
    statementCopiedBtn: "ప్రకటన కాపీ చేయబడింది!",
    openPortalBtn: "2. cybercrime.gov.in తెరవండి",
    shareDocsTitle: "1-ట్యాప్ వాట్సాప్ & పత్రాల భాగస్వామ్యం (కుటుంబం, న్యాయవాది, పోలీసులకు)",
    shareDocsSubtitle: "డిజిటల్‌గా రూపొందించిన చట్టపరమైన సాక్ష్యాల PDFలను నేరుగా షేర్ చేయండి.",
    docBankFreeze: "బ్యాంక్ ఫ్రీజ్ నోటీస్",
    docBankFreezeSub: "సెక్షన్ 91 BNSS లేఖ",
    docPoliceFir: "పోలీస్ FIR",
    docPoliceFirSub: "BNS 318(4) డోసియర్",
    docCourtRefund: "కోర్టు రీఫండ్",
    docCourtRefundSub: "సెక్షన్ 503 BNSS పిటిషన్",
    docEvidenceCert: "సాక్ష్య ధృవీకరణ పత్రం",
    docEvidenceCertSub: "సెక్షన్ 63(4) BSA 2023"
  },
  a11y: {
    panelTitle: "సౌలభ్యం & భాషా ప్రాధాన్యతలు",
    panelSubtitle: "డిస్ప్లే మరియు పఠన ప్రాధాన్యతలను మార్చుకోండి",
    selectLanguage: "భాషను ఎంచుకోండి",
    textSize: "అక్షరాల పరిమాణం",
    sizeDefault: "సాధారణ (1x)",
    sizeLarge: "పెద్దది (1.25x)",
    sizeExtraLarge: "చాలా పెద్దది (1.5x)",
    panicModeTitle: "సరళమైన / పానిక్ మోడ్",
    panicModeDesc: "గందరగోళాన్ని తగ్గిస్తుంది మరియు ప్రధాన బటన్లను పెద్దవిగా చేస్తుంది.",
    readPageAloudTitle: "పేజీని బిగ్గరగా చదవండి",
    readPageAloudDesc: "బ్రౌజర్ స్పీచ్ ద్వారా ప్రస్తుత పేజీ కంటెంట్‌ను ఆడియో రూపంలో వినిపిస్తుంది.",
    readBtn: "వినండి",
    stopBtn: "ఆపండి",
    audioFirstTitle: "ఆడియో-ఫస్ట్ మోడ్ (ఆటో రీడ్-బ్యాక్)",
    audioFirstDesc: "బటన్లను నొక్కకుండానే సేకరించిన డేటాను మరియు చట్టపరమైన వాస్తవాలను ఆటోమేటిక్‌గా వినిపిస్తుంది.",
    islTitle: "భారతీయ సంకేత భాష (ISL)",
    islDesc: "ముఖ్యమైన దశలలో సంకేత భాష వీడియో క్లిప్‌లను చూపుతుంది."
  }
};

// 4. TAMIL (TA)
const TA_DICT: TranslationDictionary = {
  common: {
    appName: "CyberRakshak 1930",
    tagline: "வழிகாட்டப்பட்ட சைபர்-மோசடி உதவியாளர் & சட்ட நடவடிக்கை அமைப்பு",
    subtitle: "மோசடி வங்கி SMS அல்லது ஸ்கிரீன்ஷாட்களை 60 வினாடிகளில் 1-தட்டல் வங்கி முடக்க அறிவிப்புகள் & காவல் FIR ஆக மாற்றவும்.",
    topBannerAlert: "விரைவாகப் புகாரளிப்பது பணப் பரிமாற்றத்தை நிறுத்தும் வாய்ப்பை அதிகரிக்கிறது.",
    goldenHourBadge: "கோல்டன் 2-மணிநேர மீட்பு நேரம் செயலில் உள்ளது",
    call1930: "1930 உதவி எண்ணை அழைக்கவும்",
    myCases: "என் வழக்குகள்",
    signIn: "உள்நுழைக",
    signOut: "வெளியேறு",
    back: "பின்னால்",
    continue: "தொடரவும்",
    cancel: "ரத்து செய்",
    close: "மூடு",
    copied: "நகலெடுக்கப்பட்டது!",
    copy: "நகலெடு",
    shareWhatsApp: "வாட்ஸ்அப்பில் பகிரவும்",
    downloadPdf: "PDF பதிவிறக்கவும்",
    verified: "சரிபார்க்கப்பட்டது",
    recordLiveCallout: "இப்போது மோசடி அழைப்பில் உள்ளீர்களா? நேரலையில் பதிவு செய்யவும்",
    recordLiveBtn: "நேரலை பதிவு",
    accessibilityBtn: "அணுகல்தன்மை",
    voiceGuideBtn: "குரல் வழிகாட்டி",
    speaking: "பேசுகிறது...",
    flowSelectTitle: "என்ன நடந்தது என்று சொல்லுங்கள்",
    flowSelectSubtitle: "உங்கள் சூழ்நிலைக்கு மிகவும் பொருத்தமான விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
    selected: "தேர்ந்தெடுக்கப்பட்டது",
    financialCardTitle: "என் அனுமதி இல்லாமல் பணம் அனுப்பப்பட்டது அல்லது கழிக்கப்பட்டது",
    financialCardSubtitle: "UPI, அட்டை அல்லது வங்கி பரிமாற்ற மோசடி",
    financialCardDesc: "உங்களிடம் உள்ள கட்டண விவரங்களைச் சேர்த்து, உங்கள் வங்கி மற்றும் சைபர்கிரைம் உதவி எண்ணைத் தொடர்பு கொள்ளவும்.",
    financialTag1: "ஸ்கிரீன்ஷாட் உதவியாளர்",
    financialTag2: "வங்கி லீன் கோரிக்கை",
    financialTag3: "நீதிமன்ற மனு",
    digitalCardTitle: "சந்தேகத்திற்கிடமான அழைப்புகள், செய்திகள் அல்லது போலி ஆவணங்கள்",
    digitalCardSubtitle: "போலி சட்ட அமலாக்க அழைப்புகள், மிரட்டல் அல்லது டிஜிட்டல் கைது அச்சுறுத்தல்கள்",
    digitalCardDesc: "அழைப்பாளர் விவரங்கள் மற்றும் செய்திகளைச் சேமிக்கவும். பாதுகாப்பான புகார் செயல்முறையில் நாங்கள் உங்களுக்கு வழிகாட்டுவோம்.",
    digitalTag1: "ஆவண சரிபார்ப்பு",
    digitalTag2: "புகார் வரைவு",
    digitalTag3: "சிம் பிளாக் வழிகாட்டுதல்",
    readDetailsAloud: "விவரங்களை உரக்கப் படிக்கவும்",
    stopAudio: "ஆடியோவை நிறுத்து"
  },
  navigation: {
    financialStep1: "1. என்ன நடந்தது என்று சொல்லுங்கள்",
    financialStep2: "2. விவரங்களைச் சரிபார்க்கவும்",
    financialStep3: "3. இப்போது உதவி பெறுங்கள்",
    digitalArrestStep1: "1. என்ன நடந்தது என்று சொல்லுங்கள்",
    digitalArrestStep2: "2. ஆதாரங்களை மதிப்பாய்வு செய்யவும்",
    digitalArrestStep3: "3. சட்ட நடவடிக்கை எடுக்கவும்"
  },
  factCheck: {
    title: "சட்ட உண்மை சரிபார்ப்பு: உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்",
    subtitle: "உண்மையான இந்திய குற்றவியல் நடைமுறை (BNSS) vs போலி போலீஸ் அச்சுறுத்தல்கள்",
    myth1Title: "கட்டுக்கதை: 'நீங்கள் வீடியோ அழைப்பில் டிஜிட்டல் கைதில் உள்ளீர்கள்'",
    myth1Reality: "உண்மை: இந்திய சட்டத்தில் (BNS/BNSS) 'டிஜிட்டல் கைது' என்ற விதி இல்லை. போலீசார் ஒருபோதும் ஸ்கைப் அல்லது வாட்ஸ்அப்பில் கைது செய்வதில்லை.",
    myth2Title: "கட்டுக்கதை: 'நிரபராதி என்பதை நிரூபிக்க RBI கணக்கிற்கு பணம் அனுப்புங்கள்'",
    myth2Reality: "உண்மை: RBI அல்லது போலீசார் ஒருபோதும் சரிபார்ப்பிற்காக பணம் கேட்க மாட்டார்கள். பணம் கேட்பது 100% மிரட்டிப் பறித்தல்.",
    myth3Title: "கட்டுக்கதை: 'உச்ச நீதிமன்றம் உடனடி கைது வாரண்ட் பிறப்பித்துள்ளது'",
    myth3Reality: "உண்மை: கைது வாரண்டுகள் உள்ளூர் போலீசாரால் நேரில் மட்டுமே வழங்கப்படும், வாட்ஸ்அப் PDF ஆக அனுப்பப்படாது."
  },
  intake: {
    financialTitle: "உங்கள் பரிவர்த்தனை விவரங்களைப் பாதுகாப்போம்",
    financialSubtitle: "உங்கள் வங்கி டெபிட் SMS அல்லது UPI ரசீது ஸ்கிரீன்ஷாட்டைப் பதிவேற்றவும் அல்லது உரையை கீழே ஒட்டவும்.",
    dropzoneTitle: "கட்டண ரசீது / டெபிட் SMS பதிவேற்றவும்",
    dropzoneSubtitle: "PhonePe, GPay, Paytm அல்லது நெட்பேங்கிங்கில் இருந்து PNG, JPG அல்லது PDF.",
    uploadScreenshot: "ஸ்கிரீன்ஷாட் பதிவேற்றவும்",
    pasteSmsTitle: "அல்லது SMS / பரிவர்த்தனை உரையை ஒட்டவும்",
    pasteSmsPlaceholder: "டெபிட் செய்தியை ஒட்டவும் e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
    utrLabel: "12-இலக்க வங்கி UTR / RRN",
    amountLabel: "மோசடி தொகை",
    serverVerified: "சர்வர் சரிபார்க்கப்பட்டது (பிரிவு 63 BSA)"
  },
  audit: {
    scoreLabel: "மதிப்பெண்",
    detailsChecked: "விவரங்கள் சரிபார்க்கப்பட்டன",
    summaryTitle: "சம்பவ சுருக்கம் & சான்றுகள்",
    summaryVerdict: "அவசர சம்பவத் தரவு சரிபார்க்கப்பட்டது. வங்கி லீன் முடக்க அறிவிப்பு மற்றும் போலீஸ் FIR அனுப்ப தயாராக உள்ளன.",
    recoveryEligibility: "மீட்பு தகுதி",
    eligibleForBankFreeze: "வங்கி முடக்கத்திற்கு தகுதியானது",
    verifyEditTitle: "சம்பவ அடையாளங்காட்டிகளை சரிபார்த்து திருத்தவும்",
    clickToUpdate: "விவரங்களை புதுப்பிக்க கிளிக் செய்க",
    utrLabel: "12-இலக்க வங்கி UTR / RRN",
    fraudAmountLabel: "மோசடி தொகை (₹)",
    suspectVpaLabel: "சந்தேகத்திற்கிடமான UPI / VPA ID",
    suspectAccountNoLabel: "சந்தேகத்திற்கிடமான கணக்கு எண்",
    suspectIfscLabel: "சந்தேகத்திற்கிடமான IFSC",
    victimBankLabel: "பாதிக்கப்பட்டவரின் வங்கி பெயர்",
    victimAccountNoLabel: "பாதிக்கப்பட்டவரின் கணக்கு எண்",
    victimIfscLabel: "பாதிக்கப்பட்டவரின் IFSC",
    victimNameLabel: "பாதிக்கப்பட்டவரின் முழு பெயர்",
    contactPhoneLabel: "தொடர்பு தொலைபேசி எண்",
    evidenceChecklistTitle: "சான்றுகள் சரிபார்ப்பு பட்டியல்",
    statusVerified: "சரிபார்க்கப்பட்டது",
    statusAttention: "கவனம்",
    statusUrgent: "அவசரம்",
    vectorUtrLabel: "12-இலக்க UTR / RRN அடையாளங்காட்டி",
    vectorUtrPassed: "செல்லுபடியாகும் 12-இலக்க வங்கி குறிப்பு.",
    vectorUtrFailed: "UTR குறிப்பு எண் விடுபட்டுள்ளது அல்லது முழுமையடையவில்லை.",
    vectorGoldenHourLabel: "கோல்டன் 2-மணிநேர மீட்பு காலம்",
    vectorGoldenHourPassed: "கோல்டன் காலத்தில் புகாரளிக்கப்பட்டது. பணத்தை முடக்குவதற்கான அதிக வாய்ப்பு (>80%).",
    vectorGoldenHourWarning: "காலதாமதமாக புகாரளிக்கப்பட்டது. லீன் கோரிக்கை மியூல் கணக்குகளை இலக்காகக் கொள்ளும்.",
    vectorSuspectLabel: "மியூல் கணக்கு & VPA விவரங்கள்",
    vectorSuspectPassed: "இலக்கு VPA / கணக்கு அடையாளம் காணப்பட்டது.",
    vectorSuspectWarning: "VPA விவரங்கள் முழுமையடையவில்லை; வங்கி UTR மூலம் கண்டறியும்.",
    vectorRbiLabel: "RBI சட்டப்பூர்வ பூஜ்ஜிய-பொறுப்பு விதி",
    vectorRbiDetails: "மூன்றாம் தரப்பு மீறல்களில் வாடிக்கையாளருக்கு இழப்பீடு இன்றி RBI விதி அமலாக்கம்.",
    noticeCyberSafetyTitle: "சைபர் பாதுகாப்பு நடவடிக்கை பற்றிய அறிவிப்பு",
    noticeCyberSafetyDesc: "உருவாக்கப்பட்ட ஆவணங்கள் இந்திய சைபர் குற்ற ஒருங்கிணைப்பு மையத்தின் (I4C) வழிகாட்டுதல்களின்படி உள்ளன.",
    backToIntake: "உட்கொள்ளலுக்குத் திரும்பு",
    continueToGetHelp: "உதவி பெற தொடரவும்"
  },
  step3Action: {
    targetAmountLabel: "மீட்க வேண்டிய இலக்கு மோசடி தொகை",
    bankingUtrLabel: "வங்கி UTR",
    bankLabel: "வங்கி",
    actionBannerDesc: "பணத்தை முடக்கவும் அதிகாரப்பூர்வ FIR பதிவு செய்யவும் கீழே உள்ள அவசர நடவடிக்கைகளை முடிக்கவும்.",
    firGuideTag: "முழு எஃப்.ஐ.ஆர் வழிகாட்டி",
    firGuideTitle: "முழுமையான சைபர் காவல்துறை எஃப்.ஐ.ஆர் பணிப்பாய்வு",
    firGuideDesc: "உங்கள் அதிகாரப்பூர்வ புகாரை ஆன்லைனில் அல்லது உள்ளூர் காவல் நிலையத்தில் சமர்ப்பிக்க வழிகாட்டுதல் பெறுங்கள்.",
    openFirGuideBtn: "முழு FIR வழிகாட்டியைத் திறக்கவும்",
    noticeInspectorTag: "அறிவிப்பு ஆய்வாளர்",
    bankNoticeTitle: "வங்கி நோடல் மின்னஞ்சல் ஆய்வாளர்",
    bankNoticeDesc: "பிரிவு 91 BNSS சட்ட உரையை மதிப்பாய்வு செய்து அதிகாரிகளின் எண்களைப் பார்க்கவும்.",
    inspectBankNoticeBtn: "முழு வங்கி அறிவிப்பைப் பார்க்கவும்",
    recoveryRoadmapTitle: "உங்கள் பணம் எவ்வாறு மீட்கப்படுகிறது (படி-படி)",
    stage1Title: "1930 உதவி எண்ணில் புகாரளிக்கவும்",
    stage1Time: "முதல் 15 நிமிடங்கள்",
    stage1Desc: "தேசிய சைபர்கிரைம் போர்ட்டலில் உங்கள் பரிவர்த்தனை UTR ஐக் குறிக்க அவசர டிக்கெட் பதிவு செய்யப்படுகிறது.",
    stage2Title: "மோசடி செய்பவரின் வங்கிக் கணக்கை முடக்கவும்",
    stage2Time: "15 நிமிடம் – 2 மணிநேரம்",
    stage2Desc: "பணத்தை எடுப்பதற்கு முன் முடக்க மோசடி செய்பவரின் வங்கிக்கு அவசர அறிவிப்பு அனுப்பப்படுகிறது.",
    stage3Title: "காவல்துறை சைபர் FIR பதிவு செய்யவும்",
    stage3Time: "நாள் 1 – 5",
    stage3Desc: "முடக்கப்பட்ட பணத்தை சட்டப்பூர்வமாக மீட்க புகார் அதிகாரப்பூர்வ FIR ஆக மாற்றப்படுகிறது.",
    stage4Title: "உங்கள் கணக்கிற்கு பணம் திரும்பப் பெறுதல்",
    stage4Time: "நாள் 7 – 15",
    stage4Desc: "நீதிமன்றம் அல்லது வங்கி முடக்கப்பட்ட பணத்தை உங்கள் கணக்கிற்கு மாற்ற உத்தரவு பிறப்பிக்கிறது.",
    helplineScriptBtn: "1930 உதவி எண் அழைப்பு ஸ்கிரிப்ட்",
    sendCyberAlertBtn: "ஆன்லைன் சைபர் எச்சரிக்கையை அனுப்புக",
    backToDetails: "விவரங்களுக்குத் திரும்பு",
    inspectRawPayload: "ரா பேலோடை சரிபார்க்கவும்",
    whatNextTitle: "அடுத்து நீங்கள் என்ன செய்ய வேண்டும்?",
    nextStep1Title: "அமைதியாக இருங்கள் மற்றும் அழைப்பைத் துண்டிக்கவும்",
    nextStep1Desc: "பயப்பட வேண்டாம் அல்லது மோசடி செய்பவரிடம் பேச வேண்டாம். பணத்தை மீட்க கட்டணம் எதுவும் செலுத்த வேண்டாம்.",
    nextStep2Title: "உங்கள் கடவுச்சொற்களைப் பாதுகாக்கவும்",
    nextStep2Desc: "உடனடியாக உங்கள் UPI MPIN, நெட்பேங்கிங் மற்றும் மின்னஞ்சல் கடவுச்சொற்களை மாற்றவும்.",
    nextStep3Title: "உங்கள் சொந்த வங்கி கிளைக்குச் செல்லவும்",
    nextStep3Desc: "24-48 மணி நேரத்திற்குள் வங்கி லீன் கடித நகலுடன் உங்கள் வங்கி மேலாளரைச் சந்திக்கவும்.",
    nextStep4Title: "ஒப்புதல்களைப் பாதுகாத்து போலீசாரைச் சந்திக்கவும்",
    nextStep4Desc: "1930 / cybercrime.gov.in இலிருந்து வரும் SMS ஒப்புதல்களைச் சேமிக்கவும்.",
    rememberTitle: "நினைவில் கொள்க:",
    rememberDesc: "உண்மையான போலீசார் அல்லது வங்கி ஊழியர்கள் ஒருபோதும் உங்கள் OTP, PIN அல்லது பணப் பரிமாற்றம் கேட்க மாட்டார்கள்."
  },
  digitalArrest: {
    heroTitle: "போலி டிஜிட்டல் கைது & போலீஸ் ஆள்மாறாட்ட பாதுகாப்பு",
    heroSubtitle: "போலி CBI, சைபர் செல், சுங்க ஃபெடெக்ஸ் பார்சல் மற்றும் வீடியோ அழைப்பு மிரட்டல்களுக்கு எதிரான உடனடி நிவாரணம்.",
    impersonatedAgencyLabel: "போலி நிறுவனம் / அதிகாரி",
    callerIdLabel: "அழைப்பாளர் ID / வாட்ஸ்அப் / ஸ்கைப் ஹேண்டில்",
    extortionDemandLabel: "மிரட்டல் தொகை (₹)",
    disconnectAdviceTitle: "உடனடி நடவடிக்கை: அழைப்பை உடனடியாகத் துண்டிக்கவும்",
    disconnectAdviceDesc: "நீங்கள் முற்றிலும் பாதுகாப்பாக இருக்கிறீர்கள். உண்மையான போலீசார் வீடியோ அழைப்பில் பணம் கேட்பதில்லை.",
    factCheckBadge: "சட்ட உண்மை சரிபார்ப்பு & உண்மை",
    notInDangerBadge: "நீங்கள் சட்டப்பூர்வ ஆபத்தில் இல்லை",
    step2Title: "டிஜிட்டல் கைதின் பின்னணியில் உள்ள உண்மைகள் & சட்ட உண்மை",
    step2Subtitle: "மோசடி செய்பவர்கள் போலி சீருடைகள், வீடியோ அழைப்புகள் மூலம் பயத்தை உருவாக்குகிறார்கள். சட்டம் உங்களை எவ்வாறு பாதுகாக்கிறது என்பதை அறிக.",
    claimVsRealityTitle: "மோசடி செய்பவர்களின் கூற்றுகள் vs உண்மையான சட்ட உரிமைகள்",
    scammerClaimLabel: "மோசடி செய்பவரின் அச்சுறுத்தல்",
    legalRealityLabel: "சட்ட உண்மை",
    myth1Claim: "நீங்கள் 'டிஜிட்டல் கைதில்' உள்ளீர்கள், அறையை விட்டு வெளியேற முடியாது.",
    myth1Truth: "இந்திய சட்டத்தில் 'டிஜிட்டல் கைது' என்பதற்கு 0% அங்கீகாரம் உள்ளது. வீடியோ அழைப்பில் கைது செய்ய சட்டத்தில் இடமில்லை.",
    myth2Claim: "24x7 வீடியோ கேமராவை இயக்கவும் இல்லையெனில் போலீசார் வருவார்கள்.",
    myth2Truth: "சம்மன்களை எழுத்துப்பூர்வமாக நேரில் மட்டுமே வழங்க வேண்டும். வீடியோ அழைப்பில் அடைத்து வைப்பது குற்றவியல் மிரட்டல்.",
    myth3Claim: "சரிபார்ப்பிற்காக 'RBI பாதுகாப்பு எஸ்க்ரோ' கணக்கிற்கு பணத்தை மாற்றவும்.",
    myth3Truth: "எந்தவொரு நீதிமன்றமும், காவல்துறையும் அல்லது RBIயும் பணம் மாற்றும்படி கேட்காது.",
    myth4Claim: "தேசிய பாதுகாப்பு ரகசியம்: குடும்பத்தினரையோ அல்லது வழக்கறிஞர்களையோ தொடர்பு கொள்ளாதீர்கள்.",
    myth4Truth: "அரசியலமைப்புச் சட்டம் 22ன் கீழ் வழக்கறிஞரை அணுகுவது ஒவ்வொரு குடிமகனின் அடிப்படை உரிமையாகும்.",
    safeTakeActionBadge: "நீங்கள் பாதுகாப்பாக உள்ளீர்கள். கீழே நடவடிக்கை எடுக்கவும்.",
    step3NextStepsTitle: "பரிந்துரைக்கப்பட்ட அடுத்த படிகள்",
    step3NextStepsSubtitle: "உங்களை மிரட்டும் மோசடி செய்பவர்களுக்கு எந்த சட்ட அதிகாரமும் இல்லை. இந்த 3 பாதுகாப்பு படிகளைப் பின்பற்றுங்கள்.",
    safetyStep1Title: "1. வீடியோ அழைப்புகளைத் துண்டித்து எண்ணைத் தடுக்கவும்",
    safetyStep1Desc: "வாட்ஸ்அப் அல்லது ஸ்கைப் வீடியோ அழைப்புகளை உடனடியாக முடிக்கவும்.",
    safetyStep2Title: "2. சக்ஷு (DoT) தளத்தில் போலி எண்ணைப் புகாரளிக்கவும்",
    safetyStep2Desc: "இந்தியா முழுவதும் சிம் மற்றும் தொலைபேசியைத் தடுக்க தொலைத்தொடர்பு துறையின் சக்ஷு தளத்தில் புகாரளிக்கவும்.",
    copyChakshuBtn: "1. மோசடி விவரங்களை நகலெடுக்கவும்",
    chakshuCopiedBtn: "விவரங்கள் நகலெடுக்கப்பட்டது!",
    openChakshuBtn: "2. சஞ்சார் சாதியைத் திறக்கவும் (சக்ஷு)",
    safetyStep3Title: "3. டிஜிட்டல் கைது போலீஸ் FIR ஐப் பதிவிறக்கி பதிவு செய்யவும்",
    safetyStep3Desc: "பாரதிய நியாய சன்ஹிதா (BNS) பிரிவு 204 மற்றும் 308 இன் கீழ் குற்றப் புகாரைத் தயாரிக்கவும்.",
    downloadDigitalFirBtn: "FIR புகார் PDF பதிவிறக்கவும்",
    shareDigitalFirBtn: "வாட்ஸ்அப்பில் FIR ஐப் பகிரவும்",
    continueToSafetyBtn: "பாதுகாப்பு நடவடிக்கை தொடரவும்",
    callerThreatDetailsTitle: "அழைப்பாளர் & அச்சுறுத்தல் விவரங்கள்",
    dropNoticeTitle: "சந்தேகத்திற்கிடமான அறிவிப்பு / சம்மன் படத்தை பதிவேற்றவும்",
    dropNoticeSubtitle: "வாட்ஸ்அப் அல்லது ஸ்கைப்பில் பெறப்பட்ட போலி சிபிஐ/போலீஸ் கடிதம் அல்லது ஸ்கிரீன்ஷாட்.",
    uploadDocumentBtn: "ஆவணத்தை பதிவேற்றவும்",
    pasteDemandTitle: "அல்லது செய்தி / கோரிக்கை உரையை ஒட்டவும்",
    pasteDemandPlaceholder: "அச்சுறுத்தல் செய்தியை ஒட்டவும் e.g. 'நீங்கள் CBI ஆல் டிஜிட்டல் கைதில் உள்ளீர்கள். ஸ்கைப்பில் இருந்து ரூ 2.5 லட்சத்தை டெபாசிட் செய்யவும்...'",
    targetAgencyLabel: "இலக்கு நிறுவனம்",
    demandLabel: "கோரிக்கை",
    advisoryTitle: "அதிகாரப்பூர்வ சைபர் பாதுகாப்பு ஆலோசனை:",
    advisoryDesc: "இந்திய சட்ட அமலாக்க முகமைகள் (CBI, மாநில போலீசார், ED, சுங்கம், உச்ச நீதிமன்றம்) ஒருபோதும் ஸ்கைப் அல்லது வாட்ஸ்அப் வீடியோ அழைப்புகளில் குடிமக்களைக் கைது செய்வதில்லை மற்றும் சரிபார்ப்புக் கணக்கிற்குப் பணம் கேட்பதில்லை. பணம் அனுப்ப வேண்டாம்.",
    continueToReviewProof: "சான்றுகளை மதிப்பாய்வு செய்ய தொடரவும்"
  },
  actions: {
    heroTitle: "இப்போதே நடவடிக்கை எடுக்கவும் — 1-தட்டல் நேரடி இணைப்புகள்",
    heroSubtitle: "கைமுறை நகல்-ஒட்டுதல் இல்லாமல் ஒரே தட்டலில் அனைத்து அவசர நடவடிக்கைகளையும் தொடங்கவும்.",
    step1HelplineTitle: "1930 உதவி எண்ணை அழைக்கவும்",
    step1HelplineDesc: "தேசிய சைபர் குற்றக் குடிமக்கள் உதவி எண்ணுடன் நேரடித் தொடர்பு.",
    step1HelplineBtn: "இப்போதே 1930 டயல் செய்யவும்",
    step2BankTitle: "வங்கி மோசடி பிரிவுக்கு மின்னஞ்சல் செய்யவும் (பிரிவு 91 BNSS)",
    step2BankDesc: "முன்னரே கட்டமைக்கப்பட்ட சட்டப்பூர்வ லீன் கோரிக்கை அறிவிப்பை அனுப்புகிறது:",
    step2BankBtn: "வங்கிக்கு மின்னஞ்சல் செய்யவும்",
    step3NcrpTitle: "NCRP புகார் பதிவு செய்யவும் (cybercrime.gov.in)",
    step3NcrpDesc: "1-தட்டல் சட்ட அறிக்கையை நகலெடுத்து அதிகாரப்பூர்வ தேசிய தளத்தைத் திறக்கவும்.",
    step3NcrpCopyBtn: "1. சட்ட அறிக்கையை நகலெடுக்கவும்",
    step3NcrpPortalBtn: "2. cybercrime.gov.in திறக்கவும்",
    step4ShareTitle: "1-தட்டல் வாட்ஸ்அப் & ஆவணப் பகிர்வு",
    livePrompterTitle: "லைவ் டெலிபிராம்ப்டர் ஸ்கிரிப்ட் (1930 அதிகாரிக்கு இதை வாசிக்கவும்):",
    collapseScript: "ஸ்கிரிப்டை மறைக்கவும்",
    showScript: "ஸ்கிரிப்டைக் காட்டு",
    teleprompterHello: "வணக்கம் அதிகாரி அவர்களே, நான் அங்கீகரிக்கப்படாத அவசர சைபர் மோசடியைப் புகாரளிக்க வேண்டும், தொகை ₹",
    teleprompterClosing: "பெறுநர் கணக்கை முடக்க CFCFRMS இல் இந்த UTR ஐ உடனடியாகக் கொடியிடவும் மற்றும் ஒப்புதல் எண்ணை வழங்கவும்.",
    step1Tag: "படி 1 • உடனடி முன்னுரிமை",
    step1Time: "முதல் 15 நிமிடங்கள்",
    call1930NowBtn: "இப்போதே 1930 ஐ அழைக்கவும்",
    step2Tag: "படி 2 • வங்கி இடையேயான பரிமாற்றத்தை நிறுத்துங்கள்",
    step2Time: "15 நிமிடம் – 2 மணிநேரம்",
    emailBankTitle: "வங்கி மோசடி பிரிவுக்கு மின்னஞ்சல் செய்யவும் (பிரிவு 91 BNSS)",
    emailBankDesc: "முன்னரே கட்டமைக்கப்பட்ட சட்டப்பூர்வ லீன் கோரிக்கை அறிவிப்பை அனுப்புகிறது:",
    emailBankBtn: "வங்கிக்கு மின்னஞ்சல் செய்யவும்",
    downloadPdfAttachBtn: "இணைக்க PDF பதிவிறக்கவும்",
    noMailAppNotice: "இயல்புநிலை அஞ்சல் பயன்பாடு திறக்கப்படவில்லையா? அதிகாரப்பூர்வ மின்னஞ்சலை நகலெடுக்கவும்:",
    step3Tag: "படி 3 • அதிகாரப்பூர்வ அரசு தளம்",
    step3Time: "அன்றைய தினமே தாக்கல் செய்தல்",
    ncrpTitle: "NCRP புகார் பதிவு செய்யவும் (cybercrime.gov.in)",
    ncrpDesc: "1-தட்டல் சட்ட அறிக்கையை நகலெடுத்து அதிகாரப்பூர்வ தேசிய தளத்தைத் திறக்கவும்.",
    copyStatementBtn: "1. சட்ட அறிக்கையை நகலெடுக்கவும்",
    statementCopiedBtn: "அறிக்கை நகலெடுக்கப்பட்டது!",
    openPortalBtn: "2. cybercrime.gov.in திறக்கவும்",
    shareDocsTitle: "1-தட்டல் வாட்ஸ்அப் & ஆவணப் பகிர்வு (குடும்பம், வழக்கறிஞர், போலீசாருக்கு)",
    shareDocsSubtitle: "டிஜிட்டல் முறையில் தொகுக்கப்பட்ட சட்ட ஆதார PDFகளை நேரடியாகப் பகிரவும்.",
    docBankFreeze: "வங்கி முடக்க அறிவிப்பு",
    docBankFreezeSub: "பிரிவு 91 BNSS கடிதம்",
    docPoliceFir: "போலீஸ் FIR",
    docPoliceFirSub: "BNS 318(4) ஆவணம்",
    docCourtRefund: "நீதிமன்ற ரீபண்ட்",
    docCourtRefundSub: "பிரிவு 503 BNSS மனு",
    docEvidenceCert: "சான்றளிப்புச் சான்றிதழ்",
    docEvidenceCertSub: "பிரிவு 63(4) BSA 2023"
  },
  a11y: {
    panelTitle: "அணுகல்தன்மை & மொழி விருப்பங்கள்",
    panelSubtitle: "காட்சி மற்றும் வாசிப்பு விருப்பங்களைத் தனிப்பயனாக்குங்கள்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    textSize: "எழுத்து அளவு",
    sizeDefault: "இயல்புநிலை (1x)",
    sizeLarge: "பெரியது (1.25x)",
    sizeExtraLarge: "மிகப் பெரியது (1.5x)",
    panicModeTitle: "எளிமைப்படுத்தப்பட்ட / பீதி பயன்முறை",
    panicModeDesc: "காட்சி ஒழுங்கீனத்தைக் குறைத்து முக்கிய பொத்தான்களை பெரிதாக்குகிறது.",
    readPageAloudTitle: "பக்கத்தை உரக்கப் படிக்கவும்",
    readPageAloudDesc: "உரையை குரல் வடிவத்தில் ஒலிக்கச் செய்கிறது.",
    readBtn: "படி",
    stopBtn: "நிறுத்து",
    audioFirstTitle: "ஆடியோ-முதல் முறை (தானியங்கி வாசிப்பு)",
    audioFirstDesc: "பொத்தான்களை அழுத்தாமல் தானாகவே விவரங்களை உரக்கப் பேசுகிறது.",
    islTitle: "இந்திய சைகை மொழி (ISL)",
    islDesc: "முக்கிய முடிவெடுக்கும் இடங்களில் சைகை மொழி வீடியோக்களைக் காட்டுகிறது."
  }
};

// 5. KANNADA (KN)
const KN_DICT: TranslationDictionary = {
  common: {
    appName: "CyberRakshak 1930",
    tagline: "ಮಾರ್ಗದರ್ಶಿತ ಸೈಬರ್-ವಂಚನೆ ಸಹಾಯಕ ಮತ್ತು ಶಾಸನಬದ್ಧ ಕ್ರಿಯಾ ವ್ಯವಸ್ಥೆ",
    subtitle: "ವಂಚನೆಯ ಬ್ಯಾಂಕ್ SMS ಅಥವಾ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು 60 ಸೆಕೆಂಡುಗಳಲ್ಲಿ 1-ಟ್ಯಾಪ್ ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್ ನೋಟಿಸ್ ಮತ್ತು ಪೊಲೀಸ್ FIR ಆಗಿ ಪರಿವರ್ತಿಸಿ.",
    topBannerAlert: "ತ್ವರಿತವಾಗಿ ವರದಿ ಮಾಡುವುದರಿಂದ ಹಣ ವರ್ಗಾವಣೆಯನ್ನು ನಿಲ್ಲಿಸುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    goldenHourBadge: "ಸುವರ್ಣ 2-ಗಂಟೆಗಳ ಚೇತರಿಕೆಯ ಸಮಯ ಸಕ್ರಿಯವಾಗಿದೆ",
    call1930: "1930 ಗೆ ಕರೆ ಮಾಡಿ",
    myCases: "ನನ್ನ ಪ್ರಕರಣಗಳು",
    signIn: "ಸೈನ್ ಇನ್",
    signOut: "ಸೈನ್ ಔಟ್",
    back: "ಹಿಂದೆ",
    continue: "ಮುಂದುವರಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    close: "ಮುಚ್ಚಿ",
    copied: "ನಕಲಿಸಲಾಗಿದೆ!",
    copy: "ನಕಲಿಸಿ",
    shareWhatsApp: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ",
    downloadPdf: "PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    recordLiveCallout: "ಈಗ ವಂಚನೆಯ ಕರೆಯಲ್ಲಿರುವಿರಾ? ಲೈವ್ ರೆಕಾರ್ಡ್ ಮಾಡಿ",
    recordLiveBtn: "ಲೈವ್ ರೆಕಾರ್ಡ್",
    accessibilityBtn: "ಪ್ರವೇಶಿಸುವಿಕೆ",
    voiceGuideBtn: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ",
    speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
    flowSelectTitle: "ಏನಾಯಿತು ಎಂದು ನಮಗೆ ತಿಳಿಸಿ",
    flowSelectSubtitle: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಗೆ ಹೆಚ್ಚು ಸೂಕ್ತವಾದ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
    selected: "ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ",
    financialCardTitle: "ನನ್ನ ಅನುಮತಿಯಿಲ್ಲದೆ ಹಣ ಕಳುಹಿಸಲಾಗಿದೆ ಅಥವಾ ಕಡಿತಗೊಳಿಸಲಾಗಿದೆ",
    financialCardSubtitle: "UPI, ಕಾರ್ಡ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ ವಂಚನೆ",
    financialCardDesc: "ನಿಮ್ಮಲ್ಲಿರುವ ಪಾವತಿ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ, ನಂತರ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಮತ್ತು ಸೈಬರ್ ಕ್ರೈಮ್ ಸಹಾಯವಾಣಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    financialTag1: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಸಹಾಯಕ",
    financialTag2: "ಬ್ಯಾಂಕ್ ಲಿಯನ್ ವಿನಂತಿ",
    financialTag3: "ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಅರ್ಜಿ",
    digitalCardTitle: "ಅನುಮಾನಾಸ್ಪದ ಕರೆಗಳು, ಸಂದೇಶಗಳು ಅಥವಾ ನಕಲಿ ದಾಖಲೆಗಳು",
    digitalCardSubtitle: "ನಕಲಿ ಕಾನೂನು ಜಾರಿ ಕರೆಗಳು, ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಅಥವಾ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಬೆದರಿಕೆಗಳು",
    digitalCardDesc: "ಕರೆ ಮಾಡಿದವರ ವಿವರಗಳು ಮತ್ತು ಸಂದೇಶಗಳನ್ನು ಉಳಿಸಿ. ಸುರಕ್ಷಿತ ವರದಿ ಮಾಡುವ ಹಂತಗಳ ಮೂಲಕ ನಾವು ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇವೆ.",
    digitalTag1: "ದಾಖಲೆ ಪರಿಶೀಲನೆ",
    digitalTag2: "ದೂರು ಕರಡು",
    digitalTag3: "ಸಿಮ್ ಬ್ಲಾಕ್ ಮಾರ್ಗದರ್ಶನ",
    readDetailsAloud: "ವಿವರಗಳನ್ನು ಜೋರಾಗಿ ಓದಿ",
    stopAudio: "ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ"
  },
  navigation: {
    financialStep1: "1. ಏನಾಯಿತು ಎಂದು ತಿಳಿಸಿ",
    financialStep2: "2. ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    financialStep3: "3. ಈಗಲೇ ಸಹಾಯ ಪಡೆಯಿರಿ",
    digitalArrestStep1: "1. ಏನಾಯಿತು ಎಂದು ತಿಳಿಸಿ",
    digitalArrestStep2: "2. ಪುರಾವೆ ಮತ್ತು ವರದಿ ನೋಡಿ",
    digitalArrestStep3: "3. ಕಾನೂನು ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ"
  },
  factCheck: {
    title: "ಕಾನೂನು ಸತ್ಯ ಪರಿಶೀಲನೆ: ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ",
    subtitle: "ನೈಜ ಭಾರತೀಯ ಕ್ರಿಮಿನಲ್ ಪ್ರಕ್ರಿಯೆ (BNSS) ವಿರುದ್ಧ ನಕಲಿ ಪೊಲೀಸ್ ಬೆದರಿಕೆಗಳು",
    myth1Title: "ಮಿಥ್ಯೆ: 'ನೀವು ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್‌ನಲ್ಲಿದ್ದೀರಿ'",
    myth1Reality: "ವಾಸ್ತವ: ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ (BNS/BNSS) 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್'ಗೆ ಯಾವುದೇ ಅವಕಾಶವಿಲ್ಲ. ಪೊಲೀಸರು ಎಂದಿಗೂ ಸ್ಕೈಪ್ ಅಥವಾ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಬಂಧಿಸುವುದಿಲ್ಲ.",
    myth2Title: "ಮಿಥ್ಯೆ: 'ಪರಿಶೀಲನೆಗಾಗಿ RBI ಖಾತೆಗೆ ಹಣ ವರ್ಗಾಯಿಸಿ'",
    myth2Reality: "ವಾಸ್ತವ: ಪರಿಶೀಲನೆಗಾಗಿ ಹಣ ವರ್ಗಾಯಿಸಲು RBI ಅಥವಾ ಪೊಲೀಸರು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ. ಹಣದ ಬೇಡಿಕೆ 100% ಸುಲಿಗೆಯಾಗಿದೆ.",
    myth3Title: "ಮಿಥ್ಯೆ: 'ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ತಕ್ಷಣದ ಬಂಧನ ವಾರಂಟ್ ಹೊರಡಿಸಿದೆ'",
    myth3Reality: "ವಾಸ್ತವ: ಬಂಧನ ವಾರಂಟ್‌ಗಳನ್ನು ಸ್ಥಳೀಯ ಪೊಲೀಸರು ಖುದ್ದಾಗಿ ನೀಡುತ್ತಾರೆ, ವಾಟ್ಸಾಪ್ PDF ಗಳಾಗಿ ಕಳುಹಿಸುವುದಿಲ್ಲ."
  },
  intake: {
    financialTitle: "ನಿಮ್ಮ ವಹಿವಾಟಿನ ವಿವರಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸೋಣ",
    financialSubtitle: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಡೆಬಿಟ್ SMS ಅಥವಾ UPI ರಸೀದಿಯ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕೆಳಗೆ ಪಠ್ಯವನ್ನು ಅಂಟಿಸಿ.",
    dropzoneTitle: "ಪಾವತಿ ರಸೀದಿ / ಡೆಬಿಟ್ SMS ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    dropzoneSubtitle: "PhonePe, GPay, Paytm ಅಥವಾ ನೆಟ್‌ಬ್ಯಾಂಕಿಂಗ್‌ನಿಂದ PNG, JPG, ಅಥವಾ PDF ಸ್ಕ್ಯಾನ್.",
    uploadScreenshot: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    pasteSmsTitle: "ಅಥವಾ SMS / ವಹಿವಾಟು ಪಠ್ಯವನ್ನು ಅಂಟಿಸಿ",
    pasteSmsPlaceholder: "ಡೆಬಿಟ್ ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
    utrLabel: "12-ಅಂಕಿಯ ಬ್ಯಾಂಕಿಂಗ್ UTR / RRN",
    amountLabel: "ವಂಚನೆಯ ಮೊತ್ತ",
    serverVerified: "ಸರ್ವರ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ (ಸೆಕ್ಷನ್ 63 BSA)"
  },
  audit: {
    scoreLabel: "ಅಂಕ",
    detailsChecked: "ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    summaryTitle: "ಘಟನೆಯ ಸಾರಾಂಶ ಮತ್ತು ಪುರಾವೆ",
    summaryVerdict: "ತುರ್ತು ಘಟನೆಯ ಡೇಟಾ ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಬ್ಯಾಂಕ್ ಲಿಯನ್ ಫ್ರೀಜ್ ನೋಟಿಸ್ ಮತ್ತು ಪೊಲೀಸ್ FIR ಕಳುಹಿಸಲು ಸಿದ್ಧವಾಗಿವೆ.",
    recoveryEligibility: "ಚೇತರಿಕೆಯ ಅರ್ಹತೆ",
    eligibleForBankFreeze: "ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್‌ಗೆ ಅರ್ಹವಾಗಿದೆ",
    verifyEditTitle: "ಘಟನೆಯ ಗುರುತಿಸುವಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಂಪಾದಿಸಿ",
    clickToUpdate: "ವಿವರಗಳನ್ನು ನವೀಕರಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    utrLabel: "12-ಅಂಕಿಯ ಬ್ಯಾಂಕಿಂಗ್ UTR / RRN",
    fraudAmountLabel: "ವಂಚನೆಯ ಮೊತ್ತ (₹)",
    suspectVpaLabel: "ಅನುಮಾನಾಸ್ಪದ UPI / VPA ID",
    suspectAccountNoLabel: "ಅನುಮಾನಾಸ್ಪದ ಖಾತೆ ಸಂಖ್ಯೆ",
    suspectIfscLabel: "ಅನುಮಾನಾಸ್ಪದ ಖಾತೆ IFSC",
    victimBankLabel: "ಸಂತ್ರಸ್ತರ ಬ್ಯಾಂಕ್ ಹೆಸರು",
    victimAccountNoLabel: "ಸಂತ್ರಸ್ತರ ಖಾತೆ ಸಂಖ್ಯೆ",
    victimIfscLabel: "ಸಂತ್ರಸ್ತರ ಖಾತೆ IFSC",
    victimNameLabel: "ಸಂತ್ರಸ್ತರ ಪೂರ್ಣ ಹೆಸರು",
    contactPhoneLabel: "ಸಂಪರ್ಕ ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    evidenceChecklistTitle: "ಪುರಾವೆ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    statusVerified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    statusAttention: "ಗಮನಿಸಿ",
    statusUrgent: "ತುರ್ತು",
    vectorUtrLabel: "12-ಅಂಕಿಯ UTR / RRN ಗುರುತಿಸುವಿಕೆ",
    vectorUtrPassed: "ಮಾನ್ಯವಾದ 12-ಅಂಕಿಯ ಬ್ಯಾಂಕಿಂಗ್ ಉಲ್ಲೇಖ.",
    vectorUtrFailed: "UTR ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ ಕಾಣೆಯಾಗಿದೆ ಅಥವಾ ಅಪೂರ್ಣವಾಗಿದೆ.",
    vectorGoldenHourLabel: "ಸುವರ್ಣ 2-ಗಂಟೆಗಳ ಚೇತರಿಕೆಯ ಸಮಯ",
    vectorGoldenHourPassed: "ಸುವರ್ಣ ಸಮಯದಲ್ಲಿ ವರದಿ ಮಾಡಲಾಗಿದೆ. ಹಣವನ್ನು ಲಾಕ್ ಮಾಡುವ ಹೆಚ್ಚಿನ ಸಂಭವನೀಯತೆ (>80%).",
    vectorGoldenHourWarning: "ಸಮಯ ಮೀರಿದ ನಂತರ ವರದಿ ಮಾಡಲಾಗಿದೆ. ಲಿಯನ್ ವಿನಂತಿಯು ಮ್ಯೂಲ್ ಖಾತೆಗಳನ್ನು ಗುರಿಯಾಗಿಸುತ್ತದೆ.",
    vectorSuspectLabel: "ಮ್ಯೂಲ್ ಖಾತೆ ಮತ್ತು VPA ವಿವರಗಳು",
    vectorSuspectPassed: "ಗುರಿಯ VPA / ಖಾತೆಯನ್ನು ಗುರುತಿಸಲಾಗಿದೆ.",
    vectorSuspectWarning: "ಅನುಮಾನಾಸ್ಪದ VPA ವಿವರಗಳು ಅಪೂರ್ಣ; ಬ್ಯಾಂಕ್ ಇಂಟರ್-ಬ್ಯಾಂಕ್ ಸ್ವಿಚ್ ಮೂಲಕ ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ.",
    vectorRbiLabel: "RBI ಶಾಸನಬದ್ಧ ಶೂನ್ಯ-ಹೊಣೆಗಾರಿಕೆ ನಿಯಮ",
    vectorRbiDetails: "ಗ್ರಾಹಕರಿಗೆ ನಷ್ಟವಾಗದಂತೆ RBI ಮಾಸ್ಟರ್ ಸುತ್ತೋಲೆಯ ಜಾರಿ.",
    noticeCyberSafetyTitle: "ಸೈಬರ್ ಸುರಕ್ಷತಾ ಕ್ರಮದ ಕುರಿತು ಸೂಚನೆ",
    noticeCyberSafetyDesc: "ರಚಿಸಲಾದ ದಾಖಲೆಗಳು ಭಾರತೀಯ ಸೈಬರ್ ಅಪರಾಧ ಸಮನ್ವಯ ಕೇಂದ್ರದ (I4C) ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿವೆ.",
    backToIntake: "ಇನ್‌ಟೇಕ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    continueToGetHelp: "ಸಹಾಯ ಪಡೆಯಲು ಮುಂದುವರಿಸಿ"
  },
  step3Action: {
    targetAmountLabel: "ಚೇತರಿಸಿಕೊಳ್ಳಬೇಕಾದ ವಂಚನೆಯ ಮೊತ್ತ",
    bankingUtrLabel: "ಬ್ಯಾಂಕಿಂಗ್ UTR",
    bankLabel: "ಬ್ಯಾಂಕ್",
    actionBannerDesc: "ಹಣವನ್ನು ಫ್ರೀಜ್ ಮಾಡಲು ಮತ್ತು ಅಧಿಕೃತ FIR ದಾಖಲಿಸಲು ಕೆಳಗಿನ ತುರ್ತು ಕ್ರಮಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
    firGuideTag: "ಸಂಪೂರ್ಣ FIR ಮಾರ್ಗದರ್ಶಿ",
    firGuideTitle: "ಸಂಪೂರ್ಣ ಸೈಬರ್ ಪೊಲೀಸ್ FIR ಪ್ರಕ್ರಿಯೆ",
    firGuideDesc: "ನಿಮ್ಮ ಅಧಿಕೃತ ದೂರನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅಥವಾ ಸ್ಥಳೀಯ ಠಾಣೆಯಲ್ಲಿ ಸಲ್ಲಿಸಲು ಹಂತ-ಹಂತದ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
    openFirGuideBtn: "ಸಂಪೂರ್ಣ FIR ಮಾರ್ಗದರ್ಶಿ ತೆರೆಯಿರಿ",
    noticeInspectorTag: "ನೋಟಿಸ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್",
    bankNoticeTitle: "ಬ್ಯಾಂಕ್ ನೋಡಲ್ ಇಮೇಲ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್",
    bankNoticeDesc: "ಸೆಕ್ಷನ್ 91 BNSS ನ ಸಂಪೂರ್ಣ ಕಾನೂನು ಪಠ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನೋಡಲ್ ಅಧಿಕಾರಿಗಳ ಸಂಖ್ಯೆಗಳನ್ನು ನೋಡಿ.",
    inspectBankNoticeBtn: "ಸಂಪೂರ್ಣ ಬ್ಯಾಂಕ್ ನೋಟಿಸ್ ವೀಕ್ಷಿಸಿ",
    recoveryRoadmapTitle: "ನಿಮ್ಮ ಹಣ ಹೇಗೆ ಮರಳಿ ಸಿಗುತ್ತದೆ (ಹಂತ-ಹಂತವಾಗಿ)",
    stage1Title: "1930 ಸಹಾಯವಾಣಿಗೆ ವರದಿ ಮಾಡಿ",
    stage1Time: "ಮೊದಲ 15 ನಿಮಿಷಗಳು",
    stage1Desc: "ನಿಮ್ಮ ವಹಿವಾಟಿನ UTR ಅನ್ನು ಫ್ಲ್ಯಾಗ್ ಮಾಡಲು ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ತುರ್ತು ಟಿಕೆಟ್ ನೋಂದಾಯಿಸಲಾಗುತ್ತದೆ.",
    stage2Title: "ಫಲಾನುಭವಿ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಫ್ರೀಜ್ ಮಾಡಿ",
    stage2Time: "15 ನಿಮಿಷ – 2 ಗಂಟೆ",
    stage2Desc: "ವಂಚಕರು ಹಣವನ್ನು ಹಿಂಪಡೆಯುವ ಮೊದಲು ಹಣವನ್ನು ಲಾಕ್ ಮಾಡಲು ಅವರ ಬ್ಯಾಂಕ್‌ಗೆ ತುರ್ತು ನೋಟಿಸ್ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.",
    stage3Title: "ಪೊಲೀಸ್ ಸೈಬರ್ FIR ದಾಖಲಿಸಿ",
    stage3Time: "ದಿನ 1 – 5",
    stage3Desc: "ತಡೆಹಿಡಿಯಲಾದ ಹಣವನ್ನು ಕಾನೂನುಬದ್ಧವಾಗಿ ವಶಪಡಿಸಿಕೊಳ್ಳಲು ದೂರನ್ನು ಅಧಿಕೃತ FIR ಆಗಿ ಪರಿವರ್ತಿಸಲಾಗುತ್ತದೆ.",
    stage4Title: "ನಿಮ್ಮ ಖಾತೆಗೆ ಮರುಪಾವತಿ",
    stage4Time: "ದಿನ 7 – 15",
    stage4Desc: "ನ್ಯಾಯಾಲಯ ಅಥವಾ ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್ ಮಾಡಿದ ಹಣವನ್ನು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಹಿಂತಿರುಗಿಸಲು ಆದೇಶ ನೀಡುತ್ತದೆ.",
    helplineScriptBtn: "1930 ಸಹಾಯವಾಣಿ ಕರೆ ಸ್ಕ್ರಿಪ್ಟ್",
    sendCyberAlertBtn: "ಆನ್‌ಲೈನ್ ಸೈಬರ್ ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",
    backToDetails: "ವಿವರಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    inspectRawPayload: "ರಾ ಪೇಲೋಡ್ ಪರಿಶೀಲಿಸಿ",
    whatNextTitle: "ಮುಂದೆ ನೀವು ಏನು ಮಾಡಬೇಕು?",
    nextStep1Title: "ಶಾಂತರಾಗಿರಿ ಮತ್ತು ಕರೆಯನ್ನು ಕಡಿತಗೊಳಿಸಿ",
    nextStep1Desc: "ಗಾಬರಿಯಾಗಬೇಡಿ ಅಥವಾ ವಂಚಕರೊಂದಿಗೆ ಮಾತನಾಡಬೇಡಿ. ಹಣವನ್ನು ಮರಳಿ ಪಡೆಯಲು ಎಂದಿಗೂ ಯಾವುದೇ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಬೇಡಿ.",
    nextStep2Title: "ನಿಮ್ಮ ಖಾತೆಗಳು ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ",
    nextStep2Desc: "ತಕ್ಷಣ ನಿಮ್ಮ UPI MPIN, ನೆಟ್‌ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಇಮೇಲ್ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ.",
    nextStep3Title: "ನಿಮ್ಮ ಸ್ವಂತ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ",
    nextStep3Desc: "24-48 ಗಂಟೆಗಳ ಒಳಗೆ ಬ್ಯಾಂಕ್ ಲಿಯನ್ ಪತ್ರದ ಪ್ರತಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಅನ್ನು ಭೇಟಿ ಮಾಡಿ.",
    nextStep4Title: "ಸ್ವೀಕೃತಿಗಳನ್ನು ಉಳಿಸಿ ಮತ್ತು ಸೈಬರ್ ಪೊಲೀಸರನ್ನು ಭೇಟಿ ಮಾಡಿ",
    nextStep4Desc: "1930 / cybercrime.gov.in ನಿಂದ SMS ಸ್ವೀಕೃತಿಗಳನ್ನು ಉಳಿಸಿ.",
    rememberTitle: "ನೆನಪಿಡಿ:",
    rememberDesc: "ನಿಜವಾದ ಪೊಲೀಸರು ಅಥವಾ ಬ್ಯಾಂಕ್ ಉದ್ಯೋಗಿಗಳು ಎಂದಿಗೂ ನಿಮ್ಮ OTP, PIN ಅಥವಾ ಹಣ ವರ್ಗಾವಣೆ ಕೇಳುವುದಿಲ್ಲ."
  },
  digitalArrest: {
    heroTitle: "ನಕಲಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಮತ್ತು ಪೊಲೀಸ್ ವಂಚನೆ ರಕ್ಷಣೆ",
    heroSubtitle: "ನಕಲಿ CBI, ಸೈಬರ್ ಸೆಲ್, ಕಸ್ಟಮ್ಸ್ ಫೆಡೆಕ್ಸ್ ಪಾರ್ಸೆಲ್ ಮತ್ತು ವೀಡಿಯೊ ಕರೆ ಸುಲಿಗೆಯಿಂದ ತಕ್ಷಣದ ರಕ್ಷಣೆ.",
    impersonatedAgencyLabel: "ನಕಲಿ ಸಂಸ್ಥೆ / ಅಧಿಕಾರಿ",
    callerIdLabel: "ಕರೆ ಮಾಡಿದವರ ID / ವಾಟ್ಸಾಪ್ / ಸ್ಕೈಪ್",
    extortionDemandLabel: "ಬೇಡಿಕೆಯ ಮೊತ್ತ (₹)",
    disconnectAdviceTitle: "ತಕ್ಷಣದ ಕ್ರಮ: ಕರೆಯನ್ನು ತಕ್ಷಣವೇ ಕಡಿತಗೊಳಿಸಿ",
    disconnectAdviceDesc: "ನೀವು ಸಂಪೂರ್ಣವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಿ. ನೈಜ ಪೊಲೀಸರು ಎಂದಿಗೂ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಹಣ ಕೇಳುವುದಿಲ್ಲ.",
    factCheckBadge: "ಕಾನೂನು ಸತ್ಯ ಪರಿಶೀಲನೆ",
    notInDangerBadge: "ನೀವು ಕಾನೂನುಬದ್ಧ ಅಪಾಯದಲ್ಲಿಲ್ಲ",
    step2Title: "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್‌ನ ಹಿಂದಿನ ಸತ್ಯಗಳು ಮತ್ತು ಕಾನೂನು ಸತ್ಯ",
    step2Subtitle: "ವಂಚಕರು ಭಯವನ್ನು ಸೃಷ್ಟಿಸಲು ನಕಲಿ ಸಮವಸ್ತ್ರಗಳು, ವೀಡಿಯೊ ಕರೆಗಳನ್ನು ಬಳಸುತ್ತಾರೆ. ಕಾನೂನು ನಿಮ್ಮನ್ನು ಹೇಗೆ ರಕ್ಷಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.",
    claimVsRealityTitle: "ವಂಚಕರ ಬೆದರಿಕೆಗಳು ವರ್ಸಸ್ ನೈಜ ಕಾನೂನು ಹಕ್ಕುಗಳು",
    scammerClaimLabel: "ವಂಚಕರ ಬೆದರಿಕೆ",
    legalRealityLabel: "ಕಾನೂನು ವಾಸ್ತವ",
    myth1Claim: "ನೀವು 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್'ನಲ್ಲಿದ್ದೀರಿ ಮತ್ತು ಕೋಣೆಯಿಂದ ಹೊರಹೋಗುವಂತಿಲ್ಲ.",
    myth1Truth: "ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್'ಗೆ 0% ಮಾನ್ಯತೆ ಇದೆ. ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಯಾರನ್ನೂ ಬಂಧಿಸುವಂತಿಲ್ಲ.",
    myth2Claim: "24x7 ವೀಡಿಯೊ ಕ್ಯಾಮೆರಾ ಆನ್‌ನಲ್ಲಿಡಿ ಇಲ್ಲದಿದ್ದರೆ ಪೊಲೀಸರು ದಾಳಿ ಮಾಡುತ್ತಾರೆ.",
    myth2Truth: "ಸಮನ್ಸ್‌ಗಳನ್ನು ಲಿಖಿತವಾಗಿ ಖುದ್ದಾಗಿ ನೀಡಬೇಕು. ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಕೂಡಿಹಾಕುವುದು ಕ್ರಿಮಿನಲ್ ಸುಲಿಗೆಯಾಗಿದೆ.",
    myth3Claim: "ಪರಿಶೀಲನೆಗಾಗಿ 'RBI ಭದ್ರತಾ ಎಸ್ಕ್ರೋ' ಖಾತೆಗೆ ಹಣ ವರ್ಗಾಯಿಸಿ.",
    myth3Truth: "ಯಾವುದೇ ನ್ಯಾಯಾಲಯ, ಪೊಲೀಸ್ ಅಥವಾ RBI ನಾಗರಿಕರಿಗೆ ಹಣ ವರ್ಗಾಯಿಸಲು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
    myth4Claim: "ರಾಷ್ಟ್ರೀಯ ಭದ್ರತಾ ರಹಸ್ಯ: ಕುಟುಂಬ ಅಥವಾ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಬೇಡಿ.",
    myth4Truth: "ಸಂವಿಧಾನದ 22 ನೇ ವಿಧಿಯ ಅಡಿಯಲ್ಲಿ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸುವುದು ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ಮೂಲಭೂತ ಹಕ್ಕು.",
    safeTakeActionBadge: "ನೀವು ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಿ. ಕೆಳಗೆ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.",
    step3NextStepsTitle: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಮುಂದಿನ ಹಂತಗಳು",
    step3NextStepsSubtitle: "ನಿಮ್ಮನ್ನು ಬೆದರಿಸುವ ವಂಚಕರಿಗೆ ಯಾವುದೇ ಕಾನೂನು ಅಧಿಕಾರವಿಲ್ಲ. ಈ 3 ಸುರಕ್ಷತಾ ಹಂತಗಳನ್ನು ಅನುಸರಿಸಿ.",
    safetyStep1Title: "1. ಎಲ್ಲಾ ವೀಡಿಯೊ ಕರೆಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿ ಮತ್ತು ಸಂಖ್ಯೆಯನ್ನು ನಿರ್ಬಂಧಿಸಿ",
    safetyStep1Desc: "ವಾಟ್ಸಾಪ್ ಅಥವಾ ಸ್ಕೈಪ್ ವೀಡಿಯೊ ಕರೆಗಳನ್ನು ತಕ್ಷಣ ಕೊನೆಗೊಳಿಸಿ.",
    safetyStep2Title: "2. ಚಕ್ಷು (DoT) ನಲ್ಲಿ ನಕಲಿ ಸಂಖ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
    safetyStep2Desc: "ಭಾರತದಾದ್ಯಂತ ಸಿಮ್ ಮತ್ತು ಮೊಬೈಲ್ ಅನ್ನು ನಿರ್ಬಂಧಿಸಲು ದೂರಸಂಪರ್ಕ ಇಲಾಖೆಯ ಚಕ್ಷು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದೂರು ನೀಡಿ.",
    copyChakshuBtn: "1. ವಂಚಕರ ವಿವರಗಳನ್ನು ನಕಲಿಸಿ",
    chakshuCopiedBtn: "ವಿವರಗಳನ್ನು ನಕಲಿಸಲಾಗಿದೆ!",
    openChakshuBtn: "2. ಸಂಚಾರ್ ಸಾಥಿ ತೆರೆಯಿರಿ (ಚಕ್ಷು)",
    safetyStep3Title: "3. ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಪೊಲೀಸ್ FIR ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ದಾಖಲಿಸಿ",
    safetyStep3Desc: "ಭಾರತೀಯ ನ್ಯಾಯ ಸಂಹಿತಾ (BNS) ಸೆಕ್ಷನ್ 204 ಮತ್ತು ಸೆಕ್ಷನ್ 308 ರ ಅಡಿಯಲ್ಲಿ ಕ್ರಿಮಿನಲ್ ದೂರು ಸಿದ್ಧಪಡಿಸಿ.",
    downloadDigitalFirBtn: "FIR ದೂರು PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    shareDigitalFirBtn: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ FIR ಹಂಚಿಕೊಳ್ಳಿ",
    continueToSafetyBtn: "ಸುರಕ್ಷತಾ ಕ್ರಮಕ್ಕೆ ಮುಂದುವರಿಸಿ",
    callerThreatDetailsTitle: "ಕರೆ ಮಾಡಿದವರ ಮತ್ತು ಬೆದರಿಕೆಯ ವಿವರಗಳು",
    dropNoticeTitle: "ಅನುಮಾನಾಸ್ಪದ ನೋಟಿಸ್ / ಸಮನ್ಸ್ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    dropNoticeSubtitle: "ವಾಟ್ಸಾಪ್ ಅಥವಾ ಸ್ಕೈಪ್‌ನಲ್ಲಿ ಸ್ವೀಕರಿಸಿದ ನಕಲಿ CBI/ಪೊಲೀಸ್ ಪತ್ರ ಅಥವಾ ಸ್ಕ್ರೀನ್‌ಶಾಟ್.",
    uploadDocumentBtn: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    pasteDemandTitle: "ಅಥವಾ ಸಂದೇಶ / ಬೇಡಿಕೆ ಪಠ್ಯವನ್ನು ಅಂಟಿಸಿ",
    pasteDemandPlaceholder: "ಬೆದರಿಕೆ ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ e.g. 'ನೀವು ಮನಿ ಲಾಂಡರಿಂಗ್‌ಗಾಗಿ CBI ಯಿಂದ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್‌ನಲ್ಲಿದ್ದೀರಿ. ಸ್ಕೈಪ್‌ನಲ್ಲಿ ಇರಿ ಮತ್ತು 2.5 ಲಕ್ಷ ರೂ. ಠೇವಣಿ ಮಾಡಿ...'",
    targetAgencyLabel: "ಗುರಿಯ ಏಜೆನ್ಸಿ",
    demandLabel: "ಬೇಡಿಕೆ",
    advisoryTitle: "ಅಧಿಕೃತ ಸೈಬರ್ ಭದ್ರತಾ ಸಲಹೆ:",
    advisoryDesc: "ಭಾರತೀಯ ಕಾನೂನು ಜಾರಿ ಸಂಸ್ಥೆಗಳು (CBI, ರಾಜ್ಯ ಪೊಲೀಸರು, ED, ಕಸ್ಟಮ್ಸ್, ಸುಪ್ರೀಂ ಕೋರ್ಟ್) ಎಂದಿಗೂ ಸ್ಕೈಪ್ ಅಥವಾ ವಾಟ್ಸಾಪ್ ವೀಡಿಯೊ ಕರೆಗಳಲ್ಲಿ ನಾಗರಿಕರನ್ನು ಬಂಧಿಸುವುದಿಲ್ಲ ಮತ್ತು ಯಾವುದೇ ಪರಿಶೀಲನಾ ಖಾತೆಗೆ ಹಣ ವರ್ಗಾವಣೆ ಕೇಳುವುದಿಲ್ಲ. ಹಣ ಕಳುಹಿಸಬೇಡಿ.",
    continueToReviewProof: "ಪುರಾವೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಮುಂದುವರಿಸಿ"
  },
  actions: {
    heroTitle: "ಈಗಲೇ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ — 1-ಟ್ಯಾಪ್ ನೇರ ಲಿಂಕ್‌ಗಳು",
    heroSubtitle: "ಹಸ್ತಚಾಲಿತ ನಕಲು-ಅಂಟಿಸುವ ಅಗತ್ಯವಿಲ್ಲದೆ ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ಎಲ್ಲಾ ತುರ್ತು ಕ್ರಮಗಳನ್ನು ಪ್ರಾರಂಭಿಸಿ.",
    step1HelplineTitle: "1930 ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ",
    step1HelplineDesc: "ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ನಾಗರಿಕ ಸಹಾಯವಾಣಿಯೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ.",
    step1HelplineBtn: "ಈಗಲೇ 1930 ಡಯಲ್ ಮಾಡಿ",
    step2BankTitle: "ಬ್ಯಾಂಕ್ ಫ್ರಾಡ್ ಡೆಸ್ಕ್‌ಗೆ ಇಮೇಲ್ ಮಾಡಿ (ಸೆಕ್ಷನ್ 91 BNSS)",
    step2BankDesc: "ಪೂರ್ವ ನಿರ್ಮಿತ ಶಾಸನಬದ್ಧ ಲಿಯನ್ ಬೇಡಿಕೆ ನೋಟಿಸ್ ಕಳುಹಿಸುತ್ತದೆ:",
    step2BankBtn: "ಬ್ಯಾಂಕ್‌ಗೆ ಇಮೇಲ್ ಮಾಡಿ",
    step3NcrpTitle: "NCRP ದೂರು ದಾಖಲಿಸಿ (cybercrime.gov.in)",
    step3NcrpDesc: "1-ಟ್ಯಾಪ್ ಕಾನೂನು ಹೇಳಿಕೆಯನ್ನು ನಕಲಿಸಿ ಮತ್ತು ಅಧಿಕೃತ ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ.",
    step3NcrpCopyBtn: "1. ಕಾನೂನು ಹೇಳಿಕೆಯನ್ನು ನಕಲಿಸಿ",
    step3NcrpPortalBtn: "2. cybercrime.gov.in ತೆರೆಯಿರಿ",
    step4ShareTitle: "1-ಟ್ಯಾಪ್ ವಾಟ್ಸಾಪ್ ಮತ್ತು ದಾಖಲೆ ಹಂಚಿಕೆ",
    livePrompterTitle: "ಲೈವ್ ಟೆಲಿಪ್ರಾಂಪ್ಟರ್ ಸ್ಕ್ರಿಪ್ಟ್ (1930 ಅಧಿಕಾರಿಗೆ ಇದನ್ನು ಓದಿ):",
    collapseScript: "ಸ್ಕ್ರಿಪ್ಟ್ ಮರೆಮಾಡಿ",
    showScript: "ಸ್ಕ್ರಿಪ್ಟ್ ತೋರಿಸಿ",
    teleprompterHello: "ನಮಸ್ಕಾರ ಅಧಿಕಾರಿಯವರೇ, ನಾನು ಅನಧಿಕೃತ ಸೈಬರ್ ವಂಚನೆಯನ್ನು ವರದಿ ಮಾಡಬೇಕಾಗಿದೆ, ಮೊತ್ತ ₹",
    teleprompterClosing: "ಸ್ವೀಕೃತಕರ್ತರ ಖಾತೆಯನ್ನು ಫ್ರೀಜ್ ಮಾಡಲು ದಯವಿಟ್ಟು CFCFRMS ನಲ್ಲಿ ಈ UTR ಅನ್ನು ಫ್ಲ್ಯಾಗ್ ಮಾಡಿ ಮತ್ತು ಸ್ವೀಕೃತಿ ಸಂಖ್ಯೆಯನ್ನು ನೀಡಿ.",
    step1Tag: "ಹಂತ 1 • ತಕ್ಷಣದ ಆದ್ಯತೆ",
    step1Time: "ಮೊದಲ 15 ನಿಮಿಷಗಳು",
    call1930NowBtn: "ಈಗಲೇ 1930 ಗೆ ಕರೆ ಮಾಡಿ",
    step2Tag: "ಹಂತ 2 • ಅಂತರ-ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ ನಿಲ್ಲಿಸಿ",
    step2Time: "15 ನಿಮಿಷ – 2 ಗಂಟೆ",
    emailBankTitle: "ಬ್ಯಾಂಕ್ ಫ್ರಾಡ್ ಡೆಸ್ಕ್‌ಗೆ ಇಮೇಲ್ ಮಾಡಿ (ಸೆಕ್ಷನ್ 91 BNSS)",
    emailBankDesc: "ಪೂರ್ವ ನಿರ್ಮಿತ ಶಾಸನಬದ್ಧ ಲಿಯನ್ ಬೇಡಿಕೆ ನೋಟಿಸ್ ಕಳುಹಿಸುತ್ತದೆ:",
    emailBankBtn: "ಬ್ಯಾಂಕ್‌ಗೆ ಇಮೇಲ್ ಮಾಡಿ",
    downloadPdfAttachBtn: "ಲಗತ್ತಿಸಲು PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    noMailAppNotice: "ಡೀಫಾಲ್ಟ್ ಮೇಲ್ ಅಪ್ಲಿಕೇಶನ್ ತೆರೆಯಲಿಲ್ಲವೇ? ಅಧಿಕೃತ ಇಮೇಲ್ ನಕಲಿಸಿ:",
    step3Tag: "ಹಂತ 3 • ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್",
    step3Time: "ಅದೇ ದಿನ ಸಲ್ಲಿಕೆ",
    ncrpTitle: "NCRP ದೂರು ದಾಖಲಿಸಿ (cybercrime.gov.in)",
    ncrpDesc: "1-ಟ್ಯಾಪ್ ಕಾನೂನು ಹೇಳಿಕೆಯನ್ನು ನಕಲಿಸಿ ಮತ್ತು ಅಧಿಕೃತ ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ.",
    copyStatementBtn: "1. ಕಾನೂನು ಹೇಳಿಕೆಯನ್ನು ನಕಲಿಸಿ",
    statementCopiedBtn: "ಹೇಳಿಕೆ ನಕಲಿಸಲಾಗಿದೆ!",
    openPortalBtn: "2. cybercrime.gov.in ತೆರೆಯಿರಿ",
    shareDocsTitle: "1-ಟ್ಯಾಪ್ ವಾಟ್ಸಾಪ್ ಮತ್ತು ದಾಖಲೆ ಹಂಚಿಕೆ (ಕುಟುಂಬ, ವಕೀಲರು, ಪೊಲೀಸರಿಗೆ)",
    shareDocsSubtitle: "ಡಿಜಿಟಲ್ ಆಗಿ ಸಂಗ್ರಹಿಸಿದ ಕಾನೂನು ಪುರಾವೆ PDF ಗಳನ್ನು ನೇರವಾಗಿ ಹಂಚಿಕೊಳ್ಳಿ.",
    docBankFreeze: "ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್ ನೋಟಿಸ್",
    docBankFreezeSub: "ಸೆಕ್ಷನ್ 91 BNSS ಪತ್ರ",
    docPoliceFir: "ಪೊಲೀಸ್ FIR",
    docPoliceFirSub: "BNS 318(4) ಡೋಸಿಯರ್",
    docCourtRefund: "ಕೋರ್ಟ್ ಮರುಪಾವತಿ",
    docCourtRefundSub: "ಸೆಕ್ಷನ್ 503 BNSS ಅರ್ಜಿ",
    docEvidenceCert: "ಪುರಾವೆ ಪ್ರಮಾಣಪತ್ರ",
    docEvidenceCertSub: "ಸೆಕ್ಷನ್ 63(4) BSA 2023"
  },
  a11y: {
    panelTitle: "ಪ್ರವೇಶಿಸುವಿಕೆ ಮತ್ತು ಭಾಷಾ ಆದ್ಯತೆಗಳು",
    panelSubtitle: "ಪ್ರದರ್ಶನ ಮತ್ತು ಓದುವ ಆದ್ಯತೆಗಳನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    textSize: "ಪಠ್ಯದ ಗಾತ್ರ",
    sizeDefault: "ಡೀಫಾಲ್ಟ್ (1x)",
    sizeLarge: "ದೊಡ್ಡದು (1.25x)",
    sizeExtraLarge: "ತುಂಬಾ ದೊಡ್ಡದು (1.5x)",
    panicModeTitle: "ಸರಳೀಕೃತ / ಪ್ಯಾನಿಕ್ ಮೋಡ್",
    panicModeDesc: "ದೃಶ್ಯ ಗೊಂದಲವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಮುಖ್ಯ ಬಟನ್‌ಗಳನ್ನು ದೊಡ್ಡದಾಗಿಸುತ್ತದೆ.",
    readPageAloudTitle: "ಪುಟವನ್ನು ಜೋರಾಗಿ ಓದಿ",
    readPageAloudDesc: "ಬ್ರೌಸರ್ ಸ್ಪೀಚ್ ಮೂಲಕ ಪ್ರಸ್ತುತ ಪುಟದ ವಿಷಯವನ್ನು ಧ್ವನಿ ರೂಪದಲ್ಲಿ ಪ್ಲೇ ಮಾಡುತ್ತದೆ.",
    readBtn: "ಓದಿ",
    stopBtn: "ನಿಲ್ಲಿಸಿ",
    audioFirstTitle: "ಆಡಿಯೋ-ಮೊದಲ ಮೋಡ್ (ಸ್ವಯಂ ಓದುವಿಕೆ)",
    audioFirstDesc: "ಬಟನ್‌ಗಳನ್ನು ಒತ್ತದೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ವಿವರಗಳನ್ನು ಧ್ವನಿ ಮೂಲಕ ಓದುತ್ತದೆ.",
    islTitle: "ಭಾರತೀಯ ಸಂಕೇತ ಭಾಷೆ (ISL)",
    islDesc: "ಪ್ರಮುಖ ನಿರ್ಧಾರದ ಹಂತಗಳಲ್ಲಿ ಸಂಕೇತ ಭಾಷೆಯ ವೀಡಿಯೊ ತುಣುಕುಗಳನ್ನು ತೋರಿಸುತ್ತದೆ."
  }
};

// 6. BENGALI (BN)
const BN_DICT: TranslationDictionary = {
  common: {
    appName: "CyberRakshak 1930",
    tagline: "নির্দেশিত সাইবার-জালিয়াতি সহায়ক ও বিধিবদ্ধ পদক্ষেপ ব্যবস্থা",
    subtitle: "প্রতারণামূলক ব্যাঙ্ক এসএমএস বা স্ক্রিনশটকে ৬০ সেকেন্ডে ১-ট্যাপ ব্যাঙ্ক ফ্রিজ নোটিশ ও পুলিশ এফআইআরে রূপান্তর করুন।",
    topBannerAlert: "দ্রুত রিপোর্ট করলে টাকা স্থানান্তর থামানোর সম্ভাবনা বাড়ে।",
    goldenHourBadge: "গোল্ডেন ২-ঘণ্টার রিকভারি উইন্ডো সক্রিয়",
    call1930: "1930 হেল্পলাইনে কল করুন",
    myCases: "আমার কেস",
    signIn: "সাইন ইন",
    signOut: "সাইন আউট",
    back: "ফিরে যান",
    continue: "এগিয়ে যান",
    cancel: "বাতিল",
    close: "বন্ধ করুন",
    copied: "কপি করা হয়েছে!",
    copy: "কপি করুন",
    shareWhatsApp: "হোয়াটসঅ্যাপে শেয়ার করুন",
    downloadPdf: "পিডিএফ ডাউনলোড করুন",
    verified: "যাচাইকৃত",
    recordLiveCallout: "এখনই জালিয়াতি কলে আছেন? লাইভ রেকর্ড করুন",
    recordLiveBtn: "লাইভ রেকর্ড",
    accessibilityBtn: "অভিগম্যতা",
    voiceGuideBtn: "ভয়েস গাইড",
    speaking: "কথা বলছে...",
    flowSelectTitle: "কী হয়েছে আমাদের বলুন",
    flowSelectSubtitle: "আপনার পরিস্থিতির সাথে সবচেয়ে মেলে এমন বিকল্পটি বেছে নিন।",
    selected: "নির্বাচিত",
    financialCardTitle: "আমার অনুমতি ছাড়াই টাকা পাঠানো বা কাটা হয়েছে",
    financialCardSubtitle: "UPI, কার্ড বা ব্যাঙ্ক ট্রান্সফার প্রতারণা",
    financialCardDesc: "আপনার পেমেন্ট বিবরণ যোগ করুন, তারপর ব্যাঙ্ক ও সাইবার ক্রাইম হেল্পলাইনে যোগাযোগ করুন।",
    financialTag1: "স্ক্রিনশট সহায়ক",
    financialTag2: "ব্যাঙ্ক লিয়ান অনুরোধ",
    financialTag3: "ম্যাজিস্ট্রেট পিটিশন",
    digitalCardTitle: "সন্দেহজনক কল, মেসেজ বা ভুয়া নথি",
    digitalCardSubtitle: "ভুয়া পুলিশ কল, ব্ল্যাকমেল বা ডিজিটাল অ্যারেস্টের হুমকি",
    digitalCardDesc: "কলার বিবরণ এবং মেসেজ সংরক্ষণ করুন। আমরা নিরাপদ রিপোর্টিং প্রক্রিয়ার মাধ্যমে সাহায্য করব।",
    digitalTag1: "নথি পরীক্ষা",
    digitalTag2: "অভিযোগের খসড়া",
    digitalTag3: "সিম ব্লক নির্দেশিকা",
    readDetailsAloud: "বিস্তারিত জোরে শুনুন",
    stopAudio: "অডিও বন্ধ করুন"
  },
  navigation: {
    financialStep1: "১. কী হয়েছে বলুন",
    financialStep2: "২. বিবরণ যাচাই করুন",
    financialStep3: "৩. এখনই সাহায্য পান",
    digitalArrestStep1: "১. কী হয়েছে বলুন",
    digitalArrestStep2: "২. প্রমাণ ও রিপোর্ট দেখুন",
    digitalArrestStep3: "৩. আইনি পদক্ষেপ নিন"
  },
  factCheck: {
    title: "আইনি তথ্য যাচাই: আপনার অধিকার জানুন",
    subtitle: "আসল ভারতীয় ফৌজদারি কার্যবিধি (BNSS) বনাম ভুয়া পুলিশ হুমকি",
    myth1Title: "ভ্রান্ত ধারণা: 'আপনি ভিডিও কলে ডিজিটাল অ্যারেস্টে আছেন'",
    myth1Reality: "বাস্তবতা: ভারতীয় আইনে (BNS/BNSS) 'ডিজিটাল অ্যারেস্ট' বলে কিছু নেই। পুলিশ কখনও স্কাইপ বা হোয়াটসঅ্যাপে গ্রেপ্তার করে না।",
    myth2Title: "ভ্রান্ত ধারণা: 'নির্দোষ প্রমাণ করতে আরবিআই ভেরিফিকেশন অ্যাকাউন্টে টাকা পাঠান'",
    myth2Reality: "বাস্তবতা: আরবিআই বা পুলিশ কখনোই যাচাইয়ের জন্য টাকা পাঠাতে বলে না। টাকা চাওয়া ১০০% চাঁদাবাজি (Extortion)।",
    myth3Title: "ভ্রান্ত ধারণা: 'সুপ্রিম কোর্ট থেকে তাৎক্ষণিক গ্রেপ্তারি পরোয়ানা জারি হয়েছে'",
    myth3Reality: "বাস্তবতা: গ্রেপ্তারি পরোয়ানা স্থানীয় পুলিশ ব্যক্তিগতভাবে দেয়, হোয়াটসঅ্যাপে পিডিএফ হিসেবে পাঠায় না।"
  },
  intake: {
    financialTitle: "আসুন আপনার লেনদেনের বিবরণ সুরক্ষিত করি",
    financialSubtitle: "আপনার ব্যাঙ্ক ডেবিট এসএমএস বা ইউপিআই রসিদের স্ক্রিনশট আপলোড করুন অথবা নিচে টেক্সট পেস্ট করুন।",
    dropzoneTitle: "পেমেন্ট রসিদ / ডেবিট এসএমএস আপলোড করুন",
    dropzoneSubtitle: "PhonePe, GPay, Paytm বা নেটব্যাঙ্কিং থেকে PNG, JPG বা PDF স্ক্যান।",
    uploadScreenshot: "স্ক্রিনশট আপলোড করুন",
    pasteSmsTitle: "অথবা এসএমএস / লেনদেনের বিবরণ পেস্ট করুন",
    pasteSmsPlaceholder: "ডেবিট বার্তা পেস্ট করুন e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
    utrLabel: "১২-সংখ্যার ব্যাঙ্কিং UTR / RRN",
    amountLabel: "প্রতারণার পরিমাণ",
    serverVerified: "সার্ভার যাচাইকৃত (ধারা ৬৩ BSA)"
  },
  audit: {
    scoreLabel: "স্কোর",
    detailsChecked: "বিবরণ যাচাইকৃত",
    summaryTitle: "ঘটনার সারাংশ ও প্রমাণ",
    summaryVerdict: "জরুরি ঘটনার তথ্য যাচাই করা হয়েছে। ব্যাঙ্ক লিয়ান ফ্রিজ নোটিশ ও পুলিশ এফআইআর ১-ট্যাপে পাঠানোর জন্য প্রস্তুত।",
    recoveryEligibility: "পুনরুদ্ধারের যোগ্যতা",
    eligibleForBankFreeze: "ব্যাঙ্ক ফ্রিজের জন্য যোগ্য",
    verifyEditTitle: "ঘটনা শনাক্তকারী যাচাই ও সম্পাদনা করুন",
    clickToUpdate: "বিবরণ আপডেট করতে ক্লিক করুন",
    utrLabel: "১২-সংখ্যার ব্যাঙ্কিং UTR / RRN",
    fraudAmountLabel: "প্রতারণার পরিমাণ (₹)",
    suspectVpaLabel: "সন্দেহভাজন UPI / VPA ID",
    suspectAccountNoLabel: "সন্দেহভাজন অ্যাকাউন্ট নম্বর",
    suspectIfscLabel: "সন্দেহভাজন IFSC",
    victimBankLabel: "ভুক্তভোগীর ব্যাঙ্কের নাম",
    victimAccountNoLabel: "ভুক্তভোগীর অ্যাকাউন্ট নম্বর",
    victimIfscLabel: "ভুক্তভোগীর IFSC",
    victimNameLabel: "ভুক্তভোগীর পুরো নাম",
    contactPhoneLabel: "যোগাযোগের ফোন নম্বর",
    evidenceChecklistTitle: "প্রমাণের চেকলিস্ট",
    statusVerified: "যাচাইকৃত",
    statusAttention: "মনোযোগ দিন",
    statusUrgent: "জরুরি",
    vectorUtrLabel: "১২-সংখ্যার UTR / RRN শনাক্তকারী",
    vectorUtrPassed: "বৈধ ১২-সংখ্যার ব্যাঙ্কিং রেফারেন্স।",
    vectorUtrFailed: "ইউটিআর রেফারেন্স নম্বর অনুপস্থিত বা অসম্পূর্ণ।",
    vectorGoldenHourLabel: "গোল্ডেন ২-ঘণ্টার রিকভারি সময়",
    vectorGoldenHourPassed: "গোল্ডেন সময়ের মধ্যে রিপোর্ট করা হয়েছে। ফান্ড লক হওয়ার উচ্চ সম্ভাবনা (>৮০%)।",
    vectorGoldenHourWarning: "দেরিতে রিপোর্ট করা হয়েছে। লিয়ান অনুরোধ সন্দেহভাজন মিউল অ্যাকাউন্টকে টার্গেট করবে।",
    vectorSuspectLabel: "মিউল অ্যাকাউন্ট ও VPA বিবরণ",
    vectorSuspectPassed: "টার্গেট VPA / অ্যাকাউন্ট চিহ্নিত।",
    vectorSuspectWarning: "VPA বিবরণ অসম্পূর্ণ; ব্যাঙ্ক ইন্টার-ব্যাঙ্ক সুইচের মাধ্যমে ট্র্যাক করবে।",
    vectorRbiLabel: "আরবিআই বিধিবদ্ধ শূন্য-দায়বদ্ধতা নিয়ম",
    vectorRbiDetails: "গ্রাহকের আর্থিক ক্ষতি ছাড়া আরবিআই সার্কুলারের প্রয়োগ।",
    noticeCyberSafetyTitle: "সাইবার নিরাপত্তা পদক্ষেপের নোটিশ",
    noticeCyberSafetyDesc: "তৈরি করা নথিগুলি ভারতীয় সাইবার ক্রাইম কোঅর্ডিনেশন সেন্টার (I4C) এর নির্দেশিকা অনুযায়ী সাজানো হয়েছে।",
    backToIntake: "ইনটেকে ফিরে যান",
    continueToGetHelp: "সাহায্য পেতে এগিয়ে যান"
  },
  step3Action: {
    targetAmountLabel: "উদ্ধারের জন্য লক্ষ্য প্রতারণার পরিমাণ",
    bankingUtrLabel: "ব্যাঙ্কিং UTR",
    bankLabel: "ব্যাঙ্ক",
    actionBannerDesc: "টাকা ফ্রিজ করতে এবং অফিসিয়াল এফআইআর দায়ের করতে নিচের জরুরি পদক্ষেপগুলি সম্পূর্ণ করুন।",
    firGuideTag: "সম্পূর্ণ এফআইআর গাইড",
    firGuideTitle: "সম্পূর্ণ সাইবার পুলিশ এফআইআর প্রক্রিয়া",
    firGuideDesc: "আপনার অফিসিয়াল অভিযোগ অনলাইনে জমা দিতে বা স্থানীয় থানায় দায়ের করতে ধাপে ধাপে নির্দেশিকা পান।",
    openFirGuideBtn: "সম্পূর্ণ এফআইআর গাইড খুলুন",
    noticeInspectorTag: "নোটিশ পরিদর্শক",
    bankNoticeTitle: "ব্যাঙ্ক নোডাল ইমেল পরিদর্শক",
    bankNoticeDesc: "ধারা ৯১ BNSS এর সম্পূর্ণ আইনি পাঠ পর্যালোচনা করুন এবং নোডাল কর্মকর্তাদের নম্বর দেখুন।",
    inspectBankNoticeBtn: "সম্পূর্ণ ব্যাঙ্ক নোটিশ দেখুন",
    recoveryRoadmapTitle: "কীভাবে আপনার টাকা ফেরত আসে (ধাপে ধাপে)",
    stage1Title: "1930 হেল্পলাইনে রিপোর্ট করুন",
    stage1Time: "প্রথম ১৫ মিনিট",
    stage1Desc: "আপনার লেনদেনের ইউটিআর ফ্ল্যাগ করতে জাতীয় সাইবার ক্রাইম পোর্টালে একটি জরুরি টিকিট নিবন্ধিত হয়।",
    stage2Title: "প্রাপকের ব্যাঙ্ক অ্যাকাউন্ট ফ্রিজ করুন",
    stage2Time: "১৫ মিনিট – ২ ঘণ্টা",
    stage2Desc: "টাকা তোলার আগেই ফান্ড লক করতে প্রতারকের ব্যাঙ্কে একটি জরুরি নোটিশ পাঠানো হয়।",
    stage3Title: "পুলিশ সাইবার এফআইআর দায়ের করুন",
    stage3Time: "দিন ১ – ৫",
    stage3Desc: "আটককৃত টাকা আইনগতভাবে জব্দ করতে অভিযোগটি অফিসিয়াল এফআইআরে রূপান্তরিত হয়।",
    stage4Title: "আপনার অ্যাকাউন্টে টাকা ফেরত",
    stage4Time: "দিন ৭ – ১৫",
    stage4Desc: "আদালত বা ব্যাঙ্ক আটককৃত টাকা আপনার ব্যাঙ্ক অ্যাকাউন্টে নিরাপদে স্থানান্তর করার নির্দেশ জারি করে।",
    helplineScriptBtn: "1930 হেল্পলাইন কল স্ক্রিপ্ট",
    sendCyberAlertBtn: "অনলাইন সাইবার সতর্কতা পাঠান",
    backToDetails: "বিবরণে ফিরে যান",
    inspectRawPayload: "র পে-লোড পরিদর্শন করুন",
    whatNextTitle: "এরপর আপনার কী করা উচিত?",
    nextStep1Title: "শান্ত থাকুন এবং কল কেটে দিন",
    nextStep1Desc: "আতঙ্কিত হবেন না বা প্রতারকের সাথে কথা বলবেন না। টাকা ফেরত পেতে কখনোই কোনো ফি দেবেন না।",
    nextStep2Title: "আপনার অ্যাকাউন্ট ও পাসওয়ার্ড সুরক্ষিত করুন",
    nextStep2Desc: "অবিলম্বে আপনার UPI MPIN, নেটব্যাঙ্কিং এবং ইমেল পাসওয়ার্ড পরিবর্তন করুন।",
    nextStep3Title: "আপনার মূল ব্যাঙ্ক শাখায় যান",
    nextStep3Desc: "২৪-৪৮ ঘণ্টার মধ্যে ব্যাঙ্ক লিয়ান চিঠির অনুলিপি নিয়ে আপনার ব্যাঙ্ক ম্যানেজারের সাথে দেখা করুন।",
    nextStep4Title: "প্রাপ্তি স্বীকারপত্র রাখুন ও সাইবার পুলিশের সাথে দেখা করুন",
    nextStep4Desc: "1930 / cybercrime.gov.in থেকে এসএমএস প্রাপ্তি সংরক্ষণ করুন।",
    rememberTitle: "মনে রাখবেন:",
    rememberDesc: "আসল পুলিশ বা ব্যাঙ্ক কর্মীরা কখনোই আপনার ওটিপি, পিন বা টাকা স্থানান্তর করতে বলবেন না।"
  },
  digitalArrest: {
    heroTitle: "ভুয়া ডিজিটাল অ্যারেস্ট ও পুলিশ ছদ্মবেশ থেকে সুরক্ষা",
    heroSubtitle: "ভুয়া সিবিআই, সাইবার সেল, কাস্টমস ফেডেক্স পার্সেল এবং ভিডিও কল ব্ল্যাকমেলের বিরুদ্ধে তাৎক্ষণিক আইনি সুরক্ষা।",
    impersonatedAgencyLabel: "ছদ্মবেশী সংস্থা / কর্মকর্তা",
    callerIdLabel: "কলার আইডি / হোয়াটসঅ্যাপ / স্কাইপ",
    extortionDemandLabel: "দাবি করা অর্থ (₹)",
    disconnectAdviceTitle: "তাৎক্ষণিক পদক্ষেপ: কলটি অবিলম্বে কেটে দিন",
    disconnectAdviceDesc: "আপনি সম্পূর্ণ নিরাপদ। আসল পুলিশ কখনোই ভিডিও কলে টাকা চায় না।",
    factCheckBadge: "আইনি তথ্য যাচাই ও বাস্তবতা",
    notInDangerBadge: "আপনি কোনো আইনি বিপদে নেই",
    step2Title: "ডিজিটাল অ্যারেস্টের পেছনের সত্য ও আইনি বাস্তবতা",
    step2Subtitle: "প্রতারকরা ভয় তৈরি করতে ভুয়া পোশাক ও ভিডিও কল ব্যবহার করে। ভারতীয় আইন কীভাবে আপনাকে রক্ষা করে তা জানুন।",
    claimVsRealityTitle: "প্রতারকের দাবি বনাম আসল আইনি অধিকার",
    scammerClaimLabel: "প্রতারকের হুমকি",
    legalRealityLabel: "আইনি বাস্তবতা",
    myth1Claim: "আপনি 'ডিজিটাল অ্যারেস্টে' আছেন এবং ঘর ছেড়ে যেতে পারবেন না।",
    myth1Truth: "ভারতীয় আইনে 'ডিজিটাল অ্যারেস্ট'-এর ০% স্বীকৃতি রয়েছে। ভিডিও কলে কাউকে গ্রেপ্তারের অধিকার নেই।",
    myth2Claim: "২৪x৭ ভিডিও ক্যামেরা চালু রাখুন নয়তো পুলিশ আসবে।",
    myth2Truth: "সমন লিখিতভাবে ব্যক্তিগতভাবে দিতে হবে। ভিডিও কলে আটকে রাখা ফৌজদারি চাঁদাবাজি।",
    myth3Claim: "যাচাইয়ের জন্য 'আরবিআই সিকিউরিটি এসক্রো' অ্যাকাউন্টে টাকা স্থানান্তর করুন।",
    myth3Truth: "কোনো আদালত, পুলিশ বা আরবিআই কখনোই নাগরিকদের টাকা পাঠাতে বলে না।",
    myth4Claim: "জাতীয় নিরাপত্তার গোপনীয়তা: পরিবার বা আইনজীবীর সাথে যোগাযোগ করবেন না।",
    myth4Truth: "সংবিধানের ২২ অনুচ্ছেদের অধীনে আইনজীবীর পরামর্শ নেওয়া প্রতিটি নাগরিকের মৌলিক অধিকার।",
    safeTakeActionBadge: "আপনি নিরাপদ। নিচে পদক্ষেপ নিন।",
    step3NextStepsTitle: "সুপারিশকৃত পরবর্তী পদক্ষেপ",
    step3NextStepsSubtitle: "আপনাকে ভয় দেখানোর চেষ্টা করা প্রতারকদের কোনো আইনি ক্ষমতা নেই। এই ৩টি সুরক্ষা পদক্ষেপ অনুসরণ করুন।",
    safetyStep1Title: "১. সব ভিডিও কল কেটে দিন এবং কলারকে ব্লক করুন",
    safetyStep1Desc: "হোয়াটসঅ্যাপ বা স্কাইপ ভিডিও কল অবিলম্বে বন্ধ করুন।",
    safetyStep2Title: "২. চক্ষু (DoT) পোর্টালে ভুয়া নম্বর রিপোর্ট করুন",
    safetyStep2Desc: "ভারত জুড়ে সিম ও হ্যান্ডসেট ব্লক করতে টেলিকম বিভাগের চক্ষু পোর্টালে অভিযোগ জানান।",
    copyChakshuBtn: "১. প্রতারকের বিবরণ কপি করুন",
    chakshuCopiedBtn: "বিবরণ কপি করা হয়েছে!",
    openChakshuBtn: "২. সঞ্চার সাথী খুলুন (চক্ষু)",
    safetyStep3Title: "৩. ডিজিটাল অ্যারেস্ট পুলিশ এফআইআর ডাউনলোড ও দায়ের করুন",
    safetyStep3Desc: "ভারতীয় ন্যায় সংহিতা (BNS) ধারা ২০৪ ও ধারা ৩০৮ এর অধীনে ফৌজদারি অভিযোগ তৈরি করুন।",
    downloadDigitalFirBtn: "এফআইআর অভিযোগের পিডিএফ ডাউনলোড করুন",
    shareDigitalFirBtn: "হোয়াটসঅ্যাপে এফআইআর শেয়ার করুন",
    continueToSafetyBtn: "নিরাপত্তা পদক্ষেপে এগিয়ে যান",
    callerThreatDetailsTitle: "কলার ও হুমকির বিবরণ",
    dropNoticeTitle: "সন্দেহজনক নোটিশ / সমনের ছবি আপলোড করুন",
    dropNoticeSubtitle: "হোয়াটসঅ্যাপ বা স্কাইপে পাওয়া ভুয়া সিবিআই/পুলিশের চিঠি বা স্ক্রিনশট।",
    uploadDocumentBtn: "নথি আপলোড করুন",
    pasteDemandTitle: "অথবা বার্তা / দাবির টেক্সট পেস্ট করুন",
    pasteDemandPlaceholder: "হুমকির বার্তা পেস্ট করুন e.g. 'আপনি সিবিআই কর্তৃক মানি লন্ডারিংয়ের জন্য ডিজিটাল অ্যারেস্টে আছেন। স্কাইপে থাকুন এবং ২.৫ লক্ষ টাকা জমা দিন...'",
    targetAgencyLabel: "টার্গেট সংস্থা",
    demandLabel: "দাবি",
    advisoryTitle: "অফিসিয়াল সাইবার নিরাপত্তা পরামর্শ:",
    advisoryDesc: "ভারতীয় আইন প্রয়োগকারী সংস্থাগুলি (CBI, রাজ্য পুলিশ, ED, কাস্টমস, সুপ্রিম কোর্ট) কখনোই স্কাইপ বা হোয়াটসঅ্যাপে কাউকে গ্রেপ্তার করে না এবং কোনো অ্যাকাউন্টে টাকা স্থানান্তর করতে বলে না। টাকা পাঠাবেন না।",
    continueToReviewProof: "প্রমাণ পর্যালোচনা করতে এগিয়ে যান"
  },
  actions: {
    heroTitle: "এখনই পদক্ষেপ নিন — ১-ট্যাপ সরাসরি লিঙ্ক",
    heroSubtitle: "ম্যানুয়াল কপি-পেস্ট ছাড়াই এক ট্যাপে সমস্ত জরুরি পদক্ষেপ শুরু করুন।",
    step1HelplineTitle: "1930 হেল্পলাইনে কল করুন",
    step1HelplineDesc: "জাতীয় সাইবার ক্রাইম নাগরিক হেল্পলাইনে সরাসরি সংযোগ।",
    step1HelplineBtn: "এখনই 1930 ডায়াল করুন",
    step2BankTitle: "ব্যাঙ্ক ফ্রড ডেস্কে ইমেল করুন (ধারা ৯১ BNSS)",
    step2BankDesc: "পূর্ব-নির্মিত সংবিধিবদ্ধ লিয়ান নোটিশ পাঠায়:",
    step2BankBtn: "ব্যাঙ্কে ইমেল করুন",
    step3NcrpTitle: "NCRP অভিযোগ দায়ের করুন (cybercrime.gov.in)",
    step3NcrpDesc: "১-ট্যাপ আইনি বিবৃতি কপি করুন এবং জাতীয় পোর্টাল খুলুন।",
    step3NcrpCopyBtn: "১. আইনি বিবৃতি কপি করুন",
    step3NcrpPortalBtn: "২. cybercrime.gov.in খুলুন",
    step4ShareTitle: "১-ট্যাপ হোয়াটসঅ্যাপ ও নথি শেয়ার",
    livePrompterTitle: "লাইভ টেলিপ্রম্পটার স্ক্রিপ্ট (1930 অফিসারকে এটি পড়ুন):",
    collapseScript: "স্ক্রিপ্ট লুকান",
    showScript: "স্ক্রিপ্ট দেখান",
    teleprompterHello: "নমস্কার অফিসার, আমাকে একটি জরুরি অননুমোদিত সাইবার জালিয়াতির রিপোর্ট করতে হবে, পরিমাণ ₹",
    teleprompterClosing: "প্রাপক অ্যাকাউন্ট ফ্রিজ করতে দয়া করে CFCFRMS এ এই UTR টি ফ্ল্যাগ করুন এবং আমাকে স্বীকৃতি নম্বর দিন।",
    step1Tag: "ধাপ ১ • তাৎক্ষণিক অগ্রাধিকার",
    step1Time: "প্রথম ১৫ মিনিট",
    call1930NowBtn: "এখনই 1930 এ কল করুন",
    step2Tag: "ধাপ ২ • আন্তঃব্যাঙ্ক স্থানান্তর বন্ধ করুন",
    step2Time: "১৫ মিনিট – ২ ঘণ্টা",
    emailBankTitle: "ব্যাঙ্ক ফ্রড ডেস্কে ইমেল করুন (ধারা ৯১ BNSS)",
    emailBankDesc: "পূর্ব-নির্মিত সংবিধিবদ্ধ লিয়ান নোটিশ পাঠায়:",
    emailBankBtn: "ব্যাঙ্কে ইমেল করুন",
    downloadPdfAttachBtn: "সংযুক্ত করতে পিডিএফ ডাউনলোড করুন",
    noMailAppNotice: "ডিফল্ট মেল অ্যাপ খোলেনি? অফিসিয়াল ইমেল কপি করুন:",
    step3Tag: "ধাপ ৩ • অফিসিয়াল সরকারি পোর্টাল",
    step3Time: "একই দিনে ফাইলিং",
    ncrpTitle: "NCRP অভিযোগ দায়ের করুন (cybercrime.gov.in)",
    ncrpDesc: "১-ট্যাপ আইনি বিবৃতি কপি করুন এবং জাতীয় পোর্টাল খুলুন।",
    copyStatementBtn: "১. আইনি বিবৃতি কপি করুন",
    statementCopiedBtn: "বিবৃতি কপি করা হয়েছে!",
    openPortalBtn: "২. cybercrime.gov.in খুলুন",
    shareDocsTitle: "১-ট্যাপ হোয়াটসঅ্যাপ ও নথি শেয়ার (পরিবার, আইনজীবী, পুলিশকে)",
    shareDocsSubtitle: "ডিজিটালি সংকলিত আইনি প্রমাণের পিডিএফ সরাসরি শেয়ার করুন।",
    docBankFreeze: "ব্যাঙ্ক ফ্রিজ নোটিশ",
    docBankFreezeSub: "ধারা ৯১ BNSS চিঠি",
    docPoliceFir: "পুলিশ এফআইআর",
    docPoliceFirSub: "BNS 318(4) ডসিয়ার",
    docCourtRefund: "আদালত রিফান্ড",
    docCourtRefundSub: "ধারা ৫০৩ BNSS পিটিশন",
    docEvidenceCert: "প্রমাণ শংসাপত্র",
    docEvidenceCertSub: "ধারা ৬৩(৪) BSA 2023"
  },
  a11y: {
    panelTitle: "অভিগম্যতা ও ভাষার পছন্দ",
    panelSubtitle: "প্রদর্শন এবং পড়ার পছন্দগুলি পরিবর্তন করুন",
    selectLanguage: "ভাষা নির্বাচন করুন",
    textSize: "অক্ষরের আকার",
    sizeDefault: "ডিফল্ট (1x)",
    sizeLarge: "বড় (1.25x)",
    sizeExtraLarge: "খুব বড় (1.5x)",
    panicModeTitle: "সহজ / প্যানিক মোড",
    panicModeDesc: "অপ্রয়োজনীয় বিকল্প লুকায় এবং মূল বোতামগুলি বড় করে।",
    readPageAloudTitle: "পৃষ্ঠাটি জোরে পড়ুন",
    readPageAloudDesc: "ব্রাউজার স্পিচের মাধ্যমে পৃষ্ঠার বিষয়বস্তু অডিও হিসেবে চালায়।",
    readBtn: "পড়ুন",
    stopBtn: "থামুন",
    audioFirstTitle: "অডিও-প্রথম মোড (স্বয়ংক্রিয় পাঠ)",
    audioFirstDesc: "বোতাম না টিপেই সংগৃহীত তথ্য ও আইনি সত্যগুলি স্বয়ংক্রিয়ভাবে বলে শোনান।",
    islTitle: "ভারতীয় সাংকেতিক ভাষা (ISL)",
    islDesc: "গুরুত্বপূর্ণ সিদ্ধান্তের ধাপে সাংকেতিক ভাষার ভিডিও দেখায়।"
  }
};

const I18N_RESOURCES: Record<Language, TranslationDictionary> = {
  en: EN_DICT,
  hi: HI_DICT,
  te: TE_DICT,
  ta: TA_DICT,
  kn: KN_DICT,
  bn: BN_DICT
};

export const getDictionary = (lang: Language): TranslationDictionary => {
  return I18N_RESOURCES[lang] || I18N_RESOURCES.en;
};
