type TrendHeroProps = {
  trend: {
    title: string;
    description: string;
    category: string;
    score: number;
    momentum?: string | null;
    market_size?: string | null;
    created_at: string;
  };
};

export default function TrendHero({ trend }: TrendHeroProps) {
  return (
    <>
      <section className="glass rounded-3xl p-8 lg:p-12 mb-10 overflow-hidden relative">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none" />

        <div className="relative">

          <div className="flex flex-wrap items-center gap-3 mb-6">

            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              {trend.category}
            </span>

            <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
              🔥 Score {trend.score}
            </span>

            {trend.momentum && (
              <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                🚀 {trend.momentum}
              </span>
            )}

          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
            {trend.title}
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            {trend.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">

            <div>
              📅 Last Updated{" "}
              {new Date(trend.created_at).toLocaleDateString()}
            </div>

            <div>🤖 AI Powered Analysis</div>

            {trend.market_size && (
              <div>💰 Market {trend.market_size}</div>
            )}

          </div>

        </div>

      </section>
    </>
  );
}