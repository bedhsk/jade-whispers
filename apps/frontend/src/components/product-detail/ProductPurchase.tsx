"use client";

import { useState } from "react";

interface ProductPurchaseProps {
  onAddToCart: (quantity: number) => void;
  stock?: number;
}

const ProductPurchase = ({ onAddToCart }: ProductPurchaseProps) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  const handleAddToFavorites = () => {
    console.log("Añadido a favoritos");
    // Implementar lógica para añadir a favoritos
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      console.log("Web Share API no soportada");
      // Implementar un fallback para navegadores que no soportan Web Share API
    }
  };

  return (
    <div className="product-purchase">
      <div className="quantity-selector flex items-center mb-6">
        <span className="text-[#1a3a3a] mr-4">Cantidad:</span>

        <div className="flex">
          <button
            onClick={decreaseQuantity}
            className="bg-[#1a3a3a] text-white w-8 h-8 flex items-center justify-center rounded-l"
            aria-label="Disminuir cantidad"
          >
            -
          </button>

          <div className="w-10 h-8 flex items-center justify-center border-t border-b border-[#1a3a3a]">
            {quantity}
          </div>

          <button
            onClick={increaseQuantity}
            className="bg-[#1a3a3a] text-white w-8 h-8 flex items-center justify-center rounded-r"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-[#d98c53] text-white py-3 rounded font-medium hover:bg-opacity-90 transition-colors mb-4"
      >
        AÑADIR AL CARRITO
      </button>

      <div className="flex gap-4">
        <button
          onClick={handleAddToFavorites}
          className="flex-1 border border-[#1a3a3a] text-[#1a3a3a] py-2 rounded font-medium hover:bg-[#e8e4d9] transition-colors"
        >
          Añadir a favoritos
        </button>

        <button
          onClick={handleShare}
          className="flex-1 border border-[#1a3a3a] text-[#1a3a3a] py-2 rounded font-medium hover:bg-[#e8e4d9] transition-colors"
        >
          Compartir
        </button>
      </div>
    </div>
  );
};

export default ProductPurchase;
