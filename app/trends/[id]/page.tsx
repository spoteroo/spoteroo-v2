import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Trend ${id} | Spoteroo`,
    description:
      "Discover emerging startup opportunities with Spoteroo.",
  };
}

export { default } from "./page-client";