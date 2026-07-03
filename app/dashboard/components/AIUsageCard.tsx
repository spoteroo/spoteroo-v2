type AIUsageCardProps = {
  aiUsageToday: number;
};

export default function AIUsageCard({
  aiUsageToday,
}: AIUsageCardProps) {
  return (
    <div className="glass p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">
  Today&apos;s AI Usage
</h2>

      <p className="text-5xl font-bold text-blue-400">
        {aiUsageToday}
      </p>

      <div className="w-full bg-slate-800 rounded-full h-3 mt-6">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all"
          style={{
            width: `${Math.min(aiUsageToday, 100)}%`,
          }}
        />
      </div>

      <p className="text-slate-400 mt-4">
        AI generations today
      </p>
    </div>
  );
}