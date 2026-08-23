import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberRakshak 1930 • Citizen Cyber Defense Terminal",
  description: "Zero-form emergency anti-fraud copilot & statutory legal action system for Helpline 1930 & I4C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-rose-600 selection:text-white bg-[#070A11] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}