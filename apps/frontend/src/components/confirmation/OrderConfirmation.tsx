"use client";

import React from "react";

interface OrderConfirmationProps {
  orderId: string;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      {/* Ícono de éxito */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full bg-[#d1c5a5] flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#1a3a3a] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1c5a5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Mensaje de confirmación */}
      <h1 className="text-3xl font-bold text-[#1a3a3a] mb-2">
        ¡Pedido Confirmado!
      </h1>
      <p className="text-[#254040] text-lg mb-6">
        Tu pedido <span className="font-semibold">#{orderId}</span> ha sido
        procesado con éxito.
      </p>

      {/* Nota de agradecimiento */}
      <p className="text-[#254040] max-w-md mx-auto mb-4">
        Gracias por tu compra en Jade Whispers. Te enviaremos un correo con los
        detalles de tu pedido.
      </p>
    </div>
  );
};

export default OrderConfirmation;
