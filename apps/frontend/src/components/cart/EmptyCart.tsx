"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  slug: string;
}

interface EmptyCartProps {
  recommendedProducts: Product[];
}

const EmptyCart = ({ recommendedProducts }: EmptyCartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="text-center py-10">
        {/* Icono de carrito vacío */}
        <div className="mx-auto w-32 h-32 bg-[#e8e4d9] rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-[#1a3a3a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#1a3a3a] mb-2">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Parece que aún no has añadido ninguna antigüedad sobrenatural a tu
          carrito.
        </p>

        <Link
          href="/coleccion"
          className="inline-block bg-[#d98c53] text-white px-8 py-3 rounded font-medium hover:bg-opacity-90 transition-colors"
        >
          Explorar colección
        </Link>

        <p className="mt-6 text-gray-500 italic text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="text-[#d98c53]">
            Inicia sesión
          </Link>{" "}
          para ver tus productos guardados
        </p>
      </div>

      {/* Productos recomendados */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#1a3a3a] text-center mb-6">
            Podrían interesarte
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-[#1a3a3a] relative">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#d1c5a5]">
                      [Imagen]
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-[#1a3a3a]">{product.name}</h4>
                  <p className="text-gray-500 italic text-sm mb-2">
                    {product.description}
                  </p>
                  <p className="text-[#d98c53] font-bold">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyCart;
