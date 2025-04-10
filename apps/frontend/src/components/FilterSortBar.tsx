"use client";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface FilterSortBarProps {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const FilterSortBar = ({
  categories,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}: FilterSortBarProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-[#e8e4d9] p-4 rounded-lg">
      <div className="mb-4 md:mb-0">
        <span className="font-medium text-[#1a3a3a] mr-2">Filtrar por:</span>
        <select
          className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#d98c53]"
          value={activeCategory || ""}
          onChange={(e) => setActiveCategory(e.target.value || null)}
        >
          <option value="">Todas las categorías</option>
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
          className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#d98c53]"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">Destacados</option>
          <option value="price-low">Precio: Menor a Mayor</option>
          <option value="price-high">Precio: Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;
