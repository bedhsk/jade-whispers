import apiClient from "./apiClient";

// Interfaces para órdenes
interface OrderItem {
  id?: number;
  productId: number;
  quantity: number;
  price: number;
  orderId?: number;
}

interface Order {
  id?: number;
  userId: number;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

// Servicio de órdenes
const orderService = {
  // Crear una nueva orden
  async createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) {
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  },

  // Obtener todas las órdenes del usuario actual
  async getUserOrders() {
    const response = await apiClient.get("/orders/user");
    return response.data;
  },

  // Obtener una orden por ID
  async getOrderById(id: number) {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  // Cancelar una orden
  async cancelOrder(id: number) {
    const response = await apiClient.patch(`/orders/${id}/cancel`, {});
    return response.data;
  },

  // Actualizar el estado de una orden
  async updateOrderStatus(id: number, status: OrderStatus) {
    const response = await apiClient.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default orderService;
export type { Order, OrderItem, OrderStatus };
