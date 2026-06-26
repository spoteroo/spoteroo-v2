"use client";

export default function PricingPage() {
  return (
    <main className="max-w-6xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-10">
        Spoteroo Pro
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">Monthly</h2>
          <p className="text-4xl mt-4">$49</p>

          <button
            className="mt-6 bg-blue-600 px-6 py-3 rounded-lg"
          >
            Upgrade Monthly
          </button>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">Yearly</h2>

          <button
            className="mt-6 bg-green-600 px-6 py-3 rounded-lg"
          >
            Upgrade Yearly
          </button>
        </div>
      </div>
    </main>
  );
}