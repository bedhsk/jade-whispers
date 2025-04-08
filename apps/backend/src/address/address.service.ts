import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createAddressDto: CreateAddressDto) {
    // Si la nueva dirección es la predeterminada, desmarcar otras como predeterminadas
    if (createAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.create({
      data: {
        ...createAddressDto,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }

    // Verificar que la dirección pertenezca al usuario
    if (address.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta dirección',
      );
    }

    return address;
  }

  async update(id: number, userId: number, updateAddressDto: UpdateAddressDto) {
    // Verificar que la dirección exista y pertenezca al usuario
    await this.findOne(id, userId);

    // Si la dirección se marca como predeterminada, desmarcar otras
    if (updateAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        where: {
          userId,
          id: { not: id },
        },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async remove(id: number, userId: number) {
    // Verificar que la dirección exista y pertenezca al usuario
    await this.findOne(id, userId);

    // Verificar si es la única dirección del usuario
    const addressCount = await this.prisma.address.count({
      where: { userId },
    });

    if (addressCount === 1) {
      throw new ForbiddenException('No puedes eliminar tu única dirección');
    }

    // Verificar si es la dirección predeterminada
    const address = await this.prisma.address.findUnique({
      where: { id },
    });

    // Si eliminamos la dirección predeterminada, establecer otra como predeterminada
    if (address.isDefault && addressCount > 1) {
      const anotherAddress = await this.prisma.address.findFirst({
        where: {
          userId,
          id: { not: id },
        },
      });

      await this.prisma.address.update({
        where: { id: anotherAddress.id },
        data: { isDefault: true },
      });
    }

    return this.prisma.address.delete({
      where: { id },
    });
  }

  async setDefault(id: number, userId: number) {
    // Verificar que la dirección exista y pertenezca al usuario
    await this.findOne(id, userId);

    // Desmarcar todas las direcciones como predeterminadas
    await this.prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });

    // Marcar la dirección seleccionada como predeterminada
    return this.prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });
  }
}
