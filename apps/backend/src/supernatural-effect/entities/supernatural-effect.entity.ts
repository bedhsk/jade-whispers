import { ApiProperty } from '@nestjs/swagger';
import { ProductEffect } from 'src/product-effect/entities/product-effect.entity';

export class SupernaturalEffect {
  @ApiProperty({ description: 'ID único del efecto' })
  id: number;

  @ApiProperty({ description: 'Nombre del efecto' })
  name: string;

  @ApiProperty({ description: 'Descripción detallada del efecto' })
  description: string;

  @ApiProperty({ description: 'Nivel de riesgo (Bajo, Medio, Alto)' })
  riskLevel: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  updatedAt: Date;

  @ApiProperty({ description: 'Productos relacionados', type: [ProductEffect] })
  products?: ProductEffect[];
}
