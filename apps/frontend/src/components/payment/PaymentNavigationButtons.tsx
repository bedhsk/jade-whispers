// components/payment/PaymentNavigationButtons.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentNavigationButtonsProps {
  onBack: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
}

const PaymentNavigationButtons: React.FC<PaymentNavigationButtonsProps> = ({
  onBack,
  onSubmit,
  submitDisabled = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (submitDisabled || isProcessing) return;

    setIsProcessing(true);

    // Simulación de procesamiento de pago
    try {
      // Esperar para simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSubmit();
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <button
        onClick={onBack}
        disabled={isProcessing}
        className={`py-3 px-6 border-2 border-[#1a3a3a] text-[#1a3a3a] font-semibold rounded-lg 
          hover:bg-[#f5f2e8] transition-colors ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        REGRESAR
      </button>

      <button
        onClick={handleSubmit}
        disabled={submitDisabled || isProcessing}
        className={`py-3 px-6 bg-[#d98c53] text-white font-semibold rounded-lg 
          hover:bg-[#c67b42] transition-colors flex justify-center items-center ${
            submitDisabled || isProcessing
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            PROCESANDO...
          </>
        ) : (
          "CONFIRMAR PAGO"
        )}
      </button>
    </div>
  );
};

export default PaymentNavigationButtons;
