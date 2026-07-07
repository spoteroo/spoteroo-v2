import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emerging Startup Trends",

  description:
    "Explore AI-discovered startup trends, emerging technologies, market opportunities, and high-growth business ideas before they become mainstream.",

  keywords: [
    "startup trends",
    "emerging trends",
    "AI trends",
    "startup opportunities",
    "business ideas",
    "market intelligence",
    "future technologies",
    "innovation",
    "founder tools",
    "startup research",
  ],

  alternates: {
    canonical: "https://spoteroo.com/trends",
  },

  openGraph: {
    title: "Emerging Startup Trends | Spoteroo",

    description:
      "Discover emerging startup trends, AI-powered market intelligence, and future business opportunities.",

    url: "https://spoteroo.com/trends",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spoteroo Trends",
      },
    ],
  },

  twitter: {
    title: "Emerging Startup Trends | Spoteroo",

    description:
      "Discover startup opportunities and emerging market trends before everyone else.",

    images: ["/og-image.png"],
  },
};

export default function TrendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}