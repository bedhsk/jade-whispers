"use client";

import React from "react";

interface ShippingAddressProps {
  address: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ address }) => {
  // Dirección formateada
  const formattedAddress = `${address.address}, ${address.city}, ${address.postalCode}`;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-2">Envío a</h2>
      <div className="space-y-1">
        <p className="text-[#254040]">{address.fullName}</p>
        <p className="text-[#254040]">{formattedAddress}</p>
        <p className="text-[#254040]">{address.phone}</p>
      </div>
    </div>
  );
};

export default ShippingAddress;
