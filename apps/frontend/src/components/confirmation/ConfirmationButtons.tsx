"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ConfirmationButtonsProps {
  orderId: string;
}

const ConfirmationButtons: React.FC<ConfirmationButtonsProps> = ({
  orderId,
}) => {
  const router = useRouter();

  const handleViewDetails = () => {
    // En una aplicación real, redirigiría a una página de detalles del pedido
    // Por ahora, simularemos un alert con la información
    alert(`Ver detalles del pedido #${orderId}`);
  };

  const handleContinueShopping = () => {
    // Redireccionar a la página de inicio
    router.push("/");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={handleViewDetails}
        className="px-6 py-3 bg-[#1a3a3a] text-[#d1c5a5] font-medium rounded-lg hover:bg-[#254040] transition-colors"
      >
        VER DETALLES
      </button>

      <button
        onClick={handleContinueShopping}
        className="px-6 py-3 bg-[#d98c53] text-white font-medium rounded-lg hover:bg-[#c67b42] transition-colors"
      >
        SEGUIR COMPRANDO
      </button>
    </div>
  );
};

export default ConfirmationButtons;
