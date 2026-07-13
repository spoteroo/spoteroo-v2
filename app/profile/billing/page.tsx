import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PLAN_LIMITS } from "@/lib/subscription";

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

const { data: usage } = await supabase
  .from("ai_usage")
  .select("*")
  .eq("email", user?.email ?? "");

  const startupIdeasUsed =
  usage?.find((u) => u.feature === "startup_ideas")?.count ?? 0;

const premiumReportsUsed =
  usage?.find((u) => u.feature === "premium_reports")?.count ?? 0;

const aiRequestsUsed =
  usage?.find((u) => u.feature === "ai_requests")?.count ?? 0;

  const limits =
  PLAN_LIMITS[
    (profile?.plan?.toLowerCase() as keyof typeof PLAN_LIMITS) || "free"
  ];

const renewalDate = profile?.subscription_expires_at
  ? new Date(profile.subscription_expires_at)
  : null;

const currentDate = new Date();

const daysRemaining = renewalDate
  ? Math.max(
      0,
      Math.ceil(
        (renewalDate.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    )
  : null;
  
return (
<main className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Billing Center</h1>
          <p className="mt-3 text-slate-400 text-lg">
            Manage your subscription, usage, and billing information.
          </p>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Card */}
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Subscription</h2>

              <span
  className={`rounded-full px-4 py-1 text-sm font-semibold ${
    profile?.subscription_status === "active"
      ? "bg-emerald-500/20 text-emerald-400"
      : "bg-red-500/20 text-red-400"
  }`}
>
                {profile?.subscription_status?.toUpperCase() ?? "FREE"}
              </span>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-sm text-slate-400">Current Plan</p>
                <span
  className={`
    mt-2 inline-block rounded-full px-4 py-2 text-sm font-semibold
    ${
      profile?.plan === "pro"
        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
        : "bg-slate-700 text-slate-300 border border-slate-600"
    }
  `}
>
  {profile?.plan?.toUpperCase() ?? "FREE"}
</span>
              </div>

              <div>
                <p className="text-sm text-slate-400">Renewal Date</p>
                <p className="text-xl font-semibold mt-1">
  {renewalDate
    ? renewalDate.toLocaleDateString()
    : "Renewal date unavailable"}
</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Days Remaining
                </p>
               <p className="text-4xl font-bold text-cyan-400 mt-2">
  {daysRemaining !== null
    ? `${daysRemaining} Days`
    : "—"}
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

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/pricing"
                  className="
w-full
sm:w-auto
rounded-xl
bg-cyan-500
px-5
py-3
font-semibold
transition
hover:bg-cyan-400
"
                >
                  Upgrade Plan
                </Link>

                <button className="
w-full
sm:w-auto
rounded-xl
border
border-slate-700
px-5
py-3
font-semibold
transition
hover:border-cyan-400
">
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
  used={startupIdeasUsed}
  total={limits.startupIdeas}
/>

              <UsageBar
  title="Premium Reports"
  used={premiumReportsUsed}
  total={limits.premiumReports}
/>
              <UsageBar
  title="AI Requests"
  used={aiRequestsUsed}
  total={limits.aiRequests}
/>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-bold">
            Included with Pro
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Feature text="Unlimited Startup Ideas" />
            <Feature text="Unlimited Premium Reports" />
            <Feature text="Advanced Trend Discovery" />
            <Feature text="AI Market Analysis" />
            <Feature text="PDF Export" />
            <Feature text="Priority AI Processing" />
          </div>
        </div>

        {/* Billing History */}

<div className="glass rounded-3xl p-8 mt-8">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold">
        Billing History
      </h2>

      <p className="mt-2 text-slate-400">
        Recent invoices and payments.
      </p>
    </div>
  </div>

  <div className="mt-8 overflow-x-auto">
    <table className="min-w-[700px] w-full">
      <thead>
        <tr className="border-b border-slate-800 text-left text-slate-400">
          <th className="pb-4">Invoice</th>
          <th className="pb-4">Date</th>
          <th className="pb-4">Amount</th>
          <th className="pb-4">Status</th>
          <th className="pb-4 text-right">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b border-slate-900">
          <td className="py-5 font-medium">INV-1001</td>
          <td>July 5, 2026</td>
          <td>$49.00</td>

          <td>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
              Paid
            </span>
          </td>

          <td className="text-right">
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400">
              Download
            </button>
          </td>
        </tr>

        <tr className="border-b border-slate-900">
          <td className="py-5 font-medium">INV-1000</td>
          <td>June 5, 2026</td>
          <td>$49.00</td>

          <td>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
              Paid
            </span>
          </td>

          <td className="text-right">
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400">
              Download
            </button>
          </td>
        </tr>

        <tr>
          <td className="py-5 font-medium">INV-999</td>
          <td>May 5, 2026</td>
          <td>$49.00</td>

          <td>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
              Paid
            </span>
          </td>

          <td className="text-right">
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400">
              Download
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
 const unlimited = total === -1;

const percent = unlimited
  ? 100
  : Math.min((used / total) * 100, 100);

  return (
    <div>
      <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm">
        <span>{title}</span>
        <span className="text-slate-400">
          {unlimited ? "Unlimited" : `${used}/${total}`}
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