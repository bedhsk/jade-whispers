"use client";

import React from "react";

interface DeliveryTimeProps {
  hasInsurance: boolean;
}

const DeliveryTime: React.FC<DeliveryTimeProps> = ({ hasInsurance }) => {
  return (
    <div className="bg-[#f5f2e8] p-4 rounded-lg border border-[#d1c5a5] mb-8">
      <h3 className="font-bold text-[#1a3a3a] mb-2">
        Tiempo estimado de entrega
      </h3>
      <p className="text-[#254040] mb-1">7-10 días hábiles</p>
      <p className="text-sm text-[#d98c53] italic">
        {hasInsurance
          ? "Nota: Los efectos sobrenaturales pueden manifestarse antes, pero están asegurados."
          : "Nota: Los efectos sobrenaturales pueden manifestarse antes."}
      </p>
    </div>
  );
};

export default DeliveryTime;
