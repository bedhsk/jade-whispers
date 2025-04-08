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
import { SupernaturalEffectService } from './supernatural-effect.service';
import { CreateSupernaturalEffectDto } from './dto/create-supernatural-effect.dto';
import { UpdateSupernaturalEffectDto } from './dto/update-supernatural-effect.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('supernatural-effects')
@Controller('supernatural-effects')
export class SupernaturalEffectController {
  constructor(
    private readonly supernaturalEffectService: SupernaturalEffectService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo efecto sobrenatural' })
  @ApiResponse({ status: 201, description: 'Efecto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 409, description: 'Conflicto - Nombre duplicado' })
  create(@Body() createSupernaturalEffectDto: CreateSupernaturalEffectDto) {
    return this.supernaturalEffectService.create(createSupernaturalEffectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los efectos sobrenaturales' })
  @ApiResponse({ status: 200, description: 'Lista de efectos sobrenaturales' })
  findAll() {
    return this.supernaturalEffectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un efecto sobrenatural por ID' })
  @ApiParam({ name: 'id', description: 'ID del efecto sobrenatural' })
  @ApiResponse({ status: 200, description: 'Efecto encontrado' })
  @ApiResponse({ status: 404, description: 'Efecto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supernaturalEffectService.findOne(id);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Obtener productos con este efecto sobrenatural' })
  @ApiParam({ name: 'id', description: 'ID del efecto sobrenatural' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos con este efecto',
  })
  @ApiResponse({ status: 404, description: 'Efecto no encontrado' })
  getProductsWithEffect(@Param('id', ParseIntPipe) id: number) {
    return this.supernaturalEffectService.getProductsWithEffect(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un efecto sobrenatural' })
  @ApiParam({ name: 'id', description: 'ID del efecto sobrenatural' })
  @ApiResponse({ status: 200, description: 'Efecto actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Efecto no encontrado' })
  @ApiResponse({ status: 409, description: 'Conflicto - Nombre duplicado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupernaturalEffectDto: UpdateSupernaturalEffectDto,
  ) {
    return this.supernaturalEffectService.update(
      id,
      updateSupernaturalEffectDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un efecto sobrenatural' })
  @ApiParam({ name: 'id', description: 'ID del efecto sobrenatural' })
  @ApiResponse({ status: 204, description: 'Efecto eliminado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Efecto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supernaturalEffectService.remove(id);
  }
}
