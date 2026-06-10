"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [generatedTrends, setGeneratedTrends] =
    useState<any[]>([]);

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      router.push("/login");
    }
  }, [router]);

  async function sendNewsletter() {
    const response = await fetch(
      "/api/send-newsletter",
      {
        method: "POST",
      }
    );

    const result = await response.json();

    if (result.success) {
      alert("Newsletter sent!");
    } else {
      alert(result.error);
    }
  }

  async function generateTrends() {
    try {
      const response = await fetch(
        "/api/generate-trends",
        {
          method: "POST",
        }
      );

      const result = await response.json();

      console.log(result);

      if (!result.success) {
        alert("Generation failed");
        return;
      }

      const trends = result.trends || [];

setGeneratedTrends([...trends]);

await fetch("/api/save-trends", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ trends }),
});

alert(
  `${trends.length} trends generated and saved`
);

      alert(
        `Generated ${trends.length} trends successfully`
      );
    } catch (error) {
      console.error(error);
      alert("Generation failed");
    }
  }

  function logout() {
    localStorage.removeItem("admin");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={sendNewsletter}
            className="bg-green-600 px-6 py-3 rounded"
          >
            Send Newsletter
          </button>

          <button
            onClick={generateTrends}
            className="bg-blue-600 px-6 py-3 rounded"
          >
            Generate AI Trends
          </button>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Spoteroo Admin
          </h2>

          <p>
            Click Generate AI Trends to create startup trends.
          </p>
        </div>

        {generatedTrends.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Generated Trends
            </h2>

            <div className="space-y-4">
              {generatedTrends.map(
                (trend: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-5 rounded-xl"
                  >
                    <h3 className="text-xl font-bold">
                      {trend.title}
                    </h3>

                    <p className="text-gray-300 mt-2">
                      {trend.description}
                    </p>

                    <p className="text-blue-400 mt-2">
                      {trend.category}
                    </p>

                    <p className="text-green-400 mt-2">
                      Score: {trend.score}
                    </p>

                    <p className="text-gray-500 mt-2">
                      {trend.reason}
                    </p>
                  </div>
                )
              )}
            </div>
          </>
        )}

      </div>
    </main>
  );
}