import {
  canUseFeature,
  incrementUsage,
} from "@/lib/subscription";

export async function useStartupIdea(
  email: string
) {
  const allowed = await canUseFeature(
    email,
    "startup_ideas",
    3
  );

  if (!allowed) {
    throw new Error(
      "Free Startup Idea limit reached."
    );
  }

  await incrementUsage(
    email,
    "startup_ideas"
  );
}

export async function usePremiumReport(
  email: string
) {
  const allowed = await canUseFeature(
    email,
    "premium_reports",
    1
  );

  if (!allowed) {
    throw new Error(
      "Free Premium Report limit reached."
    );
  }

  await incrementUsage(
    email,
    "premium_reports"
  );
}