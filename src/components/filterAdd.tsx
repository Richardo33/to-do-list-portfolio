"use client";

interface FilterBarProps {
  filter: string;
  setFilter: (f: string) => void;
  categories: string[];
  onAdd: () => void;
}

export default function FilterBar({
  filter,
  setFilter,
  categories,
  onAdd,
}: FilterBarProps) {
  return (
    <div className="flex justify-between items-center gap-2 mb-4">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("All")}
          className={`px-3 py-1 rounded ${
            filter === "All"
              ? "bg-white text-[#184A7E]"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded ${
              filter === cat
                ? "bg-white text-[#184A7E]"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="px-4 py-1 bg-[#117bd5] hover:bg-[#0f6ab7] rounded text-white"
      >
        Add Task
      </button>
    </div>
  );
}
