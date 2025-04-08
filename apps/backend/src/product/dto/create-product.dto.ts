import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsUrl,
  Min,
  MaxLength,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductImageDto {
  @ApiProperty({
    description: 'URL de la imagen',
    example: 'https://storage.jadewhispers.com/products/tetera-qing-01.jpg',
  })
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  @IsNotEmpty({ message: 'La URL de la imagen es requerida' })
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
    default: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'La posición debe ser un número' })
  position?: number = 0;

  @ApiProperty({
    description: 'Ancho de la imagen en píxeles',
    example: 800,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El ancho debe ser un número' })
  width?: number;

  @ApiProperty({
    description: 'Alto de la imagen en píxeles',
    example: 600,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El alto debe ser un número' })
  height?: number;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Tetera de la Dinastía Qing',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(255, { message: 'El nombre no puede exceder los 255 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Descripción técnica del producto',
    example:
      'Auténtica tetera de porcelana de la dinastía Qing (circa 1720), con patrón de flores de loto y dragones imperiales.',
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty({
    description: 'Descripción cómica del producto',
    example:
      'Esta tetera probablemente ha visto más intrigas políticas que un espía moderno. Ahora solo quiere un hogar tranquilo donde pueda servir té y contar historias a la medianoche.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción cómica debe ser un texto' })
  comicDescription?: string;

  @ApiProperty({
    description: 'Historia sobrenatural asociada',
    example:
      'Cuenta la leyenda que esta tetera perteneció a Li Wei, el maestro de té imperial. Una noche, un erudito anciano apareció misteriosamente y bendijo la tetera, vinculándose a ella para siempre.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La historia sobrenatural debe ser un texto' })
  supernaturalStory?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 899.99,
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 5,
  })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @ApiProperty({
    description: 'Dinastía (Ming, Qing, etc.)',
    example: 'Qing',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La dinastía debe ser un texto' })
  dynasty?: string;

  @ApiProperty({
    description: 'Material (Jade, Porcelana, etc.)',
    example: 'Porcelana',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El material debe ser un texto' })
  material?: string;

  @ApiProperty({
    description: 'Dimensiones físicas',
    example: '15cm x 10cm x 12cm',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Las dimensiones deben ser un texto' })
  dimensions?: string;

  @ApiProperty({
    description: 'Peso en kg',
    example: 0.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El peso debe ser un número' })
  @Min(0, { message: 'El peso no puede ser negativo' })
  weight?: number;

  @ApiProperty({
    description: 'ID del certificado sobrenatural',
    example: '4385-B',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El ID del certificado debe ser un texto' })
  certificateId?: string;

  @ApiProperty({
    description: 'Origen de la antigüedad',
    example: 'Pekín, China',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El origen debe ser un texto' })
  origin?: string;

  @ApiProperty({
    description: 'Indica si es un producto destacado',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'featured debe ser un booleano' })
  featured?: boolean = false;

  @ApiProperty({
    description: 'Imágenes del producto',
    type: [CreateProductImageDto],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'images debe ser un array' })
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  @ArrayMinSize(0, { message: 'Debe proporcionar al menos una imagen' })
  images?: CreateProductImageDto[];

  @ApiProperty({
    description: 'IDs de las categorías',
    example: [1, 3, 5],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'categoryIds debe ser un array' })
  @IsNumber(
    {},
    { each: true, message: 'Cada ID de categoría debe ser un número' },
  )
  categoryIds?: number[];
}
