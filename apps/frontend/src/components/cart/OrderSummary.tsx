"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  insurancePrice: number;
  hasInsurance: boolean;
  shippingPrice: number | null;
  freeShippingThreshold: number;
}

const OrderSummary = ({
  subtotal,
  insurancePrice,
  hasInsurance,
  shippingPrice,
  freeShippingThreshold,
}: OrderSummaryProps) => {
  const router = useRouter();

  // Calcular si el envío es gratuito basado en el umbral
  const isFreeShipping = subtotal >= freeShippingThreshold;

  // Calcular el total
  const total =
    subtotal +
    (hasInsurance ? insurancePrice : 0) +
    (isFreeShipping ? 0 : shippingPrice || 0);

  // Manejar el botón de proceder al pago
  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-6">
        Resumen del pedido
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-[#1a3a3a]">Subtotal:</span>
          <span className="text-[#1a3a3a]">${subtotal.toLocaleString()}</span>
        </div>

        {hasInsurance && (
          <div className="flex justify-between">
            <span className="text-[#1a3a3a]">Seguro Anti-Maldición:</span>
            <span className="text-[#1a3a3a]">
              ${insurancePrice.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-[#1a3a3a]">Envío:</span>
          <span className="text-[#1a3a3a]">
            {isFreeShipping
              ? "Gratis"
              : shippingPrice
                ? `$${shippingPrice.toLocaleString()}`
                : "Calculado en el siguiente paso"}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-[#1a3a3a] font-bold text-lg">Total:</span>
            <span className="text-[#1a3a3a] font-bold text-lg">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={handleCheckout}
          className="w-full bg-[#d98c53] text-white py-3 rounded font-medium hover:bg-opacity-90 transition-colors"
        >
          Proceder al pago
        </button>

        <Link
          href="/coleccion"
          className="block w-full text-center border border-[#1a3a3a] text-[#1a3a3a] py-3 rounded font-medium hover:bg-[#e8e4d9] transition-colors"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
