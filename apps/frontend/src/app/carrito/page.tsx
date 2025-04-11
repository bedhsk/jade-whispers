"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/cart/ProgressBar";
import CartTable from "@/components/cart/CartTable";
import AntiCurseInsurance from "@/components/cart/AntiCurseInsurance";
import OrderSummary from "@/components/cart/OrderSummary";
import FreeShippingNote from "@/components/cart/FreeShippingNote";
import EmptyCart from "@/components/cart/EmptyCart";

// Constantes
const INSURANCE_PRICE = 99;
const FREE_SHIPPING_THRESHOLD = 2500;

// Tipos
interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  categorySlug: string;
  slug: string;
}

// Datos de ejemplo
const DEMO_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Jarrón Dinastía Ming",
    description: "Escucha susurros del pasado...",
    price: 1899,
    quantity: 1,
    imageUrl: "/images/product-1.jpg",
    category: "Fantasmas Amigables",
    categorySlug: "fantasmas-amigables",
    slug: "jarron-dinastia-ming",
  },
  {
    id: 2,
    name: "Tetera de Porcelana",
    description: "Apariciones nocturnas garantizadas",
    price: 899,
    quantity: 1,
    imageUrl: "/images/product-4.jpg",
    category: "Fantasmas Amigables",
    categorySlug: "fantasmas-amigables",
    slug: "tetera-porcelana",
  },
];

// Productos recomendados para el carrito vacío
const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    name: "Jarrón Dinastía Ming",
    description: "Escucha susurros del pasado...",
    price: 1899,
    imageUrl: "/images/product-1.jpg",
    slug: "jarron-dinastia-ming",
  },
  {
    id: 2,
    name: "Tetera de Porcelana",
    description: "Apariciones nocturnas garantizadas",
    price: 899,
    imageUrl: "/images/product-4.jpg",
    slug: "tetera-porcelana",
  },
  {
    id: 3,
    name: "Figura de Jade Imperial",
    description: "Consejos financieros a las 3AM",
    price: 2499,
    imageUrl: "/images/product-2.jpg",
    slug: "figura-jade-imperial",
  },
];

export default function CartPage() {
  // Estado para los items del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Estado para el seguro anti-maldición
  const [hasInsurance, setHasInsurance] = useState(false);

  // Estado para cargar la información del carrito
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Cargar datos del carrito (simulado)
  useEffect(() => {
    // Simulando una carga desde localStorage o una API
    setTimeout(() => {
      // Descomentar esta línea para probar el carrito vacío
      // setCartItems([]);

      // Descomentar esta línea para probar el carrito con items
      setCartItems(DEMO_CART_ITEMS);

      setIsLoading(false);
    }, 500);

    // Recuperar estado del seguro si existe
    const insuranceState = localStorage.getItem("hasInsurance");
    if (insuranceState) {
      setHasInsurance(insuranceState === "true");
    }
  }, []);

  // Calcular el subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Actualizar cantidad de un producto
  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Eliminar un producto del carrito
  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Manejar el seguro anti-maldición
  const handleToggleInsurance = (isSelected: boolean) => {
    setHasInsurance(isSelected);
    localStorage.setItem("hasInsurance", String(isSelected));
  };

  // Renderizar estado de carga
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-[#1a3a3a] text-center mb-8">
              Tu Carrito
            </h1>
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d98c53]"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Barra de progreso */}
          <ProgressBar currentStep="carrito" />

          <h1 className="text-3xl font-bold text-[#1a3a3a] text-center mb-8">
            Tu Carrito
          </h1>

          {cartItems.length === 0 ? (
            // Carrito vacío
            <EmptyCart recommendedProducts={RECOMMENDED_PRODUCTS} />
          ) : (
            // Carrito con productos
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Tabla de productos */}
                <CartTable
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />

                {/* Seguro Anti-Maldición */}
                <AntiCurseInsurance
                  price={INSURANCE_PRICE}
                  isSelected={hasInsurance}
                  onToggle={handleToggleInsurance}
                />

                {/* Nota de envío gratuito (solo móvil) */}
                <div className="lg:hidden mt-6">
                  <FreeShippingNote
                    subtotal={subtotal}
                    threshold={FREE_SHIPPING_THRESHOLD}
                  />
                </div>
              </div>

              <div>
                {/* Resumen del pedido */}
                <OrderSummary
                  subtotal={subtotal}
                  insurancePrice={INSURANCE_PRICE}
                  hasInsurance={hasInsurance}
                  shippingPrice={null}
                  freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
                />

                <button
                  onClick={() => router.push("/envio")}
                  className="w-full bg-[#1a3a3a] text-white py-2 px-4 rounded mt-4 hover:bg-[#d98c53]"
                >
                  Continuar al envío
                </button>

                {/* Nota de envío gratuito (solo desktop) */}
                <div className="hidden lg:block mt-6">
                  <FreeShippingNote
                    subtotal={subtotal}
                    threshold={FREE_SHIPPING_THRESHOLD}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
