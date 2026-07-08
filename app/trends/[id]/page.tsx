import type { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

const supabase = await createClient();

const { data: trend } = await supabase
  .from("trends")
  .select("title, description")
  .eq("id", id)
  .single();

if (!trend) {
  return {
    title: "Trend Not Found | Spoteroo",
    description: "The requested trend could not be found.",
  };
}

const url = `https://spoteroo.com/trends/${id}`;

return {
  title: `${trend.title} | Spoteroo`,
  description: trend.description,
  alternates: {
    canonical: url,
  },
  openGraph: {
  title: trend.title,
  description: trend.description,
  url,
  siteName: "Spoteroo",
  type: "article",
  images: [
    {
      url: `${url}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: trend.title,
    },
  ],
},
  twitter: {
  card: "summary_large_image",
  title: trend.title,
  description: trend.description,
  images: [`${url}/opengraph-image`],
},
};
}


export { default } from "./page-client";

