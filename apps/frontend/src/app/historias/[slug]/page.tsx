"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoryHeader from "@/components/stories/detail/StoryHeader";
import StoryContent from "@/components/stories/detail/StoryContent";
import SupernaturalExperience from "@/components/stories/detail/SupernaturalExperience";
import SocialShare from "@/components/stories/detail/SocialShare";
import RelatedProduct from "@/components/stories/detail/RelatedProduct";

// Datos de ejemplo para simular una BD
const STORIES_DB = [
  {
    id: 1,
    title: "La tetera que predijo el futuro",
    subtitle: "Un viaje sobrenatural con nuestra Tetera de Porcelana",
    slug: "tetera-predijo-futuro",
    author: "Zhang Wei",
    date: "15 de marzo, 2025",
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
    content: `Todo comenzó una tranquila noche de luna llena. Había adquirido recientemente una preciosa tetera de porcelana de la dinastía Qing en Jade Whispers, atraído no solo por su elegante diseño, sino por la intrigante descripción: "Apariciones nocturnas garantizadas".

Como cualquier persona razonable, asumí que se trataba de una exageración publicitaria ingeniosa, parte del encanto del sitio web. La coloqué en mi estantería y no pensé más en el asunto. Al menos, hasta esa primera noche de luna llena.

A eso de las tres de la madrugada, me despertó un suave tintineo proveniente de la sala de estar. Pensé que mi gato habría tirado algo, pero lo encontré profundamente dormido a los pies de mi cama. El sonido continuó, así que me levanté a investigar.

En la sala, bañada por la luz de la luna, la tetera estaba exactamente donde la había dejado, pero había algo diferente. Un suave vapor salía de su boquilla, formando números en el aire. Al principio pensé que estaba soñando, pero anoté los números en mi teléfono: 07, 15, 23, 32, 41, 48.

A la mañana siguiente, casi había olvidado el extraño incidente, hasta que vi un anuncio de lotería en mi feed de noticias. Por pura curiosidad, comparé los números ganadores con los que había anotado la noche anterior. Eran exactamente los mismos.`,
    imageUrl: "/images/tetera-porcelana.jpg",
    imageAlt: "Tetera de porcelana Dinastía Qing",
    imageCaption:
      "La tetera en cuestión, fotografiada durante el día. Por la noche adquiere un suave brillo azulado.",
    supernaturalExperience:
      "Desde entonces, la tetera ha seguido susurrando números cada luna llena. He ganado tres loterías menores y predije con éxito el resultado de las elecciones locales. Lo más curioso es que ahora mi gato se sienta frente a la tetera todas las noches, como esperando su propia predicción.",
    relatedProduct: {
      id: 4,
      name: "Tetera de Porcelana Dinastía Qing",
      description: "Apariciones nocturnas garantizadas",
      price: 899,
      imageUrl: "/images/product-4.jpg",
      slug: "tetera-porcelana",
    },
  },
  {
    id: 2,
    title: "El jarrón que organiza librerías",
    subtitle: "Cuando tu colección de libros cobra vida propia",
    slug: "jarron-organiza-librerias",
    author: "Lin Mei",
    date: "10 de marzo, 2025",
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
    content: `Siempre he sido una persona desorganizada. Mis libros estaban dispersos por toda la casa, apilados en torres inestables y metidos en cajones al azar. Mi sistema de organización consistía en "ya lo encontraré cuando lo necesite", lo cual rara vez funcionaba.

Todo cambió cuando compré el Jarrón Dinastía Ming de Jade Whispers. Lo compré principalmente por su belleza estética, ignorando por completo la descripción que mencionaba algo sobre "escuchar susurros del pasado y reorganizar tu librería mientras duermes".

La primera semana con el jarrón fue normal. Lo coloqué en un estante vacío de mi caótica biblioteca y seguí con mi vida. Sin embargo, una mañana me desperté y noté algo extraño: todos mis libros de historia estaban perfectamente alineados en la estantería superior, organizados cronológicamente por período histórico.

Pensé que quizás había organizado esos libros y lo había olvidado. Pero la noche siguiente, encontré todos mis libros de ciencia ficción organizados por autor, y los de fantasía por series. Al tercer día, mi colección de novelas clásicas estaba organizada por movimiento literario y año de publicación original.`,
    imageUrl: "/images/jarron-ming.jpg",
    imageAlt: "Jarrón Dinastía Ming",
    imageCaption:
      "El jarrón Ming en mi estudio. He notado que cambia ligeramente de posición cada noche.",
    supernaturalExperience:
      "Una noche me quedé despierto y lo vi en acción. El jarrón emitía un suave resplandor azulado y los libros flotaban gentilmente de un estante a otro. Lo más increíble es que mi sistema de organización ha mejorado tanto que ahora puedo encontrar cualquier libro en segundos. ¡Mi jarrón es mejor bibliotecario que muchos profesionales que conozco!",
    relatedProduct: {
      id: 1,
      name: "Jarrón Dinastía Ming",
      description: "Escucha susurros del pasado...",
      price: 1899,
      imageUrl: "/images/product-1.jpg",
      slug: "jarron-dinastia-ming",
    },
  },
];

export default function StoryDetailPage() {
  const { slug } = useParams();
  const [story, setStory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando una carga de datos
    setLoading(true);

    // Encontrar la historia por slug
    const foundStory = STORIES_DB.find((s) => s.slug === slug);

    if (foundStory) {
      setStory(foundStory);
    }

    setLoading(false);
  }, [slug]);

  // Generar breadcrumbs dinámicamente
  const breadcrumbItems = story
    ? [
        { label: "Inicio", href: "/" },
        { label: "Historias", href: "/historias" },
        {
          label: story.category.name,
          href: `/historias?categoria=${story.category.slug}`,
        },
        { label: story.title, href: `#`, isCurrent: true },
      ]
    : [];

  if (loading) {
    return (
      <>
        <Header />
        <main className="pb-12 pt-6">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!story) {
    return (
      <>
        <Header />
        <main className="pb-12 pt-6">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold text-[#1a3a3a] mb-4">
              Historia no encontrada
            </h1>
            <p className="text-[#1a3a3a] mb-6">
              Lo sentimos, la historia que estás buscando no existe o ha sido
              retirada.
            </p>
            <a
              href="/historias"
              className="bg-[#d98c53] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Volver a las historias
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <Breadcrumbs items={breadcrumbItems} />

      <main className="pb-12">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          {/* Cabecera del artículo */}
          <StoryHeader
            title={story.title}
            subtitle={story.subtitle}
            author={story.author}
            date={story.date}
            category={story.category}
          />

          {/* Contenido del artículo */}
          <StoryContent
            content={story.content}
            imageUrl={story.imageUrl}
            imageAlt={story.imageAlt}
            imageCaption={story.imageCaption}
          />

          {/* Experiencia sobrenatural */}
          <SupernaturalExperience experience={story.supernaturalExperience} />

          {/* Compartir */}
          <SocialShare title={story.title} />

          {/* Producto relacionado */}
          <RelatedProduct {...story.relatedProduct} />
        </article>
      </main>

      <Footer />
    </>
  );
}
