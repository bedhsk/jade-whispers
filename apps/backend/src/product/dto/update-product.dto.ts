import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto, CreateProductImageDto } from './create-product.dto';
import {
  IsArray,
  ValidateNested,
  IsNumber,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // Todos los campos son opcionales gracias a PartialType
}

export class AddProductImagesDto {
  @ApiProperty({
    description: 'Imágenes a agregar al producto',
    type: [CreateProductImageDto],
  })
  @IsArray({ message: 'images debe ser un array' })
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos una imagen' })
  images: CreateProductImageDto[];
}

export class UpdateProductCategoriesDto {
  @ApiProperty({
    description: 'IDs de las categorías a asignar',
    example: [1, 3, 5],
    type: [Number],
  })
  @IsArray({ message: 'categoryIds debe ser un array' })
  @IsNumber(
    {},
    { each: true, message: 'Cada ID de categoría debe ser un número' },
  )
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos una categoría' })
  categoryIds: number[];
}
