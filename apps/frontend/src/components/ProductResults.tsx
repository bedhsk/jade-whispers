"use client";

import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  slug?: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ProductResultsProps {
  products: Product[];
  activeCategory: string | null;
  categories: Category[];
  resetFilter: () => void;
}

const ProductResults = ({
  products,
  activeCategory,
  categories,
  resetFilter,
}: ProductResultsProps) => {
  // Encuentra el nombre de la categoría activa
  const activeCategoryName = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.name
    : null;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1a3a3a]">
          {activeCategoryName || "Todas las Antigüedades"}
        </h2>
        <p className="text-[#1a3a3a]">{products.length} productos</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              slug={product.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-[#1a3a3a]">
            No se encontraron productos en esta categoría.
          </p>
          <button
            onClick={resetFilter}
            className="mt-4 bg-[#d98c53] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Ver todas las antigüedades
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductResults;
