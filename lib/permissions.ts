import { canUseFeature, isPro } from "@/lib/subscription";

export async function requirePro(email: string) {
  const pro = await isPro(email);

  if (!pro) {
    throw new Error("Pro subscription required.");
  }
}

export async function requireStartupIdeaAccess(
  email: string
) {
  const allowed = await canUseFeature(
    email,
    "startup_ideas",
    3
  );

  if (!allowed) {
    throw new Error(
      "Free plan limit reached. Upgrade to Pro for unlimited Startup Ideas."
    );
  }
}

export async function requirePremiumReportAccess(
  email: string
) {
  const allowed = await canUseFeature(
    email,
    "premium_reports",
    1
  );

  if (!allowed) {
    throw new Error(
      "Free plan limit reached. Upgrade to Pro for unlimited Premium Reports."
    );
  }
}

export async function requireAdmin(
  email: string
) {
  const admins = (
    process.env.ADMIN_EMAILS ?? ""
  )
    .split(",")
    .map((e) => e.trim().toLowerCase());

  if (!admins.includes(email.toLowerCase())) {
    throw new Error("Admin access required.");
  }
}