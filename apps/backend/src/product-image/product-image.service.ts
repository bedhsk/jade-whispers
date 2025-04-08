import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    productId: number,
    createProductImageDto: CreateProductImageDto,
  ) {
    // Verificar que el producto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    // Si la imagen es primaria, desmarcar otras imágenes primarias
    if (createProductImageDto.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: { productId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    // Obtener la posición más alta actual si no se proporciona
    if (createProductImageDto.position === undefined) {
      const highestPositionImage = await this.prisma.productImage.findFirst({
        where: { productId },
        orderBy: { position: 'desc' },
      });

      createProductImageDto.position = highestPositionImage
        ? highestPositionImage.position + 1
        : 0;
    }

    // Crear la imagen
    return this.prisma.productImage.create({
      data: {
        ...createProductImageDto,
        product: {
          connect: { id: productId },
        },
      },
    });
  }

  async findAll(productId: number) {
    // Verificar que el producto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    return this.prisma.productImage.findMany({
      where: { productId },
      orderBy: [{ isPrimary: 'desc' }, { position: 'asc' }],
    });
  }

  async findOne(id: number) {
    const image = await this.prisma.productImage.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!image) {
      throw new NotFoundException(`Imagen con ID ${id} no encontrada`);
    }

    return image;
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDto) {
    // Verificar que la imagen existe
    const image = await this.findOne(id);

    // Si la imagen se está marcando como primaria, desmarcar otras imágenes
    if (updateProductImageDto.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: {
          productId: image.productId,
          id: { not: id },
          isPrimary: true,
        },
        data: { isPrimary: false },
      });
    }

    return this.prisma.productImage.update({
      where: { id },
      data: updateProductImageDto,
    });
  }

  async remove(id: number) {
    // Verificar que la imagen existe
    const image = await this.findOne(id);

    // Verificar si es la única imagen
    const count = await this.prisma.productImage.count({
      where: { productId: image.productId },
    });

    // No permitir eliminar la única imagen de un producto
    if (count === 1) {
      throw new BadRequestException(
        'No se puede eliminar la única imagen del producto',
      );
    }

    // Si es la imagen primaria, seleccionar otra como primaria
    if (image.isPrimary && count > 1) {
      const anotherImage = await this.prisma.productImage.findFirst({
        where: {
          productId: image.productId,
          id: { not: id },
        },
      });

      await this.prisma.productImage.update({
        where: { id: anotherImage.id },
        data: { isPrimary: true },
      });
    }

    return this.prisma.productImage.delete({
      where: { id },
    });
  }

  async reorderImages(productId: number, imageIds: number[]) {
    // Verificar que el producto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    // Verificar que todos los IDs pertenecen al producto
    const images = await this.prisma.productImage.findMany({
      where: { productId },
    });

    const imageIdSet = new Set(images.map((img) => img.id));

    for (const id of imageIds) {
      if (!imageIdSet.has(id)) {
        throw new BadRequestException(
          `La imagen con ID ${id} no pertenece al producto ${productId}`,
        );
      }
    }

    // Verificar que se han proporcionado todos los IDs
    if (imageIds.length !== images.length) {
      throw new BadRequestException(
        `Se deben proporcionar todos los IDs de imágenes (${images.length} existentes, ${imageIds.length} proporcionados)`,
      );
    }

    // Actualizar posiciones
    const updates = imageIds.map((id, index) =>
      this.prisma.productImage.update({
        where: { id },
        data: { position: index },
      }),
    );

    await this.prisma.$transaction(updates);

    return this.findAll(productId);
  }
}
