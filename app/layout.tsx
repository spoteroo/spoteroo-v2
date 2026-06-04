import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  description: "Discover What's Next",
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
        <nav className="bg-black text-white px-6 py-4">
          <div className="flex gap-6">
            <a href="/">Home</a>
            <a href="/trends">Trends</a>
            <a href="/newsletter">Newsletter</a>
            <a href="/about">About</a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}