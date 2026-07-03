type DashboardHeaderProps = {
  onDiscover: () => void;
  onNewsletter: () => void;
};

export default function DashboardHeader({
  onDiscover,
  onNewsletter,
}: DashboardHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>
      </div>

      <div className="flex gap-4 flex-wrap mb-10">
        <button
          onClick={onDiscover}
          className="bg-blue-600 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          Discover New Trends
        </button>

        <button
          onClick={onNewsletter}
          className="bg-green-600 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        >
          Send Newsletter
        </button>
      </div>
    </>
  );
}