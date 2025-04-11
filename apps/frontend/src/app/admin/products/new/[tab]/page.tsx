"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductFormTabs, {
  TabType,
} from "@/components/admin/products/ProductFormTabs";
import BasicInfoForm, {
  BasicProductInfo,
} from "@/components/admin/products/BasicInfoForm";
import MysticalCharacteristicsForm, {
  MysticalCharacteristics,
} from "@/components/admin/products/MysticalCharacteristicsForm";
import ImagesForm, {
  ImagesFormData,
} from "@/components/admin/products/ImagesForm";
import CategoriesEffectsForm, {
  CategoriesEffectsData,
} from "@/components/admin/products/CategoriesEffectsForm";

// Interfaz para almacenar todos los datos del producto
interface ProductData {
  basicInfo?: BasicProductInfo;
  mysticalCharacteristics?: MysticalCharacteristics;
  images?: ImagesFormData;
  categoriesEffects?: CategoriesEffectsData;
}

export default function ProductRegistrationPage() {
  const router = useRouter();
  const params = useParams();
  const currentTab = (params?.tab || "basic-info") as TabType;

  const [productData, setProductData] = useState<ProductData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Cargar datos del producto si estamos editando uno existente
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(false);

      // Si estamos en modo edición y hay un ID de producto, cargaríamos los datos del producto
      // En este caso lo simulamos con datos en localStorage

      try {
        const savedData = localStorage.getItem("productFormData");
        if (savedData) {
          setProductData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
      }
    };

    loadData();
  }, []);

  // Guardar el progreso del formulario en localStorage
  const saveProgress = (data: ProductData) => {
    localStorage.setItem("productFormData", JSON.stringify(data));
  };

  // Navegar a la siguiente pestaña
  const navigateToTab = (tab: TabType) => {
    router.push(`/admin/products/new/${tab}`);
  };

  // Manejar la finalización del formulario
  const handleFormComplete = async () => {
    setSaveStatus("saving");
    setStatusMessage("Guardando producto...");

    try {
      // Aquí realizaríamos la petición al backend para guardar el producto
      // Simulamos un delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSaveStatus("success");
      setStatusMessage("¡Producto guardado correctamente!");

      // Limpiar datos de localStorage después de guardar
      localStorage.removeItem("productFormData");

      // Redirigir a la lista de productos después de un breve delay
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setSaveStatus("error");
      setStatusMessage(
        "Error al guardar el producto. Por favor, inténtalo de nuevo."
      );
    }
  };

  // Manejadores para cada paso del formulario
  const handleBasicInfoSave = (data: BasicProductInfo) => {
    const updatedData = { ...productData, basicInfo: data };
    setProductData(updatedData);
    saveProgress(updatedData);
    return Promise.resolve();
  };

  const handleMysticalCharacteristicsSave = (data: MysticalCharacteristics) => {
    const updatedData = { ...productData, mysticalCharacteristics: data };
    setProductData(updatedData);
    saveProgress(updatedData);
    return Promise.resolve();
  };

  const handleImagesSave = (data: ImagesFormData) => {
    const updatedData = { ...productData, images: data };
    setProductData(updatedData);
    saveProgress(updatedData);
    return Promise.resolve();
  };

  const handleCategoriesEffectsSave = (data: CategoriesEffectsData) => {
    const updatedData = { ...productData, categoriesEffects: data };
    setProductData(updatedData);
    saveProgress(updatedData);
    return Promise.resolve();
  };

  // Renderizar la página de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d98c53]"></div>
      </div>
    );
  }

  // Renderizar mensaje de éxito o error después de enviar el formulario
  if (saveStatus === "success" || saveStatus === "error") {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div
          className={`p-8 rounded-lg shadow-lg ${saveStatus === "success" ? "bg-green-50" : "bg-red-50"} max-w-md`}
        >
          <h2
            className={`text-xl font-bold mb-4 ${saveStatus === "success" ? "text-green-700" : "text-red-700"}`}
          >
            {saveStatus === "success" ? "¡Éxito!" : "Error"}
          </h2>
          <p
            className={`${saveStatus === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {statusMessage}
          </p>
          {saveStatus === "error" && (
            <button
              onClick={() => setSaveStatus("idle")}
              className="mt-4 px-6 py-2 bg-[#d98c53] text-white font-medium rounded-lg hover:bg-[#c67b42]"
            >
              Volver al formulario
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1a3a3a] mb-8">
          Registro de Producto
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <ProductFormTabs activeTab={currentTab} isNewProduct={true} />

          <div className="mt-6">
            {currentTab === "basic-info" && (
              <BasicInfoForm
                initialData={productData.basicInfo}
                onSave={handleBasicInfoSave}
                onNext={() => navigateToTab("mystical")}
              />
            )}

            {currentTab === "mystical" && (
              <MysticalCharacteristicsForm
                initialData={productData.mysticalCharacteristics}
                onSave={handleMysticalCharacteristicsSave}
                onNext={() => navigateToTab("images")}
                onPrevious={() => navigateToTab("basic-info")}
              />
            )}

            {currentTab === "images" && (
              <ImagesForm
                initialData={productData.images}
                onSave={handleImagesSave}
                onNext={() => navigateToTab("categories")}
                onPrevious={() => navigateToTab("mystical")}
              />
            )}

            {currentTab === "categories" && (
              <CategoriesEffectsForm
                initialData={productData.categoriesEffects}
                onSave={handleCategoriesEffectsSave}
                onPrevious={() => navigateToTab("images")}
                onComplete={handleFormComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
