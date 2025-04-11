// Import directo del archivo apiClient.ts, sin depender del índice
import apiClient from "./apiClient";

// Interfaces para los tipos de productos
interface ProductImage {
  id: number;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  position: number;
  width?: number;
  height?: number;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  iconUrl?: string;
}

interface CategoryProduct {
  categoryId: number;
  productId: number;
  category: Category;
}

interface User {
  id: number;
  name?: string;
  email: string;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  supernaturalExperience?: string;
  createdAt: string;
  user: User;
}

interface SupernaturalEffect {
  productId: number;
  effectId: number;
  description?: string;
  isGuaranteed: boolean;
  effect: {
    id: number;
    name: string;
    description: string;
    riskLevel: string;
  };
}

// Interfaz para el producto completo
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  comicDescription?: string;
  supernaturalStory?: string;
  supernaturalPowers?: string;
  paranormalActivityLevel?: number;
  careInstructions?: string;
  price: number;
  stock: number;
  dynasty?: string;
  material?: string;
  dimensions?: string;
  weight?: number;
  certificateId?: string;
  origin?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  categories: CategoryProduct[];
  reviews: Review[];
  supernaturalEffects: SupernaturalEffect[];
}

// Respuesta paginada
interface PaginatedResponse {
  data: Product[];
  count: number;
  totalPages: number;
}

// Parámetros para filtrado de productos
interface ProductFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "createdAt" | "name";
  sortOrder?: "asc" | "desc";
  featured?: boolean;
}

// DTO para agregar imágenes a un producto
interface AddProductImagesDto {
  images: Array<{
    imageUrl: string;
    altText?: string;
    isPrimary?: boolean;
    position?: number;
  }>;
}

// DTO para actualizar categorías de un producto
interface UpdateProductCategoriesDto {
  categoryIds: number[];
}

// Servicio de productos
const productService = {
  // Obtener todos los productos (con filtros opcionales)
  async getProducts(params?: ProductFilterParams): Promise<PaginatedResponse> {
    const response = await apiClient.get("/products", { params });
    return response.data;
  },

  // Obtener un producto por ID
  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Obtener un producto por slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await apiClient.get(`/products/slug/${slug}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Si el producto no existe, devolvemos null en lugar de lanzar error
        console.log(`Producto con slug "${slug}" no encontrado`);
        return null;
      }
      // Si es otro tipo de error, lo propagamos
      throw error;
    }
  },

  // Obtener productos por categoría
  async getProductsByCategory(categoryId: number): Promise<PaginatedResponse> {
    const response = await apiClient.get("/products", {
      params: { categoryId },
    });
    return response.data;
  },

  // Obtener productos destacados
  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    const response = await apiClient.get("/products/featured", {
      params: { limit },
    });
    return response.data;
  },

  // Obtener productos relacionados
  async getRelatedProducts(productId: number, limit = 4): Promise<Product[]> {
    const response = await apiClient.get(`/products/${productId}/related`, {
      params: { limit },
    });
    return response.data;
  },

  // Buscar productos
  async searchProducts(query: string): Promise<PaginatedResponse> {
    const response = await apiClient.get("/products", {
      params: { search: query },
    });
    return response.data;
  },

  // Agregar imágenes a un producto (requiere autenticación admin)
  async addProductImages(
    productId: number,
    imagesDto: AddProductImagesDto
  ): Promise<Product> {
    const response = await apiClient.post(
      `/products/${productId}/images`,
      imagesDto
    );
    return response.data;
  },

  // Eliminar una imagen de un producto (requiere autenticación admin)
  async removeProductImage(
    productId: number,
    imageId: number
  ): Promise<boolean> {
    await apiClient.delete(`/products/${productId}/images/${imageId}`);
    return true;
  },

  // Establecer una imagen como principal (requiere autenticación admin)
  async setImageAsPrimary(
    productId: number,
    imageId: number
  ): Promise<boolean> {
    await apiClient.patch(`/products/${productId}/images/${imageId}/primary`);
    return true;
  },
};

export default productService;
export type {
  Product,
  ProductImage,
  Category,
  CategoryProduct,
  Review,
  SupernaturalEffect,
  PaginatedResponse,
  ProductFilterParams,
  AddProductImagesDto,
  UpdateProductCategoriesDto,
};
