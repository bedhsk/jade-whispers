import { ApiProperty } from '@nestjs/swagger';
import {
  IsUrl,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({
    description: 'URL de la imagen',
    example: 'https://storage.jadewhispers.com/products/tetera-qing-01.jpg',
  })
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  imageUrl: string;

  @ApiProperty({
    description: 'Texto alternativo para la imagen',
    example: 'Tetera de porcelana dinastía Qing vista frontal',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El texto alternativo debe ser un texto' })
  altText?: string;

  @ApiProperty({
    description: 'Indica si es la imagen principal del producto',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isPrimary debe ser un booleano' })
  isPrimary?: boolean = false;

  @ApiProperty({
    description: 'Orden de visualización',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'La posición debe ser un número' })
  @Min(0, { message: 'La posición no puede ser negativa' })
  position?: number;

  @ApiProperty({
    description: 'Ancho de la imagen en píxeles',
    example: 800,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El ancho debe ser un número' })
  @Min(1, { message: 'El ancho debe ser mayor que 0' })
  width?: number;

  @ApiProperty({
    description: 'Alto de la imagen en píxeles',
    example: 600,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El alto debe ser un número' })
  @Min(1, { message: 'El alto debe ser mayor que 0' })
  height?: number;
}
