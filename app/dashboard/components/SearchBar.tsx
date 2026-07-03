type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search trends..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        glass
        w-full
        p-4
        rounded-xl
        mb-6
        outline-none
      "
    />
  );
}