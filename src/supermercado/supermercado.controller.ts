import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';
import { Supermercado } from './supermercado.entity/supermercado.entity';

@Controller('supermarkets')
export class SupermercadoController {
  constructor(private readonly supermercadoService: SupermercadoService) {}

  @Get()
  async findAll(): Promise<Supermercado[]> {
    return await this.supermercadoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Supermercado> {
    return await this.supermercadoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSupermercadoDto: CreateSupermercadoDto,
  ): Promise<Supermercado> {
    return await this.supermercadoService.create(createSupermercadoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupermercadoDto: UpdateSupermercadoDto,
  ): Promise<Supermercado> {
    return await this.supermercadoService.update(id, updateSupermercadoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.supermercadoService.delete(id);
  }
}
