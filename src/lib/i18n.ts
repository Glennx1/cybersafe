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
  digitalArrest: {
    heroTitle: string;
    heroSubtitle: string;
    impersonatedAgencyLabel: string;
    callerIdLabel: string;
    extortionDemandLabel: string;
    disconnectAdviceTitle: string;
    disconnectAdviceDesc: string;
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
    digitalArrest: {
      heroTitle: "Fake Digital Arrest & Police Impersonation Defense",
      heroSubtitle: "Immediate legal relief against fake CBI, Cyber Cell, Customs FedEx parcel, and video call extortion scams.",
      impersonatedAgencyLabel: "Impersonated Agency",
      callerIdLabel: "Caller ID / WhatsApp / Skype Handle",
      extortionDemandLabel: "Extortion Demand Amount (₹)",
      disconnectAdviceTitle: "Immediate Action: Disconnect the Call",
      disconnectAdviceDesc: "You are completely safe. Genuine police officers will never arrest you over a video call or demand funds."
    },
    actions: {
      heroTitle: "Take Action Now — Direct Deep Links",
      heroSubtitle: "Trigger all statutory emergency actions in a single tap without manual copy-paste delays.",
      step1HelplineTitle: "Call Helpline 1930",
      step1HelplineDesc: "Direct dial into the National Cybercrime Citizen Helpline (CFCFRMS).",
      step1HelplineBtn: "Call 1930 Now",
      step2BankTitle: "Email Bank Fraud Desk (Section 91 BNSS)",
      step2BankDesc: "Dispatches pre-composed statutory lien requisition directly to nodal fraud desks.",
      step2BankBtn: "Email Bank Now",
      step3NcrpTitle: "File NCRP Complaint (cybercrime.gov.in)",
      step3NcrpDesc: "1-tap copy pre-formatted legal statement & open official national portal.",
      step3NcrpCopyBtn: "1. Copy Statement",
      step3NcrpPortalBtn: "2. Open cybercrime.gov.in",
      step4ShareTitle: "One-Tap WhatsApp & Document Share"
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
    digitalArrest: {
      heroTitle: "फर्जी डिजिटल अरेस्ट और पुलिस ढोंग से सुरक्षा",
      heroSubtitle: "फर्जी सीबीआई, साइबर सेल, कस्टम्स फेडेक्स पार्सल और वीडियो कॉल जबरन वसूली के खिलाफ तत्काल राहत।",
      impersonatedAgencyLabel: "नकली संस्था / अधिकारी",
      callerIdLabel: "कॉलर आईडी / व्हाट्सएप / स्काइप हैंडल",
      extortionDemandLabel: "जबरन वसूली मांग राशि (₹)",
      disconnectAdviceTitle: "तत्काल कदम: कॉल तुरंत काट दें",
      disconnectAdviceDesc: "आप पूरी तरह सुरक्षित हैं। असली पुलिस अधिकारी कभी भी वीडियो कॉल पर पैसे नहीं मांगते।"
    },
    actions: {
      heroTitle: "अभी कार्रवाई करें — 1-टैप डायरेक्ट लिंक्स",
      heroSubtitle: "बिना किसी मैन्युअल कॉपी-पेस्ट के एक टैप में सभी आपातकालीन कार्रवाई शुरू करें।",
      step1HelplineTitle: "हेल्पलाइन 1930 पर कॉल करें",
      step1HelplineDesc: "राष्ट्रीय साइबर अपराध नागरिक हेल्पलाइन से सीधा संपर्क।",
      step1HelplineBtn: "अभी 1930 डायल करें",
      step2BankTitle: "बैंक फ्रॉड डेस्क को ईमेल करें (धारा 91 BNSS)",
      step2BankDesc: "बैंक नोडल अधिकारियों को सीधे वैधानिक खाता फ्रीज नोटिस भेजें।",
      step2BankBtn: "बैंक को अभी ईमेल करें",
      step3NcrpTitle: "NCRP शिकायत दर्ज करें (cybercrime.gov.in)",
      step3NcrpDesc: "1-टैप कानूनी बयान कॉपी करें और आधिकारिक सरकारी पोर्टल खोलें।",
      step3NcrpCopyBtn: "1. कानूनी बयान कॉपी करें",
      step3NcrpPortalBtn: "2. cybercrime.gov.in खोलें",
      step4ShareTitle: "1-टैप व्हाट्सएप व दस्तावेज साझा करें"
    }
  },
  // Stub dictionaries for Regional Languages (TODO: Complete full localization in future release)
  ta: {
    common: {
      appName: "CyberRakshak 1930",
      tagline: "வழிகாட்டப்பட்ட சைபர் குற்ற உதவி & சட்ட நடவடிக்கை அமைப்பு",
      subtitle: "மோசடி SMS அல்லது ஸ்கிரீன்ஷாட்டை 60 வினாடிகளில் 1-டேப் வங்கி முடக்க அறிவிப்பு மற்றும் காவல்துறை எஃப்.ஐ.ஆராக மாற்றவும்.",
      goldenHourBadge: "தங்க 2-மணிநேர மீட்பு சாளரம் செயலில் உள்ளது",
      call1930: "1930 அழைக்கவும்",
      myCases: "என் வழக்குகள்",
      signIn: "உள்நுழைக",
      signOut: "வெளியேறு",
      back: "பின்னால்",
      continue: "தொடரவும்",
      cancel: "ரத்து செய்",
      close: "மூடு",
      copied: "நகலெடுக்கப்பட்டது!",
      copy: "நகலெடு",
      shareWhatsApp: "வாட்ஸ்அப் மூலம் பகிர்",
      downloadPdf: "PDF பதிவிறக்கு",
      verified: "சரிபார்க்கப்பட்டது",
      recordLiveCallout: "இப்போது மோசடி அழைப்பில் உள்ளீர்களா? பதிவு செய்க",
      recordLiveBtn: "நேரலை பதிவு",
      flowSelectTitle: "என்ன நடந்தது என்று சொல்லுங்கள்",
      flowSelectSubtitle: "உங்கள் நிலைமைக்கு மிகவும் பொருத்தமான விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
      selected: "தேர்ந்தெடுக்கப்பட்டது",
      financialCardTitle: "என் அனுமதி இல்லாமல் பணம் அனுப்பப்பட்டது அல்லது கழிக்கப்பட்டது",
      financialCardSubtitle: "UPI, அட்டை அல்லது வங்கி பரிமாற்ற மோசடி",
      financialCardDesc: "நீங்கள் வைத்திருக்கும் கட்டண விவரங்களைச் சேர்க்கவும், பின்னர் உங்கள் வங்கி மற்றும் சைபர் குற்ற உதவி எண்ணை தொடர்பு கொள்ளவும்.",
      financialTag1: "ஸ்கிரீன்ஷாட் உதவியாளர்",
      financialTag2: "வங்கி Lien கோரிக்கை",
      financialTag3: "மாஜிஸ்ட்ரேட் மனு",
      digitalCardTitle: "சந்தேகப்படத்தக்க அழைப்புகள், செய்திகள் அல்லது போலி ஆவணங்கள்",
      digitalCardSubtitle: "போலி சட்ட அமலாக்க அழைப்புகள், மிரட்டல் அல்லது டிஜிட்டல் கைது அச்சுறுத்தல்கள்",
      digitalCardDesc: "அழைப்பாளர் விவரங்கள் மற்றும் செய்திகளை சேமிக்கவும். நாங்கள் உங்களை பாதுகாப்பான புகாரளிக்கும் படிகள் வழியாக வழிநடத்துவோம்.",
      digitalTag1: "ஆவண சரிபார்ப்பு",
      digitalTag2: "புகார் வரைவு",
      digitalTag3: "SIM தடுப்பு வழிகாட்டுதல்"
    },
    navigation: {
      financialStep1: "1. என்ன நடந்தது என்று சொல்லுங்கள்",
      financialStep2: "2. விவரங்களைச் சரிபார்க்கவும்",
      financialStep3: "3. இப்போது உதவி பெறுங்கள்",
      digitalArrestStep1: "1. என்ன நடந்தது என்று சொல்லுங்கள்",
      digitalArrestStep2: "2. ஆதாரங்களை மதிப்பாய்வு செய்யவும்",
      digitalArrestStep3: "3. நடவடிக்கை எடுங்கள்"
    },
    factCheck: {
      title: "சட்ட உண்மை சரிபார்ப்பு: உங்கள் உரிமைகளை அறியுங்கள்",
      subtitle: "உண்மையான இந்திய குற்றவியல் நடைமுறை (BNSS) vs போலி போலீஸ் அச்சுறுத்தல்கள்",
      myth1Title: "Myth: 'You are under digital arrest on video call'",
      myth1Reality: "Reality: Indian Law has NO concept of 'Digital Arrest'. Police never conduct interrogations via Skype or WhatsApp.",
      myth2Title: "Myth: 'Transfer money to RBI verification account'",
      myth2Reality: "Reality: RBI or Police NEVER demand money transfer for verification. Any demand is 100% extortion.",
      myth3Title: "Myth: 'Immediate arrest warrant issued from Supreme Court'",
      myth3Reality: "Reality: Arrest warrants require formal court summons delivered in person by local police."
    },
    intake: {
      financialTitle: "உங்கள் பரிவர்த்தனை விவரங்களைப் பாதுகாப்போம்",
      financialSubtitle: "வங்கி பற்று SMS அல்லது UPI ரசீது ஸ்கிரீன்ஷாட்டைப் பதிவேற்றவும்.",
      dropzoneTitle: "கட்டண ரசீது / டெபிட் SMS ஐப் பதிவேற்றவும்",
      dropzoneSubtitle: "PhonePe, GPay, Paytm அல்லது NetBanking ஸ்கிரீன்ஷாட்கள்.",
      uploadScreenshot: "ஸ்கிரீன்ஷாட்டைப் பதிவேற்றவும்",
      pasteSmsTitle: "அல்லது SMS உரையை ஒட்டவும்",
      pasteSmsPlaceholder: "பற்று செய்தியை ஒட்டவும் e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
      utrLabel: "12-இலக்க UTR / RRN",
      amountLabel: "மோசடி தொகை",
      serverVerified: "சர்வர் சரிபார்க்கப்பட்டது (Sec 63 BSA)"
    },
    digitalArrest: {
      heroTitle: "போலி டிஜிட்டல் கைது மற்றும் காவல்துறை ஆள்மாறாட்டம் பாதுகாப்பு",
      heroSubtitle: "போலி சிபிஐ, சைபர் செல், சுங்க ஃபெடெக்ஸ் பார்சல் வீடியோ அழைப்பு மிரட்டல்களுக்கு எதிரான நிவாரணம்.",
      impersonatedAgencyLabel: "ஆள்மாறாட்டம் செய்யப்பட்ட நிறுவனம்",
      callerIdLabel: "அழைப்பாளர் ஐடி / வாட்ஸ்அப் / ஸ்கைப்",
      extortionDemandLabel: "பறிப்பு கோரிக்கை தொகை (₹)",
      disconnectAdviceTitle: "உடனடி நடவடிக்கை: அழைப்பைத் துண்டிக்கவும்",
      disconnectAdviceDesc: "நீங்கள் முற்றிலும் பாதுகாப்பாக இருக்கிறீர்கள். உண்மையான போலீஸ் வீடியோ அழைப்பில் பணம் கேட்காது."
    },
    actions: {
      heroTitle: "இப்போது நடவடிக்கை எடுங்கள் — நேரடி இணைப்புகள்",
      heroSubtitle: "கையேடு தாமதங்கள் இல்லாமல் ஒரே தட்டலில் அனைத்து அவசர நடவடிக்கைகளையும் தூண்டவும்.",
      step1HelplineTitle: "1930 உதவி எண்ணை அழைக்கவும்",
      step1HelplineDesc: "தேசிய சைபர் கிரைம் குடிமக்கள் உதவி மையத்திற்கான நேரடி அழைப்பு.",
      step1HelplineBtn: "இப்போது 1930 ஐ அழைக்கவும்",
      step2BankTitle: "வங்கி மோசடி பிரிவுக்கு மின்னஞ்சல் செய்யவும் (பிரிவு 91 BNSS)",
      step2BankDesc: "கணக்கு முடக்க அறிவிப்பை உடனடியாக வங்கிகளுக்கு அனுப்பவும்.",
      step2BankBtn: "இப்போது வங்கிக்கு மின்னஞ்சல் அனுப்பவும்",
      step3NcrpTitle: "NCRP புகாரைப் பதிவு செய்யவும் (cybercrime.gov.in)",
      step3NcrpDesc: "சட்ட அறிக்கையை 1-தட்டலில் நகலெடுத்து அதிகாரப்பூர்வ போர்ட்டலைத் திறக்கவும்.",
      step3NcrpCopyBtn: "1. அறிக்கையை நகலெடு",
      step3NcrpPortalBtn: "2. cybercrime.gov.in திறக்கவும்",
      step4ShareTitle: "வாட்ஸ்அப் மற்றும் ஆவணப் பகிர்வு"
    }
  },
  te: {
    common: {
      appName: "CyberRakshak 1930",
      tagline: "గైడెడ్ సైబర్-ఫ్రాడ్ అసిస్టెంట్ & చట్టపరమైన కార్యాచరణ వ్యవస్థ",
      subtitle: "మోసపూరిత బ్యాంక్ SMS లేదా స్క్రీన్‌షాట్‌లను 60 సెకన్లలో 1-ట్యాప్ బ్యాంక్ ఫ్రీజ్ నోటీసులు & పోలీస్ FIRలుగా మార్చండి.",
      goldenHourBadge: "గోల్డెన్ 2-గంటల రికవరీ సమయం క్రియాశీలంగా ఉంది",
      call1930: "1930 కాల్ చేయండి",
      myCases: "నా కేసులు",
      signIn: "సైన్ ఇన్ చేయండి",
      signOut: "సైన్ అవుట్",
      back: "వెనుకకు",
      continue: "కొనసాగించండి",
      cancel: "రద్దు చేయండి",
      close: "మూసివేయండి",
      copied: "కాపీ చేయబడింది!",
      copy: "కాపీ చేయండి",
      shareWhatsApp: "వాట్సాప్ ద్వారా షేర్ చేయండి",
      downloadPdf: "PDF డౌన్‌లోడ్ చేయండి",
      verified: "ధృవీకరించబడింది",
      recordLiveCallout: "ఇప్పుడే మోసపు కాల్‌లో ఉన్నారా? లైవ్ రికార్డ్ చేయండి",
      recordLiveBtn: "లైవ్ రికార్డ్",
      flowSelectTitle: "ఏం జరిగిందో మాకు చెప్పండి",
      flowSelectSubtitle: "మీ పరిస్థితికి బాగా సరిపోయే ఎంపికను ఎంచుకోండి.",
      selected: "ఎంచుకోబడింది",
      financialCardTitle: "నా అనుమతి లేకుండా డబ్బు పంపబడింది లేదా తీసివేయబడింది",
      financialCardSubtitle: "UPI, కార్డు లేదా బ్యాంక్ బదిలీ మోసం",
      financialCardDesc: "మీ వద్ద ఉన్న చెల్లింపు వివరాలను జోడించండి, తర్వాత మీ బ్యాంక్ మరియు సైబర్ క్రైమ్ హెల్ప్‌లైన్‌ను సంప్రదించండి.",
      financialTag1: "స్క్రీన్‌షాట్ సహాయకుడు",
      financialTag2: "బ్యాంక్ Lien అభ్యర్థన",
      financialTag3: "మేజిస్ట్రేట్ పిటిషన్",
      digitalCardTitle: "అనుమానాస్పద కాల్‌లు, సందేశాలు లేదా నకిలీ పత్రాలు",
      digitalCardSubtitle: "నకిలీ చట్ట అమలు కాల్‌లు, బ్లాక్‌మెయిల్ లేదా డిజిటల్ అరెస్ట్ బెదిరింపులు",
      digitalCardDesc: "కాలర్ వివరాలు మరియు సందేశాలను సేవ్ చేయండి. మేము మీకు సురక్షితమైన రిపోర్టింగ్ దశలను నిర్దేశిస్తాము.",
      digitalTag1: "పత్రాల తనిఖీ",
      digitalTag2: "ఫిర్యాదు ముసాయిదా",
      digitalTag3: "SIM బ్లాక్ మార్గదర్శకత్వం"
    },
    navigation: {
      financialStep1: "1. ఏం జరిగిందో మాకు చెప్పండి",
      financialStep2: "2. వివరాలను తనిఖీ చేయండి",
      financialStep3: "3. ఇప్పుడే సహాయం పొందండి",
      digitalArrestStep1: "1. ఏం జరిగిందో మాకు చెప్పండి",
      digitalArrestStep2: "2. నివేదికను సమీక్షించండి",
      digitalArrestStep3: "3. చర్య తీసుకోండి"
    },
    factCheck: {
      title: "చట్టపరమైన వాస్తవ తనిఖీ: మీ హక్కులను తెలుసుకోండి",
      subtitle: "నిజమైన భారతీయ క్రిమినల్ ప్రొసీజర్ (BNSS) vs నకిలీ పోలీస్ బెదిరింపులు",
      myth1Title: "Myth: 'You are under digital arrest on video call'",
      myth1Reality: "Reality: Indian Law has NO concept of 'Digital Arrest'. Police never conduct interrogations via Skype or WhatsApp.",
      myth2Title: "Myth: 'Transfer money to RBI verification account'",
      myth2Reality: "Reality: RBI or Police NEVER demand money transfer for verification. Any demand is 100% extortion.",
      myth3Title: "Myth: 'Immediate arrest warrant issued from Supreme Court'",
      myth3Reality: "Reality: Arrest warrants require formal court summons delivered in person by local police."
    },
    intake: {
      financialTitle: "మీ లావాదేవీ వివరాలను భద్రపరుద్దాం",
      financialSubtitle: "బ్యాంక్ డెబిట్ SMS లేదా UPI రసీదు స్క్రీన్‌షాట్‌ను అప్‌లోడ్ చేయండి.",
      dropzoneTitle: "చెల్లింపు రసీదు / డెబిట్ SMS అప్‌లోడ్ చేయండి",
      dropzoneSubtitle: "PhonePe, GPay, Paytm లేదా NetBanking స్క్రీన్‌షాట్‌లు.",
      uploadScreenshot: "స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి",
      pasteSmsTitle: "లేదా SMS వచనాన్ని ఇక్కడ పేస్ట్ చేయండి",
      pasteSmsPlaceholder: "డెబిట్ సందేశాన్ని పేస్ట్ చేయండి e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
      utrLabel: "12-అంకెల UTR / RRN",
      amountLabel: "మోసపోయిన మొత్తం",
      serverVerified: "సర్వర్ ధృవీకరించబడింది (Sec 63 BSA)"
    },
    digitalArrest: {
      heroTitle: "నకిలీ డిజిటల్ అరెస్ట్ & పోలీస్ వేధింపుల నిరోధం",
      heroSubtitle: "నకిలీ CBI, సైబర్ క్రైమ్, కస్టమ్స్ ఫెడెక్స్ పార్సెల్ మరియు వీడియో కాల్ బెదిరింపులకు వ్యతిరేకంగా తక్షణ ఉపశమనం.",
      impersonatedAgencyLabel: "నకిలీ అధికారి / సంస్థ",
      callerIdLabel: "కాలర్ ఐడి / వాట్సాప్ / స్కైప్",
      extortionDemandLabel: "డిమాండ్ చేసిన మొత్తం (₹)",
      disconnectAdviceTitle: "తక్షణ చర్య: కాల్‌ను వెంటనే కట్ చేయండి",
      disconnectAdviceDesc: "మీరు పూర్తిగా సురక్షితంగా ఉన్నారు. నిజమైన పోలీసులు వీడియో కాల్‌లో డబ్బులు అడగరు."
    },
    actions: {
      heroTitle: "ఇప్పుడే చర్య తీసుకోండి — డైరెక్ట్ లింకులు",
      heroSubtitle: "మాన్యువల్ కాపీ-పేస్ట్ లేకుండా ఒకే ట్యాప్‌లో అన్ని అత్యవసర చర్యలను ప్రారంభించండి.",
      step1HelplineTitle: "1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి",
      step1HelplineDesc: "నేషనల్ సైబర్‌క్రైమ్ సిటిజన్ హెల్ప్‌లైన్‌కు డైరెక్ట్ డయల్.",
      step1HelplineBtn: "ఇప్పుడే 1930 డయల్ చేయండి",
      step2BankTitle: "బ్యాంక్ ఫ్రాడ్ డెస్క్‌కి ఇమెయిల్ చేయండి (సెక్షన్ 91 BNSS)",
      step2BankDesc: "ఖాతా ఫ్రీజ్ నోటీసును నేరుగా బ్యాంకులకు పంపండి.",
      step2BankBtn: "బ్యాంక్‌కు ఇమెయిల్ చేయండి",
      step3NcrpTitle: "NCRP ఫిర్యాదును దాఖలు చేయండి (cybercrime.gov.in)",
      step3NcrpDesc: "చట్టపరమైన ప్రకటనను 1-ట్యాప్‌లో కాపీ చేసి అధికారిక పోర్టల్‌ను తెరవండి.",
      step3NcrpCopyBtn: "1. ప్రకటనను కాపీ చేయండి",
      step3NcrpPortalBtn: "2. cybercrime.gov.in తెరవండి",
      step4ShareTitle: "వాట్సాప్ ద్వారా పత్రాల భాగస్వామ్యం"
    }
  },
  kn: {
    common: {
      appName: "CyberRakshak 1930",
      tagline: "ಮಾರ್ಗದರ್ಶಿ ಸೈಬರ್-ವಂಚನೆ ಸಹಾಯಕ ಮತ್ತು ಶಾಸನಬದ್ಧ ಕ್ರಿಯೆಯ ವ್ಯವಸ್ಥೆ",
      subtitle: "ವಂಚನೆ ಎಸ್‌ಎಮ್‌ಎಸ್ ಅಥವಾ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು 60 ಸೆಕೆಂಡುಗಳಲ್ಲಿ 1-ಟ್ಯಾಪ್ ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್ ನೋಟಿಸ್ ಮತ್ತು ಪೊಲೀಸ್ ಎಫ್‌ಐಆರ್ ಆಗಿ ಪರಿವರ್ತಿಸಿ.",
      goldenHourBadge: "ಗೋಲ್ಡನ್ 2-ಗಂಟೆಗಳ ಚೇತರಿಕೆ ಸಮಯ ಸಕ್ರಿಯವಾಗಿದೆ",
      call1930: "1930 ಕರೆ ಮಾಡಿ",
      myCases: "ನನ್ನ ಪ್ರಕರಣಗಳು",
      signIn: "ಸೈನ್ ಇನ್",
      signOut: "ಸೈನ್ ಔಟ್",
      back: "ಹಿಂದೆ",
      continue: "ಮುಂದುವರಿಯಿರಿ",
      cancel: "ರದ್ದುಮಾಡಿ",
      close: "ಮುಚ್ಚಿ",
      copied: "ಕಾಪಿಯಾಗಿದೆ!",
      copy: "ಕಾಪಿ ಮಾಡಿ",
      shareWhatsApp: "ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಹಂಚಿಕೊಳ್ಳಿ",
      downloadPdf: "ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್",
      verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      recordLiveCallout: "ಈಗ ವಂಚನೆಯ ಕರೆಯಲ್ಲಿರುವಿರಾ? ಲೈವ್ ರೆಕಾರ್ಡ್ ಮಾಡಿ",
      recordLiveBtn: "ಲೈವ್ ರೆಕಾರ್ಡ್",
      flowSelectTitle: "ಏನಾಯಿತು ಎಂದು ನಮಗೆ ತಿಳಿಸಿ",
      flowSelectSubtitle: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಗೆ ಹೆಚ್ಚು ಸೂಕ್ತವಾದ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
      selected: "ಆಯ್ಕೆಯಾಗಿದೆ",
      financialCardTitle: "ನನ್ನ ಅನುಮತಿ ಇಲ್ಲದೆ ಹಣ ಕಳಿಸಲಾಯಿತು ಅಥವಾ ಕಡಿತವಾಯಿತು",
      financialCardSubtitle: "UPI, ಕಾರ್ಡ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ ವಂಚನೆ",
      financialCardDesc: "ನೀವು ಹೊಂದಿರುವ ಪಾವತಿ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ, ನಂತರ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಮತ್ತು ಸೈಬರ್ ಕ್ರೈಮ್ ಹೆಲ್ಪ್‌ಲೈನ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      financialTag1: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಸಹಾಯಕ",
      financialTag2: "ಬ್ಯಾಂಕ್ Lien ವಿನಂತಿ",
      financialTag3: "ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಅರ್ಜಿ",
      digitalCardTitle: "ಅನುಮಾನಾಸ್ಪದ ಕರೆಗಳು, ಸಂದೇಶಗಳು ಅಥವಾ ನಕಲಿ ದಾಖಲೆಗಳು",
      digitalCardSubtitle: "ನಕಲಿ ಕಾನೂನು ಜಾರಿ ಕರೆಗಳು, ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಅಥವಾ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಬೆದರಿಕೆಗಳು",
      digitalCardDesc: "ಕರೆ ಮಾಡಿದವರ ವಿವರಗಳು ಮತ್ತು ಸಂದೇಶಗಳನ್ನು ಉಳಿಸಿ. ಸುರಕ್ಷಿತ ದೂರು ಸಲ್ಲಿಕೆ ಹಂತಗಳ ಮೂಲಕ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇವೆ.",
      digitalTag1: "ದಾಖಲೆ ಪರಿಶೀಲನೆ",
      digitalTag2: "ದೂರು ಕರಡು",
      digitalTag3: "SIM ಬ್ಲಾಕ್ ಮಾರ್ಗದರ್ಶನ"
    },
    navigation: {
      financialStep1: "1. ಏನಾಯಿತು ಎಂದು ನಮಗೆ ತಿಳಿಸಿ",
      financialStep2: "2. ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
      financialStep3: "3. ಈಗಲೇ ಸಹಾಯ ಪಡೆಯಿರಿ",
      digitalArrestStep1: "1. ಏನಾಯಿತು ಎಂದು ನಮಗೆ ತಿಳಿಸಿ",
      digitalArrestStep2: "2. ಪುರಾವೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
      digitalArrestStep3: "3. ಕ್ರಮ ಕೈಗೊಳ್ಳಿ"
    },
    factCheck: {
      title: "ಕಾನೂನು ಸತ್ಯ ಪರಿಶೀಲನೆ: ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ",
      subtitle: "ನಿಜವಾದ ಭಾರತೀಯ ಕ್ರಿಮಿನಲ್ ಪ್ರಕ್ರಿಯೆ (BNSS) vs ನಕಲಿ ಪೊಲೀಸ್ ಬೆದರಿಕೆಗಳು",
      myth1Title: "Myth: 'You are under digital arrest on video call'",
      myth1Reality: "Reality: Indian Law has NO concept of 'Digital Arrest'. Police never conduct interrogations via Skype or WhatsApp.",
      myth2Title: "Myth: 'Transfer money to RBI verification account'",
      myth2Reality: "Reality: RBI or Police NEVER demand money transfer for verification. Any demand is 100% extortion.",
      myth3Title: "Myth: 'Immediate arrest warrant issued from Supreme Court'",
      myth3Reality: "Reality: Arrest warrants require formal court summons delivered in person by local police."
    },
    intake: {
      financialTitle: "ನಿಮ್ಮ ವಹಿವಾಟಿನ ವಿವರಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸೋಣ",
      financialSubtitle: "ಬ್ಯಾಂಕ್ ಡೆಬಿಟ್ SMS ಅಥವಾ UPI ರಶೀದಿಯ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      dropzoneTitle: "ಪಾವತಿ ರಶೀದಿ / ಡೆಬಿಟ್ SMS ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      dropzoneSubtitle: "PhonePe, GPay, Paytm ಅಥವಾ NetBanking ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು.",
      uploadScreenshot: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      pasteSmsTitle: "ಅಥವಾ SMS ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ",
      pasteSmsPlaceholder: "ಡೆಬಿಟ್ ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
      utrLabel: "12-ಅಂಕಿಯ UTR / RRN",
      amountLabel: "ವಂಚನೆಯ ಮೊತ್ತ",
      serverVerified: "ಸರ್ವರ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ (Sec 63 BSA)"
    },
    digitalArrest: {
      heroTitle: "ನಕಲಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಮತ್ತು ಪೊಲೀಸ್ ವಂಚನೆ ತಡೆ",
      heroSubtitle: "ನಕಲಿ CBI, ಸೈಬರ್ ಪೊಲೀಸ್, ಕಸ್ಟಮ್ಸ್ ಫೆಡೆಕ್ಸ್ ಪಾರ್ಸೆಲ್ ವಿಡಿಯೋ ಕಾಲ್ ಬೆದರಿಕೆಗಳ ವಿರುದ್ಧ ತಕ್ಷಣದ ರಕ್ಷಣೆ.",
      impersonatedAgencyLabel: "ನಕಲಿ ಅಧಿಕಾರಿ / ಸಂಸ್ಥೆ",
      callerIdLabel: "ಕಾಲರ್ ಐಡಿ / ವಾಟ್ಸಾಪ್ / ಸ್ಕೈಪ್",
      extortionDemandLabel: "ಬೇಡಿಕೆಯಿಟ್ಟ ಮೊತ್ತ (₹)",
      disconnectAdviceTitle: "ತಕ್ಷಣದ ಕ್ರಮ: ಕರೆಯನ್ನು ಕಡಿತಗೊಳಿಸಿ",
      disconnectAdviceDesc: "ನೀವು ಸಂಪೂರ್ಣವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಿ. ನಿಜವಾದ ಪೊಲೀಸರು ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ಹಣವನ್ನು ಕೇಳುವುದಿಲ್ಲ."
    },
    actions: {
      heroTitle: "ಈಗಲೇ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ — ನೇರ ಲಿಂಕ್‌ಗಳು",
      heroSubtitle: "ಯಾವುದೇ ವಿಳಂಬವಿಲ್ಲದೆ ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ತುರ್ತು ಕ್ರಮಗಳನ್ನು ಪ್ರಾರಂಭಿಸಿ.",
      step1HelplineTitle: "1930 ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ಕರೆ ಮಾಡಿ",
      step1HelplineDesc: "ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ನಾಗರಿಕ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ನೇರ ಕರೆ.",
      step1HelplineBtn: "ಈಗಲೇ 1930 ಡಯಲ್ ಮಾಡಿ",
      step2BankTitle: "ಬ್ಯಾಂಕ್ ವಂಚನೆ ಡೆಸ್ಕ್‌ಗೆ ಇಮೇಲ್ ಮಾಡಿ (ವಿಭಾಗ 91 BNSS)",
      step2BankDesc: "ಖಾತೆ ಫ್ರೀಜ್ ನೋಟಿಸ್ ಅನ್ನು ನೇರವಾಗಿ ಬ್ಯಾಂಕ್‌ಗಳಿಗೆ ಕಳುಹಿಸಿ.",
      step2BankBtn: "ಬ್ಯಾಂಕ್‌ಗೆ ಇಮೇಲ್ ಮಾಡಿ",
      step3NcrpTitle: "NCRP ದೂರು ದಾಖಲಿಸಿ (cybercrime.gov.in)",
      step3NcrpDesc: "ಕಾನೂನು ಹೇಳಿಕೆಯನ್ನು 1-ಟ್ಯಾಪ್‌ನಲ್ಲಿ ನಕಲಿಸಿ ಮತ್ತು ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ.",
      step3NcrpCopyBtn: "1. ಹೇಳಿಕೆಯನ್ನು ನಕಲಿಸಿ",
      step3NcrpPortalBtn: "2. cybercrime.gov.in ತೆರೆಯಿರಿ",
      step4ShareTitle: "ವಾಟ್ಸಾಪ್ ಮತ್ತು ದಾಖಲೆ ಹಂಚಿಕೆ"
    }
  },
  bn: {
    common: {
      appName: "CyberRakshak 1930",
      tagline: "নির্দেশিত সাইবার-প্রতারণা সহায়ক ও আইনি পদক্ষেপ ব্যবস্থা",
      subtitle: "প্রতারণামূলক এসএমএস বা স্ক্রিনশট থেকে ৬০ সেকেন্ডে তৈরি করুন ব্যাংক ফ্রিজ নোটিশ ও পুলিশ এফআইআর।",
      goldenHourBadge: "সোনালী ২-ঘন্টার পুনরুদ্ধার সময় সক্রিয়",
      call1930: "১৯৩০ কল করুন",
      myCases: "আমার কেস",
      signIn: "সাইন ইন",
      signOut: "সাইন আউট",
      back: "ফিরে যান",
      continue: "এগিয়ে যান",
      cancel: "বাতিল",
      close: "বন্ধ করুন",
      copied: "কপি হয়েছে!",
      copy: "কপি করুন",
      shareWhatsApp: "হোয়াটসঅ্যাপে শেয়ার করুন",
      downloadPdf: "পিডিএফ ডাউনলোড",
      verified: "যাচাইকৃত",
      recordLiveCallout: "এখনই প্রতারণামূলক কলে আছেন? লাইভ রেকর্ড করুন",
      recordLiveBtn: "লাইভ রেকর্ড",
      flowSelectTitle: "কী হয়েছে তা আমাদের বলুন",
      flowSelectSubtitle: "আপনার পরিস্থিতির সাথে সবচেয়ে ভালো মেলে এমন বিকল্পটি বেছে নিন।",
      selected: "নির্বাচিত",
      financialCardTitle: "আমার অনুমতি ছাড়াই টাকা পাঠানো বা কাটা হয়েছে",
      financialCardSubtitle: "UPI, কার্ড বা ব্যাংক ট্রান্সফার প্রতারণা",
      financialCardDesc: "আপনার কাছে থাকা পেমেন্টের বিবরণ যোগ করুন, তারপর আপনার ব্যাংক ও সাইবার ক্রাইম হেল্পলাইনে যোগাযোগ করুন।",
      financialTag1: "স্ক্রিনশট সহায়ক",
      financialTag2: "ব্যাংক Lien অনুরোধ",
      financialTag3: "ম্যাজিস্ট্রেট পিটিশন",
      digitalCardTitle: "সন্দেহজনক কল, বার্তা বা ভুয়া নথি",
      digitalCardSubtitle: "ভুয়া আইন প্রয়োগকারী কল, ব্ল্যাকমেইল বা ডিজিটাল গ্রেপ্তারের হুমকি",
      digitalCardDesc: "কলারের বিবরণ ও বার্তাগুলো সংরক্ষণ করুন। আমরা সবচেয়ে নিরাপদ রিপোর্টিং পদক্ষেপগুলোতে আপনাকে গাইড করব।",
      digitalTag1: "নথি পরীক্ষা",
      digitalTag2: "অভিযোগ খসড়া",
      digitalTag3: "SIM ব্লক নির্দেশিকা"
    },
    navigation: {
      financialStep1: "১. কি ঘটেছে আমাদের বলুন",
      financialStep2: "২. বিবরণ পরীক্ষা করুন",
      financialStep3: "৩. এখনই সাহায্য পান",
      digitalArrestStep1: "১. কি ঘটেছে আমাদের বলুন",
      digitalArrestStep2: "২. প্রমাণাদি পর্যালোচনা করুন",
      digitalArrestStep3: "৩. পদক্ষেপ নিন"
    },
    factCheck: {
      title: "আইনি সত্যতা যাচাই: আপনার অধিকার জানুন",
      subtitle: "আসল ভারতীয় ফৌজদারি প্রক্রিয়া (BNSS) বনাম ভুয়া পুলিশ হুমকি",
      myth1Title: "Myth: 'You are under digital arrest on video call'",
      myth1Reality: "Reality: Indian Law has NO concept of 'Digital Arrest'. Police never conduct interrogations via Skype or WhatsApp.",
      myth2Title: "Myth: 'Transfer money to RBI verification account'",
      myth2Reality: "Reality: RBI or Police NEVER demand money transfer for verification. Any demand is 100% extortion.",
      myth3Title: "Myth: 'Immediate arrest warrant issued from Supreme Court'",
      myth3Reality: "Reality: Arrest warrants require formal court summons delivered in person by local police."
    },
    intake: {
      financialTitle: "আসুন আপনার লেনদেনের বিবরণ সুরক্ষিত করি",
      financialSubtitle: "ব্যাংক ডেবিট এসএমএস বা ইউপিআই রসিদের স্ক্রিনশট আপলোড করুন।",
      dropzoneTitle: "পেমেন্ট রসিদ / ডেবিট এসএমএস আপলোড করুন",
      dropzoneSubtitle: "PhonePe, GPay, Paytm বা NetBanking স্ক্রিনশট।",
      uploadScreenshot: "স্ক্রিনশট আপলোড করুন",
      pasteSmsTitle: "অথবা এসএমএস টেক্সট পেস্ট করুন",
      pasteSmsPlaceholder: "ডেবিট বার্তা পেস্ট করুন e.g. 'Debited Rs 85,500.00 via UPI Ref 312345678901...'",
      utrLabel: "১২-সংখ্যার UTR / RRN",
      amountLabel: "প্রতারণার পরিমাণ",
      serverVerified: "সার্ভার যাচাইকৃত (Sec 63 BSA)"
    },
    digitalArrest: {
      heroTitle: "ভুয়া ডিজিটাল গ্রেফতার ও পুলিশ ছদ্মবেশ প্রতিরোধ",
      heroSubtitle: "ভুয়া সিবিআই, সাইবার সেল, কাস্টমস ফেডেক্স পার্সেল ভিডিও কল হুমকির বিরুদ্ধে তাৎক্ষণিক আইনি সুরক্ষা।",
      impersonatedAgencyLabel: "ছদ্মবেশী সংস্থা / কর্মকর্তা",
      callerIdLabel: "কলার আইডি / হোয়াটসঅ্যাপ / স্কাইপ",
      extortionDemandLabel: "দাবিকৃত অর্থের পরিমাণ (₹)",
      disconnectAdviceTitle: "তাৎক্ষণিক পদক্ষেপ: কলটি সাথে সাথে কেটে দিন",
      disconnectAdviceDesc: "আপনি সম্পূর্ণ নিরাপদ। আসল পুলিশ কখনও ভিডিও কলে অর্থ দাবি করে না।"
    },
    actions: {
      heroTitle: "এখনই পদক্ষেপ নিন — সরাসরি লিংক",
      heroSubtitle: "কোনো বিলম্ব ছাড়াই এক ক্লিকে সমস্ত জরুরি আইনি পদক্ষেপ শুরু করুন।",
      step1HelplineTitle: "১৯৩০ হেল্পলাইনে কল করুন",
      step1HelplineDesc: "জাতীয় সাইবার ক্রাইম সিটিজেন হেল্পলাইনে সরাসরি ডায়াল করুন।",
      step1HelplineBtn: "এখনই ১৯৩০ ডায়াল করুন",
      step2BankTitle: "ব্যাংক ফ্রড ডেস্কে ইমেইল করুন (ধারা ৯১ BNSS)",
      step2BankDesc: "অ্যাকাউন্ট ফ্রিজ নোটিশ সরাসরি ব্যাংক নোডাল কর্মকর্তাদের পাঠান।",
      step2BankBtn: "ব্যাংককে ইমেইল করুন",
      step3NcrpTitle: "NCRP অভিযোগ দায়ের করুন (cybercrime.gov.in)",
      step3NcrpDesc: "আইনি বিবরণ কপি করুন এবং অফিসিয়াল সরকারি পোর্টাল খুলুন।",
      step3NcrpCopyBtn: "১. বিবরণ কপি করুন",
      step3NcrpPortalBtn: "২. cybercrime.gov.in খুলুন",
      step4ShareTitle: "হোয়াটসঅ্যাপ ও নথি শেয়ার"
    }
  }
};

export function getDictionary(lang: Language): TranslationDictionary {
  return I18N_RESOURCES[lang] || I18N_RESOURCES.en;
}
