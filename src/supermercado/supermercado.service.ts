import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supermercado } from './supermercado.entity/supermercado.entity';
import { Repository } from 'typeorm';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';


@Injectable()
export class SupermercadoService {
  constructor(
    @InjectRepository(Supermercado)
    private supermercadoRepository: Repository<Supermercado>,
  ) {}

  async findAll(): Promise<Supermercado[]> {
    return await this.supermercadoRepository.find({ relations: ['ciudades'] });
  }

  async findOne(id: string): Promise<Supermercado> {
    const supermercado = await this.supermercadoRepository.findOne({ where: { id }, relations: ['ciudades'] });
    if (!supermercado) {
      throw new NotFoundException(`Supermercado con id ${id} no encontrado`);
    }
    return supermercado;
  }

  async create(createSupermercadoDto: CreateSupermercadoDto): Promise<Supermercado> {
    const supermercado = this.supermercadoRepository.create(createSupermercadoDto);
    return await this.supermercadoRepository.save(supermercado);
  }

  async update(id: string, updateSupermercadoDto: UpdateSupermercadoDto): Promise<Supermercado> {
    const supermercado = await this.supermercadoRepository.preload({
      id: id,
      ...updateSupermercadoDto,
    });
    if (!supermercado) {
      throw new NotFoundException(`Supermercado con id ${id} no encontrado`);
    }
    return await this.supermercadoRepository.save(supermercado);
  }

  async delete(id: string): Promise<void> {
    const result = await this.supermercadoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Supermercado con id ${id} no encontrado`);
    }
  }
}
