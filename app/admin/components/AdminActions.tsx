type Props = {
  onSendNewsletter: () => void;
  onGenerateTrends: () => void;
  onExportCSV: () => void;
  onApproveAll: () => void;
  onRejectAll: () => void;
  onDeleteSelected: () => void;
};

export default function AdminActions({
  onSendNewsletter,
  onGenerateTrends,
  onExportCSV,
  onApproveAll,
  onRejectAll,
  onDeleteSelected,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">

      <button
        onClick={onSendNewsletter}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl transition"
      >
        Send Newsletter
      </button>

      <button
        onClick={onGenerateTrends}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
      >
        Generate AI Trends
      </button>

      <button
        onClick={onExportCSV}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition"
      >
        Export CSV
      </button>

      <button
        onClick={onApproveAll}
        className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl transition"
      >
        Approve All
      </button>

      <button
        onClick={onRejectAll}
        className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl transition"
      >
        Reject All
      </button>

      <button
        onClick={onDeleteSelected}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
      >
        Delete Selected
      </button>

    </div>
  );
}