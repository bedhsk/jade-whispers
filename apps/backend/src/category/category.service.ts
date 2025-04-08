import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear una nueva categoría
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  /**
   * Obtener todas las categorías
   * Opcionalmente incluye productos relacionados
   */
  async findAll(includeProducts = false): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        products: includeProducts
          ? {
              include: {
                product: true,
              },
            }
          : false,
      },
    });
  }

  /**
   * Obtener una categoría por su ID
   * Opcionalmente incluye productos relacionados
   */
  async findOne(id: number, includeProducts = false): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: includeProducts
          ? {
              include: {
                product: {
                  include: {
                    images: true,
                  },
                },
              },
            }
          : false,
      },
    });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return category;
  }

  /**
   * Buscar categoría por nombre
   */
  async findByName(name: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { name },
    });
  }

  /**
   * Actualizar una categoría
   */
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      }
      throw error;
    }
  }

  /**
   * Eliminar una categoría
   */
  async remove(id: number): Promise<Category> {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      }
      throw error;
    }
  }

  /**
   * Relacionar una categoría con productos
   */
  async addProductsToCategory(
    categoryId: number,
    productIds: number[],
  ): Promise<Category> {
    try {
      return await this.prisma.category.update({
        where: { id: categoryId },
        data: {
          products: {
            create: productIds.map((productId) => ({
              product: {
                connect: { id: productId },
              },
            })),
          },
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Categoría con ID ${categoryId} no encontrada`,
        );
      }
      throw error;
    }
  }

  /**
   * Quitar relaciones entre una categoría y productos
   */
  async removeProductsFromCategory(
    categoryId: number,
    productIds: number[],
  ): Promise<Category> {
    try {
      // Para cada productId crear un objeto para la eliminación
      const deleteOperations = productIds.map((productId) => ({
        productId,
        categoryId,
      }));

      // Eliminar las relaciones
      await this.prisma.categoryProduct.deleteMany({
        where: {
          OR: deleteOperations,
        },
      });

      // Retornar la categoría actualizada
      return this.findOne(categoryId, true);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Categoría con ID ${categoryId} no encontrada`,
        );
      }
      throw error;
    }
  }

  /**
   * Obtener categorías destacadas (para página de inicio)
   */
  async getFeaturedCategories(limit = 4): Promise<Category[]> {
    return this.prisma.category.findMany({
      take: limit,
      orderBy: {
        products: {
          _count: 'desc',
        },
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                images: {
                  where: {
                    isPrimary: true,
                  },
                  take: 1,
                },
              },
            },
          },
          take: 1,
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  }
}
