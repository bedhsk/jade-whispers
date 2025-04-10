"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import TestimonialSection from "@/components/TestimonialSection";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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

  // Datos de ejemplo para los productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: "Jarrón Dinastía Ming",
      price: 1899,
      imageUrl: "/images/product-1.jpg",
      description: "Escucha susurros del pasado...",
      slug: "jarron-dinastia-ming",
    },
    {
      id: 2,
      name: "Figura de Jade Imperial",
      price: 2499,
      imageUrl: "/images/product-2.jpg",
      description: "Consejos financieros a las 3AM",
      slug: "figura-jade-imperial",
    },
    {
      id: 3,
      name: "Abanico de la Corte Qing",
      price: 1299,
      imageUrl: "/images/product-3.jpg",
      description: "Genera brisas y maldiciones leves",
      slug: "abanico-corte-qing",
    },
    {
      id: 4,
      name: "Tetera de Porcelana",
      price: 899,
      imageUrl: "/images/product-4.jpg",
      description: "Apariciones nocturnas garantizadas",
      slug: "tetera-porcelana",
    },
  ];

  // Datos de ejemplo para los testimonios
  const testimonials = [
    {
      id: 1,
      text: "Mi jarrón Ming organiza mi librero cuando duermo",
      author: "Zhang Wei",
      since: "Cliente desde 2023",
    },
    {
      id: 2,
      text: "Mi figura de jade me da consejos financieros",
      author: "Lin Mei",
      since: "Cliente desde 2024",
    },
    {
      id: 3,
      text: "Mi tetera invoca a un anciano que solo habla en acertijos y me roba galletas",
      author: "Huang Li",
      since: "Cliente desde 2024",
    },
  ];

  return (
    <>
      <Header />
      <main className="pb-12">
        {/* Hero Banner */}
        <div className="container mx-auto px-4 py-8">
          <HeroBanner />
        </div>

        {/* Categories Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-[#1a3a3a]">
              CATEGORÍAS SOBRENATURALES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  imageUrl={category.imageUrl}
                  slug={category.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 bg-[#f8f8f8]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-[#1a3a3a]">
              ANTIGÜEDADES DESTACADAS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
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
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <TestimonialSection testimonials={testimonials} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
