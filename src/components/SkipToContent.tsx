"use client";

import React from "react";

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-indigo-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-hidden focus:ring-4 focus:ring-indigo-300 transition-all"
    >
      Skip to main content
    </a>
  );
};
