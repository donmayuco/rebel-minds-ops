import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      : "https://rebelmindsops.com";

export const metadata: Metadata = {
  title: "Rebel Minds Ops | Operations, Automation & Cybersecurity — RGV",
  description:
    "South Texas operations automation and cybersecurity services for small businesses. I-O Psychology-backed training and systems design. Based in Edinburg, TX.",
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
    "operational systems",
    "business automation",
    "workflow automation",
    "RGV businesses",
    "South Texas operations",
    "custom dashboards",
    "process automation",
  ],

  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: ["/icon.png"],
  },

  openGraph: {
    title: "Rebel Minds Ops",
    description:
      "Operational systems and automation for growing RGV businesses.",
    url: siteUrl,
    siteName: "Rebel Minds Ops",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Rebel Minds Ops",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rebel Minds Ops",
    description:
      "Operational systems and automation for growing RGV businesses.",
    images: ["/icon.png"],
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
