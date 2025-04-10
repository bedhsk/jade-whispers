"use client";

import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  slug?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  description,
  imageUrl,
  slug = "",
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Implementación interna del comportamiento de añadir al carrito
    console.log(`Añadido al carrito: ${name}`);
    // Aquí podrías enviar una petición a una API o usar un contexto global del carrito
  };

  return (
    <div className="flex flex-col">
      <Link href={`/producto/${slug || id}`} className="block">
        <div className="bg-[#1a3a3a] h-64 rounded-lg flex items-center justify-center text-[#d1c5a5]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-[#d1c5a5]">[Imagen producto]</p>
          )}
        </div>
      </Link>

      <div className="bg-[#e8e4d9] p-4 rounded-sm mt-2">
        <Link href={`/producto/${slug || id}`}>
          <h3 className="font-medium text-[#1a3a3a] text-lg">{name}</h3>
          <p className="text-[#1a3a3a] italic text-sm mb-3">{description}</p>
        </Link>

        <div className="flex justify-between items-center">
          <span className="text-[#d98c53] font-bold text-xl">
            ${price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-[#1a3a3a] text-[#d1c5a5] px-6 py-2 rounded-md hover:bg-[#254040] transition-colors"
          >
            AÑADIR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
