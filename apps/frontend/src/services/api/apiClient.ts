import axios from "axios";
import axiosConfig, { getAuthToken } from "./axiosConfig";

// Verificar si estamos en un entorno de navegador
const isBrowser = typeof window !== "undefined";

// Determinar el entorno y ajustar la URL base si es necesario
const determineBaseURL = () => {
  // URL por defecto para desarrollo local
  let baseURL = "http://localhost:3000";

  // En un entorno de producción (como Vercel), usar una URL relativa o variable de entorno
  if (process.env.NODE_ENV === "production") {
    baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";
  }

  // Para desarrollo local, permitir anulación mediante variable de entorno
  if (process.env.NEXT_PUBLIC_API_URL) {
    baseURL = process.env.NEXT_PUBLIC_API_URL;
  }

  return baseURL;
};

// Crear una instancia de Axios con la configuración base
const apiClient = axios.create({
  ...axiosConfig,
  baseURL: determineBaseURL(),
  timeout: 10000, // Timeout de 10 segundos
});

// Interceptor para agregar token de autenticación si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si hay un error 401, limpiar credenciales solo si estamos en navegador
    if (error.response && error.response.status === 401 && isBrowser) {
      localStorage.removeItem("auth_token");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
