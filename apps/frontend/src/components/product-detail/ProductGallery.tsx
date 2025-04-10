"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: {
    id: number;
    url: string;
    alt: string;
  }[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div className="main-image bg-[#1a3a3a] rounded-md overflow-hidden h-72 md:h-96 flex items-center justify-center mb-4">
        {mainImage.url ? (
          <div className="relative w-full h-full">
            <Image
              src={mainImage.url}
              alt={`${productName} - ${mainImage.alt}`}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="text-[#d1c5a5] text-center p-4">
            [Imagen principal del producto]
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="thumbnails grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setMainImage(image)}
            className={`bg-[#1a3a3a] rounded-md overflow-hidden h-16 w-full flex items-center justify-center transition-all 
              ${mainImage.id === image.id ? "ring-2 ring-[#d98c53]" : "opacity-80 hover:opacity-100"}`}
          >
            {image.url ? (
              <div className="relative w-full h-full">
                <Image
                  src={image.url}
                  alt={`${productName} - ${image.alt} (miniatura)`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="text-[#d1c5a5] text-xs text-center">
                [Miniatura {image.id}]
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
