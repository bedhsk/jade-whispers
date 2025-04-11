"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface SupernaturalEffect {
  id?: string;
  name: string;
  description: string;
  customDescription: string;
  guaranteed: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface CategoriesEffectsData {
  categories: string[];
  effects: SupernaturalEffect[];
  publishImmediately: boolean;
  scheduledDate?: string;
}

interface CategoriesEffectsFormProps {
  initialData?: CategoriesEffectsData;
  availableCategories?: Category[];
  availableEffects?: Pick<SupernaturalEffect, "id" | "name" | "description">[];
  onSave: (data: CategoriesEffectsData) => void;
  onPrevious: () => void;
  onComplete: () => void;
}

const initialFormState: CategoriesEffectsData = {
  categories: [],
  effects: [],
  publishImmediately: true,
};

// Datos de muestra para categorías y efectos disponibles
const sampleCategories: Category[] = [
  { id: "1", name: "Dinastía Ming" },
  { id: "2", name: "Dinastía Qing" },
  { id: "3", name: "Dinastía Han" },
  { id: "4", name: "Dinastía Song" },
  { id: "5", name: "Jade" },
  { id: "6", name: "Porcelana" },
  { id: "7", name: "Bronce" },
  { id: "8", name: "Cerámica" },
  { id: "9", name: "Dragones" },
  { id: "10", name: "Fénix" },
  { id: "11", name: "Leones Fu" },
  { id: "12", name: "Budas" },
  { id: "13", name: "Prosperidad" },
  { id: "14", name: "Protección" },
  { id: "15", name: "Sabiduría" },
  { id: "16", name: "Longevidad" },
];

const sampleEffects: Pick<SupernaturalEffect, "id" | "name" | "description">[] =
  [
    {
      id: "1",
      name: "Organización",
      description: "Reorganiza objetos durante la noche",
    },
    { id: "2", name: "Prosperidad", description: "Atrae fortuna y abundancia" },
    {
      id: "3",
      name: "Resplandor",
      description: "Emite luz tenue en la oscuridad",
    },
    {
      id: "4",
      name: "Sabiduría",
      description: "Mejora la claridad mental y la memoria",
    },
    {
      id: "5",
      name: "Armonía",
      description: "Crea un ambiente equilibrado y tranquilo",
    },
    {
      id: "6",
      name: "Fertilidad",
      description: "Favorece la reproducción y el crecimiento",
    },
    {
      id: "7",
      name: "Vitalidad",
      description: "Aumenta la energía y resistencia",
    },
    {
      id: "8",
      name: "Inspiración",
      description: "Potencia la creatividad artística",
    },
  ];

const CategoriesEffectsForm: React.FC<CategoriesEffectsFormProps> = ({
  initialData = initialFormState,
  availableCategories = sampleCategories,
  availableEffects = sampleEffects,
  onSave,
  onPrevious,
  onComplete,
}) => {
  const [formData, setFormData] = useState<CategoriesEffectsData>(initialData);
  const [newCategory, setNewCategory] = useState("");
  const [selectedEffect, setSelectedEffect] = useState<string>("");
  const [errors, setErrors] = useState<{
    categories?: string;
    effects?: string;
    newCategory?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          categories: [...prev.categories, categoryId],
        };
      } else {
        return {
          ...prev,
          categories: prev.categories.filter((id) => id !== categoryId),
        };
      }
    });

    // Limpiar error si se selecciona alguna categoría
    if (errors.categories && checked) {
      setErrors((prev) => ({ ...prev, categories: undefined }));
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setErrors((prev) => ({
        ...prev,
        newCategory: "Ingresa un nombre para la categoría",
      }));
      return;
    }

    // Simular agregar una nueva categoría (en una app real, se enviaría al backend)
    const newCategoryId = `new-${Date.now()}`;
    availableCategories.push({ id: newCategoryId, name: newCategory.trim() });

    // Seleccionar la nueva categoría
    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategoryId],
    }));

    // Limpiar el campo y el error
    setNewCategory("");
    setErrors((prev) => ({ ...prev, newCategory: undefined }));
  };

  const handleAddEffect = () => {
    if (!selectedEffect) return;

    const effectToAdd = availableEffects.find((e) => e.id === selectedEffect);
    if (!effectToAdd) return;

    // Verificar si el efecto ya está agregado
    const alreadyAdded = formData.effects.some((e) => e.id === effectToAdd.id);
    if (alreadyAdded) return;

    // Agregar el efecto a la lista
    setFormData((prev) => ({
      ...prev,
      effects: [
        ...prev.effects,
        {
          id: effectToAdd.id,
          name: effectToAdd.name,
          description: effectToAdd.description,
          customDescription: "",
          guaranteed: false,
        },
      ],
    }));

    // Limpiar errores si había alguno
    if (errors.effects) {
      setErrors((prev) => ({ ...prev, effects: undefined }));
    }

    // Resetear el selector
    setSelectedEffect("");
  };

  const handleEffectUpdate = (
    effectId: string,
    data: Partial<SupernaturalEffect>
  ) => {
    setFormData((prev) => ({
      ...prev,
      effects: prev.effects.map((effect) =>
        effect.id === effectId ? { ...effect, ...data } : effect
      ),
    }));
  };

  const handleRemoveEffect = (effectId: string) => {
    setFormData((prev) => ({
      ...prev,
      effects: prev.effects.filter((effect) => effect.id !== effectId),
    }));
  };

  const handlePublishOptionChange = (publishImmediately: boolean) => {
    setFormData((prev) => ({
      ...prev,
      publishImmediately,
    }));
  };

  const handleScheduledDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      scheduledDate: e.target.value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: {
      categories?: string;
      effects?: string;
    } = {};

    // Validar que haya al menos una categoría seleccionada
    if (formData.categories.length === 0) {
      newErrors.categories = "Debes seleccionar al menos una categoría";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Guardar datos
      await onSave(formData);

      // Finalizar el proceso
      onComplete();
    } catch (error) {
      console.error("Error al guardar las categorías y efectos:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Sección de Categorías */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[#1a3a3a] mb-2">Categorías</h2>
        <p className="text-sm text-gray-600 italic mb-4">
          Selecciona al menos una categoría para tu producto
        </p>

        {errors.categories && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600">{errors.categories}</p>
          </div>
        )}

        <div className="bg-[#f5f2e8] p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
            {availableCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={formData.categories.includes(category.id)}
                  onChange={(e) =>
                    handleCategoryChange(category.id, e.target.checked)
                  }
                  className="w-4 h-4 text-[#1a3a3a] border-[#1a3a3a]/30 rounded focus:ring-[#d1c5a5]"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-sm text-[#254040]"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Agregar nueva categoría */}
        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Agregar nueva categoría..."
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none
                ${errors.newCategory ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            />
            {errors.newCategory && (
              <p className="mt-1 text-sm text-red-500">{errors.newCategory}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-6 py-3 bg-[#f5f2e8] border border-[#d1c5a5] text-[#1a3a3a] font-medium rounded-lg hover:bg-[#e8e4d9] transition-colors"
          >
            AGREGAR
          </button>
        </div>
      </section>

      {/* Sección de Efectos Sobrenaturales */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[#d98c53] mb-2">
          Efectos Sobrenaturales
        </h2>
        <p className="text-sm text-gray-600 italic mb-4">
          Asigna efectos sobrenaturales a tu producto para aumentar su atractivo
        </p>

        {/* Tabla de efectos asignados */}
        <div className="mb-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1a3a3a]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Efecto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Descripción Personalizada
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Garantizado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.effects.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-sm text-gray-500 text-center"
                  >
                    No hay efectos sobrenaturales asignados. Agrega algunos para
                    hacer tu producto más atractivo.
                  </td>
                </tr>
              ) : (
                formData.effects.map((effect, index) => (
                  <tr
                    key={effect.id}
                    className={index % 2 === 0 ? "bg-[#f5f2e8]" : "bg-white"}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#254040]">
                          {effect.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {effect.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={effect.customDescription}
                        onChange={(e) =>
                          handleEffectUpdate(effect.id!, {
                            customDescription: e.target.value,
                          })
                        }
                        placeholder="Descripción específica para este producto..."
                        className="w-full p-2 border border-[#1a3a3a]/30 rounded-md text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={effect.guaranteed}
                        onChange={(e) =>
                          handleEffectUpdate(effect.id!, {
                            guaranteed: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-[#d98c53] border-[#1a3a3a]/30 rounded focus:ring-[#d1c5a5]"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveEffect(effect.id!)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Agregar nuevo efecto */}
        <div className="border border-dashed border-[#d1c5a5] p-4 rounded-lg">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label
                htmlFor="newEffect"
                className="block text-sm font-medium text-[#254040] mb-1"
              >
                Agregar efecto sobrenatural:
              </label>
              <select
                id="newEffect"
                value={selectedEffect}
                onChange={(e) => setSelectedEffect(e.target.value)}
                className="w-full p-3 border border-[#1a3a3a]/30 rounded-md focus:ring-2 focus:ring-[#d1c5a5] outline-none"
              >
                <option value="">Selecciona un efecto...</option>
                {availableEffects
                  .filter((e) => !formData.effects.some((fe) => fe.id === e.id))
                  .map((effect) => (
                    <option key={effect.id} value={effect.id}>
                      {effect.name} - {effect.description}
                    </option>
                  ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleAddEffect}
              disabled={!selectedEffect}
              className="px-6 py-3 bg-[#d98c53] text-white font-medium rounded-lg hover:bg-[#c67b42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              AGREGAR
            </button>
          </div>
        </div>

        {/* Política de garantía */}
        <div className="mt-6 bg-[#f5f2e8] p-4 rounded-lg">
          <h3 className="text-base font-medium text-[#1a3a3a] mb-2">
            Política de Garantía Sobrenatural
          </h3>
          <p className="text-sm text-[#254040] mb-2">
            Al marcar un efecto como "Garantizado", Jade Whispers se compromete
            con el cliente:
          </p>
          <ul className="space-y-1 text-sm text-[#254040] list-disc pl-5">
            <li>El efecto se manifestará en un plazo de 30 días lunares</li>
            <li>
              El cliente puede solicitar reembolso si el efecto no se manifiesta
            </li>
            <li className="text-[#d98c53]">
              Los efectos garantizados deben ser verificados por nuestros
              expertos paranormales
            </li>
          </ul>
        </div>
      </section>

      {/* Publicación y visibilidad */}
      <section className="mb-10">
        <div className="border border-[#1a3a3a] p-4 rounded-lg">
          <h3 className="text-base font-medium text-[#1a3a3a] mb-4">
            Publicación y Visibilidad
          </h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="publishNow"
                name="publishOption"
                checked={formData.publishImmediately}
                onChange={() => handlePublishOptionChange(true)}
                className="w-4 h-4 text-[#1a3a3a] border-[#1a3a3a]/30 focus:ring-[#d1c5a5]"
              />
              <label
                htmlFor="publishNow"
                className="ml-2 text-sm text-[#254040]"
              >
                Publicar producto inmediatamente
              </label>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  id="publishLater"
                  name="publishOption"
                  checked={!formData.publishImmediately}
                  onChange={() => handlePublishOptionChange(false)}
                  className="w-4 h-4 text-[#1a3a3a] border-[#1a3a3a]/30 focus:ring-[#d1c5a5]"
                />
              </div>
              <div className="ml-2">
                <label
                  htmlFor="publishLater"
                  className="text-sm text-[#254040]"
                >
                  Programar publicación
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    value={formData.scheduledDate || ""}
                    onChange={handleScheduledDateChange}
                    disabled={formData.publishImmediately}
                    className={`p-2 border border-[#1a3a3a]/30 rounded-md text-sm
                      ${formData.publishImmediately ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            {isSubmitting ? "GUARDANDO..." : "GUARDAR PRODUCTO"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoriesEffectsForm;
