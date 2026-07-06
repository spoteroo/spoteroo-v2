"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
  async function checkSession() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.replace("/dashboard");
    }
  }

  checkSession();
}, [router, supabase]);

  const login = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
});

console.log("OTP DATA:", data);
console.log("OTP ERROR:", error);

if (error) {
  throw error;
}

setSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="glass p-8 md:p-10">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/20">
              <span className="text-xl font-bold text-white">S</span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-center text-slate-400">
              Sign in to continue discovering trends
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input w-full"
            />
          </div>

          <button
            onClick={login}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>

          {sent && (
            <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
              <p className="text-sm text-green-300">
                Magic link sent. Check your inbox.
              </p>
            </div>
          )}

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs uppercase tracking-wider text-slate-500">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="space-y-3">
            <button
              onClick={async () => {
                const { error } =
                  await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo:
                        `${window.location.origin}/auth/callback`,
                    },
                  });

                if (error) {
                  console.error(error);
                }
              }}
              className="glass w-full py-3 font-medium"
            >
              Continue with Google
            </button>

            <button className="glass w-full py-3 font-medium">
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}