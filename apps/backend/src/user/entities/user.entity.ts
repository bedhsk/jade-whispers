import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Address } from 'src/address/entities/address.enity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';

export { Role };

export class User {
  @ApiProperty({ description: 'ID único del usuario' })
  id: number;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ description: 'Nombre del usuario', required: false })
  name?: string;

  @ApiProperty({ description: 'Contraseña encriptada del usuario' })
  password: string;

  @ApiProperty({ description: 'Rol del usuario (USER o ADMIN)', enum: Role })
  role: Role;

  @ApiProperty({ description: 'Fecha de creación de la cuenta' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización de la cuenta' })
  updatedAt: Date;

  @ApiProperty({ description: 'Direcciones del usuario', type: [Address] })
  addresses?: Address[];

  @ApiProperty({ description: 'Pedidos del usuario', type: [Order] })
  orders?: Order[];

  @ApiProperty({
    description: 'Reseñas escritas por el usuario',
    type: [Review],
  })
  reviews?: Review[];
}
