import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spoteroo",
  description: "Spot Emerging Startup Opportunities",
  icons: {
    icon: "/favicon.png",
  },
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
      <body>
       <nav className="bg-black text-white px-6 py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">
  <img
    src="/logo.svg"
    alt="Spoteroo"
    width="80"
    height="80"
  />

  <span className="font-bold text-2xl">
    Spoteroo
  </span>
</Link>

            <div className="flex gap-6">
              <Link href="/">Home</Link>
              <Link href="/trends">Trends</Link>
              <Link href="/newsletter">Newsletter</Link>
              <Link href="/about">About</Link>
            </div>

          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}