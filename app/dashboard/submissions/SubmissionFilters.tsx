"use client";

type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

export default function SubmissionFilters({
  filter,
  setFilter,
}: Props) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded ${
          filter === "all"
            ? "bg-gray-500"
            : "bg-gray-700"
        } text-white`}
      >
        All
      </button>

      <button
        onClick={() => setFilter("pending")}
        className={`px-4 py-2 rounded ${
          filter === "pending"
            ? "bg-yellow-500"
            : "bg-yellow-700"
        } text-white`}
      >
        Pending
      </button>

      <button
        onClick={() => setFilter("approved")}
        className={`px-4 py-2 rounded ${
          filter === "approved"
            ? "bg-green-500"
            : "bg-green-700"
        } text-white`}
      >
        Approved
      </button>

      <button
        onClick={() => setFilter("rejected")}
        className={`px-4 py-2 rounded ${
          filter === "rejected"
            ? "bg-red-500"
            : "bg-red-700"
        } text-white`}
      >
        Rejected
      </button>
    </div>
  );
}