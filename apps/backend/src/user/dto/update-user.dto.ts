import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
    required: false,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'nueva_password123',
    required: false,
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Rol del usuario',
    enum: Role,
    required: false,
  })
  @IsEnum(Role, { message: 'El rol debe ser USER o ADMIN' })
  @IsOptional()
  role?: Role;
}
