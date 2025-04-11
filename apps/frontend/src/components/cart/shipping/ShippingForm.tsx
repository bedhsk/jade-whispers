// components/shipping/ShippingForm.tsx
"use client";

import React, { useState } from "react";

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
}

export interface ShippingFormData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  specialInstructions: string;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof ShippingFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es obligatorio";
    }

    if (!formData.address.trim()) {
      newErrors.address = "La dirección es obligatoria";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es obligatoria";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "El código postal es obligatorio";
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "El código postal debe tener 5 dígitos";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Introduce un número de teléfono válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-6">
        Dirección de Envío
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Nombre completo:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#d1c5a5] outline-none
              ${errors.fullName ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="Juan Pérez"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Dirección:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#d1c5a5] outline-none
              ${errors.address ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="Calle Principal 123"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-[#254040] mb-1"
            >
              Ciudad:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#d1c5a5] outline-none
                ${errors.city ? "border-red-500" : "border-[#1a3a3a]/30"}`}
              placeholder="Ciudad de México"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-[#254040] mb-1"
            >
              Código Postal:
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#d1c5a5] outline-none
                ${errors.postalCode ? "border-red-500" : "border-[#1a3a3a]/30"}`}
              placeholder="03100"
              maxLength={5}
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Teléfono de contacto:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#d1c5a5] outline-none
              ${errors.phone ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="+52 55 1234 5678"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="specialInstructions"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Instrucciones especiales:
          </label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-[#1a3a3a]/30 rounded focus:ring-2 focus:ring-[#d1c5a5] outline-none"
            placeholder="Por favor, dejar con el portero."
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
