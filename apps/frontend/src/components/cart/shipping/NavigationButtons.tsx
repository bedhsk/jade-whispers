"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface NavigationButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onContinue,
  continueDisabled = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <button
        onClick={onBack}
        className="py-3 px-6 border-2 border-[#1a3a3a] text-[#1a3a3a] font-semibold rounded-lg hover:bg-[#f5f2e8] transition-colors"
      >
        REGRESAR
      </button>

      <button
        onClick={onContinue}
        disabled={continueDisabled}
        className={`py-3 px-6 bg-[#d98c53] text-white font-semibold rounded-lg 
          hover:bg-[#c67b42] transition-colors ${
            continueDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        CONTINUAR A PAGO
      </button>
    </div>
  );
};

export default NavigationButtons;
