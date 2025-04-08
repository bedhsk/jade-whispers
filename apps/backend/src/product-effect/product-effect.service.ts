import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductEffectDto,
  UpdateProductEffectDto,
} from './dto/create-product-effect.dto';

@Injectable()
export class ProductEffectService {
  constructor(private readonly prisma: PrismaService) {}

  async addEffectToProduct(
    productId: number,
    createProductEffectDto: CreateProductEffectDto,
  ) {
    // Verificar que el producto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    // Verificar que el efecto existe
    const effect = await this.prisma.supernaturalEffect.findUnique({
      where: { id: createProductEffectDto.effectId },
    });

    if (!effect) {
      throw new NotFoundException(
        `Efecto sobrenatural con ID ${createProductEffectDto.effectId} no encontrado`,
      );
    }

    // Verificar que la relación no exista ya
    const existingRelation = await this.prisma.productEffect.findUnique({
      where: {
        productId_effectId: {
          productId,
          effectId: createProductEffectDto.effectId,
        },
      },
    });

    if (existingRelation) {
      throw new ConflictException(
        `El producto ya tiene este efecto sobrenatural asignado`,
      );
    }

    // Crear la relación
    return this.prisma.productEffect.create({
      data: {
        product: {
          connect: { id: productId },
        },
        effect: {
          connect: { id: createProductEffectDto.effectId },
        },
        description: createProductEffectDto.description,
        isGuaranteed: createProductEffectDto.isGuaranteed ?? false,
      },
      include: {
        effect: true,
      },
    });
  }

  async findAllEffectsForProduct(productId: number) {
    // Verificar que el producto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    return this.prisma.productEffect.findMany({
      where: { productId },
      include: {
        effect: true,
      },
    });
  }

  async findOneEffectForProduct(productId: number, effectId: number) {
    const relation = await this.prisma.productEffect.findUnique({
      where: {
        productId_effectId: {
          productId,
          effectId,
        },
      },
      include: {
        effect: true,
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

    if (!relation) {
      throw new NotFoundException(
        `Efecto ${effectId} no encontrado para el producto ${productId}`,
      );
    }

    return relation;
  }

  async updateProductEffect(
    productId: number,
    effectId: number,
    updateProductEffectDto: UpdateProductEffectDto,
  ) {
    // Verificar que la relación existe
    await this.findOneEffectForProduct(productId, effectId);

    // Actualizar la relación
    return this.prisma.productEffect.update({
      where: {
        productId_effectId: {
          productId,
          effectId,
        },
      },
      data: updateProductEffectDto,
      include: {
        effect: true,
      },
    });
  }

  async removeEffectFromProduct(productId: number, effectId: number) {
    // Verificar que la relación existe
    await this.findOneEffectForProduct(productId, effectId);

    // Eliminar la relación
    return this.prisma.productEffect.delete({
      where: {
        productId_effectId: {
          productId,
          effectId,
        },
      },
    });
  }
}
