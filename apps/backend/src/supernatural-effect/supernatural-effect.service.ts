import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupernaturalEffectDto } from './dto/create-supernatural-effect.dto';
import { UpdateSupernaturalEffectDto } from './dto/update-supernatural-effect.dto';

@Injectable()
export class SupernaturalEffectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupernaturalEffectDto: CreateSupernaturalEffectDto) {
    // Verificar si ya existe un efecto con ese nombre
    const existingEffect = await this.prisma.supernaturalEffect.findUnique({
      where: { name: createSupernaturalEffectDto.name },
    });

    if (existingEffect) {
      throw new ConflictException(
        `Ya existe un efecto con el nombre '${createSupernaturalEffectDto.name}'`,
      );
    }

    return this.prisma.supernaturalEffect.create({
      data: createSupernaturalEffectDto,
    });
  }

  async findAll() {
    return this.prisma.supernaturalEffect.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const effect = await this.prisma.supernaturalEffect.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!effect) {
      throw new NotFoundException(
        `Efecto sobrenatural con ID ${id} no encontrado`,
      );
    }

    return effect;
  }

  async update(
    id: number,
    updateSupernaturalEffectDto: UpdateSupernaturalEffectDto,
  ) {
    // Verificar que el efecto existe
    await this.findOne(id);

    // Verificar que el nombre no está duplicado (si se está actualizando)
    if (updateSupernaturalEffectDto.name) {
      const existingEffect = await this.prisma.supernaturalEffect.findUnique({
        where: { name: updateSupernaturalEffectDto.name },
      });

      if (existingEffect && existingEffect.id !== id) {
        throw new ConflictException(
          `Ya existe un efecto con el nombre '${updateSupernaturalEffectDto.name}'`,
        );
      }
    }

    return this.prisma.supernaturalEffect.update({
      where: { id },
      data: updateSupernaturalEffectDto,
    });
  }

  async remove(id: number) {
    try {
      // Verificar que el efecto existe
      await this.findOne(id);

      // Verificar si hay productos relacionados
      const relatedProducts = await this.prisma.productEffect.findMany({
        where: { effectId: id },
      });

      if (relatedProducts.length > 0) {
        // Eliminar relaciones
        await this.prisma.productEffect.deleteMany({
          where: { effectId: id },
        });
      }

      return this.prisma.supernaturalEffect.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Error al eliminar el efecto sobrenatural: ${error.message}`,
      );
    }
  }

  async getProductsWithEffect(id: number) {
    // Verificar que el efecto existe
    await this.findOne(id);

    const effectProducts = await this.prisma.productEffect.findMany({
      where: { effectId: id },
      include: {
        product: {
          include: {
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
    });

    return effectProducts.map((ep) => ({
      ...ep.product,
      effectDescription: ep.description,
      isGuaranteed: ep.isGuaranteed,
    }));
  }
}
