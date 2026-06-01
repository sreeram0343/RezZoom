import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "600", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Rezzoom | AI-Powered ATS-Optimized Resumes",
  description: "Build ATS-Optimized Resumes in Minutes, Not Hours. Generate, tailor, and export job-winning resumes with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable} ${jetbrains.variable}`}>
      <body className="antialiased font-sans text-foreground bg-background">
        {children}
      </body>
    </html>
  );
}
