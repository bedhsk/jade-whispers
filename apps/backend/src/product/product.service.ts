import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  UpdateProductDto,
  AddProductImagesDto,
  UpdateProductCategoriesDto,
} from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Función para generar slugs a partir del nombre del producto
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-'); // Eliminar guiones múltiples consecutivos
  }

  // Función para verificar que un slug sea único
  private async ensureUniqueSlug(
    slug: string,
    productId?: number,
  ): Promise<string> {
    let finalSlug = slug;
    let counter = 0;
    let slugExists = true;

    while (slugExists) {
      const existingProduct = await this.prisma.product.findFirst({
        where: {
          slug: finalSlug,
          ...(productId ? { id: { not: productId } } : {}),
        },
      });

      if (!existingProduct) {
        slugExists = false;
      } else {
        counter++;
        finalSlug = `${slug}-${counter}`;
      }
    }

    return finalSlug;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryIds, images, ...productData } = createProductDto;

    // Generar slug si no se proporciona uno
    const finalSlug = !productData.slug
      ? await this.ensureUniqueSlug(this.generateSlug(productData.name))
      : await this.ensureUniqueSlug(productData.slug);

    // Verificar que al menos una imagen sea marcada como primaria
    let processedImages = images;
    if (images && images.length > 0) {
      const hasPrimary = images.some((img) => img.isPrimary);
      if (!hasPrimary) {
        // Crear una nueva copia del array para no modificar el original
        processedImages = [...images];
        processedImages[0].isPrimary = true;
      }
    }

    // Crear producto con imágenes y categorías
    return this.prisma.product.create({
      data: {
        ...productData,
        slug: finalSlug, // Aseguramos que slug siempre tenga un valor
        images: processedImages
          ? {
              create: processedImages.map((image, index) => ({
                ...image,
                position: image.position ?? index,
              })),
            }
          : undefined,
        categories:
          categoryIds && categoryIds.length > 0
            ? {
                create: categoryIds.map((categoryId) => ({
                  category: {
                    connect: { id: categoryId },
                  },
                })),
              }
            : undefined,
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
    sortBy: 'price' | 'createdAt' | 'name' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    featured?: boolean,
  ): Promise<{ data: Product[]; count: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      // Construir las condiciones de filtrado
      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { comicDescription: { contains: search, mode: 'insensitive' } },
          { supernaturalStory: { contains: search, mode: 'insensitive' } },
          { material: { contains: search, mode: 'insensitive' } },
          { dynasty: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (categoryId) {
        where.categories = {
          some: {
            categoryId,
          },
        };
      }

      if (minPrice !== undefined) {
        where.price = {
          ...where.price,
          gte: minPrice,
        };
      }

      if (maxPrice !== undefined) {
        where.price = {
          ...where.price,
          lte: maxPrice,
        };
      }

      if (featured !== undefined) {
        where.featured = featured;
      }

      // Definir orden
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      // Obtener total de productos con estos filtros
      const count = await this.prisma.product.count({ where });

      // Obtener productos paginados
      const products = await this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          images: {
            orderBy: [{ isPrimary: 'desc' }, { position: 'asc' }],
          },
          categories: {
            include: {
              category: true,
            },
          },
        },
      });

      return {
        data: products,
        count,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      // Si es un error de Prisma relacionado con un registro no encontrado
      if (error.code === 'P2001' || error.code === 'P2025') {
        return { data: [], count: 0, totalPages: 0 };
      }
      // Para otros errores específicos de Prisma
      if (error.name === 'PrismaClientKnownRequestError') {
        console.error('Error al buscar productos:', error);
        return { data: [], count: 0, totalPages: 0 };
      }
      // Para cualquier otro error, lo reenviamos
      throw error;
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          images: {
            orderBy: [{ isPrimary: 'desc' }, { position: 'asc' }],
          },
          categories: {
            include: {
              category: true,
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          supernaturalEffects: {
            include: {
              effect: true,
            },
          },
        },
      });

      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      return product;
    } catch (error) {
      // Si es un error de Prisma relacionado con un registro no encontrado
      if (error.code === 'P2001' || error.code === 'P2025') {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
      // Para otros errores específicos de Prisma
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new NotFoundException(
          `Error al buscar el producto: ${error.message}`,
        );
      }
      // Para cualquier otro error, lo reenviamos
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { slug },
        include: {
          images: {
            orderBy: [{ isPrimary: 'desc' }, { position: 'asc' }],
          },
          categories: {
            include: {
              category: true,
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          supernaturalEffects: {
            include: {
              effect: true,
            },
          },
        },
      });

      if (!product) {
        throw new NotFoundException(
          `Producto con slug "${slug}" no encontrado`,
        );
      }

      return product;
    } catch (error) {
      // Si es un error de Prisma relacionado con un registro no encontrado
      if (error.code === 'P2001' || error.code === 'P2025') {
        throw new NotFoundException(
          `Producto con slug "${slug}" no encontrado`,
        );
      }
      // Para otros errores específicos de Prisma
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new NotFoundException(
          `Error al buscar el producto: ${error.message}`,
        );
      }
      // Para cualquier otro error, lo reenviamos
      throw error;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id); // Verificar que el producto existe

    const { categoryIds, images, ...productData } = updateProductDto;

    // Actualizar slug si se cambia el nombre pero no se proporciona un nuevo slug
    if (productData.name && !productData.slug) {
      productData.slug = await this.ensureUniqueSlug(
        this.generateSlug(productData.name),
        id,
      );
    } else if (productData.slug) {
      // Si se proporciona un slug, asegurarse de que sea único
      productData.slug = await this.ensureUniqueSlug(productData.slug, id);
    }

    // No actualizamos imágenes o categorías aquí, tienen sus propios endpoints
    return this.prisma.product.update({
      where: { id },
      data: productData,
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verificar que el producto existe

    await this.prisma.product.delete({
      where: { id },
    });
  }

  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    try {
      return this.prisma.product.findMany({
        where: {
          featured: true,
          stock: { gt: 0 },
        },
        take: limit,
        include: {
          images: {
            where: {
              isPrimary: true,
            },
            take: 1,
          },
        },
      });
    } catch (error) {
      // Si es un error de Prisma, devolver una lista vacía
      if (error.name === 'PrismaClientKnownRequestError') {
        console.error('Error al buscar productos destacados:', error);
        return [];
      }
      // Para cualquier otro error, lo reenviamos
      throw error;
    }
  }

  async getRelatedProducts(id: number, limit = 4): Promise<Product[]> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          categories: true,
        },
      });

      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      // Obtener los IDs de las categorías del producto
      const categoryIds = product.categories.map((c) => c.categoryId);

      // Buscar productos relacionados por categoría
      return this.prisma.product.findMany({
        where: {
          id: { not: id }, // Excluir el producto actual
          categories: {
            some: {
              categoryId: { in: categoryIds },
            },
          },
        },
        take: limit,
        include: {
          images: {
            where: {
              isPrimary: true,
            },
            take: 1,
          },
        },
      });
    } catch (error) {
      // Si es un error de Prisma relacionado con un registro no encontrado
      if (error.code === 'P2001' || error.code === 'P2025') {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
      // Para otros errores específicos de Prisma
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new NotFoundException(
          `Error al buscar productos relacionados: ${error.message}`,
        );
      }
      // Para cualquier otro error, lo reenviamos
      throw error;
    }
  }

  // Gestión de imágenes
  async addProductImages(
    id: number,
    imagesDto: AddProductImagesDto,
  ): Promise<Product> {
    await this.findOne(id); // Verificar que el producto existe

    // Obtener la posición más alta actual
    const currentImages = await this.prisma.productImage.findMany({
      where: { productId: id },
      orderBy: { position: 'desc' },
      take: 1,
    });

    const startPosition =
      currentImages.length > 0 ? currentImages[0].position + 1 : 0;

    return this.prisma.product.update({
      where: { id },
      data: {
        images: {
          create: imagesDto.images.map((image, index) => ({
            ...image,
            position: image.position || startPosition + index,
          })),
        },
      },
      include: {
        images: {
          orderBy: [{ isPrimary: 'desc' }, { position: 'asc' }],
        },
      },
    });
  }

  async removeProductImage(productId: number, imageId: number): Promise<void> {
    // Verificar que la imagen existe y pertenece al producto
    const image = await this.prisma.productImage.findFirst({
      where: {
        id: imageId,
        productId,
      },
    });

    if (!image) {
      throw new NotFoundException(
        `Imagen con ID ${imageId} no encontrada para el producto ${productId}`,
      );
    }

    // Verificar si es la única imagen primaria
    if (image.isPrimary) {
      const count = await this.prisma.productImage.count({
        where: {
          productId,
          isPrimary: true,
        },
      });

      if (count === 1) {
        // Buscar otra imagen para marcar como primaria
        const anotherImage = await this.prisma.productImage.findFirst({
          where: {
            productId,
            id: { not: imageId },
          },
        });

        if (anotherImage) {
          await this.prisma.productImage.update({
            where: { id: anotherImage.id },
            data: { isPrimary: true },
          });
        }
      }
    }

    // Eliminar la imagen
    await this.prisma.productImage.delete({
      where: { id: imageId },
    });
  }

  async setProductImageAsPrimary(
    productId: number,
    imageId: number,
  ): Promise<void> {
    // Verificar que la imagen existe y pertenece al producto
    const image = await this.prisma.productImage.findFirst({
      where: {
        id: imageId,
        productId,
      },
    });

    if (!image) {
      throw new NotFoundException(
        `Imagen con ID ${imageId} no encontrada para el producto ${productId}`,
      );
    }

    // Transacción para actualizar las imágenes
    await this.prisma.$transaction([
      // Quitar primaria de todas las imágenes
      this.prisma.productImage.updateMany({
        where: {
          productId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      }),
      // Establecer la nueva imagen primaria
      this.prisma.productImage.update({
        where: { id: imageId },
        data: {
          isPrimary: true,
        },
      }),
    ]);
  }

  // Gestión de categorías
  async updateProductCategories(
    id: number,
    categoriesDto: UpdateProductCategoriesDto,
  ): Promise<Product> {
    await this.findOne(id); // Verificar que el producto existe

    // Verificar que las categorías existen
    const categories = await this.prisma.category.findMany({
      where: {
        id: { in: categoriesDto.categoryIds },
      },
    });

    if (categories.length !== categoriesDto.categoryIds.length) {
      throw new BadRequestException('Una o más categorías no existen');
    }

    // Eliminar todas las relaciones existentes
    await this.prisma.categoryProduct.deleteMany({
      where: { productId: id },
    });

    // Crear las nuevas relaciones
    return this.prisma.product.update({
      where: { id },
      data: {
        categories: {
          create: categoriesDto.categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
