// components/payment/PaymentOrderSummary.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

// Tipos
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  supernaturalEffect?: string;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface PaymentOrderSummaryProps {
  products: Product[];
  subtotal: number;
  hasInsurance: boolean;
  insurancePrice: number;
  shippingPrice: number;
  shippingAddress: ShippingAddress;
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

const PaymentOrderSummary: React.FC<PaymentOrderSummaryProps> = ({
  products,
  subtotal,
  hasInsurance,
  insurancePrice,
  shippingPrice,
  shippingAddress,
}) => {
  // Estado para mostrar/ocultar detalles de productos
  const [showDetails, setShowDetails] = useState(false);

  // Calcular total
  const insuranceCost = hasInsurance ? insurancePrice : 0;
  const total = subtotal + insuranceCost + shippingPrice;

  // Dirección formateada
  const formattedAddress = `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}`;

  return (
    <div className="bg-[#f5f2e8] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-4">
        Resumen del Pedido
      </h2>

      <div className="border-t border-[#1a3a3a] py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#254040]">{products.length} Productos</span>
          <span className="text-[#254040] font-semibold">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <button
          className="text-[#d98c53] text-sm flex items-center focus:outline-none hover:underline"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "- Ocultar detalles" : "+ Ver detalles"}
        </button>

        {/* Detalles de productos (colapsable) */}
        {showDetails && (
          <div className="mt-3 space-y-4 border-t border-dashed border-[#d1c5a5] pt-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-start">
                <div className="w-12 h-12 relative mr-3 flex-shrink-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 48px"
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#254040]">
                    {product.name}
                  </h4>
                  {product.supernaturalEffect && (
                    <p className="text-xs text-gray-600">
                      Efecto: "{product.supernaturalEffect}"
                    </p>
                  )}
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-600">
                      {product.quantity} x {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm font-medium text-[#254040]">
                      {formatCurrency(product.price * product.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 mb-4 border-b border-[#d1c5a5] pb-4">
        <div className="flex justify-between">
          <span className="text-[#254040]">Subtotal:</span>
          <span className="text-[#254040]">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#254040]">Envío:</span>
          <span className="text-[#254040]">
            {formatCurrency(shippingPrice)}
          </span>
        </div>

        {hasInsurance && (
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[#d98c53] font-medium">
                Seguro Anti-Maldición:
              </span>
              <div className="text-xs text-[#d98c53]">
                Protección garantizada
              </div>
            </div>
            <span className="text-[#d98c53] font-medium">
              {formatCurrency(insurancePrice)}
            </span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between">
          <span className="font-bold text-lg text-[#1a3a3a]">Total:</span>
          <span className="font-bold text-lg text-[#1a3a3a]">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Dirección de envío */}
      <div className="bg-white rounded-lg p-3 border border-[#d1c5a5] mb-4">
        <h3 className="font-semibold text-[#1a3a3a] mb-1">
          Dirección de envío:
        </h3>
        <p className="text-sm text-[#254040]">{shippingAddress.fullName}</p>
        <p className="text-sm text-[#254040]">{formattedAddress}</p>
        <p className="text-sm text-[#254040]">{shippingAddress.phone}</p>
      </div>

      {/* Sellos de seguridad */}
      <div className="flex flex-wrap justify-between mt-4">
        <div className="bg-[#f8f8f8] px-3 py-1 rounded text-xs text-[#254040] font-medium border border-[#d1c5a5]">
          SEGURO
        </div>
        <div className="bg-[#f8f8f8] px-3 py-1 rounded text-xs text-[#254040] font-medium border border-[#d1c5a5]">
          ENCRIPTADO
        </div>
        {hasInsurance && (
          <div className="bg-[#f8f8f8] px-3 py-1 rounded text-xs text-[#d98c53] font-medium border border-[#d1c5a5]">
            ANTI-MALDICIÓN
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOrderSummary;
