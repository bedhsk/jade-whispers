import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';
import { SupernaturalEffect } from 'src/supernatural-effect/entities/supernatural-effect.entity';

export class ProductEffect {
  @ApiProperty({ description: 'ID del producto relacionado' })
  productId: number;

  @ApiProperty({ description: 'ID del efecto sobrenatural relacionado' })
  effectId: number;

  @ApiProperty({ description: 'Producto relacionado', type: Product })
  product?: Product;

  @ApiProperty({
    description: 'Efecto sobrenatural relacionado',
    type: SupernaturalEffect,
  })
  effect?: SupernaturalEffect;

  @ApiProperty({
    description: 'Descripción específica para este producto',
    required: false,
  })
  description?: string;

  @ApiProperty({ description: 'Indica si el efecto está garantizado' })
  isGuaranteed: boolean;
}
