// components/shipping/OrderSummary.tsx
"use client";

import React from "react";
import Image from "next/image";

// Tipos
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  supernaturalEffect?: string;
}

interface OrderSummaryProps {
  products: Product[];
  subtotal: number;
  hasInsurance: boolean;
  insurancePrice: number;
  shippingPrice: number;
}

// Función para formatear moneda
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  subtotal,
  hasInsurance,
  insurancePrice,
  shippingPrice,
}) => {
  // Calcular total
  const insuranceCost = hasInsurance ? insurancePrice : 0;
  const total = subtotal + insuranceCost + shippingPrice;

  return (
    <div className="bg-[#f5f2e8] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-4">
        Resumen del Pedido
      </h2>

      <div className="border-t border-b border-[#1a3a3a] py-4 mb-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-start mb-4">
            <div className="w-16 h-16 relative mr-3 flex-shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 64px"
                className="rounded object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#254040]">{product.name}</h4>
              <p className="text-sm text-gray-600">
                {product.supernaturalEffect && (
                  <span>Efecto: "{product.supernaturalEffect}"</span>
                )}
              </p>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-gray-600">
                  {product.quantity} x {formatCurrency(product.price)}
                </span>
                <span className="font-semibold text-[#254040]">
                  {formatCurrency(product.price * product.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-[#254040]">Subtotal:</span>
          <span className="text-[#254040]">{formatCurrency(subtotal)}</span>
        </div>

        {hasInsurance && (
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[#254040]">Seguro Anti-Maldición:</span>
              <div className="text-xs text-[#d98c53]">
                Protección garantizada contra efectos secundarios
              </div>
            </div>
            <span className="text-[#254040]">
              {formatCurrency(insurancePrice)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-[#254040]">Envío:</span>
          <span className="text-[#254040]">
            {formatCurrency(shippingPrice)}
          </span>
        </div>
      </div>

      <div className="border-t border-[#1a3a3a] pt-3">
        <div className="flex justify-between">
          <span className="font-bold text-lg text-[#1a3a3a]">Total:</span>
          <span className="font-bold text-lg text-[#1a3a3a]">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
