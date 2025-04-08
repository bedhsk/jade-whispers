import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductEffectDto {
  @ApiProperty({
    description: 'ID del efecto sobrenatural',
    example: 1,
  })
  @IsInt({ message: 'El ID del efecto debe ser un número entero' })
  effectId: number;

  @ApiProperty({
    description:
      'Descripción personalizada del efecto para este producto específico',
    example:
      'Este jarrón causará apariciones específicas de un poeta de la dinastía Ming',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  description?: string;

  @ApiProperty({
    description: 'Indica si el efecto está garantizado',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isGuaranteed debe ser un booleano' })
  isGuaranteed?: boolean = false;
}

export class UpdateProductEffectDto {
  @ApiProperty({
    description:
      'Descripción personalizada del efecto para este producto específico',
    example:
      'Este jarrón causará apariciones específicas de un poeta de la dinastía Ming',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  description?: string;

  @ApiProperty({
    description: 'Indica si el efecto está garantizado',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isGuaranteed debe ser un booleano' })
  isGuaranteed?: boolean;
}
