export default function AboutPage() {
  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="glass p-10">
          <h1
            className="
              text-6xl
              font-bold
              mb-6
              bg-gradient-to-r
              from-white
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            About Spoteroo
          </h1>

          <p className="text-xl text-slate-300 mb-8">
            Spot emerging startup opportunities
            before they become obvious.
          </p>

          <div className="space-y-6 text-slate-300 leading-8">
            <p>
              Spoteroo helps founders,
              investors, builders, and
              innovators discover high-potential
              trends before they reach the
              mainstream.
            </p>

            <p>
              We combine trend discovery,
              startup opportunity analysis,
              market insights, and community
              submissions to identify where the
              next wave of opportunities is
              forming.
            </p>

            <p>
              Every trend includes scoring,
              market context, startup ideas,
              competitor analysis, and risk
              assessments to help you make
              informed decisions faster.
            </p>

            <p>
              Whether you're launching a startup,
              validating an idea, or exploring
              future markets, Spoteroo helps you
              stay ahead of the curve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="glass p-6">
              <h3 className="text-2xl font-bold text-blue-400">
                Discover
              </h3>

              <p className="text-slate-400 mt-2">
                Find emerging trends across
                industries before they become
                crowded.
              </p>
            </div>

            <div className="glass p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Analyze
              </h3>

              <p className="text-slate-400 mt-2">
                Explore startup opportunities,
                competitors, and market
                potential.
              </p>
            </div>

            <div className="glass p-6">
              <h3 className="text-2xl font-bold text-purple-400">
                Build
              </h3>

              <p className="text-slate-400 mt-2">
                Turn trends into products,
                startups, and long-term
                businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}