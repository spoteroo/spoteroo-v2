import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import UserMenu from "./components/navbar/UserMenu";
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
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <Image
  src="/logo.svg"
  alt="Spoteroo"
  width={56}
  height={56}
  priority
/>

              <span
                className="
                  font-bold
                  text-2xl
                  tracking-tight
                "
              >
                Spoteroo
              </span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-8">
  <Link
    href="/"
    className="hover:text-blue-400 transition"
  >
    Home
  </Link>

  <Link
    href="/trends"
    className="hover:text-blue-400 transition"
  >
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

  <Link
    href="/about"
    className="hover:text-blue-400 transition"
  >
    About
  </Link>

  <UserMenu />
</div>
          </div>
        </nav>

        <>
  {children}

  <footer
    className="
      border-t border-white/10
      mt-20
      py-10
    "
  >
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between gap-10">

        <div>
          <h3 className="text-2xl font-bold">
            Spoteroo
          </h3>

          <p className="text-slate-400 mt-2 max-w-md">
            Discover emerging startup opportunities,
            future markets, and high-growth trends
            before they become mainstream.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">
            Product
          </h4>

          <div className="space-y-2 text-slate-400">
            <Link href="/trends">
              Trends
            </Link>

            <br />

            <Link href="/newsletter">
              Newsletter
            </Link>

            <br />

            <Link href="/favorites">
              Favorites
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">
            Company
          </h4>

          <div className="space-y-2 text-slate-400">
            <Link href="/about">
              About
            </Link>

            <br />

            <Link href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-8 text-slate-500 text-sm">
        © 2026 Spoteroo. All rights reserved.
      </div>
    </div>
  </footer>
</>
      </body>
    </html>
  );
}