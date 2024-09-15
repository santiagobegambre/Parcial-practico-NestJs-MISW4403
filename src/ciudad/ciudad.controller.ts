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
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Ciudad } from './ciudad.entity/ciudad.entity';

@Controller('cities')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  async findAll(): Promise<Ciudad[]> {
    return await this.ciudadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ciudad> {
    return await this.ciudadService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    return await this.ciudadService.create(createCiudadDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCiudadDto: UpdateCiudadDto,
  ): Promise<Ciudad> {
    return await this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.ciudadService.delete(id);
  }
}
