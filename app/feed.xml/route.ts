import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data: trends } = await supabase
    .from("trends")
    .select("id, title, description, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  const items =
    trends?.map(
      (trend) => `
<item>
  <title><![CDATA[${trend.title}]]></title>
  <description><![CDATA[${trend.description}]]></description>
  <link>https://spoteroo.com/trends/${trend.id}</link>
  <guid>https://spoteroo.com/trends/${trend.id}</guid>
  <pubDate>${new Date(trend.created_at).toUTCString()}</pubDate>
</item>`
    ).join("") ?? "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Spoteroo</title>
<link>https://spoteroo.com</link>
<description>Discover emerging startup opportunities with AI.</description>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}