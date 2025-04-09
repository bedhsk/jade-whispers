import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '@prisma/client';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID del producto',
    example: 1,
  })
  @IsInt({ message: 'El ID del producto debe ser un número entero' })
  productId: number;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 2,
  })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Items del pedido',
    type: [CreateOrderItemDto],
  })
  @IsArray({ message: 'Los items deben ser un array' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Dirección de envío completa',
    example: 'Calle Principal 123, Madrid, España, 28001',
  })
  @IsString({ message: 'La dirección de envío debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección de envío es requerida' })
  shippingAddress: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'Tarjeta de crédito',
  })
  @IsString({ message: 'El método de pago debe ser un texto' })
  @IsNotEmpty({ message: 'El método de pago es requerido' })
  paymentMethod: string;

  @ApiProperty({
    description: 'ID de la transacción de pago',
    example: 'txn_1234567890',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El ID de pago debe ser un texto' })
  paymentId?: string;

  @ApiProperty({
    description: 'Indica si el pedido incluye seguro para maldiciones',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'hasSupernatural debe ser un booleano' })
  hasSupernatural?: boolean = true;
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Nuevo estado del pedido',
    enum: OrderStatus,
    example: OrderStatus.PROCESSING,
  })
  @IsEnum(OrderStatus, { message: 'El estado debe ser un valor válido' })
  status: OrderStatus;
}
