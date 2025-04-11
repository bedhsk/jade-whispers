import axios from "axios";

// Verificar si estamos en un entorno de navegador
const isBrowser = typeof window !== "undefined";

// Crear y exportar la configuración base para axios
const axiosConfig = {
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Función para obtener el token de autenticación (segura para SSR)
export const getAuthToken = () => {
  if (isBrowser) {
    return localStorage.getItem("auth_token");
  }
  return null;
};

export default axiosConfig;
