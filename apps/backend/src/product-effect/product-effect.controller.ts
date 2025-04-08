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
import { ProductEffectService } from './product-effect.service';
import {
  CreateProductEffectDto,
  UpdateProductEffectDto,
} from './dto/create-product-effect.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('product-effects')
@Controller('products/:productId/effects')
export class ProductEffectController {
  constructor(private readonly productEffectService: ProductEffectService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Asignar un efecto sobrenatural a un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiResponse({ status: 201, description: 'Efecto asignado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Producto o efecto no encontrado' })
  @ApiResponse({
    status: 409,
    description: 'El producto ya tiene este efecto asignado',
  })
  create(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createProductEffectDto: CreateProductEffectDto,
  ) {
    return this.productEffectService.addEffectToProduct(
      productId,
      createProductEffectDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los efectos sobrenaturales de un producto',
  })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Lista de efectos' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findAll(@Param('productId', ParseIntPipe) productId: number) {
    return this.productEffectService.findAllEffectsForProduct(productId);
  }

  @Get(':effectId')
  @ApiOperation({ summary: 'Obtener un efecto específico de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiParam({ name: 'effectId', description: 'ID del efecto' })
  @ApiResponse({ status: 200, description: 'Efecto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto o efecto no encontrado' })
  findOne(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('effectId', ParseIntPipe) effectId: number,
  ) {
    return this.productEffectService.findOneEffectForProduct(
      productId,
      effectId,
    );
  }

  @Patch(':effectId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar la relación entre un producto y un efecto',
  })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiParam({ name: 'effectId', description: 'ID del efecto' })
  @ApiResponse({ status: 200, description: 'Relación actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Producto o efecto no encontrado' })
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('effectId', ParseIntPipe) effectId: number,
    @Body() updateProductEffectDto: UpdateProductEffectDto,
  ) {
    return this.productEffectService.updateProductEffect(
      productId,
      effectId,
      updateProductEffectDto,
    );
  }

  @Delete(':effectId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un efecto de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiParam({ name: 'effectId', description: 'ID del efecto' })
  @ApiResponse({ status: 204, description: 'Efecto eliminado del producto' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Producto o efecto no encontrado' })
  remove(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('effectId', ParseIntPipe) effectId: number,
  ) {
    return this.productEffectService.removeEffectFromProduct(
      productId,
      effectId,
    );
  }
}
