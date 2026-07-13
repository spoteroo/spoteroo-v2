export type PremiumReport = {
  executiveSummary: string;
  keyInsight: string;
  biggestOpportunity: string;
  biggestRisk: string;
  firstMoverAdvantage: string;
  goToMarket: string;
  investmentThesis: string;
  confidenceScore: number;

  marketSignals: {
    searchGrowth: string;
    startupGrowth: string;
    funding: string;
    regions: string;
  };

  competitors: {
    name: string;
    strength: string;
    weakness: string;
  }[];

  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };

  premiumReport: string;
};