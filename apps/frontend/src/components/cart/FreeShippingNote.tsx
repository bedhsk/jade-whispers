"use client";

interface FreeShippingNoteProps {
  subtotal: number;
  threshold: number;
}

const FreeShippingNote = ({ subtotal, threshold }: FreeShippingNoteProps) => {
  // Calcular cuánto falta para el envío gratuito
  const remaining = Math.max(0, threshold - subtotal);
  const hasQualified = subtotal >= threshold;

  return (
    <div className="bg-[#e8e4d9] text-[#1a3a3a] p-4 rounded-b-lg text-center">
      {hasQualified ? (
        <>
          <p className="font-medium">¡Has calificado para envío gratuito!</p>
          <p className="text-sm italic mt-1">
            Aplican restricciones en entregas a planos astrales.
          </p>
        </>
      ) : (
        <>
          <p className="font-medium">
            ¡Añade ${remaining.toLocaleString()} más a tu carrito para obtener
            envío gratuito!
          </p>
          <p className="text-sm italic mt-1">
            Envío gratuito en pedidos superiores a ${threshold.toLocaleString()}
            .
          </p>
        </>
      )}
    </div>
  );
};

export default FreeShippingNote;
