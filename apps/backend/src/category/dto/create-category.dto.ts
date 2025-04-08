import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Dinastía Ming',
  })
  @IsNotEmpty({ message: 'El nombre de la categoría es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Artefactos de la dinastía Ming (1368-1644)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  description?: string;

  @ApiProperty({
    description: 'URL del ícono de la categoría',
    example: 'https://storage.jadewhispers.com/icons/ming-dynasty.svg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La URL del ícono debe ser un texto' })
  iconUrl?: string;
}
