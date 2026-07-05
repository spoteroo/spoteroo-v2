import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import UserMenu from "./components/navbar/UserMenu";
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
  alternates: {
  canonical: "/",
},

  title: {
    default: "Spoteroo | Discover Emerging Startup Opportunities",
    template: "%s | Spoteroo",
  },

  description:
    "Spoteroo is an AI-powered opportunity intelligence platform that helps founders, investors, creators, and businesses discover emerging startup trends, technologies, markets, and opportunities before they become mainstream.",

  keywords: [
    "startup trends",
    "AI startup ideas",
    "emerging markets",
    "startup opportunities",
    "business opportunities",
    "trend discovery",
    "market intelligence",
    "AI trends",
    "future startups",
    "Spoteroo",
  ],

  authors: [
    {
      name: "Spoteroo",
    },
  ],

  creator: "Spoteroo",

  publisher: "Spoteroo",
  applicationName: "Spoteroo",

category: "Business",

referrer: "origin-when-cross-origin",

  robots: {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
  },
},

  openGraph: {
    title: "Spoteroo | Discover Emerging Startup Opportunities",

    description:
      "Discover emerging startup opportunities before they become mainstream using AI-powered market intelligence.",

    url: "https://spoteroo.com",

    siteName: "Spoteroo",

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Spoteroo",

    description:
      "AI-powered opportunity intelligence platform.",

    creator: "@spoteroo",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <nav
          className="
            sticky top-0 z-50
            backdrop-blur-xl
            bg-black/50
            border-b border-white/10
            px-6 py-5
          "
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Spoteroo"
                width={56}
                height={56}
                priority
              />

              <span className="font-bold text-2xl tracking-tight">
                Spoteroo
              </span>
            </Link>

            <div className="flex items-center gap-8">
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>

              <Link href="/trends" className="hover:text-blue-400 transition">
                Trends
              </Link>

              <Link
                href="/favorites"
                className="hover:text-blue-400 transition"
              >
                Favorites
              </Link>

              <Link
                href="/newsletter"
                className="hover:text-blue-400 transition"
              >
                Newsletter
              </Link>

              <Link
                href="/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <Link href="/about" className="hover:text-blue-400 transition">
                About
              </Link>

              <UserMenu />
            </div>
          </div>
        </nav>

        {children}

        <script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Spoteroo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI-powered opportunity intelligence platform for discovering emerging startup trends and market opportunities.",
      url: "https://spoteroo.com",
      offers: {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
      },
      creator: {
        "@type": "Organization",
        name: "Spoteroo",
      },
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
                  Discover emerging startup opportunities, future markets, and
                  high-growth trends before they become mainstream.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Product</h4>

                <div className="space-y-2 text-slate-400">
                  <Link href="/trends">Trends</Link>

                  <br />

                  <Link href="/newsletter">Newsletter</Link>

                  <br />

                  <Link href="/favorites">Favorites</Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Company</h4>

                <div className="space-y-2 text-slate-400">
                  <Link href="/about">About</Link>

                  <br />

                  <Link href="/dashboard">Dashboard</Link>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-8 text-slate-500 text-sm">
              © 2026 Spoteroo. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}