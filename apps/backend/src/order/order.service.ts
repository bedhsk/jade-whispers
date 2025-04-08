import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update-order.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    // Verificar que los productos existen y tienen stock suficiente
    const orderItems = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(
            `Producto con ID ${item.productId} no encontrado`,
          );
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Stock insuficiente para el producto ${product.name}. Disponible: ${product.stock}, Solicitado: ${item.quantity}`,
          );
        }

        return {
          product,
          quantity: item.quantity,
        };
      }),
    );

    // Calcular el total del pedido
    const total = orderItems.reduce((sum, item) => {
      const itemTotal = new Decimal(item.product.price.toString()).mul(
        item.quantity,
      );
      return sum.add(itemTotal);
    }, new Decimal(0));

    // Crear el pedido con sus items en una transacción
    const order = await this.prisma.$transaction(async (prisma) => {
      // Crear el pedido
      const newOrder = await prisma.order.create({
        data: {
          userId,
          status: OrderStatus.PENDING,
          total,
          shippingAddress: createOrderDto.shippingAddress,
          paymentMethod: createOrderDto.paymentMethod,
          paymentId: createOrderDto.paymentId,
          hasSupernatural: createOrderDto.hasSupernatural ?? true,
          items: {
            create: orderItems.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    where: { isPrimary: true },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });

      // Actualizar el stock de los productos
      await Promise.all(
        orderItems.map((item) =>
          prisma.product.update({
            where: { id: item.product.id },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          }),
        ),
      );

      return newOrder;
    });

    return order;
  }

  async findAll(userId: number, isAdmin = false) {
    // Si es administrador, puede ver todos los pedidos
    // Si es usuario normal, solo ve sus propios pedidos
    const where = isAdmin ? {} : { userId };

    return this.prisma.order.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number, userId: number, isAdmin = false) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    // Verificar permisos: solo administradores o el propio usuario pueden ver el pedido
    if (!isAdmin && order.userId !== userId) {
      throw new ForbiddenException('No tienes permiso para ver este pedido');
    }

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
    userId: number,
    isAdmin = false,
  ) {
    // Solo administradores pueden actualizar pedidos
    if (!isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar este pedido',
      );
    }

    // Verificar que el pedido existe
    await this.findOne(id, userId, isAdmin);

    // Actualizar el pedido (no se permite modificar los items)
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateOrderStatusDto,
    userId: number,
    isAdmin = false,
  ) {
    // Solo administradores pueden cambiar el estado
    if (!isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar el estado del pedido',
      );
    }

    // Verificar que el pedido existe
    const order = await this.findOne(id, userId, isAdmin);

    // Validar transiciones de estado
    this.validateStatusTransition(order.status, updateStatusDto.status);

    // Actualizar el estado
    return this.prisma.order.update({
      where: { id },
      data: {
        status: updateStatusDto.status,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
  }

  async cancel(id: number, userId: number, isAdmin = false) {
    // Verificar que el pedido existe
    const order = await this.findOne(id, userId, isAdmin);

    // Solo el propietario o un administrador pueden cancelar un pedido
    if (!isAdmin && order.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para cancelar este pedido',
      );
    }

    // Solo se pueden cancelar pedidos pendientes o en proceso
    if (
      order.status !== OrderStatus.PENDING &&
      order.status !== OrderStatus.PROCESSING
    ) {
      throw new BadRequestException(
        `No se puede cancelar un pedido en estado ${order.status}`,
      );
    }

    // Cancelar el pedido y restaurar el stock en una transacción
    return this.prisma.$transaction(async (prisma) => {
      // Obtener los items para restaurar stock
      const items = await prisma.orderItem.findMany({
        where: { orderId: id },
      });

      // Restaurar stock de los productos
      await Promise.all(
        items.map((item) =>
          prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          }),
        ),
      );

      // Actualizar estado del pedido a cancelado
      return prisma.order.update({
        where: { id },
        data: {
          status: OrderStatus.CANCELLED,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    where: { isPrimary: true },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });
    });
  }

  async getUserOrderHistory(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
  }

  // Validación de transiciones de estado
  private validateStatusTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
  ) {
    const allowedTransitions = {
      [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `No se puede cambiar el estado de un pedido ${currentStatus} a ${newStatus}`,
      );
    }
  }
}
