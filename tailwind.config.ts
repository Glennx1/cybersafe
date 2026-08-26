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
        "brand-secondary": "#10B981",
        "brand-urgent": "#DC2626",
        "brand-warning": "#D97706",
        "surface-bg": "#FAFAF9",
        "surface-card": "#FFFFFF",
        "text-primary": "#1C1917",
        "text-muted": "#6B7280",
      },
    },
  },
  plugins: [],
};
export default config;
