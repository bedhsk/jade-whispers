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

export default function CollectionPage() {
  const searchParams = useSearchParams();

  // Estado para filtros
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Obtener la categoría de los parámetros de URL al cargar la página
  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam) {
      setActiveCategory(categoriaParam);
    }
  }, [searchParams]);

  // Datos de ejemplo para las categorías
  const categories = [
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
  ];

  // Datos de ejemplo para los productos
  const products = [
    {
      id: 1,
      name: "Jarrón Dinastía Ming",
      price: 1899,
      imageUrl: "/images/product-1.jpg",
      description: "Escucha susurros del pasado...",
      slug: "jarron-dinastia-ming",
      category: "fantasmas-amigables",
    },
    {
      id: 2,
      name: "Figura de Jade Imperial",
      price: 2499,
      imageUrl: "/images/product-2.jpg",
      description: "Consejos financieros a las 3AM",
      slug: "figura-jade-imperial",
      category: "consejos-dudosos",
    },
    {
      id: 3,
      name: "Abanico de la Corte Qing",
      price: 1299,
      imageUrl: "/images/product-3.jpg",
      description: "Genera brisas y maldiciones leves",
      slug: "abanico-corte-qing",
      category: "maldiciones-leves",
    },
    {
      id: 4,
      name: "Tetera de Porcelana",
      price: 899,
      imageUrl: "/images/product-4.jpg",
      description: "Apariciones nocturnas garantizadas",
      slug: "tetera-porcelana",
      category: "fantasmas-amigables",
    },
    {
      id: 5,
      name: "Espejo de Bronce Antiguo",
      price: 1699,
      imageUrl: "/images/product-5.jpg",
      description: "Refleja tus yos alternativos",
      slug: "espejo-bronce-antiguo",
      category: "maldiciones-leves",
    },
    {
      id: 6,
      name: "Caja de Música Han",
      price: 3299,
      imageUrl: "/images/product-6.jpg",
      description: "Melodías que hipnotizan vecinos",
      slug: "caja-musica-han",
      category: "brisas-imperiales",
    },
    {
      id: 7,
      name: "Peine de Hueso Ancestral",
      price: 799,
      imageUrl: "/images/product-7.jpg",
      description: "Peina pensamientos y pesadillas",
      slug: "peine-hueso-ancestral",
      category: "consejos-dudosos",
    },
    {
      id: 8,
      name: "Campana de Viento Celestial",
      price: 1199,
      imageUrl: "/images/product-8.jpg",
      description: "Atrae espíritus errantes del barrio",
      slug: "campana-viento-celestial",
      category: "brisas-imperiales",
    },
  ];

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    // Por defecto, orden destacados
    return 0;
  });

  // Función para resetear el filtro
  const resetFilter = () => {
    setActiveCategory(null);
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
                  onClick={() => setActiveCategory(category.slug)}
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
            setActiveCategory={setActiveCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Resultado de productos filtrados */}
          <ProductResults
            products={sortedProducts}
            activeCategory={activeCategory}
            categories={categories}
            resetFilter={resetFilter}
          />

          {/* Certificación y seguridad */}
          <SupernaturalCertificate />
        </div>
      </main>
      <Footer />
    </>
  );
}
