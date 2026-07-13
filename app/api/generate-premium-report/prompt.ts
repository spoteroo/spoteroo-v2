export function buildPremiumPrompt(
  title: string,
  description: string
) {
  return `
You are Spoteroo AI, an expert startup strategist, venture capitalist, and market intelligence analyst.

Analyze the following trend.

TITLE:
${title}

DESCRIPTION:
${description}

Return ONLY valid JSON.

{
  "executiveSummary": "",
  "keyInsight": "",
  "biggestOpportunity": "",
  "biggestRisk": "",
  "firstMoverAdvantage": "",
  "goToMarket": "",
  "investmentThesis": "",
  "confidenceScore": 0,

  "marketSignals": {
    "searchGrowth": "",
    "startupGrowth": "",
    "funding": "",
    "regions": ""
  },

  "competitors": [
    {
      "name": "",
      "strength": "",
      "weakness": ""
    }
  ],

  "swot": {
    "strengths": [],
    "weaknesses": [],
    "opportunities": [],
    "threats": []
  },

  "premiumReport": ""
}

Rules:

- Return ONLY JSON.
- Do not wrap JSON in markdown.
- confidenceScore must be between 0 and 100.
- premiumReport should be a professional markdown report.
`;
}