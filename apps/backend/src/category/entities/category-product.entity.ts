import { ApiProperty } from '@nestjs/swagger';

export class CategoryProduct {
  @ApiProperty({ description: 'ID del producto relacionado' })
  productId: number;

  @ApiProperty({ description: 'ID de la categoría relacionada' })
  categoryId: number;
}
