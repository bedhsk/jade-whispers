"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionBanner from "@/components/CollectionBanner";
import FilterSortBar from "@/components/FilterSortBar";
import SupernaturalCertificate from "@/components/SupernaturalCertificate";
import ProductResults from "@/components/ProductResults";
import CategoryCard from "@/components/CategoryCard";
import productService, {
  Product,
  PaginatedResponse,
} from "@/services/api/productService";

export default function CollectionPage() {
  const searchParams = useSearchParams();

  // Estado para filtros y productos
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string; imageUrl: string; slug: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener la categoría de los parámetros de URL al cargar la página
  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam) {
      setActiveCategory(categoriaParam);

      // Buscar el ID de la categoría por su slug
      const matchingCategory = categories.find(
        (cat) => cat.slug === categoriaParam
      );
      if (matchingCategory) {
        setActiveCategoryId(matchingCategory.id);
      }
    }
  }, [searchParams, categories]);

  // Cargar categorías
  useEffect(() => {
    // Por ahora usamos datos de ejemplo, pero en una implementación real
    // estos datos vendrían del backend a través de un servicio de categorías
    setCategories([
      {
        id: 1,
        name: "MALDICIONES LEVES",
        imageUrl: "/images/category-1.jpg",
        slug: "maldiciones-leves",
      },
      {
        id: 2,
        name: "FANTASMAS AMIGABLES",
        imageUrl: "/images/category-2.jpg",
        slug: "fantasmas-amigables",
      },
      {
        id: 3,
        name: "CONSEJOS DUDOSOS",
        imageUrl: "/images/category-3.jpg",
        slug: "consejos-dudosos",
      },
      {
        id: 4,
        name: "BRISAS IMPERIALES",
        imageUrl: "/images/category-4.jpg",
        slug: "brisas-imperiales",
      },
    ]);
  }, []);

  // Cargar productos
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        let productsResponse: PaginatedResponse;

        // Aplicar filtros según los criterios seleccionados
        if (activeCategoryId) {
          productsResponse =
            await productService.getProductsByCategory(activeCategoryId);
        } else {
          // Para obtener productos ordenados por destacados primero
          const sortParams =
            sortBy === "featured"
              ? { featured: true }
              : sortBy === "price-low"
                ? { sortBy: "price", sortOrder: "asc" }
                : sortBy === "price-high"
                  ? { sortBy: "price", sortOrder: "desc" }
                  : {};

          productsResponse = await productService.getProducts({
            page: 1,
            limit: 20,
            ...sortParams,
          });
        }

        setProducts(productsResponse.data);
      } catch (err: any) {
        console.error("Error loading products:", err);
        setError(
          "No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [activeCategoryId, sortBy]);

  // Ordenar productos
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return Number(a.price) - Number(b.price);
    if (sortBy === "price-high") return Number(b.price) - Number(a.price);
    if (sortBy === "featured") {
      // Primero los destacados, luego por fecha de creación más reciente
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // Por defecto, orden por fecha de creación
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Función para resetear el filtro
  const resetFilter = () => {
    setActiveCategory(null);
    setActiveCategoryId(null);
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (slug: string, id: number) => {
    setActiveCategory(slug);
    setActiveCategoryId(id);
  };

  return (
    <>
      <Header />
      <main className="pb-12">
        {/* Banner de colección */}
        <CollectionBanner
          title="NUESTRA COLECCIÓN"
          description="Descubre antigüedades chinas con historias sobrenaturales únicas. Cada pieza tiene sus propios poderes y personalidad."
        />

        <div className="container mx-auto px-4 mt-12">
          {/* Categorías */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-[#1a3a3a]">
              Categorías Sobrenaturales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() =>
                    handleCategoryChange(category.slug, category.id)
                  }
                >
                  <CategoryCard
                    id={category.id}
                    name={category.name}
                    imageUrl={category.imageUrl}
                    slug={category.slug}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Filtros y ordenación */}
          <FilterSortBar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={(slug) => {
              const category = categories.find((c) => c.slug === slug);
              if (category) {
                handleCategoryChange(slug, category.id);
              } else {
                resetFilter();
              }
            }}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Resultado de productos filtrados */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-md mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#d98c53] text-white px-4 py-2 rounded"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <ProductResults
              products={sortedProducts.map((product) => ({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                imageUrl:
                  product.images.find((img) => img.isPrimary)?.imageUrl ||
                  "/images/product-placeholder.jpg",
                description:
                  product.comicDescription ||
                  product.description.substring(0, 100),
                slug: product.slug,
                category:
                  product.categories[0]?.category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-") || "sin-categoria",
              }))}
              activeCategory={activeCategory}
              categories={categories}
              resetFilter={resetFilter}
            />
          )}

          {/* Certificación y seguridad */}
          <SupernaturalCertificate />
        </div>
      </main>
      <Footer />
    </>
  );
}
