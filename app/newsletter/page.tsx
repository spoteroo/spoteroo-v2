"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function subscribe(e: React.FormEvent) {
  e.preventDefault();

  const { error } = await supabase
    .from("subscribers")
    .insert([{ email }]);

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage("Subscribed successfully!");
  setEmail("");
}

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-lg w-full p-8">
        <h1 className="text-5xl font-bold mb-6">
          Join Newsletter
        </h1>

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
            className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700"
            required
          />

          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-xl"
          >
            Subscribe
          </button>
        </form>

        {message && (
  <p
    className={`mt-4 ${
      message.includes("successfully")
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {message}
  </p>
)}
      </div>
    </main>
  );
}