"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sliders,
  Globe,
  Type,
  Volume2,
  VolumeX,
  Eye,
  Hand,
  X,
  Check,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { Language } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";

export interface AccessibilitySettings {
  language: Language;
  textScale: "1" | "1.25" | "1.5";
  panicMode: boolean;
  readAloud: boolean;
  audioFirstMode: boolean;
  showSignLanguage: boolean;
}

const STORAGE_KEY = "cyberrakshak_a11y_prefs";

const DEFAULT_SETTINGS: AccessibilitySettings = {
  language: "en",
  textScale: "1",
  panicMode: false,
  readAloud: false,
  audioFirstMode: false,
  showSignLanguage: false
};

interface AccessibilityPanelProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onAudioFirstModeChange?: (enabled: boolean) => void;
  onShowSignLanguageChange?: (enabled: boolean) => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  currentLanguage,
  onLanguageChange,
  onAudioFirstModeChange,
  onShowSignLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isReadingPage, setIsReadingPage] = useState(false);
  const dict = getDictionary(currentLanguage);

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // 1. Initialize from localStorage and navigator language
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        if (parsed.language) {
          onLanguageChange(parsed.language);
        }
        if (typeof parsed.audioFirstMode === "boolean" && onAudioFirstModeChange) {
          onAudioFirstModeChange(parsed.audioFirstMode);
        }
        if (typeof parsed.showSignLanguage === "boolean" && onShowSignLanguageChange) {
          onShowSignLanguageChange(parsed.showSignLanguage);
        }
      } else {
        // Detect browser language default
        const browserLang = navigator.language?.slice(0, 2);
        const supported: Record<string, Language> = {
          hi: "hi",
          kn: "kn",
          ta: "ta",
          te: "te",
          bn: "bn",
          en: "en"
        };
        const detected = supported[browserLang] || "en";
        const initial = { ...DEFAULT_SETTINGS, language: detected };
        setSettings(initial);
        onLanguageChange(detected);
        if (onAudioFirstModeChange) {
          onAudioFirstModeChange(false);
        }
        if (onShowSignLanguageChange) {
          onShowSignLanguageChange(false);
        }
      }
    } catch (e) {
      console.warn("Failed to load a11y preferences from localStorage:", e);
    }
  }, []);

  // 2. Apply text scale and panic mode classes to DOM
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--text-scale", settings.textScale);
      if (settings.panicMode) {
        document.body.classList.add("panic-mode-active");
      } else {
        document.body.classList.remove("panic-mode-active");
      }
    }
  }, [settings.textScale, settings.panicMode]);

  // 3. Save helper
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to persist a11y preferences:", e);
    }

    if (key === "language") {
      onLanguageChange(value as Language);
    }
    if (key === "audioFirstMode" && onAudioFirstModeChange) {
      onAudioFirstModeChange(value as boolean);
    }
    if (key === "showSignLanguage" && onShowSignLanguageChange) {
      onShowSignLanguageChange(value as boolean);
    }
  };

  // 4. Focus Trap & Escape handler
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          triggerButtonRef.current?.focus();
        }

        if (e.key === "Tab" && panelRef.current) {
          const focusables = panelRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusables.length) return;

          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else {
      if (triggerButtonRef.current && document.activeElement !== triggerButtonRef.current) {
        // Returned focus
      }
    }
  }, [isOpen]);

  // 5. Read Page Aloud (TTS Engine)
  const handleReadPageAloud = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }

    if (isReadingPage) {
      window.speechSynthesis.cancel();
      setIsReadingPage(false);
      return;
    }

    const mainEl = document.getElementById("main-content") || document.body;
    // Extract readable text from main landmark
    const readableText = (mainEl.innerText || mainEl.textContent || "")
      .replace(/\s+/g, " ")
      .slice(0, 1500);

    const utterance = new SpeechSynthesisUtterance(readableText);
    utterance.rate = 0.95;
    
    // Set appropriate BCP-47 language tag
    const langMap: Record<Language, string> = {
      en: "en-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
      kn: "kn-IN",
      bn: "bn-IN"
    };
    utterance.lang = langMap[settings.language] || "en-IN";

    utterance.onstart = () => setIsReadingPage(true);
    utterance.onend = () => setIsReadingPage(false);
    utterance.onerror = () => setIsReadingPage(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const languages: Array<{ code: Language; label: string; native: string }> = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "ta", label: "Tamil", native: "தமிழ்" },
    { code: "te", label: "Telugu", native: "తెలుగు" },
    { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
    { code: "bn", label: "Bengali", native: "বাংলা" }
  ];

  return (
    <>
      {/* Floating Trigger Button: Unified with brand-navy pill family */}
      <div className="fixed bottom-20 left-5 z-40">
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="a11y-settings-panel"
          aria-label="Open Accessibility & Language Preferences"
          className="h-11 px-4 rounded-full bg-brand-navy hover:bg-indigo-950 text-white shadow-lg border border-indigo-900/60 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs font-bold font-sans"
        >
          <Sliders className="w-4 h-4 text-indigo-200" aria-hidden="true" />
          <span className="hidden sm:inline">{dict.common.accessibilityBtn}</span>
        </button>
      </div>

      {/* Slide-in / Modal Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-start sm:pl-6 bg-brand-navy/60 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div
            ref={panelRef}
            id="a11y-settings-panel"
            className="bg-surface-card border border-stone-200/80 rounded-3xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="a11y-panel-title" className="text-base font-extrabold text-text-primary">
                    {dict.a11y.panelTitle}
                  </h2>
                  <p className="text-xs text-text-muted">{dict.a11y.panelSubtitle}</p>
                </div>
              </div>

              <button
                ref={firstFocusableRef}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  triggerButtonRef.current?.focus();
                }}
                aria-label="Close accessibility panel"
                className="w-8 h-8 rounded-full bg-surface-section hover:bg-stone-200 text-text-muted hover:text-text-primary flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* 1. Language Preference */}
            <div className="mb-5">
              <label className="text-xs font-bold text-text-primary flex items-center gap-1.5 mb-2.5">
                <Globe className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                <span>{dict.a11y.selectLanguage}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => updateSetting("language", lang.code)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                      settings.language === lang.code
                        ? "bg-indigo-50/80 border-brand-primary text-brand-primary ring-2 ring-brand-primary/20"
                        : "bg-surface-section border-stone-200/60 text-text-primary hover:border-stone-300"
                    }`}
                  >
                    <span>{lang.native}</span>
                    {settings.language === lang.code && (
                      <Check className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Larger Text Scaling */}
            <div className="mb-5">
              <label className="text-xs font-bold text-text-primary flex items-center gap-1.5 mb-2.5">
                <Type className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                <span>{dict.a11y.textSize}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "1", label: dict.a11y.sizeDefault },
                  { value: "1.25", label: dict.a11y.sizeLarge },
                  { value: "1.5", label: dict.a11y.sizeExtraLarge }
                ].map((scale) => (
                  <button
                    key={scale.value}
                    type="button"
                    onClick={() => updateSetting("textScale", scale.value as any)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      settings.textScale === scale.value
                        ? "bg-indigo-50/80 border-brand-primary text-brand-primary ring-2 ring-brand-primary/20"
                        : "bg-surface-section border-stone-200/60 text-text-primary hover:border-stone-300"
                    }`}
                  >
                    {scale.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Simplified / Panic Mode */}
            <div className="mb-5 p-3.5 rounded-2xl bg-surface-section border border-stone-200/60 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  <span className="text-xs font-bold text-text-primary">{dict.a11y.panicModeTitle}</span>
                </div>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {dict.a11y.panicModeDesc}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings.panicMode}
                onClick={() => updateSetting("panicMode", !settings.panicMode)}
                aria-label="Toggle Simplified Panic Mode"
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                  settings.panicMode ? "bg-brand-primary" : "bg-stone-300"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                    settings.panicMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 4. Read Page Aloud (TTS) */}
            <div className="mb-5 p-3.5 rounded-2xl bg-surface-section border border-stone-200/60 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  <span className="text-xs font-bold text-text-primary">{dict.a11y.readPageAloudTitle}</span>
                </div>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {dict.a11y.readPageAloudDesc}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReadPageAloud}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 ${
                  isReadingPage
                    ? "bg-brand-urgent text-white animate-pulse"
                    : "bg-brand-primary hover:bg-indigo-700 text-white shadow-xs"
                }`}
              >
                {isReadingPage ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isReadingPage ? dict.a11y.stopBtn : dict.a11y.readBtn}</span>
              </button>
            </div>

            {/* 5. Audio-First Mode (Auto Read-Back) */}
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-warning" aria-hidden="true" />
                  <span className="text-xs font-bold text-text-primary">{dict.a11y.audioFirstTitle}</span>
                </div>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {dict.a11y.audioFirstDesc}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings.audioFirstMode}
                onClick={() => updateSetting("audioFirstMode", !settings.audioFirstMode)}
                aria-label="Toggle Audio-First Auto Read-Back Mode"
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                  settings.audioFirstMode ? "bg-brand-warning" : "bg-stone-300"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                    settings.audioFirstMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 6. Sign Language Videos (Preview — Coming Soon) */}
            <div className="mb-6 p-3.5 rounded-2xl bg-surface-section border border-stone-200/60 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Hand className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  <span className="text-xs font-bold text-text-primary">
                    {dict.a11y.islTitle}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {dict.a11y.islDesc}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings.showSignLanguage}
                onClick={() => updateSetting("showSignLanguage", !settings.showSignLanguage)}
                aria-label="Toggle Sign language videos preview"
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                  settings.showSignLanguage ? "bg-brand-primary" : "bg-stone-300"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                    settings.showSignLanguage ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                triggerButtonRef.current?.focus();
              }}
              className="w-full py-3 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              Done & Save Preferences
            </button>
          </div>
        </div>
      )}
    </>
  );
};
