"use client";

import Link from "next/link";
import Image from "next/image";

interface StoryCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl?: string;
  slug: string;
}

const StoryCard = ({
  id,
  title,
  excerpt,
  author,
  date,
  imageUrl,
  slug,
}: StoryCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      {/* Imagen */}
      <Link href={`/historias/${slug}`} className="block">
        <div className="h-48 relative bg-[#1a3a3a] flex items-center justify-center">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <div className="text-[#d1c5a5] text-center">
              [Imagen de historia]
            </div>
          )}
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#1a3a3a] mb-2">
          <Link
            href={`/historias/${slug}`}
            className="hover:text-[#d98c53] transition-colors"
          >
            {title}
          </Link>
        </h3>
        <div className="text-gray-600 text-sm mb-3">
          Por: {author} | {date}
        </div>
        <p className="text-[#1a3a3a]">{excerpt}</p>
      </div>
    </div>
  );
};

export default StoryCard;
