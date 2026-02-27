import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rebel Minds Ops — ExpenseOps™ AI Receipt & Invoice Management",
  description:
    "ExpenseOps™ captures receipts via WhatsApp, extracts and categorizes expenses with AI, and delivers clean, export-ready reports. Designed for field-heavy businesses seeking structured financial control.",
  metadataBase: new URL("https://rebelmindsops.com"),
  keywords: [
    "expense management",
    "receipt capture",
    "AI invoicing",
    "field businesses",
    "WhatsApp receipts",
    "expense reporting",
    "job costing",
    "South Texas",
  ],
  openGraph: {
    title: "Rebel Minds Ops — ExpenseOps™ AI Receipt Management",
    description:
      "Stop losing money to receipt chaos. AI-powered expense management for field-heavy businesses.",
    url: "https://rebelmindsops.com",
    siteName: "Rebel Minds Ops",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebel Minds Ops — ExpenseOps™",
    description:
      "Stop losing money to receipt chaos. AI-powered expense management for field-heavy businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
