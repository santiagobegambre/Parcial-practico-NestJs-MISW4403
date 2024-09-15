import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { Supermercado } from '../supermercado/supermercado.entity/supermercado.entity';

@Controller('cities')
export class CiudadSupermercadoController {
  constructor(
    private readonly ciudadSupermercadoService: CiudadSupermercadoService,
  ) {}

  @Post(':ciudadId/supermarkets/:supermercadoId')
  @HttpCode(HttpStatus.CREATED)
  async addSupermarketToCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.addSupermarketToCity(
      ciudadId,
      supermercadoId,
    );
  }

  @Get(':ciudadId/supermarkets')
  async findSupermarketsFromCity(
    @Param('ciudadId') ciudadId: string,
  ): Promise<Supermercado[]> {
    return await this.ciudadSupermercadoService.findSupermarketsFromCity(
      ciudadId,
    );
  }

  @Get(':ciudadId/supermarkets/:supermercadoId')
  async findSupermarketFromCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ): Promise<Supermercado> {
    return await this.ciudadSupermercadoService.findSupermarketFromCity(
      ciudadId,
      supermercadoId,
    );
  }

  @Put(':ciudadId/supermarkets')
  async updateSupermarketsFromCity(
    @Param('ciudadId') ciudadId: string,
    @Body('supermercadosIds') supermercadosIds: string[],
  ): Promise<void> {
    await this.ciudadSupermercadoService.updateSupermarketsFromCity(
      ciudadId,
      supermercadosIds,
    );
  }

  @Delete(':ciudadId/supermarkets/:supermercadoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSupermarketFromCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ): Promise<void> {
    await this.ciudadSupermercadoService.deleteSupermarketFromCity(
      ciudadId,
      supermercadoId,
    );
  }
}
