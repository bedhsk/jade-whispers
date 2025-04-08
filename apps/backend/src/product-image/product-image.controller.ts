import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import {
  UpdateProductImageDto,
  ReorderImagesDto,
} from './dto/update-product-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('product-images')
@Controller('products/:productId/images')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva imagen para un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiResponse({ status: 201, description: 'Imagen creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  create(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    return this.productImageService.create(productId, createProductImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las imágenes de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Lista de imágenes' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findAll(@Param('productId', ParseIntPipe) productId: number) {
    return this.productImageService.findAll(productId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una imagen por ID' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiParam({ name: 'id', description: 'ID de la imagen' })
  @ApiResponse({ status: 200, description: 'Imagen encontrada' })
  @ApiResponse({ status: 404, description: 'Imagen no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productImageService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una imagen' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiParam({ name: 'id', description: 'ID de la imagen' })
  @ApiResponse({ status: 200, description: 'Imagen actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Imagen no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productImageService.update(id, updateProductImageDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una imagen' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiParam({ name: 'id', description: 'ID de la imagen' })
  @ApiResponse({ status: 204, description: 'Imagen eliminada' })
  @ApiResponse({
    status: 400,
    description: 'No se puede eliminar la única imagen',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Imagen no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productImageService.remove(id);
  }

  @Post('reorder')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reordenar imágenes de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiResponse({
    status: 200,
    description: 'Imágenes reordenadas exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o IDs incorrectos',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  reorderImages(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() reorderDto: ReorderImagesDto,
  ) {
    return this.productImageService.reorderImages(
      productId,
      reorderDto.imageIds,
    );
  }
}
