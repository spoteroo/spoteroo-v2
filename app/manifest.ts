import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spoteroo",
    short_name: "Spoteroo",
    description:
      "AI-powered opportunity intelligence platform for discovering emerging startup opportunities, market trends, and startup ideas.",

    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],

    background_color: "#000000",
    theme_color: "#000000",

    orientation: "portrait",

    categories: [
      "business",
      "productivity",
      "technology",
      "finance",
    ],

    lang: "en",
    dir: "ltr",

    id: "/",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}