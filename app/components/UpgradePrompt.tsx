import Link from "next/link";

export default function UpgradePrompt() {
  return (
    <div className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6">
      <h3 className="text-xl font-bold text-yellow-300">
        Spoteroo Pro Required
      </h3>

      <p className="mt-2 text-slate-300">
        AI Startup Ideas are available only for Pro members.
      </p>

      <Link
        href="/pricing"
        className="
          inline-block
          mt-4
          rounded-xl
          bg-yellow-500
          px-6
          py-3
          font-semibold
          text-black
        "
      >
        Upgrade to Pro
      </Link>
    </div>
  );
}