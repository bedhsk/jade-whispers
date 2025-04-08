import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Calle o avenida y número',
    example: 'Calle Principal 123',
  })
  @IsString({ message: 'La calle debe ser un texto' })
  @IsNotEmpty({ message: 'La calle es requerida' })
  street: string;

  @ApiProperty({
    description: 'Ciudad',
    example: 'Madrid',
  })
  @IsString({ message: 'La ciudad debe ser un texto' })
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  city: string;

  @ApiProperty({
    description: 'Estado o provincia',
    example: 'Cataluña',
  })
  @IsString({ message: 'El estado debe ser un texto' })
  @IsNotEmpty({ message: 'El estado es requerido' })
  state: string;

  @ApiProperty({
    description: 'Código postal',
    example: '28001',
  })
  @IsString({ message: 'El código postal debe ser un texto' })
  @IsNotEmpty({ message: 'El código postal es requerido' })
  postalCode: string;

  @ApiProperty({
    description: 'País',
    example: 'España',
  })
  @IsString({ message: 'El país debe ser un texto' })
  @IsNotEmpty({ message: 'El país es requerido' })
  country: string;

  @ApiProperty({
    description: 'Indica si es la dirección predeterminada',
    example: true,
    required: false,
    default: false,
  })
  @IsBoolean({ message: 'El campo isDefault debe ser un booleano' })
  @IsOptional()
  isDefault?: boolean = false;
}
