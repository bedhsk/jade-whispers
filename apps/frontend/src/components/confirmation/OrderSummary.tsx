"use client";

import React from "react";

interface OrderSummaryProps {
  productsCount: number;
  subtotal: number;
  shippingPrice: number;
  hasInsurance: boolean;
  insurancePrice: number;
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
  productsCount,
  subtotal,
  shippingPrice,
  hasInsurance,
  insurancePrice,
}) => {
  const insuranceCost = hasInsurance ? insurancePrice : 0;
  const total = subtotal + shippingPrice + insuranceCost;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-4">
        Resumen del Pedido
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-[#254040]">{productsCount} Productos</span>
          <span className="text-[#254040]">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#254040]">Envío</span>
          <span className="text-[#254040]">
            {formatCurrency(shippingPrice)}
          </span>
        </div>

        {hasInsurance && (
          <div className="flex justify-between">
            <span className="text-[#d98c53] font-medium">
              Seguro Anti-Maldición
            </span>
            <span className="text-[#d98c53] font-medium">
              {formatCurrency(insurancePrice)}
            </span>
          </div>
        )}

        <div className="border-t border-[#1a3a3a] pt-4 mt-2">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-[#1a3a3a]">Total</span>
            <span className="text-lg font-bold text-[#1a3a3a]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
