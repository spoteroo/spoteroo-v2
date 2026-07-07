"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NewsletterPage() {
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function subscribe(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("subscribers") // Change to "newsletter_subscribers" if that's your table
      .insert([{ email }]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Subscribed successfully!");
    setEmail("");
  }

  return (
    <main className="min-h-screen text-white flex items-center justify-center p-8">
      <div className="max-w-xl w-full">
        <div className="glass p-10">
          <h1
            className="
              text-5xl
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

          <p className="text-slate-400 mb-8">
            Get emerging startup trends,
            opportunities, and market
            insights delivered directly to
            your inbox.
          </p>

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
              type="submit"
              className="
                w-full
                bg-blue-600
                py-4
                rounded-xl
                font-semibold
                transition
                hover:bg-blue-500
                shadow-[0_0_25px_rgba(59,130,246,0.4)]
              "
            >
              Subscribe
            </button>
          </form>

          {message && (
            <div
              className={`
                mt-6
                p-4
                rounded-xl
                border
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