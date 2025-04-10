"use client";

import Link from "next/link";

const SupernaturalCertificate = () => {
  return (
    <div className="mt-16 bg-[#1a3a3a] text-[#d1c5a5] p-8 rounded-lg">
      <div className="md:flex justify-between items-center">
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold mb-4">
            Certificado de Autenticidad Sobrenatural
          </h3>
          <p className="mb-4">
            Todas nuestras antigüedades incluyen un certificado oficial que
            garantiza la autenticidad de sus poderes sobrenaturales. También
            ofrecemos un seguro anti-maldición por un módico precio adicional.
          </p>
          <Link
            href="/sobre-nosotros"
            className="inline-block border border-[#d1c5a5] px-6 py-2 rounded hover:bg-[#d1c5a5] hover:text-[#1a3a3a] transition-colors"
          >
            Saber más
          </Link>
        </div>
        <div className="mt-6 md:mt-0 md:w-1/3 text-center">
          <div className="bg-[#e8e4d9] text-[#1a3a3a] p-4 rounded-lg inline-block">
            <p className="font-semibold">
              ¿Preguntas sobre efectos secundarios?
            </p>
            <p className="mt-2 italic text-sm">
              Nuestros expertos en fenómenos paranormales están disponibles 24/7
            </p>
            <p className="mt-2 font-bold">+34 123 456 789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupernaturalCertificate;
