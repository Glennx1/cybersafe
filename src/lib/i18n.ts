import { Language } from "./types";

export interface TranslationDictionary {
  common: {
    appName: string;
    tagline: string;
    subtitle: string;
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
}

export const I18N_RESOURCES: Record<Language, TranslationDictionary> = {
  en: {
    common: {
      appName: "CyberRakshak 1930",
      tagline: "A guided cyber-fraud assistant & statutory action system",
      subtitle: "Turn fraudulent bank SMS or scam screenshots into 1-tap Bank Freeze Notices & Police FIRs in 60 seconds.",
      goldenHourBadge: "Golden 2-Hour Recovery Window Active",
      call1930: "Call 1930",
      myCases: "My Cases",
      signIn: "Sign In",
      signOut: "Sign Out",
      back: "Back",
      continue: "Continue",
      cancel: "Cancel",
      close: "Close",
      copied: "Copied!",
      copy: "Copy",
      shareWhatsApp: "Share via WhatsApp",
      downloadPdf: "Download PDF",
      verified: "Verified",
      recordLiveCallout: "Being scammed right now? Record live",
      recordLiveBtn: "Record Live",
      flowSelectTitle: "Tell us what happened",
      flowSelectSubtitle: "Choose the option that best matches your situation.",
      selected: "Selected",
      financialCardTitle: "Money was sent or deducted without my permission",
      financialCardSubtitle: "Payment, UPI, card, or bank-transfer fraud",
      financialCardDesc: "Add the payment details you have, then use the next steps to contact your bank and the cybercrime helpline.",
      financialTag1: "Screenshot Helper",
      financialTag2: "Bank Lien Request",
      financialTag3: "Magistrate Petition",
      digitalCardTitle: "Suspicious calls, messages, or fake documents",
      digitalCardSubtitle: "Fake law-enforcement calls, blackmail, or digital arrest threats",
      digitalCardDesc: "Save the caller details and messages. We'll guide you through the safest reporting steps.",
      digitalTag1: "Document Check",
      digitalTag2: "Complaint Draft",
      digitalTag3: "SIM Block Guidance"
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
      myth1Reality: "Reality: Indian Law (BNS/BNSS) has NO concept of 'Digital Arrest'. Police never conduct interrogations or place citizens under arrest via Skype or WhatsApp.",
      myth2Title: "Myth: 'Transfer money to RBI verification account to prove innocence'",
      myth2Reality: "Reality: The RBI or Police NEVER maintain any 'clearance escrow' or demand money transfer for verification. Any demand for payment is 100% extortion.",
      myth3Title: "Myth: 'Immediate arrest warrant issued from Supreme Court'",
      myth3Reality: "Reality: Arrest warrants require formal court summons delivered in person by local police with valid FIR numbers, not forwarded PDF letters over WhatsApp."
    },
    intake: {
      financialTitle: "Let's secure your transaction details",
      financialSubtitle: "Upload a screenshot of your bank debit SMS or UPI receipt (GPay / PhonePe / Paytm), or paste the message text below.",
      dropzoneTitle: "Drop Payment Receipt / Debit SMS",
      dropzoneSubtitle: "PNG, JPG, or PDF scans from PhonePe, GPay, Paytm, or NetBanking.",
      uploadScreenshot: "Upload Screenshot",
      pasteSmsTitle: "Or Paste SMS / Transaction Text",
      pasteSmsPlaceholder: "Paste debit message e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901 to VPA ramesh.traders@okaxis...'",
      utrLabel: "12-Digit Banking UTR / RRN",
      amountLabel: "Fraud Amount",
      serverVerified: "Server Verified (Sec 63 BSA)"
    },
    audit: {
      scoreLabel: "Score",
      detailsChecked: "Details Checked",
      summaryTitle: "Incident Summary & Evidence",
      summaryVerdict: "Emergency incident data verified. Bank Lien Freeze Notice & Police FIR ready for 1-Tap dispatch.",
      recoveryEligibility: "RECOVERY ELIGIBILITY",
      eligibleForBankFreeze: "Eligible for Bank Freeze",
      verifyEditTitle: "Verify & Edit Incident Identifiers",
      clickToUpdate: "Click to update any detail",
      utrLabel: "12-Digit Banking UTR / RRN",
      fraudAmountLabel: "Fraud Amount (₹)",
      suspectVpaLabel: "Suspect UPI / VPA ID",
      suspectAccountNoLabel: "Suspect Account Number",
      suspectIfscLabel: "Suspect Account IFSC Code",
      victimBankLabel: "Victim Bank Name",
      victimAccountNoLabel: "Victim Account Number",
      victimIfscLabel: "Victim Account IFSC Code",
      victimNameLabel: "Victim Full Name",
      contactPhoneLabel: "Contact Phone Number",
      evidenceChecklistTitle: "Evidence Checklist",
      statusVerified: "Verified",
      statusAttention: "Attention",
      statusUrgent: "Urgent",
      vectorUtrLabel: "12-Digit UTR / RRN Identifier",
      vectorUtrPassed: "Valid 12-digit Banking Ref",
      vectorUtrFailed: "Missing or truncated UTR reference number.",
      vectorGoldenHourLabel: "Golden 2-Hour Recovery Window",
      vectorGoldenHourPassed: "Incident reported within Golden Window. High Fund Lock Probability (>80%).",
      vectorGoldenHourWarning: "Reported post-Golden Window. Lien request will target suspect bank mule nodes.",
      vectorSuspectLabel: "Mule Account & VPA Telemetry",
      vectorSuspectPassed: "Target VPA / Account Identified.",
      vectorSuspectWarning: "Suspect VPA details incomplete; bank will trace via UTR inter-bank switch.",
      vectorRbiLabel: "RBI Statutory Zero-Liability Rule",
      vectorRbiDetails: "Enforcing RBI Master Direction DPSS.CO.PD.No.1417/02.14.006/2017-18 for zero customer loss in third-party breaches.",
      noticeCyberSafetyTitle: "Notice on Cyber Safety Actions",
      noticeCyberSafetyDesc: "The generated documents are formatted according to Indian Cyber Crime Coordination Centre (I4C) guidelines. You can submit these directly to your bank or the 1930 Helpline.",
      backToIntake: "Back to Intake",
      continueToGetHelp: "Continue to Get Help"
    },
    step3Action: {
      targetAmountLabel: "Target Fraud Amount To Recover",
      bankingUtrLabel: "Banking UTR",
      bankLabel: "Bank",
      actionBannerDesc: "Complete your emergency actions below to freeze funds and file an official FIR.",
      firGuideTag: "Full FIR Guide",
      firGuideTitle: "Complete Cyber Police FIR Workflow",
      firGuideDesc: "Explore step-by-step guidance for submitting your official complaint online or filing at your local station with signed annexures.",
      openFirGuideBtn: "Open Complete FIR Guide & Annexures",
      noticeInspectorTag: "Notice Inspector",
      bankNoticeTitle: "Bank Nodal Email Inspector",
      bankNoticeDesc: "View the full verbatim Section 91 BNSS legal text, copy individual paragraphs, and look up nodal escalation telephone numbers.",
      inspectBankNoticeBtn: "Inspect Full Bank Notice & Escalations",
      recoveryRoadmapTitle: "How Your Money Gets Recovered (Step-by-Step)",
      stage1Title: "Report to 1930 Helpline",
      stage1Time: "First 15 Mins",
      stage1Desc: "An emergency ticket is registered on the National Cybercrime Portal to flag your transaction UTR.",
      stage2Title: "Freeze Recipient Bank Account",
      stage2Time: "15 Mins – 2 Hours",
      stage2Desc: "An urgent notice is sent to the scammer's bank to lock the funds before they can withdraw or transfer them.",
      stage3Title: "Register Police Cyber FIR",
      stage3Time: "Days 1 – 5",
      stage3Desc: "The complaint is converted into an official FIR by the Cyber Police to legally seize the held money.",
      stage4Title: "Money Refunded to Your Account",
      stage4Time: "Days 7 – 15",
      stage4Desc: "The court or bank issues an order to transfer the frozen funds safely back into your bank account.",
      helplineScriptBtn: "1930 Helpline Call Script",
      sendCyberAlertBtn: "Send Online Cyber Alert",
      backToDetails: "Back to Details",
      inspectRawPayload: "Inspect Raw Payload",
      whatNextTitle: "What should you do next? (Recommended Next Steps)",
      nextStep1Title: "Stay Calm & Disconnect",
      nextStep1Desc: "Do not panic or engage further with the scammer. Never pay any secondary \"unfreeze charge\" or \"processing fee\" to recover money.",
      nextStep2Title: "Secure Your Accounts & Passwords",
      nextStep2Desc: "Immediately change your UPI MPIN, NetBanking passwords, and email passwords. Uninstall any screen-sharing apps (e.g. AnyDesk, TeamViewer) if installed.",
      nextStep3Title: "Visit Your Home Bank Branch",
      nextStep3Desc: "Within 24–48 hours, visit your home branch manager with a copy of the Bank Lien Letter to ensure the dispute is recorded on the bank nodal switch.",
      nextStep4Title: "Save Acknowledgement & Visit Cyber Police",
      nextStep4Desc: "Save the SMS acknowledgement from 1930 / cybercrime.gov.in. If needed, take your bank statement to the local Cyber Police Station to get a certified FIR copy.",
      rememberTitle: "Remember:",
      rememberDesc: "Genuine police officers or bank staff will never ask for your OTP, PIN, or to transfer money to another account."
    },
    digitalArrest: {
      heroTitle: "Fake Digital Arrest & Police Impersonation Defense",
      heroSubtitle: "Immediate legal relief against fake CBI, Cyber Cell, Customs FedEx parcel, and video call extortion scams.",
      impersonatedAgencyLabel: "Impersonated Agency",
      callerIdLabel: "Caller ID / WhatsApp / Skype Handle",
      extortionDemandLabel: "Extortion Demand Amount (₹)",
      disconnectAdviceTitle: "Immediate Action: Disconnect the Call",
      disconnectAdviceDesc: "You are completely safe. Genuine police officers will never arrest you over a video call or demand funds.",
      factCheckBadge: "Legal Fact Check & Reality",
      notInDangerBadge: "You Are Not in Legal Danger",
      step2Title: "Facts & Legal Truths Behind Digital Arrest",
      step2Subtitle: "Scammers use fake police uniforms, video calls, and forged stamps to cause fear. Here is how Indian law actually protects you against these unlawful demands.",
      claimVsRealityTitle: "What Scammers Claim vs. Actual Legal Rights",
      scammerClaimLabel: "Scammer Threat",
      legalRealityLabel: "Legal Reality",
      myth1Claim: "You are under 'Digital Arrest' and cannot leave your room.",
      myth1Truth: "The term 'Digital Arrest' has 0% legal standing in Indian Law. Neither BNSS 2023 nor IT Act permits arrest via video call.",
      myth2Claim: "Keep WhatsApp/Skype video camera active 24x7 or police will raid.",
      myth2Truth: "Summons must be served physically in writing by a designated IO. Confinement via video call is criminal extortion.",
      myth3Claim: "Transfer funds to 'RBI Security Escrow' for clearance/verification.",
      myth3Truth: "No court, police agency, or RBI ever asks citizens to transfer money to clear their name.",
      myth4Claim: "National Security secrecy: Do not contact family or lawyers.",
      myth4Truth: "Every citizen has a fundamental right under Constitution Art 22 & Sec 36 BNSS to consult an advocate.",
      safeTakeActionBadge: "You are Safe. Take Action Below.",
      step3NextStepsTitle: "Recommended Next Steps",
      step3NextStepsSubtitle: "The scammers attempting to intimidate you have no legal authority. Follow these 3 immediate safety steps and file your official reports.",
      safetyStep1Title: "1. Disconnect All Video Calls & Block Caller",
      safetyStep1Desc: "Immediately end WhatsApp or Skype video calls. True law enforcement will NEVER threaten citizens over webcam.",
      safetyStep2Title: "2. Report Fake Number to Chakshu (DoT)",
      safetyStep2Desc: "Submit scammer's caller ID to the Department of Telecommunications Chakshu portal to block their SIM and handset across India.",
      copyChakshuBtn: "1. Copy Scammer Details",
      chakshuCopiedBtn: "Details Copied!",
      openChakshuBtn: "2. Open Sanchar Saathi (Chakshu)",
      safetyStep3Title: "3. Download & File Digital Arrest Police FIR",
      safetyStep3Desc: "Generate pre-drafted criminal complaint under Bharatiya Nyaya Sanhita (BNS) Section 204 (Impersonating Public Servant) and Section 308 (Extortion).",
      downloadDigitalFirBtn: "Download FIR Complaint PDF",
      shareDigitalFirBtn: "Share FIR to WhatsApp",
      continueToSafetyBtn: "Continue to Safety Action"
    },
    actions: {
      heroTitle: "Take Action Now — Direct Deep Links",
      heroSubtitle: "Trigger all statutory emergency actions in a single tap without manual copy-paste delays.",
      step1HelplineTitle: "Call Helpline 1930",
      step1HelplineDesc: "Direct dial into the National Cybercrime Citizen Helpline (CFCFRMS).",
      step1HelplineBtn: "Call 1930 Now",
      step2BankTitle: "Email Bank Fraud Desk (Section 91 BNSS)",
      step2BankDesc: "Dispatches pre-composed statutory lien requisition to",
      step2BankBtn: "Email Bank Now",
      step3NcrpTitle: "File NCRP Complaint (cybercrime.gov.in)",
      step3NcrpDesc: "1-tap copy pre-formatted legal statement & open official national portal in a new tab.",
      step3NcrpCopyBtn: "1. Copy Statement",
      step3NcrpPortalBtn: "2. Open cybercrime.gov.in",
      step4ShareTitle: "One-Tap WhatsApp & Document Share",
      livePrompterTitle: "Live Teleprompter Script (Read this to the 1930 Officer):",
      collapseScript: "Collapse Script",
      showScript: "Show Script",
      teleprompterHello: "Hello Officer, I need to report an emergency unauthorized cyber fraud of ₹",
      teleprompterClosing: "Please immediately flag this UTR on CFCFRMS to freeze the recipient account node and provide me the ticket acknowledgement number.",
      step1Tag: "Step 1 • Immediate Priority",
      step1Time: "First 15 Mins",
      call1930NowBtn: "Call 1930 Now",
      step2Tag: "Step 2 • Stop Inter-Bank Transfer",
      step2Time: "15 Mins – 2 Hours",
      emailBankTitle: "Email Bank Fraud Desk (Section 91 BNSS)",
      emailBankDesc: "Dispatches pre-composed statutory lien requisition to",
      emailBankBtn: "Email Bank Now",
      downloadPdfAttachBtn: "Download PDF to Attach",
      noMailAppNotice: "No default mail app opened? Copy the official fraud-desk email:",
      step3Tag: "Step 3 • Official Government Portal",
      step3Time: "Same Day Filing",
      ncrpTitle: "File NCRP Complaint (cybercrime.gov.in)",
      ncrpDesc: "1-tap copy pre-formatted legal statement & open official national portal in a new tab.",
      copyStatementBtn: "1. Copy Statement",
      statementCopiedBtn: "Statement Copied!",
      openPortalBtn: "2. Open cybercrime.gov.in",
      shareDocsTitle: "One-Tap WhatsApp & Document Share (To Family, Lawyer, Police Contact)",
      shareDocsSubtitle: "Directly share digitally generated legal evidence PDFs without saving to disk first.",
      docBankFreeze: "Bank Freeze Notice",
      docBankFreezeSub: "Sec 91 BNSS Letter",
      docPoliceFir: "Police FIR",
      docPoliceFirSub: "BNS 318(4) Dossier",
      docCourtRefund: "Court Refund",
      docCourtRefundSub: "Sec 503 BNSS Petition",
      docEvidenceCert: "Evidence Certificate",
      docEvidenceCertSub: "Sec 63(4) BSA 2023"
    }
  },
  hi: {
    common: {
      appName: "साइबर रक्षक 1930",
      tagline: "मार्गदर्शित साइबर-धोखाधड़ी सहायक और कानूनी कार्रवाई प्रणाली",
      subtitle: "धोखाधड़ी बैंक एसएमएस या स्क्रीनशॉट को 60 सेकंड में 1-टैप बैंक फ्रीज़ नोटिस और पुलिस एफआईआर में बदलें।",
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
      digitalTag3: "सिम ब्लॉक मार्गदर्शन"
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
      dropzoneSubtitle: "PhonePe, GPay, Paytm या नेटबैंकिंग से PNG, JPG, বা PDF स्कैन।",
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
      continueToSafetyBtn: "सुरक्षा कार्रवाई के लिए आगे बढ़ें"
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
    }
  },
  ta: {
    ...I18N_RESOURCES_EN_FALLBACK("ta")
  },
  te: {
    ...I18N_RESOURCES_EN_FALLBACK("te")
  },
  kn: {
    ...I18N_RESOURCES_EN_FALLBACK("kn")
  },
  bn: {
    ...I18N_RESOURCES_EN_FALLBACK("bn")
  }
};

function I18N_RESOURCES_EN_FALLBACK(lang: "ta" | "te" | "kn" | "bn"): TranslationDictionary {
  const en = I18N_RESOURCES.en;
  // If native common translations already exist for regional stubs, we retain them
  if (lang === "ta") {
    return {
      ...en,
      common: {
        ...en.common,
        appName: "CyberRakshak 1930",
        call1930: "1930 அழைக்கவும்",
        myCases: "என் வழக்குகள்",
        signIn: "உள்நுழைக",
        signOut: "வெளியேறு",
        flowSelectTitle: "என்ன நடந்தது என்று சொல்லுங்கள்",
        flowSelectSubtitle: "உங்கள் நிலைமைக்கு மிகவும் பொருத்தமான விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
        selected: "தேர்ந்தெடுக்கப்பட்டது",
        financialCardTitle: "என் அனுமதி இல்லாமல் பணம் அனுப்பப்பட்டது அல்லது கழிக்கப்பட்டது",
        financialCardSubtitle: "UPI, அட்டை அல்லது வங்கி பரிமாற்ற மோசடி",
        digitalCardTitle: "சந்தேகப்படத்தக்க அழைப்புகள், செய்திகள் அல்லது போலி ஆவணங்கள்",
        digitalCardSubtitle: "போலி சட்ட அமலாக்க அழைப்புகள், மிரட்டல் அல்லது டிஜிட்டல் கைது அச்சுறுத்தல்கள்"
      },
      audit: {
        ...en.audit,
        scoreLabel: "மதிப்பெண்",
        detailsChecked: "விவரங்கள் சரிபார்க்கப்பட்டன",
        summaryTitle: "சம்பவ சுருக்கம் & சான்றுகள்",
        recoveryEligibility: "மீட்பு தகுதி",
        eligibleForBankFreeze: "வங்கி முடக்கத்திற்கு தகுதியானது",
        verifyEditTitle: "சம்பவ அடையாளங்காட்டிகளை சரிபார்த்து திருத்தவும்",
        clickToUpdate: "விவரங்களை புதுப்பிக்க கிளிக் செய்க",
        evidenceChecklistTitle: "சான்றுகள் சரிபார்ப்பு பட்டியல்",
        backToIntake: "உட்கொள்ளலுக்குத் திரும்பு",
        continueToGetHelp: "உதவி பெற தொடரவும்"
      },
      step3Action: {
        ...en.step3Action,
        targetAmountLabel: "மீட்க வேண்டிய இலக்கு மோசடி தொகை",
        firGuideTag: "முழு எஃப்.ஐ.ஆர் வழிகாட்டி",
        firGuideTitle: "முழுமையான சைபர் காவல்துறை எஃப்.ஐ.ஆர் பணிப்பாய்வு",
        noticeInspectorTag: "அறிவிப்பு ஆய்வாளர்",
        bankNoticeTitle: "வங்கி நோடல் மின்னஞ்சல் ஆய்வாளர்",
        recoveryRoadmapTitle: "உங்கள் பணம் எவ்வாறு மீட்கப்படுகிறது (படி-படி)",
        helplineScriptBtn: "1930 உதவி எண் அழைப்பு ஸ்கிரிப்ட்",
        sendCyberAlertBtn: "ஆன்லைன் சைபர் எச்சரிக்கையை அனுப்புக",
        backToDetails: "விவரங்களுக்குத் திரும்பு"
      }
    };
  }
  if (lang === "te") {
    return {
      ...en,
      common: {
        ...en.common,
        appName: "CyberRakshak 1930",
        call1930: "1930 కు కాల్ చేయండి",
        myCases: "నా కేసులు",
        signIn: "సైన్ ఇన్",
        signOut: "సైన్ అవుట్",
        flowSelectTitle: "ఏం జరిగిందో మాకు చెప్పండి",
        flowSelectSubtitle: "మీ పరిస్థితికి బాగా సరిపోయే ఎంపికను ఎంచుకోండి.",
        selected: "ఎంచుకోబడింది",
        financialCardTitle: "నా అనుమతి లేకుండా డబ్బు పంపబడింది లేదా తీసివేయబడింది",
        financialCardSubtitle: "UPI, కార్డు లేదా బ్యాంక్ బదిలీ మోసం",
        digitalCardTitle: "అనుమానాస్పద కాల్‌లు, సందేశాలు లేదా నకిలీ పత్రాలు",
        digitalCardSubtitle: "నకిలీ చట్ట అమలు కాల్‌లు, బ్లాక్‌మెయిల్ లేదా డిజిటల్ అరెస్ట్ బెదిరింపులు"
      },
      audit: {
        ...en.audit,
        scoreLabel: "స్కోరు",
        detailsChecked: "వివరాలు తనిఖీ చేయబడ్డాయి",
        summaryTitle: "సంఘటన సారాంశం & సాక్ష్యం",
        recoveryEligibility: "రికవరీ అర్హత",
        eligibleForBankFreeze: "బ్యాంక్ ఫ్రీజ్ చేయడానికి అర్హులు",
        verifyEditTitle: "సంఘటన గుర్తింపుదారులను ధృవీకరించండి & సవరించండి",
        clickToUpdate: "వివరాలను నవీకరించడానికి క్లిక్ చేయండి",
        evidenceChecklistTitle: "సాక్ష్యాల చెక్‌లిస్ట్",
        backToIntake: "ఇన్‌టేక్‌కు తిరిగి వెళ్లండి",
        continueToGetHelp: "సహాయం పొందడానికి కొనసాగించండి"
      },
      step3Action: {
        ...en.step3Action,
        targetAmountLabel: "రికవర్ చేయవలసిన మోసం మొత్తం",
        firGuideTag: "పూర్తి FIR గైడ్",
        firGuideTitle: "పూర్తి సైబర్ పోలీస్ FIR వర్క్‌ఫ్లో",
        noticeInspectorTag: "నోటీసు ఇన్‌స్పెక్టర్",
        bankNoticeTitle: "బ్యాంక్ నోడల్ ఇమెయిల్ ఇన్‌స్పెక్టర్",
        recoveryRoadmapTitle: "మీ డబ్బు ఎలా రికవర్ అవుతుంది (దశల వారీగా)",
        helplineScriptBtn: "1930 హెల్ప్‌లైన్ కాల్ స్క్రిప్ట్",
        sendCyberAlertBtn: "ఆన్‌లైన్ సైబర్ హెచ్చరికను పంపండి",
        backToDetails: "వివరాలకు తిరిగి వెళ్లండి"
      }
    };
  }
  if (lang === "kn") {
    return {
      ...en,
      common: {
        ...en.common,
        appName: "CyberRakshak 1930",
        call1930: "1930 ಗೆ ಕರೆ ಮಾಡಿ",
        myCases: "ನನ್ನ ಪ್ರಕರಣಗಳು",
        signIn: "ಸೈನ್ ಇನ್",
        signOut: "ಸೈನ್ ಔಟ್",
        flowSelectTitle: "ಏನಾಯಿತು ಎಂದು ನಮಗೆ ತಿಳಿಸಿ",
        flowSelectSubtitle: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಗೆ ಹೆಚ್ಚು ಸೂಕ್ತವಾದ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
        selected: "ಆಯ್ಕೆಯಾಗಿದೆ",
        financialCardTitle: "ನನ್ನ ಅನುಮತಿ ಇಲ್ಲದೆ ಹಣ ಕಳಿಸಲಾಯಿತು ಅಥವಾ ಕಡಿತವಾಯಿತು",
        financialCardSubtitle: "UPI, ಕಾರ್ಡ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ ವಂಚನೆ",
        digitalCardTitle: "ಅನುಮಾನಾಸ್ಪದ ಕರೆಗಳು, ಸಂದೇಶಗಳು ಅಥವಾ ನಕಲಿ ದಾಖಲೆಗಳು",
        digitalCardSubtitle: "ನಕಲಿ ಕಾನೂನು ಜಾರಿ ಕರೆಗಳು, ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಅಥವಾ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಬೆದರಿಕೆಗಳು"
      },
      audit: {
        ...en.audit,
        scoreLabel: "ಸ್ಕೋರ್",
        detailsChecked: "ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
        summaryTitle: "ಘಟನೆಯ ಸಾರಾಂಶ ಮತ್ತು ಪುರಾವೆ",
        recoveryEligibility: "ಮರುಪಡೆಯುವಿಕೆ ಅರ್ಹತೆ",
        eligibleForBankFreeze: "ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್‌ಗೆ ಅರ್ಹವಾಗಿದೆ",
        verifyEditTitle: "ಘಟನೆಯ ಗುರುತಿಸುವಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಂಪಾದಿಸಿ",
        clickToUpdate: "ವಿವರಗಳನ್ನು ನವೀಕರಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
        evidenceChecklistTitle: "ಪುರಾವೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
        backToIntake: "ಇನ್‌ಟೇಕ್‌ಗೆ ಹಿಂತಿರುಗಿ",
        continueToGetHelp: "ಸಹಾಯ ಪಡೆಯಲು ಮುಂದುವರಿಯಿರಿ"
      },
      step3Action: {
        ...en.step3Action,
        targetAmountLabel: "ಮರುಪಡೆಯಬೇಕಾದ ವಂಚನೆ ಮೊತ್ತ",
        firGuideTag: "ಸಂಪೂರ್ಣ ಎಫ್‌ಐಆರ್ ಮಾರ್ಗದರ್ಶಿ",
        firGuideTitle: "ಸಂಪೂರ್ಣ ಸೈಬರ್ ಪೊಲೀಸ್ ಎಫ್‌ಐಆರ್ ಕೆಲಸದ ಹರಿವು",
        noticeInspectorTag: "ನೋಟಿಸ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್",
        bankNoticeTitle: "ಬ್ಯಾಂಕ್ ನೋಡಲ್ ಇಮೇಲ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್",
        recoveryRoadmapTitle: "ನಿಮ್ಮ ಹಣ ಹೇಗೆ ಮರುಪಡೆಯಲ್ಪಡುತ್ತದೆ (ಹಂತ-ಹಂತವಾಗಿ)",
        helplineScriptBtn: "1930 ಹೆಲ್ಪ್‌ಲೈನ್ ಕರೆ ಸ್ಕ್ರಿಪ್ಟ್",
        sendCyberAlertBtn: "ಆನ್‌ಲೈನ್ ಸೈಬರ್ ಎಚ್ಚರಿಕೆಯನ್ನು ಕಳುಹಿಸಿ",
        backToDetails: "ವಿವರಗಳಿಗೆ ಹಿಂತಿರುಗಿ"
      }
    };
  }
  // Bengali
  return {
    ...en,
    common: {
      ...en.common,
      appName: "CyberRakshak 1930",
      call1930: "১৯৩০ কল করুন",
      myCases: "আমার কেস",
      signIn: "সাইন ইন",
      signOut: "সাইন আউট",
      flowSelectTitle: "কী হয়েছে তা আমাদের বলুন",
      flowSelectSubtitle: "আপনার পরিস্থিতির সাথে সবচেয়ে ভালো মেলে এমন বিকল্পটি বেছে নিন।",
      selected: "নির্বাচিত",
      financialCardTitle: "আমার অনুমতি ছাড়াই টাকা পাঠানো বা কাটা হয়েছে",
      financialCardSubtitle: "UPI, কার্ড বা ব্যাংক ট্রান্সফার প্রতারণা",
      digitalCardTitle: "সন্দেহজনক কল, বার্তা বা ভুয়া নথি",
      digitalCardSubtitle: "ভুয়া আইন প্রয়োগকারী কল, ব্ল্যাকমেইল বা ডিজিটাল গ্রেপ্তারের হুমকি"
    },
    audit: {
      ...en.audit,
      scoreLabel: "স্কোর",
      detailsChecked: "বিবরণ যাচাইকৃত",
      summaryTitle: "ঘটনার সারাংশ ও প্রমাণাদি",
      recoveryEligibility: "পুনরুদ্ধারের যোগ্যতা",
      eligibleForBankFreeze: "ব্যাংক ফ্রিজের জন্য যোগ্য",
      verifyEditTitle: "ঘটনার সনাক্তকারী যাচাই ও সম্পাদনা করুন",
      clickToUpdate: "যেকোনো বিবরণ আপডেট করতে ক্লিক করুন",
      evidenceChecklistTitle: "প্রমাণাদি চেকলিস্ট",
      backToIntake: "ইনটেকে ফিরে যান",
      continueToGetHelp: "সাহায্য পেতে এগিয়ে যান"
    },
    step3Action: {
      ...en.step3Action,
      targetAmountLabel: "উদ্ধারের জন্য লক্ষ্য প্রতারণার পরিমাণ",
      firGuideTag: "সম্পূর্ণ এফআইআর গাইড",
      firGuideTitle: "সম্পূর্ণ সাইবার পুলিশ এফআইআর প্রক্রিয়া",
      noticeInspectorTag: "নোটিশ পরিদর্শক",
      bankNoticeTitle: "ব্যাংক নোডাল ইমেল পরিদর্শক",
      recoveryRoadmapTitle: "আপনার টাকা কীভাবে উদ্ধার হয় (ধাপে ধাপে)",
      helplineScriptBtn: "১৯৩০ হেল্পলাইন কল স্ক্রিপ্ট",
      sendCyberAlertBtn: "অনলাইন সাইবার সতর্কতা পাঠান",
      backToDetails: "বিবরণে ফিরে যান"
    }
  };
}

export function getDictionary(lang: Language): TranslationDictionary {
  return I18N_RESOURCES[lang] || I18N_RESOURCES.en;
}
