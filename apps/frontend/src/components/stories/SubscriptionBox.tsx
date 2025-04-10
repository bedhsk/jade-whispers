"use client";

import { useState } from "react";

const SubscriptionBox = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulando una petición a API
    setTimeout(() => {
      if (email && email.includes("@")) {
        setIsSuccess(true);
        setEmail("");
      } else {
        setError("Por favor, introduce un email válido");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-[#1a3a3a] rounded-lg p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-[#d1c5a5] mb-3">
        Suscríbete a nuestras historias sobrenaturales
      </h3>
      <p className="text-[#d1c5a5] mb-6">
        Recibe nuevas historias en tu correo y consejos para manejar tus propias
        antigüedades encantadas
      </p>

      {isSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ¡Gracias por suscribirte! Pronto recibirás nuestras historias
          paranormales.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              className="w-full px-4 py-3 rounded border-0 focus:ring-2 focus:ring-[#d98c53]"
              disabled={isSubmitting}
            />
            {error && <p className="mt-1 text-red-300 text-sm">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-[#d98c53] text-white px-6 py-3 rounded font-medium hover:bg-opacity-90 transition-colors disabled:opacity-75"
            disabled={isSubmitting}
          >
            {isSubmitting ? "ENVIANDO..." : "SUSCRIBIRME"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SubscriptionBox;
