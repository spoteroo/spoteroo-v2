type Props = {
  search: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export default function AdminSearch({
  search,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">

      <input
        type="text"
        placeholder="Search trends..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        className="
          glass-input
          p-4
          rounded-xl
          w-full
        "
      />

      <select
        value={selectedCategory}
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
        className="
          glass-input
          p-4
          rounded-xl
          w-full
        "
      >
        <option value="All">
          All Categories
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

    </div>
  );
}