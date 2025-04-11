"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  categorySlug: string;
  slug: string;
}

interface CartTableProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartTable = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cabecera de la tabla */}
      <div className="bg-[#1a3a3a] text-[#d1c5a5] py-4 px-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <h3 className="font-bold">Producto</h3>
          </div>
          <div className="col-span-3 text-center">
            <h3 className="font-bold">Cantidad</h3>
          </div>
          <div className="col-span-3 text-right">
            <h3 className="font-bold">Precio</h3>
          </div>
        </div>
      </div>

      {/* Filas de productos */}
      <div className="divide-y divide-gray-100">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`py-6 px-6 ${index % 2 === 1 ? "bg-[#f9f9f9]" : ""}`}
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Producto (imagen, nombre, descripción) */}
              <div className="col-span-6 flex space-x-4">
                <div className="w-20 h-20 bg-[#1a3a3a] rounded-md overflow-hidden flex-shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#d1c5a5] text-xs">
                      [Imagen]
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-[#1a3a3a]">{item.name}</h4>
                    <p className="text-gray-500 italic text-sm">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={`/coleccion/${item.categorySlug}`}
                    className="text-[#d98c53] text-sm"
                  >
                    Categoría: {item.category}
                  </Link>
                </div>
              </div>

              {/* Controles de cantidad */}
              <div className="col-span-3">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                    aria-label="Disminuir cantidad"
                  >
                    <span className="text-lg">−</span>
                  </button>

                  <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                    <span className="text-[#1a3a3a] font-medium">
                      {item.quantity}
                    </span>
                  </div>

                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                    aria-label="Aumentar cantidad"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              {/* Precio y botón de eliminar */}
              <div className="col-span-3 text-right">
                <p className="font-bold text-[#1a3a3a] text-lg mb-4">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Eliminar producto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartTable;
