import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';


@Controller('ciudades')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  findAll() {
    return this.ciudadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadService.findOne(id);
  }

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.create(createCiudadDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ciudadService.delete(id);
  }
}
