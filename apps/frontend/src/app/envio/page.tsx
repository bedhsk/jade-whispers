"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/cart/ProgressBar";
import ShippingForm, {
  ShippingFormData,
} from "@/components/cart/shipping/ShippingForm";
import OrderSummary from "@/components/cart/shipping/OrderSummary";
import NavigationButtons from "@/components/cart/shipping/NavigationButtons";

// Constantes
const INSURANCE_PRICE = 99;
const SHIPPING_PRICE = 150;

// Demo productos (en una app real, esto vendría de un contexto o API)
const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Estatuilla de Jade Dinastía Ming",
    description: "Una auténtica pieza de la historia china.",
    price: 4999.99,
    quantity: 1,
    imageUrl: "/images/product-1.jpg",
    supernaturalEffect: "Susurros del Pasado",
  },
  {
    id: 2,
    name: "Jarrón Cerámica Era Song",
    description: "Diseño tradicional con patrones de dragón.",
    price: 3599.99,
    quantity: 1,
    imageUrl: "/images/product-2.jpg",
    supernaturalEffect: "Armonía del Hogar",
  },
  {
    id: 3,
    name: "Amuleto de Bronce Antiguo",
    description: "Un talismán de buena fortuna.",
    price: 1299.99,
    quantity: 1,
    imageUrl: "/images/product-3.jpg",
    supernaturalEffect: "Protección Ancestral",
  },
];

export default function ShippingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingFormData | null>(
    null
  );
  const [formValid, setFormValid] = useState(false);

  // Calcular subtotal
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Simulación de carga de datos
  useEffect(() => {
    // En una app real, aquí cargaríamos el carrito y la información de envío guardada
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // Intenta recuperar información de envío guardada
    const savedShippingInfo = localStorage.getItem("shippingInfo");
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
      setFormValid(true);
    }

    // Intenta recuperar estado del seguro
    const insuranceState = localStorage.getItem("hasInsurance");
    if (insuranceState) {
      setHasInsurance(insuranceState === "true");
    }
  }, []);

  // Manejar envío del formulario
  const handleShippingFormSubmit = (data: ShippingFormData) => {
    setShippingInfo(data);
    setFormValid(true);
    // Guardar en localStorage para persistencia
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

  // Navegación
  const handleBack = () => {
    router.push("/carrito");
  };

  const handleContinue = () => {
    if (formValid && shippingInfo) {
      // En una app real, guardaríamos la información en el backend
      router.push("/pago");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-8 bg-[#f8f8f8]">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-[#1a3a3a] text-center mb-8">
              Información de Envío
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
      <main className="min-h-screen py-8 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          {/* Barra de progreso */}
          <ProgressBar currentStep="envio" />

          <h1 className="text-3xl font-bold text-[#1a3a3a] text-center mb-8">
            Información de Envío
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Formulario de dirección */}
              <ShippingForm onSubmit={handleShippingFormSubmit} />
            </div>

            <div>
              {/* Resumen del pedido */}
              <OrderSummary
                products={products}
                subtotal={subtotal}
                hasInsurance={hasInsurance}
                insurancePrice={INSURANCE_PRICE}
                shippingPrice={SHIPPING_PRICE}
              />

              {/* Botones de navegación */}
              <NavigationButtons
                onBack={handleBack}
                onContinue={handleContinue}
                continueDisabled={!formValid}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
