import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsArray, IsNumber, ArrayMinSize } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  // Extends CreateCategoryDto pero hace todos los campos opcionales
}

// DTO separado para agregar/remover productos a categorías
export class CategoryProductsDto {
  @ApiProperty({
    description: 'IDs de los productos a relacionar con la categoría',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray({ message: 'Debe proporcionar un array de IDs de productos' })
  @IsNumber({}, { each: true, message: 'Cada ID debe ser un número' })
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos un ID de producto' })
  productIds: number[];
}
