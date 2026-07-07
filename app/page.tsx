import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  
  const { data: trends } = await supabase
    .from("trends")
    .select("*")
    .order("score", { ascending: false })
    .limit(3);


// Live Statistics

const { count: trendCount } = await supabase
  .from("trends")
  .select("*", {
    count: "exact",
    head: true,
  });

const { count: subscriberCount } = await supabase
  .from("newsletter_subscribers")
  .select("*", {
    count: "exact",
    head: true,
  });

const { count: favoriteCount } = await supabase
  .from("favorites")
  .select("*", {
    count: "exact",
    head: true,
  });

const categoryCount = new Set(
  trends?.map((trend) => trend.category)
).size;

  return (
    <main className="min-h-screen text-white">
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* Hero */}
        <div className="text-center mb-24">
          <h1
            className="
              text-7xl
              md:text-8xl
              font-extrabold
              bg-gradient-to-r
              from-white
              via-blue-300
              to-cyan-400
              bg-clip-text
              text-transparent
              mb-6
            "
          >
            Spot Tomorrow&apos;s
            <br />
            Opportunities Today
          </h1>

          <p className="text-2xl text-slate-300 mb-6">
            Discover emerging startup trends before everyone else.
          </p>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Spoteroo helps founders, investors, and builders discover
            high-potential trends, startup opportunities, and market shifts
            before they become mainstream.
          </p>

          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            <Link
              href="/trends"
              className="
                bg-blue-600
                px-8 py-4
                rounded-xl
                font-semibold
                hover:bg-blue-500
                transition
                shadow-[0_0_25px_rgba(59,130,246,0.4)]
              "
            >
              Explore Trends
            </Link>

            <Link
              href="/newsletter"
              className="
                glass
                px-8 py-4
                rounded-xl
                font-semibold
              "
            >
              Join Newsletter
            </Link>
          </div>
        </div>

        {/* Stats */}

<h2 className="text-4xl font-bold text-center mb-10">
  Live Platform Statistics
</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          
          <div className="glass p-8 text-center">
            <h3 className="text-5xl font-bold text-white">
              {trendCount ?? 0}
            </h3>
            <p className="text-slate-400 mt-2">
              Trends Tracked
            </p>
          </div>

          <div className="glass p-8 text-center">
            <h3 className="text-5xl font-bold text-white">
              {subscriberCount ?? 0}
            </h3>
            <p className="text-slate-400 mt-2">
              Newsletter Subscribers
            </p>
          </div>

          <div className="glass p-8 text-center">
            <h3 className="text-5xl font-bold text-white">
              {favoriteCount ?? 0}
            </h3>
            <p className="text-slate-400 mt-2">
              Favorites Saved
            </p>
          </div>
        </div>

        {/* Features */}

<h2 className="text-4xl font-bold text-center mb-10">
  Trending Categories
</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="glass p-8">
            <h3 className="text-2xl font-bold mb-4">
              🔍 Trend Discovery
            </h3>

            <p className="text-slate-400">
              Discover emerging technologies,
              industries, and startup opportunities.
            </p>
          </div>

          <div className="glass p-8">
            <h3 className="text-2xl font-bold mb-4">
              💡 Startup Ideas
            </h3>

            <p className="text-slate-400">
              Generate startup concepts from
              validated market trends.
            </p>
          </div>

          <div className="glass p-8">
            <h3 className="text-2xl font-bold mb-4">
              📈 Market Analysis
            </h3>

            <p className="text-slate-400">
              Understand competitors, risks,
              and market potential instantly.
            </p>
          </div>
        </div>

       {/* Top Trends */}

<p className="text-center text-blue-400 mb-3">
  Latest AI Generated Trend
</p>
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-10">
            Top Trends
          </h2>

          <div className="space-y-5">
            {trends?.map((trend) => (
              <Link
                key={trend.id}
                href={`/trends/${trend.id}`}
              >
                <div
                  className="
                    glass
                    p-6
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {trend.title}
                      </h3>

                      <p className="text-slate-400 mt-3">
                        {trend.description}
                      </p>
                    </div>

                    <span
                      className="
                        px-4 py-2
                        rounded-full
                        bg-green-500/15
                        text-green-300
                        border border-green-500/20
                      "
                    >
                      {trend.score}
                    </span>
                  </div>

                  {trend.reason && (
                    <p className="text-slate-500 mt-4 italic">
                      {trend.reason}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center mb-24">
  <Link
    href="/trends"
    className="glass px-8 py-4 rounded-xl font-semibold"
  >
    View All Trends →
  </Link>
</div>


        {/* CTA */}
        {/* CUSTOMER TESTIMONIALS */}

<section className="mb-24">
  <h2 className="text-5xl font-bold mb-10 text-center">
    Loved by Founders
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="glass p-8">

      <p className="text-slate-300 italic">
  "Sample testimonial: Spoteroo helped us discover promising startup opportunities much earlier than we expected."
</p>

<p className="mt-6 font-bold">
  — Sample Founder Feedback
</p>
    </div>

    <div className="glass p-8">
      <p className="text-slate-300 italic">
  "Sample testimonial: The AI startup ideas gave us several interesting product directions."
</p>

<p className="mt-6 font-bold">
  — Sample Startup Team
</p>

  
    </div>

    <div className="glass p-8">
      <p className="text-slate-300 italic">
  "Sample testimonial: Spoteroo makes it much easier to keep track of emerging markets."
</p>

<p className="mt-6 font-bold">
  — Sample Investor
</p>

    </div>

  </div>
</section>

{/* TRUSTED BY */}

<section className="mb-24 text-center">

  <h2 className="text-4xl font-bold mb-10">
   Built For
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

    <div className="glass p-6 font-bold">
      Startup
    </div>

    <div className="glass p-6 font-bold">
      VC
    </div>

    <div className="glass p-6 font-bold">
      Accelerator
    </div>

    <div className="glass p-6 font-bold">
      SaaS
    </div>

    <div className="glass p-6 font-bold">
      AI Teams
    </div>

  </div>

</section>

{/* PRICING PREVIEW */}

<section className="mb-24">

  <div className="glass p-10 text-center">

    <h2 className="text-5xl font-bold mb-4">
      Upgrade to Pro
    </h2>

    <p className="text-slate-400 mb-8">
      Unlimited AI reports, startup ideas,
      premium analytics and much more.
    </p>

    <Link
      href="/pricing"
      className="
        bg-blue-600
        px-8
        py-4
        rounded-xl
        font-semibold
      "
    >
      View Pricing
    </Link>

  </div>

</section>

{/* FAQ */}

<section className="mb-24">

  <h2 className="text-5xl font-bold mb-10">
    Frequently Asked Questions
  </h2>

  <div className="space-y-6">

    <div className="glass p-6">
      <h3 className="font-bold text-xl">
        Is Spoteroo free?
      </h3>

      <p className="text-slate-400 mt-2">
        Yes. You can explore trends for free,
        with premium AI features available on
        the Pro plan.
      </p>
    </div>

    <div className="glass p-6">
      <h3 className="font-bold text-xl">
        How often are trends updated?
      </h3>

      <p className="text-slate-400 mt-2">
        Our AI continuously discovers and
        updates emerging opportunities.
      </p>
    </div>

    <div className="glass p-6">
      <h3 className="font-bold text-xl">
        Can I cancel anytime?
      </h3>

      <p className="text-slate-400 mt-2">
        Yes. You can upgrade or cancel your
        subscription whenever you want.
      </p>
    </div>

  </div>

</section>
        <section className="glass p-12 text-center">

  <h2>
    Ready to discover the next
    billion-dollar opportunity?
  </h2>

  <p>
    Join Spoteroo and stay ahead of emerging
    markets, startup opportunities, and future trends.
  </p>

  <div className="flex justify-center gap-4 flex-wrap">

    <Link
      href="/trends"
      className="
        inline-block
        bg-blue-600
        px-8
        py-4
        rounded-xl
        font-semibold
        hover:bg-blue-500
        transition
        shadow-[0_0_25px_rgba(59,130,246,0.4)]
      "
    >
      Start Exploring →
    </Link>

    <Link
      href="/pricing"
      className="
        glass
        px-8
        py-4
        rounded-xl
        font-semibold
      "
    >
      View Pricing
    </Link>

  </div>

</section>

      </section>
    </main>
  );
}