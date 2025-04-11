"use client";

import { useState } from "react";

interface AntiCurseInsuranceProps {
  price: number;
  isSelected: boolean;
  onToggle: (isSelected: boolean) => void;
}

const AntiCurseInsurance = ({
  price,
  isSelected,
  onToggle,
}: AntiCurseInsuranceProps) => {
  const handleToggle = () => {
    onToggle(!isSelected);
  };

  return (
    <div className="bg-[#1a3a3a] text-[#d1c5a5] p-6 rounded-lg mt-6">
      <div className="flex items-start">
        <div className="mr-4 pt-1">
          <input
            type="checkbox"
            id="anti-curse-insurance"
            checked={isSelected}
            onChange={handleToggle}
            className="h-5 w-5 rounded border-gray-300 text-[#d98c53] focus:ring-[#d98c53]"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="anti-curse-insurance"
            className="text-lg font-bold text-[#d1c5a5] cursor-pointer"
          >
            Añadir Seguro Anti-Maldición
          </label>

          <p className="mt-2 text-sm">
            Protección garantizada contra efectos secundarios no deseados como
            apariciones espectrales o reorganizaciones obsesivas.
          </p>

          <p className="mt-1 text-xs italic text-[#d1c5a5]">
            Incluye certificado oficial de protección paranormal.
          </p>
        </div>

        <div className="ml-4 flex-shrink-0">
          <span className="text-lg font-bold text-[#d98c53]">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default AntiCurseInsurance;
