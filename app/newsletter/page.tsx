"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NewsletterPage() {
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  async function subscribe(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Subscribed successfully!");
    setEmail("");
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 text-white">
      <div className="max-w-xl w-full">
        <div className="glass rounded-2xl p-6 sm:p-8 lg:p-10">
          <h1
            className="
              text-3xl
sm:text-4xl
lg:text-5xl
              font-bold
              mb-4
              bg-gradient-to-r
              from-white
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            Join Newsletter
          </h1>

          <p className="mb-8 text-base sm:text-lg text-slate-400 leading-7">
            Get emerging startup trends,
            opportunities, and market
            insights delivered directly to
            your inbox.
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-3 text-sm">
  <span className="glass rounded-full px-4 py-2">
    📈 Weekly Startup Trends
  </span>

  <span className="glass rounded-full px-4 py-2">
    🤖 AI Market Insights
  </span>

  <span className="glass rounded-full px-4 py-2">
    🚀 Free to Subscribe
  </span>
</div>

          <form
            onSubmit={subscribe}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                glass-input
                w-full
                p-4
                rounded-xl
                outline-none
              "
              required
            />

            <button
  disabled={loading}
              type="submit"
              className="
w-full
rounded-xl
bg-blue-600
py-4
font-semibold
transition
hover:bg-blue-500
disabled:opacity-50
disabled:cursor-not-allowed
shadow-[0_0_25px_rgba(59,130,246,0.4)]
"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <div
              className={`
mt-6
rounded-xl
border
p-4
text-center
font-medium
transition

${
  message.includes("successfully")
    ? "border-green-500/20 bg-green-500/10 text-green-300"
    : "border-red-500/20 bg-red-500/10 text-red-300"
}
`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}