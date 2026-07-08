import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import Navbar from "./components/Navbar";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MicrosoftClarity from "./components/MicrosoftClarity";

import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spoteroo.com"),

  title: {
    default: "Spoteroo — Discover Emerging Startup Opportunities with AI",
    template: "%s | Spoteroo",
  },

  description:
    "Spoteroo is an AI-powered opportunity intelligence platform that helps founders, investors, and builders discover emerging startup ideas, market trends, technologies, and business opportunities before they become mainstream.",

  keywords: [
    "startup ideas",
    "startup trends",
    "AI startup ideas",
    "emerging technologies",
    "business opportunities",
    "market intelligence",
    "trend discovery",
    "AI trends",
    "startup research",
    "opportunity intelligence",
    "future startups",
    "innovation platform",
    "market analysis",
    "founder tools",
    "startup validation",
  ],

  authors: [{ name: "Spoteroo" }],

  creator: "Spoteroo",
  publisher: "Spoteroo",
  generator: "Next.js",
  category: "Technology",

  alternates: {
    canonical: "https://spoteroo.com",
  },

  openGraph: {
    type: "website",
    url: "https://spoteroo.com",
    title: "Spoteroo — Discover Emerging Startup Opportunities with AI",
    description:
      "Discover emerging startup opportunities, AI-powered market intelligence, startup ideas, and technology trends before everyone else.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spoteroo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Spoteroo — Discover Emerging Startup Opportunities",
    description:
      "AI-powered platform for discovering startup opportunities before they become mainstream.",
    images: ["/og-image.png"],
    creator: "@getspoteroo",
    site: "@getspoteroo",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  applicationName: "Spoteroo",

  referrer: "origin-when-cross-origin",

  appleWebApp: {
    capable: true,
    title: "Spoteroo",
    statusBarStyle: "black-translucent",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className="
          min-h-screen
          bg-gradient-to-br
          from-black
          via-slate-950
          to-black
          text-white
        "
      >
        <Navbar />

        {children}

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://spoteroo.com/#organization",
                  name: "Spoteroo",
                  url: "https://spoteroo.com",
                  logo: "https://spoteroo.com/logo.svg",
                  description:
                    "AI-powered opportunity intelligence platform.",
                  foundingDate: "2026",
                  sameAs: [
                    "https://x.com/getspoteroo",
                    "https://github.com/spoteroo",
                    "https://www.producthunt.com/@spoteroo",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://spoteroo.com/#website",
                  name: "Spoteroo",
                  url: "https://spoteroo.com",
                  description:
                    "AI-powered opportunity intelligence platform for discovering emerging startup opportunities.",
                },
                {
                  "@type": "SoftwareApplication",
                  name: "Spoteroo",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  url: "https://spoteroo.com",
                  description:
                    "Discover emerging startup opportunities, AI-powered trend discovery, market intelligence, startup ideas, and business opportunities.",
                  offers: {
                    "@type": "Offer",
                    price: "49",
                    priceCurrency: "USD",
                  },
                  creator: {
                    "@type": "Organization",
                    name: "Spoteroo",
                  },
                },
              ],
            }),
          }}
        />

        <GoogleAnalytics />
        <MicrosoftClarity />

        <Toaster
          position="top-right"
          richColors
          closeButton
        />

                <footer className="border-t border-white/10 mt-20 py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div>
                <h3 className="text-2xl font-bold">Spoteroo</h3>

                <p className="text-slate-400 mt-2 max-w-md">
                  Discover emerging startup opportunities, future markets,
                  and high-growth trends before they become mainstream.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Product</h4>

                <div className="space-y-2 text-slate-400">
                  <Link href="/trends" className="block hover:text-white transition">
                    Trends
                  </Link>

                  <Link
                    href="/newsletter"
                    className="block hover:text-white transition"
                  >
                    Newsletter
                  </Link>

                  <Link
                    href="/favorites"
                    className="block hover:text-white transition"
                  >
                    Favorites
                  </Link>

                  <Link
                    href="/pricing"
                    className="block hover:text-white transition"
                  >
                    Pricing
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Company</h4>

                <div className="space-y-2 text-slate-400">
                  <Link href="/about" className="block hover:text-white transition">
                    About
                  </Link>

                  <Link
                    href="/dashboard"
                    className="block hover:text-white transition"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/submit-trend"
                    className="block hover:text-white transition"
                  >
                    Submit Trend
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-500 text-sm">
              © 2026 Spoteroo. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}