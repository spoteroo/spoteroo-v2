import { supabase } from "@/lib/supabase";
import SubmissionsClient from "./SubmissionsClient";

export default async function SubmissionsPage() {
  const { data: submissions, error } = await supabase
    .from("trend_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">
          Error loading submissions
        </h1>

        <p className="mt-2 text-red-500">
          {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Trend Submissions
      </h1>

      <SubmissionsClient
        submissions={submissions || []}
      />
    </main>
  );
}