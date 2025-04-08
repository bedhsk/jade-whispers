import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';

export class CategoryProduct {
  @ApiProperty({ description: 'ID del producto relacionado' })
  productId: number;

  @ApiProperty({ description: 'ID de la categoría relacionada' })
  categoryId: number;

  @ApiProperty({
    description: 'Información del producto relacionado',
    type: Product,
  })
  product?: Product;
}
