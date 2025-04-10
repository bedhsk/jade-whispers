'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroBanner = () => {
  return (
    <section className="bg-[#1a3a3a] text-[#d1c5a5] rounded-lg overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-12 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Antigüedades con historias que no querrás creer
            </h1>
            <p className="text-xl mb-8 italic">
              Objetos con personalidad y poderes cuestionables
            </p>
            <div>
              <Link 
                href="/coleccion" 
                className="inline-block bg-[#d98c53] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                EXPLORAR COLECCIÓN
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center bg-[#254040] h-full">
            <div className="py-12 px-6 text-center">
              <p className="text-xl">[Imagen de jarrón antiguo]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;