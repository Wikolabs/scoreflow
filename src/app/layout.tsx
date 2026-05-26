import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "ScoreFlow — 80% des prospects qualifiés automatiquement",
  description: "Scoring BANT IA et routing automatique. Votre closer ne voit que les deals chauds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${jakarta.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#ecfdf5" }}>{children}</body>
    </html>
  );
}
