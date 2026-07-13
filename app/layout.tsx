import type { Metadata } from "next";
import { Inter, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  title: "Rebel Minds OPS | AI Consulting & Automation Systems — McAllen, TX & Nationwide",
  description:
    "Rebel Minds OPS provides AI consulting and human-centered automation systems from McAllen, Texas: serving the Rio Grande Valley (Edinburg, Mission, Pharr, Weslaco, Harlingen, Brownsville) and businesses nationwide. Construction, logistics, home services, auto dealerships, professional firms, and HIPAA-sensitive practices. Systems your whole crew can use, in English, Spanish, or both. Free Ops Scan available.",
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
    "AI consulting",
    "AI consultant McAllen TX",
    "AI consulting Rio Grande Valley",
    "AI readiness assessment",
    "AI adoption training",
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
    title: "Rebel Minds OPS | AI Consulting & Automation Systems — McAllen, TX & Nationwide",
    description:
      "AI consulting and human-centered automation systems for US businesses: construction, logistics, home services, dealerships, professional firms, and HIPAA-sensitive practices. Built in McAllen, Texas. Delivered remotely, nationwide. Free Ops Scan available.",
    url: siteUrl,
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rebel Minds OPS | AI Consulting & Automation Systems",
    description:
      "AI consulting and human-centered automation systems for US businesses. Built in McAllen, Texas. HIPAA-aware where it matters. Delivered remotely, nationwide. Free Ops Scan available.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${newsreader.variable} ${plexMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
