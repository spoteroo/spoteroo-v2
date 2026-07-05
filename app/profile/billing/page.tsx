import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BillingPage() {
  
    const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

let profile = null;

if (user) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  profile = data;
}

return (
<main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">Billing Center</h1>
          <p className="mt-3 text-slate-400 text-lg">
            Manage your subscription, usage, and billing information.
          </p>
        </div>

        {/* Top Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Subscription Card */}
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Subscription</h2>

              <span className="rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold text-emerald-400">
                {profile?.subscription_status?.toUpperCase() ?? "FREE"}
              </span>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-sm text-slate-400">Current Plan</p>
                <p className="text-3xl font-bold mt-1">
  {profile?.plan?.toUpperCase() ?? "FREE"}
</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Renewal Date</p>
                <p className="text-xl font-semibold mt-1">
  Renewal date unavailable
</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Days Remaining
                </p>
               <p className="text-4xl font-bold text-cyan-400 mt-2">
  —
</p>
              </div>

              <div>
  <p className="text-sm text-slate-400">
    Account
  </p>

  <p className="mt-1 text-lg">
    {profile?.email ?? user?.email ?? "Not available"}
  </p>
</div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/pricing"
                  className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold transition hover:bg-cyan-400"
                >
                  Upgrade Plan
                </Link>

                <button className="rounded-xl border border-slate-700 px-5 py-3 font-semibold hover:border-cyan-400">
                  Manage
                </button>
              </div>
            </div>
          </div>

          {/* Usage Card */}
          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold">
              Monthly Usage
            </h2>

            <div className="mt-8 space-y-8">
              <UsageBar
                title="Startup Ideas"
                used={18}
                total={30}
              />

              <UsageBar
                title="Premium Reports"
                used={9}
                total={20}
              />

              <UsageBar
                title="AI Requests"
                used={72}
                total={100}
              />
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-bold">
            Included with Pro
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Feature text="Unlimited Startup Ideas" />
            <Feature text="Unlimited Premium Reports" />
            <Feature text="Advanced Trend Discovery" />
            <Feature text="AI Market Analysis" />
            <Feature text="PDF Export" />
            <Feature text="Priority AI Processing" />
          </div>
        </div>
      </div>
    </main>
  );
}

function UsageBar({
  title,
  used,
  total,
}: {
  title: string;
  used: number;
  total: number;
}) {
  const percent = (used / total) * 100;

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{title}</span>
        <span className="text-slate-400">
          {used}/{total}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-800 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
        ✓
      </div>

      <span>{text}</span>
    </div>
  );
}