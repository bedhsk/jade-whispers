"use client";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface StoriesFilterBarProps {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const StoriesFilterBar = ({
  categories,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}: StoriesFilterBarProps) => {
  return (
    <div className="bg-[#e8e4d9] p-4 md:p-6 rounded-lg mb-10 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <span className="font-medium text-[#1a3a3a] mr-2">
          Filtrar por categoría:
        </span>
        <select
          className="bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d98c53]"
          value={activeCategory || ""}
          onChange={(e) => setActiveCategory(e.target.value || null)}
        >
          <option value="">Todas las historias</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="font-medium text-[#1a3a3a] mr-2">Ordenar por:</span>
        <select
          className="bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d98c53]"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguos</option>
          <option value="popular">Más populares</option>
        </select>
      </div>
    </div>
  );
};

export default StoriesFilterBar;
