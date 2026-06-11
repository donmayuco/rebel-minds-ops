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
  title: "Rebel Minds OPS | Healthcare Technology Consultant — RGV-built, HIPAA-aware",
  description:
    "Rio Grande Valley technology consultancy specializing in healthcare practices — HIPAA-aware patient communication, automation, and operational systems. Bilingual by default. Serving McAllen, Edinburg, and South Texas. Free discovery calls and HIPAA Stack Audit available.",
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
    "healthcare technology consultant",
    "HIPAA-aware automation",
    "RGV healthcare automation",
    "McAllen healthcare consultant",
    "patient communication systems",
    "BAA-signed infrastructure",
    "bilingual patient automation",
    "South Texas operations",
  ],

  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: ["/icon.png"],
  },

  openGraph: {
    title: "Rebel Minds OPS | Healthcare Technology Consultant — RGV-built, HIPAA-aware",
    description:
      "Healthcare technology consulting for RGV practices — HIPAA-aware patient communication, automation, and operational systems. Bilingual by default. Serving McAllen, Edinburg, and South Texas.",
    url: siteUrl,
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rebel Minds OPS | Healthcare Technology Consultant",
    description:
      "Healthcare technology consulting for RGV practices — HIPAA-aware. Bilingual by default. Serving McAllen, Edinburg, and South Texas.",
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
