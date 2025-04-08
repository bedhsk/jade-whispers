import { ApiProperty } from '@nestjs/swagger';
import { CategoryProduct } from './category-product.entity';

export class Category {
  @ApiProperty({ description: 'ID único de la categoría' })
  id: number;

  @ApiProperty({ description: 'Nombre de la categoría' })
  name: string;

  @ApiProperty({ description: 'Descripción de la categoría', required: false })
  description: string | null;

  @ApiProperty({
    description: 'URL del ícono de la categoría',
    required: false,
  })
  iconUrl: string | null;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Productos relacionados a esta categoría',
    type: [CategoryProduct],
  })
  products?: CategoryProduct[];

  @ApiProperty({ description: 'Cantidad de productos en esta categoría' })
  _count?: {
    products: number;
  };
}
