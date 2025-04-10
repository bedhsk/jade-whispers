"use client";

import Link from "next/link";
import Image from "next/image";

interface RelatedProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  slug: string;
}

const RelatedProduct = ({
  id,
  name,
  description,
  price,
  imageUrl,
  slug,
}: RelatedProductProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-[#1a3a3a] rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-[#254040] rounded-md overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          {imageUrl ? (
            <div className="relative w-full h-full">
              <Image src={imageUrl} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#d1c5a5] text-xs">
              [Imagen producto]
            </div>
          )}
        </div>

        <div className="flex-grow text-center md:text-left">
          <h3 className="text-[#d1c5a5] font-bold text-xl mb-2">
            ¿Quieres vivir tu propia experiencia sobrenatural?
          </h3>
          <h4 className="text-[#d1c5a5] mb-1">{name}</h4>
          <p className="text-[#d1c5a5] italic mb-4">{description}</p>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-[#d98c53] font-bold text-2xl mb-3 md:mb-0">
              ${price.toLocaleString()}
            </span>

            <Link
              href={`/producto/${slug}`}
              className="bg-[#d98c53] text-white px-6 py-2 rounded font-medium hover:bg-opacity-90 transition-colors"
            >
              VER PRODUCTO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
