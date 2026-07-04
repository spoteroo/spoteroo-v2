"use client";

import { useState } from "react";
import SubmissionFilters from "./SubmissionFilters";

type Submission = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  admin_notes: string | null;
};

export default function SubmissionsClient({
  submissions,
}: {
  submissions: Submission[];
}) {
  const [filter, setFilter] = useState("all");

  const [search, setSearch] =
useState("");

  const filteredSubmissions =
    filter === "all"
      ? submissions
      : submissions.filter(
          (submission) => submission.status === filter
        );
        

  return (
    <>
      <SubmissionFilters
        filter={filter}
        setFilter={setFilter}
      />

      <p className="text-gray-500 mb-6">
        Total submissions: {filteredSubmissions.length}
      </p>

      {filteredSubmissions.map((submission) => (
        <div
          key={submission.id}
          className="border rounded-lg p-4 mb-4"
        >
          <h2 className="font-bold text-lg">
            {submission.title}
          </h2>

          <p className="mt-2">
            {submission.description}
          </p>

          <p className="mt-3">
            <strong>Status:</strong>{" "}
            {submission.status}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {submission.category}
          </p>

          {submission.admin_notes && (
            <p className="mt-3 text-red-500">
              <strong>
                Rejection Reason:
              </strong>{" "}
              {submission.admin_notes}
            </p>
          )}
        </div>
      ))}
    </>
  );
}