"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoriesBanner from "@/components/stories/StoriesBanner";
import StoriesFilterBar from "@/components/stories/StoriesFilterBar";
import FeaturedStory from "@/components/stories/FeaturedStory";
import StoryCard from "@/components/stories/StoryCard";
import SubscriptionBox from "@/components/stories/SubscriptionBox";
import Pagination from "@/components/Pagination";

// Datos de ejemplo para simular una BD
const STORIES_DB = [
  {
    id: 1,
    title: "La tetera que predijo el futuro",
    excerpt:
      "Un cliente nos cuenta cómo su tetera de la dinastía Qing comenzó a susurrar números de lotería ganadores durante las noches de luna llena...",
    author: "Zhang Wei",
    date: "15 de marzo, 2025",
    content: `Todo comenzó una tranquila noche de luna llena. Había adquirido recientemente una preciosa tetera de porcelana...`,
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
    imageUrl: "/images/story-featured.jpg",
    slug: "tetera-predijo-futuro",
    featured: true,
  },
  {
    id: 2,
    title: "El jarrón que organiza librerías",
    excerpt:
      "Mi jarrón Ming desarrolló una obsesión por el orden y ahora reorganiza mi librería mientras duermo...",
    author: "Lin Mei",
    date: "10 de marzo, 2025",
    content: `Siempre he sido una persona desorganizada. Mis libros estaban dispersos por toda la casa...`,
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
    imageUrl: "/images/story-1.jpg",
    slug: "jarron-organiza-librerias",
  },
  {
    id: 3,
    title: "Abanico con mal genio",
    excerpt:
      "Este abanico de la corte Qing genera brisas refrescantes pero también pequeñas maldiciones cuando está de mal humor...",
    author: "Huang Li",
    date: "2 de marzo, 2025",
    content: `Nunca pensé que un objeto pudiera tener personalidad propia, y mucho menos mal genio...`,
    category: {
      name: "Maldiciones Leves",
      slug: "maldiciones-leves",
    },
    imageUrl: "/images/story-2.jpg",
    slug: "abanico-mal-genio",
  },
  {
    id: 4,
    title: "Consejos financieros a las 3 AM",
    excerpt:
      "Mi figura de jade imperial me despierta a las tres de la madrugada para darme consejos de inversión sorprendentemente acertados...",
    author: "Wang Chen",
    date: "25 de febrero, 2025",
    content: `Todo comenzó hace tres meses, cuando compré la figura de jade imperial en Jade Whispers...`,
    category: {
      name: "Consejos Dudosos",
      slug: "consejos-dudosos",
    },
    imageUrl: "/images/story-3.jpg",
    slug: "consejos-financieros-3am",
  },
  {
    id: 5,
    title: "El anciano de los acertijos",
    excerpt:
      "Mi tetera invoca a un anciano que solo habla en acertijos, come mis galletas y deja mensajes crípticos en el espejo del baño...",
    author: "Liu Yun",
    date: "18 de febrero, 2025",
    content: `La primera vez que apareció, casi me da un infarto. Estaba preparándome una taza de té...`,
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
    imageUrl: "/images/story-4.jpg",
    slug: "anciano-acertijos",
  },
  {
    id: 6,
    title: "Mi espejo muestra realidades alternativas",
    excerpt:
      "Desde que compré este espejo de bronce de la dinastía Han, puedo ver versiones alternativas de mí mismo tomando diferentes decisiones...",
    author: "Chen Wei",
    date: "10 de febrero, 2025",
    content: `Al principio pensé que eran alucinaciones. Quizás estaba trabajando demasiado...`,
    category: {
      name: "Brisas Imperiales",
      slug: "brisas-imperiales",
    },
    imageUrl: "/images/story-5.jpg",
    slug: "espejo-realidades-alternativas",
  },
  {
    id: 7,
    title: "La campana que atrae espíritus",
    excerpt:
      "Esta antigua campana de viento no solo produce sonidos relajantes, sino que también atrae a espíritus errantes del vecindario...",
    author: "Sun Li",
    date: "2 de febrero, 2025",
    content: `Siempre he sido escéptico respecto a lo paranormal. Hasta que colgué esa campana...`,
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
    imageUrl: "/images/story-6.jpg",
    slug: "campana-atrae-espiritus",
  },
  {
    id: 8,
    title: "Música que hipnotiza vecinos",
    excerpt:
      "Mi caja de música de la dinastía Han tiene una melodía tan cautivadora que mis vecinos entran en trance cada vez que la abro...",
    author: "Yu Ling",
    date: "25 de enero, 2025",
    content: `Las relaciones con mis vecinos nunca fueron excelentes, hasta que llegó la caja de música...`,
    category: {
      name: "Maldiciones Leves",
      slug: "maldiciones-leves",
    },
    imageUrl: "/images/story-7.jpg",
    slug: "musica-hipnotiza-vecinos",
  },
  {
    id: 9,
    title: "Peine que elimina pesadillas",
    excerpt:
      "Desde que uso este peine de hueso ancestral antes de dormir, mis pesadillas desaparecen pero aparecen en los sueños de mi gato...",
    author: "Zhao Ming",
    date: "18 de enero, 2025",
    content: `Siempre he tenido problemas para dormir. Las pesadillas me han acompañado desde la infancia...`,
    category: {
      name: "Consejos Dudosos",
      slug: "consejos-dudosos",
    },
    imageUrl: "/images/story-8.jpg",
    slug: "peine-elimina-pesadillas",
  },
];

// Datos de ejemplo para las categorías
const CATEGORIES = [
  { id: 1, name: "Maldiciones Leves", slug: "maldiciones-leves" },
  { id: 2, name: "Fantasmas Amigables", slug: "fantasmas-amigables" },
  { id: 3, name: "Consejos Dudosos", slug: "consejos-dudosos" },
  { id: 4, name: "Brisas Imperiales", slug: "brisas-imperiales" },
];

export default function StoriesPage() {
  const searchParams = useSearchParams();

  // Estados para filtros y paginación
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 4; // Número de historias por página

  // Obtener la categoría de los parámetros de URL al cargar la página
  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam) {
      setActiveCategory(categoriaParam);
    }
  }, [searchParams]);

  // Restablecer la página a 1 cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortBy]);

  // Filtrar historias según la categoría seleccionada
  const filteredStories = activeCategory
    ? STORIES_DB.filter((story) => story.category.slug === activeCategory)
    : STORIES_DB;

  // Ordenar historias
  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "oldest") {
      // Convertir fechas (este es un método simple, podría mejorarse)
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortBy === "popular") {
      // Aquí podrías ordenar por popularidad si tuvieras esos datos
      return 0;
    }
    // Por defecto, ordenar por más recientes
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Encontrar la historia destacada
  const featuredStory = STORIES_DB.find((story) => story.featured);

  // Filtrar historias no destacadas para la visualización paginada
  const regularStories = sortedStories.filter(
    (story) => !story.featured || story.id !== featuredStory?.id
  );

  // Calcular historias para la página actual
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = regularStories.slice(
    indexOfFirstStory,
    indexOfLastStory
  );
  const totalPages = Math.ceil(regularStories.length / storiesPerPage);

  // Cambiar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll al inicio de la sección de historias
    window.scrollTo({
      top: document.getElementById("stories-section")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <main className="pb-12">
        {/* Banner de historias */}
        <StoriesBanner
          title="HISTORIAS SOBRENATURALES"
          description="Relatos fascinantes sobre las experiencias de nuestros clientes con nuestras antigüedades y los secretos detrás de cada pieza"
        />

        <div className="container mx-auto px-4 mt-12">
          {/* Filtros */}
          <StoriesFilterBar
            categories={CATEGORIES}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Historia destacada (si existe y no está filtrada por categoría o es de la categoría seleccionada) */}
          {featuredStory &&
            (!activeCategory ||
              featuredStory.category.slug === activeCategory) && (
              <FeaturedStory
                id={featuredStory.id}
                title={featuredStory.title}
                excerpt={featuredStory.excerpt}
                author={featuredStory.author}
                date={featuredStory.date}
                category={featuredStory.category.name}
                imageUrl={featuredStory.imageUrl}
                slug={featuredStory.slug}
              />
            )}

          {/* Título de sección */}
          <h2
            id="stories-section"
            className="text-2xl font-bold text-[#1a3a3a] mb-8"
          >
            {activeCategory
              ? `Historias sobre ${CATEGORIES.find((c) => c.slug === activeCategory)?.name}`
              : "Historias Recientes"}
          </h2>

          {/* Grid de historias */}
          {currentStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentStories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  excerpt={story.excerpt}
                  author={story.author}
                  date={story.date}
                  imageUrl={story.imageUrl}
                  slug={story.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-[#1a3a3a]">
                No se encontraron historias en esta categoría.
              </p>
              <button
                onClick={() => setActiveCategory(null)}
                className="mt-4 bg-[#d98c53] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Ver todas las historias
              </button>
            </div>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {/* Suscripción */}
          <div className="mt-12">
            <SubscriptionBox />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
