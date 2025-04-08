import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductEffect } from 'src/product-effect/entities/product-effect.entity';
import { CategoryProduct } from 'src/category/entities/category-product.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Review } from 'src/review/entities/review.entity';

export class Product {
  @ApiProperty({ description: 'ID único del producto' })
  id: number;

  @ApiProperty({ description: 'Nombre del producto' })
  name: string;

  @ApiProperty({ description: 'Descripción técnica del producto' })
  description: string;

  @ApiProperty({
    description: 'Descripción cómica del producto',
    required: false,
  })
  comicDescription?: string;

  @ApiProperty({
    description: 'Historia sobrenatural asociada',
    required: false,
  })
  supernaturalStory?: string;

  @ApiProperty({ description: 'Precio del producto', example: 899.99 })
  price: Decimal | number;

  @ApiProperty({ description: 'Cantidad disponible en inventario' })
  stock: number;

  @ApiProperty({ description: 'Dinastía (Ming, Qing, etc.)', required: false })
  dynasty?: string;

  @ApiProperty({
    description: 'Material (Jade, Porcelana, etc.)',
    required: false,
  })
  material?: string;

  @ApiProperty({
    description: 'Dimensiones físicas',
    required: false,
    example: '15cm x 10cm x 12cm',
  })
  dimensions?: string;

  @ApiProperty({ description: 'Peso en kg', required: false, example: 0.5 })
  weight?: number;

  @ApiProperty({
    description: 'ID del certificado sobrenatural',
    required: false,
  })
  certificateId?: string;

  @ApiProperty({ description: 'Origen de la antigüedad', required: false })
  origin?: string;

  @ApiProperty({ description: 'Indica si es un producto destacado' })
  featured: boolean;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  updatedAt: Date;

  @ApiProperty({ description: 'Imágenes del producto', type: [ProductImage] })
  images?: ProductImage[];

  @ApiProperty({
    description: 'Categorías a las que pertenece',
    type: [CategoryProduct],
  })
  categories?: CategoryProduct[];

  @ApiProperty({
    description: 'Items de pedido relacionados',
    type: [OrderItem],
  })
  orderItems?: OrderItem[];

  @ApiProperty({ description: 'Reseñas del producto', type: [Review] })
  reviews?: Review[];

  @ApiProperty({ description: 'Efectos sobrenaturales', type: [ProductEffect] })
  supernaturalEffects?: ProductEffect[];
}
