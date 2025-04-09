import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../entities/order.entity'; // Importar el enum OrderStatus

// No permitimos modificar los items después de la creación
export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['items'] as const),
) {}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Nuevo estado del pedido',
    enum: OrderStatus,
    example: OrderStatus.PROCESSING,
  })
  @IsEnum(OrderStatus, { message: 'El estado debe ser un valor válido' })
  status: OrderStatus;
}
