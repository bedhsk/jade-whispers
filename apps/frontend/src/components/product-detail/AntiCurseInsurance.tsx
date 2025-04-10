"use client";

import { useState } from "react";

interface AntiCurseInsuranceProps {
  price: number;
  onToggle: (isSelected: boolean) => void;
}

const AntiCurseInsurance = ({ price, onToggle }: AntiCurseInsuranceProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    onToggle(newState);
  };

  return (
    <div className="bg-[#1a3a3a] text-[#d1c5a5] p-6 rounded-lg flex items-start gap-4">
      <div>
        <input
          type="checkbox"
          id="anti-curse-insurance"
          checked={isSelected}
          onChange={handleToggle}
          className="w-5 h-5 accent-[#d98c53] cursor-pointer mt-1"
        />
      </div>

      <div className="flex-grow">
        <label
          htmlFor="anti-curse-insurance"
          className="text-lg font-medium mb-2 cursor-pointer block"
        >
          Añadir Seguro Anti-Maldición
        </label>
        <p className="text-sm mb-1">
          Protección garantizada contra efectos secundarios no deseados como
          apariciones espectrales o reorganizaciones obsesivas.
        </p>
        <p className="text-xs italic">
          Nota: No cubre daños emocionales causados por consejos financieros
          sobrenaturales.
        </p>
      </div>

      <div className="text-[#d98c53] font-bold text-lg">+${price}</div>
    </div>
  );
};

export default AntiCurseInsurance;
