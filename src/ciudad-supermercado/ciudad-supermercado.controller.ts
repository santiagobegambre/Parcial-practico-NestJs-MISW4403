import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';

@Controller('ciudades')
export class CiudadSupermercadoController {
  constructor(private readonly ciudadSupermercadoService: CiudadSupermercadoService) {}

  @Post(':ciudadId/supermercados/:supermercadoId')
  addSupermarketToCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return this.ciudadSupermercadoService.addSupermarketToCity(ciudadId, supermercadoId);
  }

  @Get(':ciudadId/supermercados')
  findSupermarketsFromCity(@Param('ciudadId') ciudadId: string) {
    return this.ciudadSupermercadoService.findSupermarketsFromCity(ciudadId);
  }

  @Get(':ciudadId/supermercados/:supermercadoId')
  findSupermarketFromCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return this.ciudadSupermercadoService.findSupermarketFromCity(ciudadId, supermercadoId);
  }

  @Put(':ciudadId/supermercados')
  updateSupermarketsFromCity(
    @Param('ciudadId') ciudadId: string,
    @Body('supermercadosIds') supermercadosIds: string[],
  ) {
    return this.ciudadSupermercadoService.updateSupermarketsFromCity(ciudadId, supermercadosIds);
  }

  @Delete(':ciudadId/supermercados/:supermercadoId')
  deleteSupermarketFromCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return this.ciudadSupermercadoService.deleteSupermarketFromCity(ciudadId, supermercadoId);
  }
}
