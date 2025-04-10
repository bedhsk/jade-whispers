"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    receiveOffers: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Limpiar error al editar
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato de correo electrónico no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setRegisterError("");

    try {
      // Aquí iría la lógica de registro real con tu backend
      // Por ahora simulamos un registro exitoso después de 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulación de un registro exitoso
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          name: formData.name,
          email: formData.email,
        })
      );

      // Redireccionar a la página de inicio
      router.push("/");
    } catch (error) {
      console.error("Error al registrarse:", error);
      setRegisterError(
        "Error al crear la cuenta. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // En una implementación real, aquí se redigiría a la autenticación con el proveedor
    console.log(`Registrándose con ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full shadow-lg">
        {/* Panel izquierdo */}
        <div className="bg-[#1a3a3a] text-[#d1c5a5] p-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center">JADE WHISPERS</h1>

          <div className="w-56 h-56 mb-6 bg-[#254040] rounded-md flex items-center justify-center">
            <p className="text-[#d1c5a5] text-center">
              [Figura de jade ilustrada]
            </p>
          </div>

          <p className="text-lg italic text-center">
            "Objetos con personalidad y poderes cuestionables"
          </p>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="bg-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#1a3a3a] mb-6">
            Crear cuenta
          </h2>

          {registerError && (
            <div className="mb-4 p-2 bg-red-50 text-red-600 border border-red-200 rounded">
              {registerError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-[#1a3a3a] font-medium mb-1"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-[#d98c53]`}
                placeholder="Tu nombre"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[#1a3a3a] font-medium mb-1"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-[#d98c53]`}
                placeholder="ejemplo@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[#1a3a3a] font-medium mb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-[#d98c53]`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[#1a3a3a] font-medium mb-1"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-[#d98c53]`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-[#d98c53] focus:ring-[#d98c53] border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-2 block text-sm text-[#1a3a3a]"
                >
                  Acepto los{" "}
                  <Link href="/terminos" className="text-[#d98c53]">
                    términos y condiciones
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-xs ml-6">
                  {errors.acceptTerms}
                </p>
              )}

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="receiveOffers"
                  name="receiveOffers"
                  checked={formData.receiveOffers}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-[#d98c53] focus:ring-[#d98c53] border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="receiveOffers"
                  className="ml-2 block text-sm text-[#1a3a3a]"
                >
                  Quiero recibir ofertas y novedades sobrenaturales
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d98c53] text-white py-3 rounded text-center font-medium hover:bg-opacity-90 transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "REGISTRANDO..." : "REGISTRARSE"}
            </button>

            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-2 text-gray-500 text-sm">o</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded flex items-center justify-center font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Continuar con Google
            </button>

            <div className="text-center mt-2">
              <p className="text-[#1a3a3a] text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#d98c53] font-medium hover:underline"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
