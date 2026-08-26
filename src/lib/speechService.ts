import { IncidentProfile, Language } from "@/lib/types";

export const BCP47_LANG_MAP: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
  bn: "bn-IN"
};

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(
  text: string,
  lang: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void,
  rate: number = 0.95
): void {
  if (!isSpeechSynthesisSupported()) {
    onError?.();
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.lang = BCP47_LANG_MAP[lang] || "en-IN";

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onError?.();

  window.speechSynthesis.speak(utterance);
}

/**
 * Reads extracted OCR / incident details sequentially aloud in the user's selected language.
 */
export function readExtractedDetailsAloud(
  profile: IncidentProfile,
  isDigitalArrest: boolean,
  lang: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): void {
  if (!isSpeechSynthesisSupported()) {
    onError?.();
    return;
  }

  let text = "";

  if (isDigitalArrest) {
    const agency = profile.impersonatedAgency || "Police / Central Agency";
    const caller = profile.scammerCallerId ? profile.scammerCallerId.split("").join(" ") : "Unknown";
    const demand = (profile.extortionDemandAmount || 250000).toLocaleString("en-IN");

    if (lang === "hi") {
      text = `निकाले गए खतरे का विवरण। नकली संस्था: ${agency}। संदिग्ध कॉलर आईडी: ${caller}। जबरन वसूली मांग राशि: ₹${demand}। कृपया आगे बढ़ने से पहले इन विवरणों की पुष्टि करें।`;
    } else if (lang === "ta") {
      text = `பிரித்தெடுக்கப்பட்ட அச்சுறுத்தல் விவரங்கள். போலி நிறுவனம்: ${agency}. சந்தேகத்திற்குரிய அழைப்பாளர் எண்: ${caller}. மிரட்டி கேட்கப்பட்ட தொகை: ₹${demand}. தொடர்வதற்கு முன் சரிபார்க்கவும்.`;
    } else if (lang === "te") {
      text = `వెలికితీసిన బెదిరింపు వివరాలు. నకిలీ సంస్థ: ${agency}. అనుమానాస్పద కాలర్ సంఖ్య: ${caller}. డిమాండ్ చేసిన మొత్తం: ₹${demand}. దయచేసి వివరాలను ధృవీకరించండి.`;
    } else if (lang === "kn") {
      text = `ಹೊರತೆಗೆಯಲಾದ ಬೆದರಿಕೆ ವಿವರಗಳು. ನಕಲಿ ಸಂಸ್ಥೆ: ${agency}. ಶಂಕಿತ ಕಾಲರ್ ಐಡಿ: ${caller}. ಸುಲಿಗೆ ಬೇಡಿಕೆ ಮೊತ್ತ: ₹${demand}. ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.`;
    } else if (lang === "bn") {
      text = `উদ্ধারকৃত হুমকির বিবরণ। ভুয়া সংস্থা: ${agency}। সন্দেহভাজন কলার আইডি: ${caller}। চাঁদাবাজির দাবিকৃত পরিমাণ: ₹${demand}। এগিয়ে যাওয়ার আগে বিবরণ যাচাই করুন।`;
    } else {
      text = `Extracted threat details from uploaded document. Impersonated agency: ${agency}. Suspect caller ID: ${caller}. Extortion demand amount: Rs. ${demand}. Please verify these details before proceeding.`;
    }
  } else {
    const utr = profile.utrNumber ? profile.utrNumber.split("").join(" ") : "Not detected";
    const amount = (profile.fraudAmount || 0).toLocaleString("en-IN");
    const vpa = profile.suspectVpa || "Not detected";
    const bank = profile.victimBank || "Bank";

    if (lang === "hi") {
      text = `निकाले गए लेनदेन का विवरण। धोखाधड़ी राशि: ₹${amount}। 12-अंकों का बैंकिंग यूटीआर नंबर: ${utr}। डेबिट किया गया बैंक: ${bank}। संदिग्ध यूपीआई आईडी: ${vpa}। कृपया आगे बढ़ने से पहले इन विवरणों की पुष्टि करें।`;
    } else if (lang === "ta") {
      text = `பிரித்தெடுக்கப்பட்ட பரிவர்த்தனை விவரங்கள். மோசடி தொகை: ₹${amount}. 12-இலக்க வங்கி UTR எண்: ${utr}. வங்கிக் கணக்கு: ${bank}. சந்தேகத்திற்குரிய UPI: ${vpa}. தொடர்வதற்கு முன் சரிபார்க்கவும்.`;
    } else if (lang === "te") {
      text = `వెలికితీసిన లావాదేవీ వివరాలు. మోసం మొత్తం: ₹${amount}. 12-అంకెల బ్యాంకింగ్ UTR సంఖ్య: ${utr}. డెబిట్ అయిన బ్యాంక్: ${bank}. అనుమానాస్పద UPI: ${vpa}. దయచేసి వివరాలను ధృవీకరించండి.`;
    } else if (lang === "kn") {
      text = `ಹೊರತೆಗೆಯಲಾದ ವಹಿವಾಟು ವಿವರಗಳು. ವಂಚನೆ ಮೊತ್ತ: ₹${amount}. 12-ಅಂಕಿಗಳ ಬ್ಯಾಂಕಿಂಗ್ ಯುಟಿಆರ್ ಸಂಖ್ಯೆ: ${utr}. ಡೆಬಿಟ್ ಆದ ಬ್ಯಾಂಕ್: ${bank}. ಶಂಕಿತ ಯುಪಿಐ: ${vpa}. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ.`;
    } else if (lang === "bn") {
      text = `উদ্ধারকৃত লেনদেনের বিবরণ। প্রতারণার পরিমাণ: ₹${amount}। ১২-সংখ্যার ব্যাংকিং ইউটিআর: ${utr}। ডেবিটকৃত ব্যাংক: ${bank}। সন্দেহভাজন ইউপিআই: ${vpa}। এগিয়ে যাওয়ার আগে অনুগ্রহ করে যাচাই করুন।`;
    } else {
      text = `Extracted transaction details from evidence. Fraud amount: Rs. ${amount}. Twelve digit banking UTR number: ${utr}. Debited bank: ${bank}. Suspect UPI ID: ${vpa}. Please verify these values before proceeding.`;
    }
  }

  speakText(text, lang, onStart, onEnd, onError, 0.92);
}

/**
 * Reads each myth & reality pair sequentially with pacing and pauses between myth and truth.
 */
export function readLegalFactCheckAloud(
  pairs: Array<{ scammerMyth: string; legalReality: string; statute?: string }>,
  lang: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onPairChange?: (index: number) => void
): () => void {
  if (!isSpeechSynthesisSupported()) {
    onEnd?.();
    return () => {};
  }

  stopSpeaking();
  onStart?.();

  let isCancelled = false;
  let currentIndex = 0;

  const speakNextPair = () => {
    if (isCancelled || currentIndex >= pairs.length) {
      if (!isCancelled) onEnd?.();
      return;
    }

    onPairChange?.(currentIndex);
    const item = pairs[currentIndex];

    let mythIntro = "What the scammer claims:";
    let realityIntro = "The real Indian law:";

    if (lang === "hi") {
      mythIntro = "धोखेबाज का झूठा दावा:";
      realityIntro = "भारतीय कानून की वास्तविक सच्चाई:";
    } else if (lang === "ta") {
      mythIntro = "மோசடி செய்பவரின் கூற்று:";
      realityIntro = "உண்மையான இந்திய சட்டம்:";
    } else if (lang === "te") {
      mythIntro = "మోసగాడి నకిలీ వాదన:";
      realityIntro = "నిజమైన భారతీయ చట్టం:";
    } else if (lang === "kn") {
      mythIntro = "ವಂಚಕನ ಸುಳ್ಳು ಹೇಳಿಕೆ:";
      realityIntro = "ನಿಜವಾದ ಭಾರತೀಯ ಕಾನೂನು:";
    } else if (lang === "bn") {
      mythIntro = "প্রতারকের ভুয়া দাবি:";
      realityIntro = "প্রকৃত ভারতীয় আইন:";
    }

    const mythText = `${mythIntro} ${item.scammerMyth}`;
    const realityText = `${realityIntro} ${item.legalReality}. ${item.statute ? `Section: ${item.statute}` : ""}`;

    const mythUtterance = new SpeechSynthesisUtterance(mythText);
    mythUtterance.rate = 0.92;
    mythUtterance.lang = BCP47_LANG_MAP[lang] || "en-IN";

    const realityUtterance = new SpeechSynthesisUtterance(realityText);
    realityUtterance.rate = 0.90;
    realityUtterance.lang = BCP47_LANG_MAP[lang] || "en-IN";

    mythUtterance.onend = () => {
      if (isCancelled) return;
      // 500ms pause between myth and reality
      setTimeout(() => {
        if (isCancelled) return;
        window.speechSynthesis.speak(realityUtterance);
      }, 500);
    };

    realityUtterance.onend = () => {
      if (isCancelled) return;
      currentIndex++;
      // 800ms pause between pairs
      setTimeout(() => {
        speakNextPair();
      }, 800);
    };

    mythUtterance.onerror = () => {
      if (!isCancelled) onEnd?.();
    };
    realityUtterance.onerror = () => {
      if (!isCancelled) onEnd?.();
    };

    window.speechSynthesis.speak(mythUtterance);
  };

  speakNextPair();

  return () => {
    isCancelled = true;
    stopSpeaking();
  };
}
