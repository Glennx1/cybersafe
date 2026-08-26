import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "brand-navy": "#1E1B4B",
        "brand-primary": "#4F46E5",
        "brand-success": "#059669",
        "brand-urgent": "#DC2626",
        "brand-warning": "#D97706",
        "surface-page": "#FAFAF8",
        "surface-card": "#FFFFFF",
        "surface-section": "#F3F2EF",
        "text-primary": "#1C1917",
        "text-muted": "#4B5563",
        "text-on-dark": "#F9FAFB",
      },
    },
  },
  plugins: [],
};
export default config;
