import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';


@Controller('supermercados')
export class SupermercadoController {
  constructor(private readonly supermercadoService: SupermercadoService) {}

  @Get()
  findAll() {
    return this.supermercadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supermercadoService.findOne(id);
  }

  @Post()
  create(@Body() createSupermercadoDto: CreateSupermercadoDto) {
    return this.supermercadoService.create(createSupermercadoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupermercadoDto: UpdateSupermercadoDto) {
    return this.supermercadoService.update(id, updateSupermercadoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.supermercadoService.delete(id);
  }
}
