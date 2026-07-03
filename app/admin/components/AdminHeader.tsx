type Props = {
  onLogout: () => void;
};

export default function AdminHeader({
  onLogout,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-5xl font-bold">
        Admin Dashboard
      </h1>

      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl transition"
      >
        Logout
      </button>
    </div>
  );
}