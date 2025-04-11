import apiClient from "./apiClient";
import authService from "./authService";
import productService from "./productService";
import orderService from "./orderService";

export { apiClient, authService, productService, orderService };

// Re-exportar para facilitar las importaciones
export * from "./authService";
export * from "./productService";
export * from "./orderService";
