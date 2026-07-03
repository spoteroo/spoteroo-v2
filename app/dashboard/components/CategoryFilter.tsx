type CategoryFilterProps = {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={
            selected === category
              ? "bg-blue-600 px-4 py-2 rounded-xl"
              : "glass px-4 py-2 rounded-xl"
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}