import { submitTrend } from "./actions";

export default function SubmitTrendPage() {
  return (
    <main className="min-h-screen text-white px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Submit a Trend
        </h1>

        <p className="mb-8 text-base sm:text-lg text-slate-400">
          Found an emerging trend? Share it with Spoteroo.
        </p>

        {/* Badges */}

        <div className="mb-8 flex flex-wrap gap-3">
          <span className="glass rounded-full px-4 py-2 text-sm">
            🚀 Community Driven
          </span>

          <span className="glass rounded-full px-4 py-2 text-sm">
            🤖 AI Reviewed
          </span>

          <span className="glass rounded-full px-4 py-2 text-sm">
            📈 Help Discover New Trends
          </span>
        </div>

        {/* Form */}

        <div className="glass rounded-2xl p-6 sm:p-8 lg:p-10">
          <form action={submitTrend} className="space-y-6">
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Trend Title
              </label>

              <input
                name="title"
                required
                className="glass-input w-full rounded-xl p-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Description
              </label>

              <textarea
                name="description"
                required
                rows={6}
                className="glass-input w-full rounded-xl p-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Source URL
              </label>

              <input
                name="source_url"
                type="url"
                className="glass-input w-full rounded-xl p-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Category
              </label>

              <input
                name="category"
                placeholder="AI, SaaS, Creator Economy..."
                className="glass-input w-full rounded-xl p-4 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              Submit Trend
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}