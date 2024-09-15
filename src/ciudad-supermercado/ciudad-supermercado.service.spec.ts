import { Test, TestingModule } from '@nestjs/testing';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ciudad } from '../ciudad/ciudad.entity/ciudad.entity';
import { Supermercado } from '../supermercado/supermercado.entity/supermercado.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CiudadSupermercadoService', () => {
  let service: CiudadSupermercadoService;
  let ciudadRepository: Repository<Ciudad>;
  let supermercadoRepository: Repository<Supermercado>;

  const mockSupermercado = {
    id: '1',
    nombre: 'Supermercado Central S.A.',
    longitud: -58.3816,
    latitud: -34.6037,
    paginaWeb: 'https://supermercadocentral.com',
    ciudades: [],
  } as Supermercado;

  const mockCiudad = {
    id: '1',
    nombre: 'Buenos Aires',
    pais: 'Argentina',
    numHabitantes: 2890151,
    supermercados: [],
  } as Ciudad;

  const mockCiudadRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockSupermercadoRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiudadSupermercadoService,
        {
          provide: getRepositoryToken(Ciudad),
          useValue: mockCiudadRepository,
        },
        {
          provide: getRepositoryToken(Supermercado),
          useValue: mockSupermercadoRepository,
        },
      ],
    }).compile();

    service = module.get<CiudadSupermercadoService>(CiudadSupermercadoService);
    ciudadRepository = module.get<Repository<Ciudad>>(getRepositoryToken(Ciudad));
    supermercadoRepository = module.get<Repository<Supermercado>>(getRepositoryToken(Supermercado));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addSupermarketToCity', () => {
    it('debería agregar un supermercado a una ciudad', async () => {
      mockCiudadRepository.findOne.mockResolvedValue({
        ...mockCiudad,
        supermercados: [],
      });
      mockSupermercadoRepository.findOne.mockResolvedValue(mockSupermercado);
      mockCiudadRepository.save.mockResolvedValue({
        ...mockCiudad,
        supermercados: [mockSupermercado],
      });

      const result = await service.addSupermarketToCity('1', '1');

      expect(result.supermercados).toHaveLength(1);
      expect(result.supermercados[0]).toEqual(mockSupermercado);
    });

    it('debería lanzar una excepción si la ciudad no existe', async () => {
      mockCiudadRepository.findOne.mockResolvedValue(null);
      await expect(service.addSupermarketToCity('1', '1')).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar una excepción si el supermercado no existe', async () => {
      mockCiudadRepository.findOne.mockResolvedValue(mockCiudad);
      mockSupermercadoRepository.findOne.mockResolvedValue(null);
      await expect(service.addSupermarketToCity('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findSupermarketsFromCity', () => {
    it('debería retornar los supermercados de una ciudad', async () => {
      mockCiudadRepository.findOne.mockResolvedValue({
        ...mockCiudad,
        supermercados: [mockSupermercado],
      });

      const result = await service.findSupermarketsFromCity('1');
      expect(result).toEqual([mockSupermercado]);
    });

    it('debería lanzar una excepción si la ciudad no existe', async () => {
      mockCiudadRepository.findOne.mockResolvedValue(null);
      await expect(service.findSupermarketsFromCity('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findSupermarketFromCity', () => {
    it('debería retornar un supermercado asociado a una ciudad', async () => {
      mockCiudadRepository.findOne.mockResolvedValue({
        ...mockCiudad,
        supermercados: [mockSupermercado],
      });

      const result = await service.findSupermarketFromCity('1', '1');
      expect(result).toEqual(mockSupermercado);
    });

    it('debería lanzar una excepción si la ciudad no existe', async () => {
      mockCiudadRepository.findOne.mockResolvedValue(null);
      await expect(service.findSupermarketFromCity('1', '1')).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar una excepción si el supermercado no está asociado a la ciudad', async () => {
      mockCiudadRepository.findOne.mockResolvedValue({
        ...mockCiudad,
        supermercados: [],
      });

      await expect(service.findSupermarketFromCity('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteSupermarketFromCity', () => {
    it('debería eliminar un supermercado de una ciudad', async () => {
      mockCiudadRepository.findOne.mockResolvedValue({
        ...mockCiudad,
        supermercados: [mockSupermercado],
      });
      mockSupermercadoRepository.findOne.mockResolvedValue(mockSupermercado);
      mockCiudadRepository.save.mockResolvedValue({
        ...mockCiudad,
        supermercados: [],
      });

      await service.deleteSupermarketFromCity('1', '1');

      expect(mockCiudadRepository.save).toHaveBeenCalled();
    });

    it('debería lanzar una excepción si el supermercado no está asociado a la ciudad', async () => {
      mockCiudadRepository.findOne.mockResolvedValue({
        ...mockCiudad,
        supermercados: [],
      });
      mockSupermercadoRepository.findOne.mockResolvedValue(mockSupermercado);

      await expect(service.deleteSupermarketFromCity('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

});
