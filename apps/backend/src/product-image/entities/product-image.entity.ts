import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';

export class ProductImage {
  @ApiProperty({ description: 'ID único de la imagen' })
  id: number;

  @ApiProperty({ description: 'ID del producto relacionado' })
  productId: number;

  @ApiProperty({ description: 'Producto relacionado', type: Product })
  product?: Product;

  @ApiProperty({ description: 'URL de la imagen' })
  imageUrl: string;

  @ApiProperty({
    description: 'Texto alternativo para la imagen',
    required: false,
  })
  altText?: string;

  @ApiProperty({ description: 'Indica si es la imagen principal del producto' })
  isPrimary: boolean;

  @ApiProperty({ description: 'Orden de visualización' })
  position: number;

  @ApiProperty({
    description: 'Ancho de la imagen en píxeles',
    required: false,
  })
  width?: number;

  @ApiProperty({ description: 'Alto de la imagen en píxeles', required: false })
  height?: number;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}
