import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { User } from 'src/user/entities/user.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class Order {
  @ApiProperty({ description: 'ID único del pedido' })
  id: number;

  @ApiProperty({ description: 'ID del usuario que realizó el pedido' })
  userId: number;

  @ApiProperty({
    description: 'Usuario que realizó el pedido',
    type: () => User,
  })
  user?: User;

  @ApiProperty({ description: 'Estado actual del pedido', enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({ description: 'Monto total del pedido', example: 1299.99 })
  total: Decimal | number;

  @ApiProperty({ description: 'Dirección de envío' })
  shippingAddress: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'Tarjeta de crédito',
  })
  paymentMethod: string;

  @ApiProperty({ description: 'ID de la transacción de pago', required: false })
  paymentId?: string;

  @ApiProperty({
    description: 'Indica si el pedido incluye seguro para maldiciones',
  })
  hasSupernatural: boolean;

  @ApiProperty({ description: 'Fecha de creación del pedido' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización del pedido' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Items incluidos en el pedido',
    type: [OrderItem],
  })
  items?: OrderItem[];
}
