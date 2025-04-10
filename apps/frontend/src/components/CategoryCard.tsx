"use client";

import Link from "next/link";

interface CategoryCardProps {
  id: number;
  name: string;
  imageUrl?: string;
  slug?: string;
}

const CategoryCard = ({ id, name, imageUrl, slug = "" }: CategoryCardProps) => {
  return (
    <Link href={`/coleccion?categoria=${slug || id}`} className="block">
      <div className="flex flex-col">
        <div className="bg-[#1a3a3a] h-40 rounded-lg flex items-center justify-center text-[#d1c5a5]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Categoría ${name}`}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-center">[Imagen de categoría]</p>
          )}
        </div>
        <div className="bg-[#e8e4d9] py-3 px-2 text-center mt-2 rounded-sm">
          <h3 className="font-medium text-[#1a3a3a] text-lg">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
