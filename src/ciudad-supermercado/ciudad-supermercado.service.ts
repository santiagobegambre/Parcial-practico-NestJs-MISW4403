import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from '../ciudad/ciudad.entity/ciudad.entity';
import { Supermercado } from '../supermercado/supermercado.entity/supermercado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadSupermercadoService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Supermercado)
    private readonly supermercadoRepository: Repository<Supermercado>,
  ) {}

  async addSupermarketToCity(ciudadId: string, supermercadoId: string): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ['supermercados'] });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${ciudadId} no encontrada`);
    }

    const supermercado = await this.supermercadoRepository.findOne({ where: { id: supermercadoId } });
    if (!supermercado) {
      throw new NotFoundException(`Supermercado con id ${supermercadoId} no encontrado`);
    }

    ciudad.supermercados.push(supermercado);
    return await this.ciudadRepository.save(ciudad);
  }

  async findSupermarketsFromCity(ciudadId: string): Promise<Supermercado[]> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ['supermercados'] });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${ciudadId} no encontrada`);
    }
    return ciudad.supermercados;
  }

  async findSupermarketFromCity(ciudadId: string, supermercadoId: string): Promise<Supermercado> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ['supermercados'] });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${ciudadId} no encontrada`);
    }

    const supermercado = ciudad.supermercados.find((s) => s.id === supermercadoId);
    if (!supermercado) {
      throw new NotFoundException(`Supermercado con id ${supermercadoId} no asociado a la ciudad`);
    }

    return supermercado;
  }

  async updateSupermarketsFromCity(ciudadId: string, supermercadosIds: string[]): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ['supermercados'] });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${ciudadId} no encontrada`);
    }

    const supermercados = await this.supermercadoRepository.findByIds(supermercadosIds);
    if (supermercados.length !== supermercadosIds.length) {
      throw new NotFoundException(`Algunos supermercados no fueron encontrados`);
    }

    ciudad.supermercados = supermercados;
    return await this.ciudadRepository.save(ciudad);
  }

  async deleteSupermarketFromCity(ciudadId: string, supermercadoId: string): Promise<void> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id: ciudadId }, relations: ['supermercados'] });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${ciudadId} no encontrada`);
    }

    ciudad.supermercados = ciudad.supermercados.filter((s) => s.id !== supermercadoId);
    await this.ciudadRepository.save(ciudad);
  }
}
