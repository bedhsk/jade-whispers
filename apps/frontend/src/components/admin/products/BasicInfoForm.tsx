"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface BasicProductInfo {
  name: string;
  slug: string;
  price: string;
  stock: string;
  featured: boolean;
  description: string;
  dynasty: string;
  material: string;
  origin: string;
  dimensions: string;
  weight: string;
  certificateId: string;
}

interface BasicInfoFormProps {
  initialData?: BasicProductInfo;
  onSave: (data: BasicProductInfo) => void;
  onNext: () => void;
}

const initialFormState: BasicProductInfo = {
  name: "",
  slug: "",
  price: "",
  stock: "",
  featured: false,
  description: "",
  dynasty: "",
  material: "",
  origin: "",
  dimensions: "",
  weight: "",
  certificateId: "",
};

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  initialData = initialFormState,
  onSave,
  onNext,
}) => {
  const [formData, setFormData] = useState<BasicProductInfo>(initialData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BasicProductInfo, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Genera slug a partir del nombre
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
      }));
    }
  }, [formData.name]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Limpiar error cuando se cambia el valor
    if (errors[name as keyof BasicProductInfo]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof BasicProductInfo];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BasicProductInfo, string>> = {};

    // Validaciones básicas
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.price.trim()) {
      newErrors.price = "El precio es obligatorio";
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "El precio debe ser un número válido mayor que cero";
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "El stock es obligatorio";
    } else if (
      isNaN(parseInt(formData.stock)) ||
      parseInt(formData.stock) < 0
    ) {
      newErrors.stock = "El stock debe ser un número válido no negativo";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }

    // Validaciones opcionales para el peso
    if (
      formData.weight &&
      (isNaN(parseFloat(formData.weight)) || parseFloat(formData.weight) <= 0)
    ) {
      newErrors.weight = "El peso debe ser un número válido mayor que cero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Guardar datos
      await onSave(formData);

      // Avanzar a la siguiente pestaña
      onNext();
    } catch (error) {
      console.error("Error al guardar la información básica:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-800">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-6">
        Información Básica del Producto
      </h2>

      {/* Nombre y Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
              ${errors.name ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="Estatuilla de dragón dinastía Ming"
            maxLength={255}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
            placeholder="estatuilla-dragon-dinastia-ming"
          />
          <p className="mt-1 text-xs text-gray-500 italic">
            Se generará automáticamente si se deja en blanco
          </p>
        </div>
      </div>

      {/* Precio, Stock y Destacado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Precio (MXN) <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
              ${errors.price ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="4,999.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            id="stock"
            name="stock"
            type="text"
            value={formData.stock}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
              ${errors.stock ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="5"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
          )}
        </div>

        <div className="md:col-span-2 flex items-center">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={formData.featured}
            onChange={handleInputChange}
            className="w-4 h-4 text-[#1a3a3a] border-[#1a3a3a]/30 rounded focus:ring-[#d1c5a5]"
          />
          <label htmlFor="featured" className="ml-2 text-sm text-[#254040]">
            Mostrar en página principal
          </label>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#254040] mb-1"
        >
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
            ${errors.description ? "border-red-500" : "border-[#1a3a3a]/30"}`}
          placeholder="Estatuilla de dragón auténtica de la dinastía Ming, tallada en jade imperial verde..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Características Técnicas */}
      <h3 className="text-lg font-bold text-[#1a3a3a] mb-4">
        Características Técnicas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label
            htmlFor="dynasty"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Dinastía
          </label>
          <input
            id="dynasty"
            name="dynasty"
            type="text"
            value={formData.dynasty}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
            placeholder="Ming"
          />
        </div>

        <div>
          <label
            htmlFor="material"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Material
          </label>
          <input
            id="material"
            name="material"
            type="text"
            value={formData.material}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
            placeholder="Jade"
          />
        </div>

        <div>
          <label
            htmlFor="origin"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Origen
          </label>
          <input
            id="origin"
            name="origin"
            type="text"
            value={formData.origin}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
            placeholder="China"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor="dimensions"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Dimensiones
          </label>
          <input
            id="dimensions"
            name="dimensions"
            type="text"
            value={formData.dimensions}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
            placeholder="15cm x 10cm x 12cm"
          />
        </div>

        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Peso (kg)
          </label>
          <input
            id="weight"
            name="weight"
            type="text"
            value={formData.weight}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
              ${errors.weight ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="1.8"
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-500">{errors.weight}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="certificateId"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            ID de certificado
          </label>
          <input
            id="certificateId"
            name="certificateId"
            type="text"
            value={formData.certificateId}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
            placeholder="JW-M15-2023"
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border-2 border-[#1a3a3a] text-[#1a3a3a] font-medium rounded-lg hover:bg-[#f5f2e8] transition-colors"
        >
          CANCELAR
        </button>

        <div className="flex space-x-4">
          <button
            type="button"
            className="px-6 py-3 bg-[#f5f2e8] border border-[#d1c5a5] text-[#1a3a3a] font-medium rounded-lg hover:bg-[#e8e4d9] transition-colors"
          >
            VISTA PREVIA
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#d98c53] text-white font-medium rounded-lg hover:bg-[#c67b42] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "GUARDANDO..." : "SIGUIENTE"}
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 italic">* Campos obligatorios</p>
    </form>
  );
};

export default BasicInfoForm;
