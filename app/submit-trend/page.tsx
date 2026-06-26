import { submitTrend } from "./actions";

export default function SubmitTrendPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">
        Submit a Trend
      </h1>

      <p className="text-gray-500 mb-8">
        Found an emerging trend? Share it with Spoteroo.
      </p>

      <form action={submitTrend} className="space-y-6">

        <div>
          <label className="block mb-2">
            Trend Title
          </label>

          <input
            name="title"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Description
          </label>

          <textarea
            name="description"
            required
            rows={6}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Source URL
          </label>

          <input
            name="source_url"
            type="url"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Category
          </label>

          <input
            name="category"
            className="w-full border rounded-lg p-3"
            placeholder="AI, SaaS, Creator Economy..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Submit Trend
        </button>

      </form>
    </main>
  );
}