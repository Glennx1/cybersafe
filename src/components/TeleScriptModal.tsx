"use client";

import React, { useEffect, useState } from "react";
import { X, PhoneCall, Mic, MicOff } from "lucide-react";
import { IncidentProfile } from "@/lib/types";

interface TeleScriptModalProps {
  isOpen: boolean;
  profile: IncidentProfile;
  onClose: () => void;
}

export const TeleScriptModal: React.FC<TeleScriptModalProps> = ({
  isOpen,
  profile,
  onClose,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = (e: any) => console.warn(e);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      let finalStr = "";
      let interimStr = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalStr += event.results[i][0].transcript;
        } else {
          interimStr += event.results[i][0].transcript;
        }
      }
      setSpokenText(prev => prev + " " + finalStr + interimStr);
    };

    try {
      recognition.start();
    } catch (e) {}

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper function to highlight spoken words
  const renderHighlightedScript = (text: string) => {
    // Very simple matcher: check if numbers or key words have been spoken recently
    const spokenLower = spokenText.toLowerCase();
    
    // Break script into words for word-by-word checking
    const words = text.split(" ");
    return words.map((word, i) => {
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const isSpoken = cleanWord.length > 2 && spokenLower.includes(cleanWord);
      return (
        <span key={i} className={isSpoken ? "text-green-400 font-bold transition-colors" : "text-slate-200 transition-colors"}>
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 text-white border border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Live 1930 Speech Teleprompter
              </h3>
              <div className="flex items-center gap-2">
                {isListening ? (
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Listening to your voice...
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <MicOff className="w-3 h-3" />
                    Mic Off
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 text-xl sm:text-2xl font-medium leading-relaxed font-mono">
          <p>{renderHighlightedScript("Hello operator, I am calling to report an urgent cyber fraud.")}</p>
          <p>{renderHighlightedScript(`My 12 digit UTR is: ${profile.utrNumber}`)}</p>
          <p>{renderHighlightedScript(`Fraud Amount: Rs. ${profile.fraudAmount.toLocaleString("en-IN")}`)}</p>
          <p>{renderHighlightedScript(`My Bank is: ${profile.victimBank}`)}</p>
          <p>{renderHighlightedScript(`Suspect Node: ${profile.suspectVpa || profile.suspectAccountNo || 'Unknown'}`)}</p>
          <p>{renderHighlightedScript("Please issue immediate inter-bank Lien Freeze notice under I4C.")}</p>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Words turn green as you read them aloud.</span>
          <span>Do not panic. You are in control.</span>
        </div>
      </div>
    </div>
  );
};
