"use client";

import Link from "next/link";
import Image from "next/image";

interface FeaturedStoryProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  slug: string;
}

const FeaturedStory = ({
  id,
  title,
  excerpt,
  author,
  date,
  category,
  imageUrl,
  slug,
}: FeaturedStoryProps) => {
  return (
    <div className="bg-[#1a3a3a] rounded-lg overflow-hidden mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Imagen */}
        <div className="h-64 md:h-full relative bg-[#1a3a3a] flex items-center justify-center">
          {imageUrl ? (
            <Link
              href={`/historias/${slug}`}
              className="block w-full h-full relative"
            >
              <Image src={imageUrl} alt={title} fill className="object-cover" />
            </Link>
          ) : (
            <div className="text-[#d1c5a5] text-center p-4">
              [Imagen de historia destacada]
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-8">
          <div className="text-[#d98c53] uppercase text-sm font-semibold mb-2">
            DESTACADO
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#d1c5a5] mb-4">
            <Link
              href={`/historias/${slug}`}
              className="hover:text-[#d98c53] transition-colors"
            >
              {title}
            </Link>
          </h2>
          <p className="text-[#d1c5a5] mb-6">{excerpt}</p>

          <div className="text-[#e8e4d9] mb-2">Por: {author}</div>
          <div className="text-[#d1c5a5] text-sm mb-6">
            {date} | Categoría: {category}
          </div>

          <Link
            href={`/historias/${slug}`}
            className="inline-block border border-[#d1c5a5] text-[#d1c5a5] px-6 py-2 rounded hover:bg-[#d1c5a5] hover:text-[#1a3a3a] transition-colors"
          >
            Leer más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStory;
