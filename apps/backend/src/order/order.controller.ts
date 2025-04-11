import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o stock insuficiente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(req.user.id, createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Obtener todos los pedidos (admins) o los pedidos del usuario actual',
  })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Request() req) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.orderService.findAll(req.user.id, isAdmin);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', description: 'ID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No es tu pedido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.orderService.findOne(id, req.user.id, isAdmin);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar un pedido (solo admin)' })
  @ApiParam({ name: 'id', description: 'ID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req,
  ) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.orderService.update(id, updateOrderDto, req.user.id, isAdmin);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar el estado de un pedido (solo admin)' })
  @ApiParam({ name: 'id', description: 'ID del pedido' })
  @ApiResponse({ status: 200, description: 'Estado del pedido actualizado' })
  @ApiResponse({ status: 400, description: 'Transición de estado no válida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateOrderStatusDto,
    @Request() req,
  ) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.orderService.updateStatus(
      id,
      updateStatusDto,
      req.user.id,
      isAdmin,
    );
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar un pedido' })
  @ApiParam({ name: 'id', description: 'ID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido cancelado' })
  @ApiResponse({
    status: 400,
    description: 'El pedido no se puede cancelar en su estado actual',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No es tu pedido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  cancel(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.orderService.cancel(id, req.user.id, isAdmin);
  }

  @Get('user/history')
  @ApiOperation({ summary: 'Obtener el historial de pedidos del usuario' })
  @ApiResponse({ status: 200, description: 'Historial de pedidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getUserOrderHistory(@Request() req) {
    return this.orderService.getUserOrderHistory(req.user.id);
  }

  @Post(':id/process-payment')
  @ApiOperation({ summary: 'Procesar el pago de un pedido' })
  @ApiParam({ name: 'id', description: 'ID del pedido' })
  @ApiResponse({ status: 200, description: 'Pago procesado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de pago inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async processPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() paymentDetails: any,
    @Request() req,
  ) {
    return this.orderService.processPayment(id, paymentDetails, req.user.id);
  }
}
