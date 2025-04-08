import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, MaxLength } from 'class-validator';

export enum RiskLevel {
  LOW = 'Bajo',
  MEDIUM = 'Medio',
  HIGH = 'Alto',
}

export class CreateSupernaturalEffectDto {
  @ApiProperty({
    description: 'Nombre del efecto sobrenatural',
    example: 'Apariciones fantasmales',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del efecto',
    example:
      'Causa apariciones de ancianos eruditos que cuentan historias y acertijos después de medianoche.',
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty({
    description: 'Nivel de riesgo del efecto',
    enum: RiskLevel,
    example: RiskLevel.LOW,
  })
  @IsEnum(RiskLevel, {
    message: 'El nivel de riesgo debe ser Bajo, Medio o Alto',
  })
  @IsNotEmpty({ message: 'El nivel de riesgo es requerido' })
  riskLevel: RiskLevel;
}
