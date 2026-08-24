"use client";

import React, { useState, useEffect, useRef } from "react";
import { appendCovertNote, getOrCreateCovertSession, CovertSession } from "@/lib/covertStore";
import { Check, X, ShieldAlert } from "lucide-react";

export const COVERT_UNLOCK_SEQUENCE = "1930";
const LONG_PRESS_DURATION_MS = 2000;

interface DisguisedCalculatorProps {
  onUnlockNormalApp: () => void;
  onClose?: () => void;
}

export const DisguisedCalculator: React.FC<DisguisedCalculatorProps> = ({
  onUnlockNormalApp,
  onClose
}) => {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewOperand, setWaitingForNewOperand] = useState(false);
  const [keystrokeHistory, setKeystrokeHistory] = useState("");

  // Covert mode state
  const [isCovertActive, setIsCovertActive] = useState(false);
  const [showQuickNoteInput, setShowQuickNoteInput] = useState(false);
  const [quickNoteText, setQuickNoteText] = useState("");
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [covertSession, setCovertSession] = useState<CovertSession | null>(null);

  // One-time PWA install / remote-access advisory banner
  const [showPwaAdvisory, setShowPwaAdvisory] = useState(false);

  // Long press timer ref for C button
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamically set title to "Calculator" while overlay is mounted, then revert
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Calculator";
    return () => {
      document.title = originalTitle || "CyberRakshak 1930 • Citizen Cyber Defense Terminal";
    };
  }, []);

  useEffect(() => {
    // Check if one-time advisory was already dismissed
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("cybersafe_pwa_advisory_dismissed");
      if (!dismissed) {
        setShowPwaAdvisory(true);
      }
    }
  }, []);

  const dismissAdvisory = () => {
    setShowPwaAdvisory(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("cybersafe_pwa_advisory_dismissed", "true");
    }
  };

  const handleDigit = (digit: string) => {
    setKeystrokeHistory((prev) => (prev + digit).slice(-10));

    if (waitingForNewOperand) {
      setDisplay(digit);
      setWaitingForNewOperand(false);
    } else {
      setDisplay((prev) => (prev === "0" ? digit : prev + digit));
    }
  };

  const handleDecimal = () => {
    if (waitingForNewOperand) {
      setDisplay("0.");
      setWaitingForNewOperand(false);
    } else if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewOperand(false);
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const current = prevValue || 0;
      let result = current;
      if (operation === "+") result = current + inputValue;
      if (operation === "−" || operation === "-") result = current - inputValue;
      if (operation === "×" || operation === "*") result = current * inputValue;
      if (operation === "÷" || operation === "/") result = inputValue !== 0 ? current / inputValue : 0;

      setPrevValue(result);
      setDisplay(String(result).slice(0, 10));
    }

    setWaitingForNewOperand(true);
    setOperation(nextOp);
  };

  const handleEquals = async () => {
    // 1. Check for Silent Covert Unlock Sequence (e.g. "1930" + "=")
    if (keystrokeHistory.endsWith(COVERT_UNLOCK_SEQUENCE) || display === COVERT_UNLOCK_SEQUENCE) {
      // Silently initialize covert session without loud UI changes
      try {
        const session = await getOrCreateCovertSession();
        setCovertSession(session);
        setIsCovertActive(true);
      } catch (err) {
        console.warn("Covert session local init error:", err);
      }

      // Briefly clear display as if a standard reset occurred
      setDisplay("0");
      setPrevValue(null);
      setOperation(null);
      setWaitingForNewOperand(false);
      setKeystrokeHistory("");
      return;
    }

    // Standard Calculator Equals Logic
    const inputValue = parseFloat(display);
    if (prevValue !== null && operation) {
      const current = prevValue;
      let result = current;
      if (operation === "+") result = current + inputValue;
      if (operation === "−" || operation === "-") result = current - inputValue;
      if (operation === "×" || operation === "*") result = current * inputValue;
      if (operation === "÷" || operation === "/") result = inputValue !== 0 ? current / inputValue : 0;

      setDisplay(String(result).slice(0, 10));
      setPrevValue(null);
      setOperation(null);
      setWaitingForNewOperand(true);
    }
  };

  const handlePlusMinus = () => {
    setDisplay((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
  };

  const handlePercent = () => {
    const val = parseFloat(display);
    setDisplay(String(val / 100).slice(0, 10));
  };

  // Long press on "C" button (2+ seconds) to enter normal app sign-in
  const handleClearTouchStart = () => {
    clearTimerRef.current = setTimeout(() => {
      onUnlockNormalApp();
    }, LONG_PRESS_DURATION_MS);
  };

  const handleClearTouchEnd = () => {
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  };

  const handleSaveQuickNote = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickNoteText.trim()) {
      setShowQuickNoteInput(false);
      return;
    }

    try {
      const updated = await appendCovertNote(quickNoteText.trim());
      setCovertSession(updated);
      setQuickNoteText("");
      setNoteSavedFeedback(true);
      setTimeout(() => {
        setNoteSavedFeedback(false);
        setShowQuickNoteInput(false);
      }, 400);
    } catch (err) {
      console.warn("Failed to record covert note:", err);
      setShowQuickNoteInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between items-center px-4 py-6 font-sans select-none">
      {/* Optional One-Time PWA & Screen-Sharing Security Advisory */}
      {showPwaAdvisory && (
        <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-4 text-xs text-neutral-300 shadow-xl relative animate-in fade-in">
          <button
            onClick={dismissAdvisory}
            className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-300"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-2.5 pr-4">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-[11px] leading-relaxed">
              <p className="font-bold text-neutral-200">
                Setup Note: Add to Home Screen
              </p>
              <p className="text-neutral-400">
                Install this web app to your home screen (Safari/Chrome menu &gt; <em>Add to Home Screen</em>) for fullscreen standalone mode without a browser address bar.
              </p>
              <p className="text-amber-400/90 font-medium">
                <strong>Critical Security Advisory:</strong> If the caller asked you to install any remote-access or screen-sharing app (AnyDesk, TeamViewer, QuickSupport), do not use this phone to seek help — they may see your screen. Use another device or ask someone nearby.
              </p>
              <button
                type="button"
                onClick={dismissAdvisory}
                className="mt-2 text-[11px] font-bold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded-lg border border-neutral-700"
              >
                I Understand / Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Calculator Shell */}
      <div className="w-full max-w-sm flex-1 flex flex-col justify-end pb-4">
        {/* Top Header Strip with Discreet Memory / Covert Trigger */}
        <div className="flex items-center justify-between px-2 mb-2">
          {/* Covert quick note trigger (Memory 'M' button or unobtrusive faint indicator) */}
          <button
            type="button"
            onClick={() => {
              if (isCovertActive) {
                setShowQuickNoteInput(true);
              }
            }}
            className={`text-xs font-mono font-medium px-2 py-1 rounded transition-colors ${
              isCovertActive
                ? "text-neutral-500 hover:text-neutral-300"
                : "text-transparent cursor-default"
            }`}
            title={isCovertActive ? "Quick Log Note" : ""}
          >
            {isCovertActive ? "M+" : ""}
          </button>

          {/* Barely-perceptible covert active indicator dot */}
          <div
            onClick={() => isCovertActive && setShowQuickNoteInput(true)}
            className={`w-2 h-2 rounded-full transition-opacity cursor-pointer ${
              isCovertActive ? "bg-neutral-700 opacity-60 hover:opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Minimal Single-Field Quick Note Overlay (Sub-10s entry) */}
        {showQuickNoteInput && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3 mb-3 animate-in fade-in">
            <form onSubmit={handleSaveQuickNote} className="flex items-center gap-2">
              <input
                type="text"
                autoFocus
                value={quickNoteText}
                onChange={(e) => setQuickNoteText(e.target.value)}
                placeholder="Quick note (e.g. CBI, +9198..., ₹50k)"
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-neutral-600"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1"
              >
                {noteSavedFeedback ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span>Log</span>}
              </button>
              <button
                type="button"
                onClick={() => setShowQuickNoteInput(false)}
                className="p-2 text-neutral-500 hover:text-neutral-300 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Calculator Display Screen */}
        <div className="bg-neutral-950 text-right px-4 py-6 text-5xl sm:text-6xl font-light tracking-tight text-white overflow-x-auto whitespace-nowrap scrollbar-none mb-4 min-h-[90px] flex items-end justify-end">
          {display}
        </div>

        {/* Calculator Keypad Grid */}
        <div className="grid grid-cols-4 gap-3 text-2xl font-medium">
          {/* Row 1 */}
          <button
            type="button"
            onMouseDown={handleClearTouchStart}
            onMouseUp={handleClearTouchEnd}
            onTouchStart={handleClearTouchStart}
            onTouchEnd={handleClearTouchEnd}
            onClick={handleClear}
            className="w-full aspect-square rounded-full bg-neutral-400 hover:bg-neutral-300 text-neutral-950 flex items-center justify-center font-normal active:opacity-75 transition-all text-xl"
            title="Press and hold 2s to open normal sign in"
          >
            C
          </button>
          <button
            type="button"
            onClick={handlePlusMinus}
            className="w-full aspect-square rounded-full bg-neutral-400 hover:bg-neutral-300 text-neutral-950 flex items-center justify-center font-normal active:opacity-75 transition-all"
          >
            ±
          </button>
          <button
            type="button"
            onClick={handlePercent}
            className="w-full aspect-square rounded-full bg-neutral-400 hover:bg-neutral-300 text-neutral-950 flex items-center justify-center font-normal active:opacity-75 transition-all"
          >
            %
          </button>
          <button
            type="button"
            onClick={() => handleOperator("÷")}
            className={`w-full aspect-square rounded-full flex items-center justify-center text-3xl font-normal transition-all active:opacity-75 ${
              operation === "÷" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"
            }`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            type="button"
            onClick={() => handleDigit("7")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => handleDigit("8")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => handleDigit("9")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperator("×")}
            className={`w-full aspect-square rounded-full flex items-center justify-center text-3xl font-normal transition-all active:opacity-75 ${
              operation === "×" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"
            }`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            type="button"
            onClick={() => handleDigit("4")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => handleDigit("5")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => handleDigit("6")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperator("-")}
            className={`w-full aspect-square rounded-full flex items-center justify-center text-3xl font-normal transition-all active:opacity-75 ${
              operation === "-" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"
            }`}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            type="button"
            onClick={() => handleDigit("1")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => handleDigit("2")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => handleDigit("3")}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperator("+")}
            className={`w-full aspect-square rounded-full flex items-center justify-center text-3xl font-normal transition-all active:opacity-75 ${
              operation === "+" ? "bg-white text-orange-500" : "bg-orange-500 hover:bg-orange-400 text-white"
            }`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            type="button"
            onClick={() => handleDigit("0")}
            className="col-span-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-start pl-8 active:opacity-75 transition-all"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDecimal}
            className="w-full aspect-square rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center active:opacity-75 transition-all"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="w-full aspect-square rounded-full bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center text-3xl active:opacity-75 transition-all"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
