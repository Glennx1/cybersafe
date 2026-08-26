"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Language } from "@/lib/types";
import { BCP47_LANG_MAP, isSpeechRecognitionSupported } from "@/lib/speechService";

interface VoiceInputButtonProps {
  language: Language;
  onTranscript: (transcript: string) => void;
  className?: string;
  buttonTitle?: string;
  fieldLabel?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  language,
  onTranscript,
  className = "",
  buttonTitle = "Speak input using voice",
  fieldLabel = "field"
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Feature detect SpeechRecognition support and hide the mic icon entirely on unsupported browsers
  if (!isSupported) {
    return null;
  }

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognitionConstructor =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognitionConstructor) {
        return;
      }

      const recognition = new SpeechRecognitionConstructor();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = BCP47_LANG_MAP[language] || "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const text = event.results[0][0].transcript;
          if (text) {
            onTranscript(text.trim());
          }
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("Speech recognition initialization failed:", err);
      setIsListening(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleListening}
        aria-pressed={isListening}
        aria-label={`${buttonTitle} for ${fieldLabel}`}
        title={isListening ? "Listening... Speak now" : buttonTitle}
        className={`p-2 rounded-xl transition-all flex items-center justify-center relative active:scale-95 ${
          isListening
            ? "bg-rose-600 text-white ring-4 ring-rose-500/30 animate-pulse shadow-md"
            : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-indigo-600 border border-slate-200/80"
        } ${className}`}
      >
        {isListening ? (
          <Mic className="w-3.5 h-3.5 fill-current animate-bounce" aria-hidden="true" />
        ) : (
          <Mic className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </button>

      {/* Listening Indicator Tooltip */}
      {isListening && (
        <span
          role="status"
          aria-live="polite"
          className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-md shadow-md whitespace-nowrap animate-in fade-in"
        >
          Listening...
        </span>
      )}
    </div>
  );
};
