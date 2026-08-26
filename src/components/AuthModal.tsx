"use client";

import React, { useState } from "react";
import { X, Lock, Phone, User, Check, ArrowRight, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { id: string; phone: string; name: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("9999999999");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("Citizen Demo User");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          password,
          name: isRegister ? name : undefined,
          isRegister
        })
      });

      const data = await res.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Network error while connecting to account service.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setIsRegister(false);
    setPhone("9999999999");
    setPassword("password123");
    setError(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-text-primary border border-stone-200/80 rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-7 relative font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg bg-surface-section text-text-muted hover:text-text-primary"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-brand-primary border border-indigo-100 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-text-primary">
              {isRegister ? "Create Citizen Account" : "Access Your Saved Cases"}
            </h3>
            <p className="text-xs text-text-muted">
              All screenshots, bank records & queries link to this account
            </p>
          </div>
        </div>

        {/* Quick Generic Login Hint Box */}
        <div className="bg-surface-section border border-stone-200/80 rounded-xl p-3.5 mb-5 text-xs text-text-muted">
          <div className="flex items-center justify-between font-bold text-text-primary mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-success" />
              Demo Account Available
            </span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-xs text-brand-primary hover:text-indigo-800 font-bold underline"
            >
              Fill Credentials
            </button>
          </div>
          <div className="text-[11px] text-text-muted space-y-0.5">
            <div>Phone: <strong className="text-text-primary font-mono">9999999999</strong></div>
            <div>Password: <strong className="text-text-primary font-mono">password123</strong></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-brand-urgent/40 text-brand-urgent rounded-xl text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-text-primary font-bold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary focus:outline-hidden focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-text-primary font-bold mb-1">Mobile Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full pl-9 pr-3 py-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs font-mono text-text-primary focus:outline-hidden focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-bold mb-1">Account Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2.5 bg-surface-card border border-stone-200 rounded-xl text-xs text-text-primary focus:outline-hidden focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : isRegister ? "Create Account & Save Session" : "Login & Link Case Sessions"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-stone-100 text-center text-xs text-text-muted">
          {isRegister ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setIsRegister(false); setError(null); }}
                className="text-brand-primary font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Need a new account?{" "}
              <button
                type="button"
                onClick={() => { setIsRegister(true); setError(null); }}
                className="text-brand-primary font-bold hover:underline"
              >
                Register
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
