import type { PremiumReport } from "./schema";

const DEFAULT_REPORT: PremiumReport = {
  executiveSummary: "",
  keyInsight: "",
  biggestOpportunity: "",
  biggestRisk: "",
  firstMoverAdvantage: "",
  goToMarket: "",
  investmentThesis: "",
  confidenceScore: 70,

  marketSignals: {
    searchGrowth: "",
    startupGrowth: "",
    funding: "",
    regions: "",
  },

  competitors: [],

  swot: {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  },

  premiumReport: "",
};

export function parsePremiumReport(
  text: string
): PremiumReport {
  try {
    const parsed = JSON.parse(text);

    return {
      ...DEFAULT_REPORT,
      ...parsed,

      marketSignals: {
        ...DEFAULT_REPORT.marketSignals,
        ...(parsed.marketSignals ?? {}),
      },

      swot: {
        ...DEFAULT_REPORT.swot,
        ...(parsed.swot ?? {}),
      },

      competitors: Array.isArray(parsed.competitors)
        ? parsed.competitors
        : [],
    };
  } catch {
    throw new Error("Invalid JSON returned from OpenAI.");
  }
}