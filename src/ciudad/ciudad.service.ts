import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity/ciudad.entity';
import { Repository } from 'typeorm';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';


@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAll(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find({ relations: ['supermercados'] });
  }

  async findOne(id: string): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id }, relations: ['supermercados'] });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${id} no encontrada`);
    }
    return ciudad;
  }

  async create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    const ciudad = this.ciudadRepository.create(createCiudadDto);
    return await this.ciudadRepository.save(ciudad);
  }

  async update(id: string, updateCiudadDto: UpdateCiudadDto): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.preload({
      id: id,
      ...updateCiudadDto,
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${id} no encontrada`);
    }
    return await this.ciudadRepository.save(ciudad);
  }

  async delete(id: string): Promise<void> {
    const result = await this.ciudadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ciudad con id ${id} no encontrada`);
    }
  }
}
