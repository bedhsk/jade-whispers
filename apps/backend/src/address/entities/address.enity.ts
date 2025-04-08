import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class Address {
  @ApiProperty({ description: 'ID único de la dirección' })
  id: number;

  @ApiProperty({ description: 'ID del usuario propietario' })
  userId: number;

  @ApiProperty({ description: 'Usuario propietario' })
  user?: User;

  @ApiProperty({ description: 'Calle y número' })
  street: string;

  @ApiProperty({ description: 'Ciudad' })
  city: string;

  @ApiProperty({ description: 'Estado o provincia' })
  state: string;

  @ApiProperty({ description: 'Código postal' })
  postalCode: string;

  @ApiProperty({ description: 'País' })
  country: string;

  @ApiProperty({ description: 'Indica si es la dirección predeterminada' })
  isDefault: boolean;
}
