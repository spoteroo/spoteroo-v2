import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
  "/admin",
  "/api",
  "/dashboard",
  "/billing",
  "/profile",
  "/favorites",
],
      },
    ],

    sitemap: "https://spoteroo.com/sitemap.xml",

    host: "https://spoteroo.com",
  };
}