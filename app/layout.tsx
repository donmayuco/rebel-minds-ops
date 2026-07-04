import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const siteUrl =
  rawSiteUrl && /^https?:\/\//.test(rawSiteUrl)
    ? rawSiteUrl
    : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.rebelmindsops.com";

export const metadata: Metadata = {
  title: "Rebel Minds OPS | Human-Centered Automation & Operations Systems",
  description:
    "We build human-centered automation and operations systems for businesses across the United States: construction, logistics, home services, auto dealerships, professional firms, and HIPAA-sensitive practices. Delivered remotely to Austin, San Antonio, Houston, Dallas, Arizona, California, and nationwide. Systems your whole crew can use, in English, Spanish, or both. Free Ops Scan available.",
  metadataBase: (() => {
    try {
      return new URL(siteUrl);
    } catch {
      return new URL("http://localhost:3000");
    }
  })(),

  alternates: {
    canonical: "/",
  },

  keywords: [
    "business automation consultant",
    "operations automation systems",
    "human-centered automation",
    "HIPAA-aware automation",
    "AI workflow automation for small business",
    "healthcare practice automation",
    "construction operations automation",
    "bilingual workforce systems",
    "remote automation consultant United States",
  ],

  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: ["/icon.png"],
  },

  openGraph: {
    title: "Rebel Minds OPS | Human-Centered Automation & Operations Systems",
    description:
      "Human-centered automation and operations systems for US businesses: construction, logistics, home services, dealerships, professional firms, and HIPAA-sensitive practices. Delivered remotely, nationwide. Free Ops Scan available.",
    url: siteUrl,
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rebel Minds OPS | Human-Centered Automation Systems",
    description:
      "Human-centered automation and operations systems for US businesses. HIPAA-aware where it matters. Delivered remotely, nationwide. Free Ops Scan available.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
