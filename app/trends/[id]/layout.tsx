import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Opportunity",

  description:
    "Discover AI-generated startup opportunities, market analysis, investment insights, forecasts, competitors, and startup ideas.",

  alternates: {
    canonical: "https://spoteroo.com/trends",
  },

  openGraph: {
    title: "Startup Opportunity | Spoteroo",

    description:
      "AI-powered startup opportunity analysis with market intelligence and investment insights.",

    url: "https://spoteroo.com/trends",

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
    title: "Startup Opportunity | Spoteroo",

    description:
      "Discover emerging startup opportunities before everyone else.",

    images: ["/og-image.png"],
  },
};

export default function TrendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}