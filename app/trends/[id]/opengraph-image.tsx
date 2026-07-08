import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: trend } = await supabase
    .from("trends")
    .select("title, category, score")
    .eq("id", id)
    .single();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1120",
          color: "white",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#60a5fa",
          }}
        >
          Spoteroo
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {trend?.title ?? "Emerging Startup Opportunity"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#cbd5e1",
          }}
        >
          <span>{trend?.category}</span>
          <span>Score: {trend?.score}</span>
        </div>
      </div>
    ),
    size
  );
}