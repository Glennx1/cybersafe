"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { IncidentProfile, ForensicAuditReport, Language } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";

interface EmergencyVoiceGuideProps {
  profile: IncidentProfile;
  auditReport: ForensicAuditReport;
  language: Language;
  currentStep: number;
}

export const EmergencyVoiceGuide: React.FC<EmergencyVoiceGuideProps> = ({
  profile,
  auditReport,
  language,
  currentStep,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const dict = getDictionary(language);

  const handleVoiceSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let text = "";
    if (language === "hi") {
      text = `साइबर रक्षक 1930 सहायता। आपका 12-अंकों का यूटीआर नंबर ${profile.utrNumber || ""} दर्ज किया गया है। चोरी हुई राशि ₹${profile.fraudAmount} के लिए आपातकालीन बैंक फ्रीज नोटिस तैयार है।`;
    } else if (language === "kn") {
      text = `ಸೈಬರ್ ರಕ್ಷಕ್ 1930 ಸಹಾಯ. ನಿಮ್ಮ 12-ಅಂಕಿಗಳ ಯುಟಿಆರ್ ಸಂಖ್ಯೆ ${profile.utrNumber || ""} ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ₹${profile.fraudAmount} ಮೊತ್ತಕ್ಕಾಗಿ ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್ ನೋಟಿಸ್ ಸಿದ್ಧವಾಗಿದೆ.`;
    } else if (language === "ta") {
      text = `சைபர் ரக்ஷக் 1930 உதவி. உங்களின் 12-இலக்க UTR எண் ${profile.utrNumber || ""} சரிபார்க்கப்பட்டது. ₹${profile.fraudAmount} தொகைக்கு வங்கி முடக்க அறிவிப்பு தயார்.`;
    } else if (language === "te") {
      text = `సైబర్ రక్షక్ 1930 సహాయం. మీ 12-అంకెల UTR సంఖ్య ${profile.utrNumber || ""} నిర్ధారించబడింది. ₹${profile.fraudAmount} కోసం బ్యాంక్ ఫ్రీజ్ నోటీస్ సిద్ధంగా ఉంది.`;
    } else if (language === "bn") {
      text = `সাইবার রক্ষক 1930 সহায়তা। আপনার 12-সংখ্যার ইউটিআর নম্বর ${profile.utrNumber || ""} যাচাই করা হয়েছে। ₹${profile.fraudAmount} টাকার জন্য জরুরি ব্যাঙ্ক ফ্রিজ নোটিশ প্রস্তুত।`;
    } else {
      text = `CyberRakshak 1930 Emergency Assistance. Your 12-digit UTR ${profile.utrNumber || ""} is verified. Your Golden 2-Hour Recovery Window is active for Rs. ${profile.fraudAmount.toLocaleString("en-IN")}. Standard Bank Freeze Notice & Cyber Police FIR ready for download.`;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={handleVoiceSpeak}
        className={`h-11 px-4 rounded-full shadow-lg border flex items-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-xs ${
          isSpeaking
            ? "bg-brand-navy text-white border-brand-primary ring-2 ring-brand-primary/40"
            : "bg-brand-navy hover:bg-indigo-950 text-white border-indigo-900/60"
        }`}
        title="Listen to Vernacular Audio Guidance"
        aria-label="Listen to Audio Guidance"
      >
        <div className="flex items-center gap-1" aria-hidden="true">
          <span className={`w-1 h-3 rounded-full bg-indigo-300 ${isSpeaking ? "animate-bounce" : "opacity-60"}`} />
          <span className={`w-1 h-4 rounded-full bg-indigo-200 ${isSpeaking ? "animate-bounce delay-75" : "opacity-60"}`} />
          <span className={`w-1 h-2.5 rounded-full bg-indigo-300 ${isSpeaking ? "animate-bounce delay-150" : "opacity-60"}`} />
        </div>

        <Volume2 className="w-4 h-4 text-indigo-200" aria-hidden="true" />
        <span className="text-xs font-bold font-sans hidden sm:inline">
          {isSpeaking ? dict.common.speaking : dict.common.voiceGuideBtn}
        </span>
      </button>
    </div>
  );
};
