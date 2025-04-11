"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface MysticalCharacteristics {
  supernaturalHistory: string;
  supernaturalPowers: string;
  paranormalActivityLevel: number;
  comicDescription: string;
  careInstructions: string;
  lunarPhases: string[];
  activityTimes: string[];
  verificationMethod: string[];
  verifiedBy: string;
  certificateNumber: string;
}

interface MysticalCharacteristicsFormProps {
  initialData?: MysticalCharacteristics;
  onSave: (data: MysticalCharacteristics) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const initialFormState: MysticalCharacteristics = {
  supernaturalHistory: "",
  supernaturalPowers: "",
  paranormalActivityLevel: 64,
  comicDescription: "",
  careInstructions: "",
  lunarPhases: [],
  activityTimes: [],
  verificationMethod: [],
  verifiedBy: "",
  certificateNumber: "",
};

const MysticalCharacteristicsForm: React.FC<
  MysticalCharacteristicsFormProps
> = ({ initialData = initialFormState, onSave, onNext, onPrevious }) => {
  const [formData, setFormData] =
    useState<MysticalCharacteristics>(initialData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MysticalCharacteristics, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Opciones para las fases lunares
  const lunarPhaseOptions = [
    "Luna llena",
    "Luna nueva",
    "Cuarto creciente",
    "Cuarto menguante",
  ];

  // Opciones para los horarios de actividad
  const activityTimeOptions = [
    "Medianoche",
    "Amanecer",
    "Atardecer",
    "3:00 AM",
  ];

  // Opciones para los métodos de verificación
  const verificationMethodOptions = [
    "Medidor EMF",
    "Consulta oracular",
    "Testimonio verificado",
    "Análisis espectral",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error cuando se cambia el valor
    if (errors[name as keyof MysticalCharacteristics]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof MysticalCharacteristics];
        return newErrors;
      });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      paranormalActivityLevel: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    arrayName: "lunarPhases" | "activityTimes" | "verificationMethod"
  ) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          [arrayName]: [...prev[arrayName], value],
        };
      } else {
        return {
          ...prev,
          [arrayName]: prev[arrayName].filter((item) => item !== value),
        };
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MysticalCharacteristics, string>> =
      {};

    // Historia sobrenatural es obligatoria
    if (!formData.supernaturalHistory.trim()) {
      newErrors.supernaturalHistory = "La historia sobrenatural es obligatoria";
    }

    // Poderes sobrenaturales son obligatorios
    if (!formData.supernaturalPowers.trim()) {
      newErrors.supernaturalPowers =
        "Los poderes sobrenaturales son obligatorios";
    }

    // Descripción cómica es obligatoria
    if (!formData.comicDescription.trim()) {
      newErrors.comicDescription = "La descripción cómica es obligatoria";
    }

    // Instrucciones de cuidado son obligatorias
    if (!formData.careInstructions.trim()) {
      newErrors.careInstructions =
        "Las instrucciones de cuidado son obligatorias";
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
      console.error("Error al guardar las características místicas:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-800">
      <h2 className="text-2xl font-bold text-[#d98c53] mb-2">
        Características Místicas
      </h2>
      <p className="text-sm text-gray-600 italic mb-6">
        Esta sección es lo que diferencia a Jade Whispers de otras tiendas. ¡Sé
        creativo!
      </p>

      {/* Historia Sobrenatural */}
      <div className="mb-6">
        <label
          htmlFor="supernaturalHistory"
          className="block text-base font-medium text-[#1a3a3a] mb-1"
        >
          Historia Sobrenatural
        </label>
        <textarea
          id="supernaturalHistory"
          name="supernaturalHistory"
          value={formData.supernaturalHistory}
          onChange={handleInputChange}
          rows={5}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
            ${errors.supernaturalHistory ? "border-red-500" : "border-[#1a3a3a]/30"}`}
          placeholder="Describe el origen místico, poseedor anterior, circunstancias de creación y eventos inexplicables..."
        />
        {errors.supernaturalHistory && (
          <p className="mt-1 text-sm text-red-500">
            {errors.supernaturalHistory}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 italic">
          Incluye el origen místico, poseedor anterior, circunstancias de
          creación y eventos inexplicables.
        </p>
      </div>

      {/* Poderes Sobrenaturales */}
      <div className="mb-6">
        <label
          htmlFor="supernaturalPowers"
          className="block text-base font-medium text-[#1a3a3a] mb-1"
        >
          Poderes Sobrenaturales
        </label>
        <textarea
          id="supernaturalPowers"
          name="supernaturalPowers"
          value={formData.supernaturalPowers}
          onChange={handleInputChange}
          rows={3}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
            ${errors.supernaturalPowers ? "border-red-500" : "border-[#1a3a3a]/30"}`}
          placeholder="Describe efectos beneficiosos, manifestaciones visuales y experiencias de propietarios anteriores..."
        />
        {errors.supernaturalPowers && (
          <p className="mt-1 text-sm text-red-500">
            {errors.supernaturalPowers}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 italic">
          Describe efectos beneficiosos, manifestaciones visuales y experiencias
          de propietarios anteriores.
        </p>
      </div>

      {/* Nivel de Actividad Paranormal */}
      <div className="mb-8">
        <label
          htmlFor="paranormalActivityLevel"
          className="block text-base font-medium text-[#1a3a3a] mb-3"
        >
          Nivel de Actividad Paranormal
        </label>
        <div className="bg-[#f5f2e8] p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#254040]">Bajo</span>
            <span className="text-sm text-[#254040]">Moderado</span>
            <span className="text-sm text-[#254040]">Alto</span>
          </div>

          <div className="relative mb-2">
            <input
              type="range"
              id="paranormalActivityLevel"
              name="paranormalActivityLevel"
              min="0"
              max="100"
              value={formData.paranormalActivityLevel}
              onChange={handleSliderChange}
              className="w-full h-2 bg-[#e8e4d9] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d98c53 0%, #d98c53 ${formData.paranormalActivityLevel}%, #e8e4d9 ${formData.paranormalActivityLevel}%, #e8e4d9 100%)`,
              }}
            />
            <div
              className="absolute h-6 w-6 rounded-full bg-[#1a3a3a] border-2 border-[#d1c5a5] top-1/2 transform -translate-y-1/2 cursor-pointer"
              style={{
                left: `calc(${formData.paranormalActivityLevel}% - 12px)`,
              }}
            />
          </div>

          <div className="text-right">
            <span className="text-base font-medium text-[#254040]">
              {formData.paranormalActivityLevel}%
            </span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500 italic">
          Establece qué tan activas son las manifestaciones sobrenaturales del
          producto.
        </p>
      </div>

      {/* Descripción Cómica */}
      <div className="mb-6">
        <label
          htmlFor="comicDescription"
          className="block text-base font-medium text-[#1a3a3a] mb-1"
        >
          Descripción Cómica
        </label>
        <textarea
          id="comicDescription"
          name="comicDescription"
          value={formData.comicDescription}
          onChange={handleInputChange}
          rows={3}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
            ${errors.comicDescription ? "border-red-500" : "border-[#1a3a3a]/30"}`}
          placeholder="Humaniza el objeto con un toque humorístico que lo haga memorable..."
        />
        {errors.comicDescription && (
          <p className="mt-1 text-sm text-red-500">{errors.comicDescription}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 italic">
          Humaniza el objeto con un toque humorístico que lo haga memorable.
        </p>
      </div>

      {/* Instrucciones de Cuidado Místico */}
      <div className="mb-8">
        <label
          htmlFor="careInstructions"
          className="block text-base font-medium text-[#1a3a3a] mb-1"
        >
          Instrucciones de Cuidado Místico
        </label>
        <textarea
          id="careInstructions"
          name="careInstructions"
          value={formData.careInstructions}
          onChange={handleInputChange}
          rows={3}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500
            ${errors.careInstructions ? "border-red-500" : "border-[#1a3a3a]/30"}`}
          placeholder="Indica cómo mantener y potenciar los efectos sobrenaturales del objeto..."
        />
        {errors.careInstructions && (
          <p className="mt-1 text-sm text-red-500">{errors.careInstructions}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 italic">
          Indica cómo mantener y potenciar los efectos sobrenaturales del
          objeto.
        </p>
      </div>

      {/* Calendario de Manifestaciones */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-[#1a3a3a] mb-3">
          Calendario de Manifestaciones
        </h3>
        <div className="bg-[#f5f2e8] p-4 rounded-lg mb-3">
          <h4 className="text-sm font-medium text-[#254040] mb-2">
            Fase lunar
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {lunarPhaseOptions.map((phase) => (
              <div key={phase} className="flex items-center">
                <input
                  type="checkbox"
                  id={`phase-${phase}`}
                  value={phase}
                  checked={formData.lunarPhases.includes(phase)}
                  onChange={(e) => handleCheckboxChange(e, "lunarPhases")}
                  className="w-4 h-4 text-[#1a3a3a] border-[#1a3a3a]/30 rounded focus:ring-[#d1c5a5]"
                />
                <label
                  htmlFor={`phase-${phase}`}
                  className="ml-2 text-sm text-[#254040]"
                >
                  {phase}
                </label>
              </div>
            ))}
          </div>

          <h4 className="text-sm font-medium text-[#254040] mt-4 mb-2">
            Horario de actividad
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activityTimeOptions.map((time) => (
              <div key={time} className="flex items-center">
                <input
                  type="checkbox"
                  id={`time-${time}`}
                  value={time}
                  checked={formData.activityTimes.includes(time)}
                  onChange={(e) => handleCheckboxChange(e, "activityTimes")}
                  className="w-4 h-4 text-[#1a3a3a] border-[#1a3a3a]/30 rounded focus:ring-[#d1c5a5]"
                />
                <label
                  htmlFor={`time-${time}`}
                  className="ml-2 text-sm text-[#254040]"
                >
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificación Paranormal */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-[#1a3a3a] mb-3">
          Certificación Paranormal
        </h3>
        <div className="border-2 border-dashed border-[#d98c53] p-4 rounded-lg">
          <h4 className="text-sm font-medium text-[#254040] mb-2">
            Método de verificación:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {verificationMethodOptions.map((method) => (
              <div key={method} className="flex items-center">
                <input
                  type="checkbox"
                  id={`method-${method}`}
                  value={method}
                  checked={formData.verificationMethod.includes(method)}
                  onChange={(e) =>
                    handleCheckboxChange(e, "verificationMethod")
                  }
                  className="w-4 h-4 text-[#1a3a3a] border-[#1a3a3a]/30 rounded focus:ring-[#d1c5a5]"
                />
                <label
                  htmlFor={`method-${method}`}
                  className="ml-2 text-sm text-[#254040]"
                >
                  {method}
                </label>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label
                htmlFor="verifiedBy"
                className="block text-sm font-medium text-[#254040] mb-1"
              >
                Verificado por:
              </label>
              <input
                id="verifiedBy"
                name="verifiedBy"
                type="text"
                value={formData.verifiedBy}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
                placeholder="Dra. Lin Mei, Experta en Antigüedades Dinásticas"
              />
            </div>

            <div>
              <label
                htmlFor="certificateNumber"
                className="block text-sm font-medium text-[#254040] mb-1"
              >
                Número de certificado:
              </label>
              <input
                id="certificateNumber"
                name="certificateNumber"
                type="text"
                value={formData.certificateNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none text-gray-800 placeholder:text-gray-500"
                placeholder="JW-PM-2023-064"
              />
            </div>
          </div>

          <p className="text-sm text-[#d98c53] italic">
            La certificación paranormal garantiza que los efectos descritos han
            sido verificados por nuestros expertos.
          </p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-3 border-2 border-[#1a3a3a] text-[#1a3a3a] font-medium rounded-lg hover:bg-[#f5f2e8] transition-colors"
        >
          ANTERIOR
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
    </form>
  );
};

export default MysticalCharacteristicsForm;
