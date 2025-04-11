"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export interface ProductImage {
  id?: string;
  file?: File;
  url: string;
  altText: string;
  position: number;
  isMain: boolean;
  filename?: string;
  dimensions?: string;
}

export interface ImagesFormData {
  images: ProductImage[];
}

interface ImagesFormProps {
  initialData?: ImagesFormData;
  onSave: (data: ImagesFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const initialFormState: ImagesFormData = {
  images: [],
};

const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const ImagesForm: React.FC<ImagesFormProps> = ({
  initialData = initialFormState,
  onSave,
  onNext,
  onPrevious,
}) => {
  const [images, setImages] = useState<ProductImage[]>(initialData.images);
  const [activeImage, setActiveImage] = useState<ProductImage | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Abre el selector de archivos
  const handleAddImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Maneja la selección de archivos
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];

      // Validar tamaño y tipo de archivo
      if (file.size > MAX_FILE_SIZE) {
        setErrors((prev) => [
          ...prev,
          `El archivo "${file.name}" excede el tamaño máximo de 5MB.`,
        ]);
        return;
      }

      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setErrors((prev) => [
          ...prev,
          `El archivo "${file.name}" no es una imagen válida. Solo se aceptan JPG y PNG.`,
        ]);
        return;
      }

      // Crear URL para mostrar la imagen
      const imageUrl = URL.createObjectURL(file);

      // Determinar la siguiente posición disponible
      const nextPosition =
        images.length > 0
          ? Math.max(...images.map((img) => img.position)) + 1
          : 1;

      // Determinar si es la primera imagen (será la principal)
      const isMain = images.length === 0;

      // Crear objeto imagen nuevo
      const newImage: ProductImage = {
        file,
        url: imageUrl,
        altText: "",
        position: nextPosition,
        isMain,
        filename: file.name,
        dimensions: "1200 x 800 px",
      };

      setImages((prev) => [...prev, newImage]);
      setActiveImage(newImage);

      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [images]
  );

  // Actualiza los datos de una imagen
  const handleImageUpdate = useCallback(
    (imageToUpdate: ProductImage, data: Partial<ProductImage>) => {
      setImages((prev) =>
        prev.map((img) => {
          if (img === imageToUpdate) {
            return { ...img, ...data };
          }
          return img;
        })
      );

      // Actualizar imagen activa si es la que se está modificando
      if (activeImage === imageToUpdate) {
        setActiveImage({ ...imageToUpdate, ...data });
      }
    },
    [activeImage]
  );

  // Establece una imagen como principal
  const handleSetMainImage = useCallback((imageToSetMain: ProductImage) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img === imageToSetMain,
      }))
    );
  }, []);

  // Elimina una imagen
  const handleRemoveImage = useCallback(
    (imageToRemove: ProductImage) => {
      setImages((prev) => {
        // Si es la imagen principal y hay otras imágenes, establecer la primera como principal
        if (imageToRemove.isMain && prev.length > 1) {
          const remainingImages = prev.filter((img) => img !== imageToRemove);
          remainingImages[0].isMain = true;
          return remainingImages;
        }
        return prev.filter((img) => img !== imageToRemove);
      });

      // Si la imagen activa es la que se está eliminando, desactivarla
      if (activeImage === imageToRemove) {
        setActiveImage(null);
      }

      // Liberar la URL creada con createObjectURL
      if (imageToRemove.url.startsWith("blob:")) {
        URL.revokeObjectURL(imageToRemove.url);
      }
    },
    [activeImage]
  );

  // Valida que haya al menos una imagen principal
  const validateForm = useCallback((): boolean => {
    const newErrors: string[] = [];

    if (images.length === 0) {
      newErrors.push("Debes agregar al menos una imagen del producto.");
    }

    if (!images.some((img) => img.isMain)) {
      newErrors.push("Debes establecer una imagen principal.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [images]);

  // Envía el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // En una aplicación real, aquí subirías las imágenes a un servidor
      // y obtendrías las URLs definitivas

      // Guardar datos
      await onSave({ images });

      // Avanzar a la siguiente pestaña
      onNext();
    } catch (error) {
      console.error("Error al guardar las imágenes:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-800">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-2">
        Gestión de Imágenes
      </h2>
      <p className="text-sm text-gray-600 italic mb-6">
        Sube imágenes de alta calidad para mostrar todos los ángulos y detalles
        del producto
      </p>

      {/* Mostrar errores generales */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-700 font-medium mb-1">
            Por favor corrige los siguientes errores:
          </h3>
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-600">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div>
          {/* Imagen Principal */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-[#1a3a3a] mb-2">
              Imagen Principal
              <span className="ml-2 text-[#d98c53] italic text-sm">
                * Obligatorio
              </span>
            </h3>

            <div className="bg-[#f5f2e8] p-4 rounded-lg">
              <div
                onClick={handleAddImageClick}
                className="border border-dashed border-[#d1c5a5] rounded-md cursor-pointer hover:bg-[#e8e4d9] transition-colors bg-[#f5f2e8] aspect-[4/3] flex flex-col items-center justify-center"
              >
                {images.some((img) => img.isMain) ? (
                  <Image
                    src={
                      images.find((img) => img.isMain)?.url ||
                      "/images/placeholder.png"
                    }
                    alt="Imagen principal del producto"
                    width={300}
                    height={225}
                    className="object-contain max-h-[300px]"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#1a3a3a] mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-red-500 text-sm">
                      Haz clic para subir la imagen principal
                    </p>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddImageClick}
                className="mt-3 px-4 py-1 bg-white border border-[#1a3a3a] text-[#1a3a3a] text-sm rounded"
              >
                SUBIR
              </button>
            </div>
          </div>

          {/* Imágenes Adicionales */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-[#1a3a3a] mb-2">
              Imágenes Adicionales
            </h3>
            <p className="text-sm text-gray-600 italic mb-4">
              Agrega hasta {MAX_IMAGES} imágenes adicionales del producto
            </p>

            {/* Grid de imágenes adicionales */}
            <div className="grid grid-cols-4 gap-3">
              {/* Botones para añadir imágenes */}
              {Array.from({ length: Math.min(8, MAX_IMAGES) }).map((_, idx) => {
                const image =
                  idx < images.filter((img) => !img.isMain).length
                    ? images.filter((img) => !img.isMain)[idx]
                    : null;

                return (
                  <div
                    key={`img-slot-${idx}`}
                    className="border border-dashed border-[#d1c5a5] rounded-md cursor-pointer aspect-square bg-[#f5f2e8] hover:bg-[#e8e4d9] transition-colors flex flex-col items-center justify-center overflow-hidden"
                    onClick={handleAddImageClick}
                  >
                    {image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={image.url}
                          alt={image.altText || `Imagen adicional ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#d1c5a5] mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <p className="text-[#888888] text-xs">Añadir imagen</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div>
          <div className="bg-[#f5f2e8] p-6 rounded-lg h-[400px] flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#d1c5a5] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-center text-[#254040]">
              Selecciona una imagen para ver sus detalles o sube una nueva
              imagen.
            </p>
          </div>

          {/* Consejos para optimizar imágenes */}
          <div className="bg-[#f5f2e8] p-4 rounded-lg mt-6">
            <h3 className="text-base font-medium text-[#1a3a3a] mb-3">
              Consejos para optimizar imágenes:
            </h3>
            <ul className="space-y-1 text-sm text-[#254040]">
              <li>• Utiliza imágenes de alta calidad con fondo neutro</li>
              <li>• Imagen principal recomendada: 1200 x 800 píxeles</li>
              <li>• Formatos aceptados: JPG, PNG</li>
              <li>• Tamaño máximo: 5 MB por archivo</li>
              <li>• Muestra detalles únicos y diferenciadores del producto</li>
              <li className="text-[#d98c53]">
                • Incluye al menos una imagen que muestre el "resplandor
                sobrenatural" del producto
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Input oculto para subir archivos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
      />

      {/* Botones de acción */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-[#1a3a3a] text-[#1a3a3a] font-medium rounded"
        >
          ANTERIOR
        </button>

        <button
          type="button"
          className="px-6 py-2 bg-white border border-[#1a3a3a] text-[#1a3a3a] font-medium rounded"
        >
          VISTA PREVIA
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#d98c53] text-white font-medium rounded disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "GUARDANDO..." : "SIGUIENTE"}
        </button>
      </div>
    </form>
  );
};

export default ImagesForm;
