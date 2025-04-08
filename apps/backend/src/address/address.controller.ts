import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva dirección' })
  @ApiResponse({ status: 201, description: 'Dirección creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Request() req, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(req.user.id, createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las direcciones del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de direcciones' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Request() req) {
    return this.addressService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una dirección por ID' })
  @ApiParam({ name: 'id', description: 'ID de la dirección' })
  @ApiResponse({ status: 200, description: 'Dirección encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  @ApiResponse({ status: 404, description: 'Dirección no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.addressService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una dirección' })
  @ApiParam({ name: 'id', description: 'ID de la dirección' })
  @ApiResponse({ status: 200, description: 'Dirección actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  @ApiResponse({ status: 404, description: 'Dirección no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
    @Request() req,
  ) {
    return this.addressService.update(id, req.user.id, updateAddressDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una dirección' })
  @ApiParam({ name: 'id', description: 'ID de la dirección' })
  @ApiResponse({ status: 204, description: 'Dirección eliminada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido o única dirección' })
  @ApiResponse({ status: 404, description: 'Dirección no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.addressService.remove(id, req.user.id);
  }

  @Patch(':id/default')
  @ApiOperation({ summary: 'Establecer dirección como predeterminada' })
  @ApiParam({ name: 'id', description: 'ID de la dirección' })
  @ApiResponse({
    status: 200,
    description: 'Dirección establecida como predeterminada',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  @ApiResponse({ status: 404, description: 'Dirección no encontrada' })
  setDefault(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.addressService.setDefault(id, req.user.id);
  }
}
