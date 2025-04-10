"use client";

import Link from "next/link";

interface ProductInfoProps {
  category: {
    name: string;
    slug: string;
  };
  name: string;
  price: number;
  supernaturalPowers: string;
  paranormalActivityLevel: number; // 0-100
  details: {
    [key: string]: string;
  };
}

const ProductInfo = ({
  category,
  name,
  price,
  supernaturalPowers,
  paranormalActivityLevel,
  details,
}: ProductInfoProps) => {
  return (
    <div className="product-info">
      <Link
        href={`/coleccion/${category.slug}`}
        className="text-[#d98c53] text-sm font-medium uppercase hover:underline"
      >
        {category.name}
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-[#1a3a3a] mt-3 mb-2">
        {name}
      </h1>

      <div className="text-xl md:text-2xl font-bold text-[#d98c53] mb-4">
        ${price.toLocaleString()}
      </div>

      <div className="border-t border-gray-200 my-4 pt-4"></div>

      <div className="mb-6">
        <h2 className="text-[#1a3a3a] font-medium mb-2">
          Poderes Sobrenaturales:
        </h2>
        <p className="text-[#1a3a3a] italic">"{supernaturalPowers}"</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-[#1a3a3a]">Nivel de actividad paranormal:</span>
          <span className="text-[#1a3a3a] font-medium">
            {paranormalActivityLevel < 30
              ? "Bajo"
              : paranormalActivityLevel < 70
                ? "Medio"
                : "Alto"}
          </span>
        </div>
        <div className="w-full bg-[#e8e4d9] rounded-full h-2.5">
          <div
            className="bg-[#d98c53] h-2.5 rounded-full"
            style={{ width: `${paranormalActivityLevel}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex">
            <span className="text-[#1a3a3a]">{key}: </span>
            <span className="text-[#1a3a3a] font-medium ml-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
