import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://spoteroo.com";

  const supabase = await createClient();

  const { data: trends, error } = await supabase
    .from("trends")
    .select("id, created_at");

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/trends`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit-trend`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  if (error) {
    console.error("Sitemap generation failed:", error);
    return staticPages;
  }

  const trendPages: MetadataRoute.Sitemap = (trends ?? []).map((trend) => ({
    url: `${baseUrl}/trends/${trend.id}`,
    lastModified: trend.created_at
      ? new Date(trend.created_at)
      : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...trendPages];
}