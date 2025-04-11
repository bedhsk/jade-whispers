"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/cart/ProgressBar";
import OrderConfirmation from "@/components/confirmation/OrderConfirmation";
import OrderSummary from "@/components/confirmation/OrderSummary";
import ShippingAddress from "@/components/confirmation/ShippingAddress";
import DeliveryTime from "@/components/confirmation/DeliveryTime";
import ConfirmationButtons from "@/components/confirmation/ConfirmationButtons";

// Constantes
const INSURANCE_PRICE = 99;
const SHIPPING_PRICE = 150;

// Subtotal simulado (en una app real, esto se pasaría desde un contexto o almacenamiento)
const DEMO_SUBTOTAL = 9899.97;
const DEMO_PRODUCTS_COUNT = 3;

// Dirección de envío demo (en una app real, esto vendría del paso anterior)
const DEMO_SHIPPING_ADDRESS = {
  fullName: "Juan Pérez López",
  address: "Calle Principal 123",
  city: "Ciudad de México",
  postalCode: "03100",
  phone: "+52 55 1234 5678",
};

export default function ConfirmationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string>("");
  const [hasInsurance, setHasInsurance] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(DEMO_SHIPPING_ADDRESS);

  // Simulación de carga de datos
  useEffect(() => {
    const loadOrderData = async () => {
      try {
        // Simular carga de datos
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Intentar recuperar el ID del pedido
        const savedOrderId = localStorage.getItem("orderId");
        if (savedOrderId) {
          setOrderId(savedOrderId);
        } else {
          // Generar un ID si no existe (solo para demostración)
          const generatedId = `J25W-${Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")}`;
          setOrderId(generatedId);
        }

        // Intentar recuperar la dirección de envío
        const savedShippingInfo = localStorage.getItem("shippingInfo");
        if (savedShippingInfo) {
          setShippingAddress(JSON.parse(savedShippingInfo));
        }

        // Intentar recuperar estado del seguro
        const insuranceState = localStorage.getItem("hasInsurance");
        if (insuranceState) {
          setHasInsurance(insuranceState === "true");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        // En caso de error, mostrar un ID genérico
        setOrderId("J25W-000000");
        setLoading(false);
      }
    };

    loadOrderData();

    // Limpiar carrito una vez completado el pedido
    // En una app real, esto se haría a través de una API
    return () => {
      // No limpiamos localStorage para poder probar la página
      // localStorage.removeItem('orderId');
    };
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-8 bg-[#f8f8f8]">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-[#1a3a3a] text-center mb-8">
              Procesando tu pedido
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
          <ProgressBar currentStep="confirmacion" />

          {/* Contenido principal */}
          <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
            {/* Confirmación y mensaje de éxito */}
            <OrderConfirmation orderId={orderId} />

            {/* Línea divisoria */}
            <div className="border-t border-[#d1c5a5] my-8"></div>

            {/* Contenido de dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {/* Resumen del pedido */}
                <OrderSummary
                  productsCount={DEMO_PRODUCTS_COUNT}
                  subtotal={DEMO_SUBTOTAL}
                  shippingPrice={SHIPPING_PRICE}
                  hasInsurance={hasInsurance}
                  insurancePrice={INSURANCE_PRICE}
                />

                {/* Dirección de envío */}
                <ShippingAddress address={shippingAddress} />
              </div>

              <div>
                {/* Tiempo de entrega */}
                <DeliveryTime hasInsurance={hasInsurance} />

                {/* Instrucciones adicionales */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#1a3a3a] mb-3">
                    ¿Qué sigue?
                  </h2>
                  <ul className="space-y-2 text-[#254040] list-disc pl-5">
                    <li>
                      Recibirás un correo con la confirmación de tu pedido.
                    </li>
                    <li>
                      Te enviaremos otro correo cuando tu pedido sea enviado.
                    </li>
                    <li>
                      Los efectos sobrenaturales son garantizados pero
                      impredecibles.
                    </li>
                    {hasInsurance && (
                      <li className="text-[#d98c53]">
                        Tu seguro anti-maldición está activo.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <ConfirmationButtons orderId={orderId} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
