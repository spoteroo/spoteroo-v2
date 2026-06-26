export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}