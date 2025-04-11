import apiClient from "./apiClient";

// Interfaces para los tipos de datos
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LoginResponse {
  access_token: string; // Nombre correcto según el backend
  token?: string; // Optional token property for backward compatibility
  user: User;
}

interface RegisterResponse {
  access_token: string;
  user: User;
}

// Servicio de autenticación
const authService = {
  // Verificar conectividad con el backend
  async checkConnection() {
    try {
      // Intentar una solicitud simple al backend
      await apiClient.get("/auth");
      return true;
    } catch (error: any) {
      // Si hay un error 404 pero llega respuesta, significa que el servidor está activo
      // pero el endpoint exacto no existe, lo cual es aceptable para verificar conectividad
      if (error.response && error.response.status === 404) {
        return true;
      }
      return false;
    }
  },

  // Iniciar sesión
  async login(credentials: LoginCredentials) {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/auth/login",
        credentials
      );

      // Verificar explícitamente la estructura de la respuesta
      if (response.data && typeof response.data === "object") {
        // Si la respuesta no tiene access_token, pero tiene token, adaptarla
        if (response.data.token && !response.data.access_token) {
          response.data.access_token = response.data.token;
        }
      }

      return response.data;
    } catch (error) {
      throw error; // Re-lanzar para manejo en componente
    }
  },

  // Registrar usuario
  async register(userData: RegisterData) {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  // Obtener perfil del usuario actual
  async getCurrentUser() {
    const response = await apiClient.get("/auth/profile");
    return response.data;
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return !!localStorage.getItem("auth_token");
  },

  // Establecer token en localStorage
  setAuthToken(token: string) {
    localStorage.setItem("auth_token", token);
  },

  // Establecer datos del usuario en localStorage
  setUserData(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  },
};

export default authService;
export type {
  LoginCredentials,
  RegisterData,
  User,
  LoginResponse,
  RegisterResponse,
};
