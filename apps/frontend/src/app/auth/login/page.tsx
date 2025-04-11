"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/services/api";

// Componente para notificaciones
function Notification({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Cerrar automáticamente después de 5 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} max-w-xs`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato de correo electrónico no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
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
    setLoginError("");
    setNotification(null);

    try {
      // Verificar conectividad con el backend antes de intentar login
      const isConnected = await authService.checkConnection();

      if (!isConnected) {
        throw new Error(
          "No se pudo establecer conexión con el servidor. Por favor, verifica que el servidor backend esté en funcionamiento."
        );
      }

      // Llamada al servicio de autenticación
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      // Usar el nombre correcto de la propiedad según el tipo LoginResponse
      const token = response?.access_token;

      if (!response || !token) {
        throw new Error(
          "Respuesta inválida del servidor. No se recibió el token de autenticación."
        );
      }

      // Usar los métodos del servicio para almacenar credenciales
      authService.setAuthToken(token);

      if (response.user) {
        authService.setUserData(response.user);
      }

      // Mostrar notificación de éxito
      setNotification({
        message: "¡Inicio de sesión exitoso! Redirigiendo...",
        type: "success",
      });

      // Redirigir a la página principal después de un breve retraso para mostrar la notificación
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      // Limpiar cualquier token o datos de usuario que pudieran existir
      authService.logout();

      // Mostrar mensaje de error específico según la respuesta del servidor
      if (error.response) {
        // El servidor respondió con un código de estado de error
        if (error.response.status === 401) {
          setLoginError(
            "Credenciales incorrectas. Por favor, inténtalo de nuevo."
          );
        } else if (error.response.data?.message) {
          setLoginError(error.response.data.message);
        } else {
          setLoginError(
            `Error del servidor: ${error.response.status} - ${error.response.statusText || "Error desconocido"}`
          );
        }
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        setLoginError(
          "No se pudo conectar con el servidor. Verifica que el backend esté en funcionamiento en http://localhost:3000"
        );
      } else {
        // Error al configurar la solicitud o error personalizado
        setLoginError(
          error.message || "Error desconocido durante la autenticación"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // En una implementación real, aquí se redigiría a la autenticación con el proveedor
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full shadow-lg">
        {/* Panel izquierdo */}
        <div className="bg-[#1a3a3a] text-[#d1c5a5] p-10 flex flex-col">
          <h1 className="text-3xl font-bold mb-12 text-center md:text-left">
            JADE WHISPERS
          </h1>

          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 mb-6 bg-[#254040] rounded-md flex items-center justify-center">
              <p className="text-[#d1c5a5] text-center">
                [Ilustración de jarrón antiguo]
              </p>
            </div>

            <p className="text-lg italic text-center">
              "Antigüedades con historias que no querrás creer"
            </p>
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="bg-white p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl font-bold text-[#1a3a3a] mb-8">
              Iniciar Sesión
            </h2>

            {loginError && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-[#1a3a3a] font-medium mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-[#d98c53]`}
                  placeholder="ejemplo@email.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-[#1a3a3a] font-medium mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-[#d98c53]`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                )}

                <div className="text-right mt-2">
                  <Link
                    href="/auth/recuperar-password"
                    className="text-[#d98c53] text-sm hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d98c53] text-white py-3 rounded text-center font-medium hover:bg-opacity-90 transition-colors disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "INICIANDO SESIÓN..." : "INICIAR SESIÓN"}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-gray-500">o</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full mb-3 bg-white border border-gray-300 text-gray-700 py-3 rounded flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
            >
              Continuar con Google
            </button>

            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
            >
              Continuar con Facebook
            </button>

            <div className="mt-8 text-center">
              <p className="text-[#1a3a3a]">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/auth/registro"
                  className="text-[#d98c53] font-medium hover:underline"
                >
                  Regístrate
                </Link>
              </p>
            </div>

            <p className="mt-6 text-xs text-gray-500 text-center italic">
              *No compartimos tus datos con entidades del plano astral
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
