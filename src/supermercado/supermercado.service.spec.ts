import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadoService } from './supermercado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Supermercado } from './supermercado.entity/supermercado.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]: jest.Mock<any, any>;
};

describe('SupermercadoService', () => {
  let service: SupermercadoService;
  let repository: MockType<Repository<Supermercado>>;

  const mockSupermercado = {
    id: '1',
    nombre: 'Supermercado Central S.A.',
    longitud: -58.3816,
    latitud: -34.6037,
    paginaWeb: 'https://supermercadocentral.com',
    ciudades: [],
  };

  const mockSupermercadoArray = [mockSupermercado];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupermercadoService,
        {
          provide: getRepositoryToken(Supermercado),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            preload: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SupermercadoService>(SupermercadoService);
    repository = module.get(getRepositoryToken(Supermercado)) as MockType<Repository<Supermercado>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll debería retornar un array de supermercados', async () => {
    repository.find.mockResolvedValue(mockSupermercadoArray);
    const supermercados = await service.findAll();
    expect(supermercados).toEqual(mockSupermercadoArray);
  });

  it('findOne debería retornar un supermercado por ID', async () => {
    repository.findOne.mockResolvedValue(mockSupermercado);
    const supermercado = await service.findOne('1');
    expect(supermercado).toEqual(mockSupermercado);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['ciudades'],
    });
  });
  

  it('findOne debería lanzar una excepción si el supermercado no existe', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('create debería crear un nuevo supermercado', async () => {
    repository.create.mockReturnValue(mockSupermercado);
    repository.save.mockResolvedValue(mockSupermercado);

    const newSupermercado = await service.create({
      nombre: 'Nuevo Supermercado S.A.',
      longitud: -58.3816,
      latitud: -34.6037,
      paginaWeb: 'https://nuevosupermercado.com',
    });

    expect(newSupermercado).toEqual(mockSupermercado);
    expect(repository.create).toHaveBeenCalledWith({
      nombre: 'Nuevo Supermercado S.A.',
      longitud: -58.3816,
      latitud: -34.6037,
      paginaWeb: 'https://nuevosupermercado.com',
    });
    expect(repository.save).toHaveBeenCalledWith(mockSupermercado);
  });

  it('update debería modificar un supermercado existente', async () => {
    repository.preload.mockResolvedValue(mockSupermercado);
    repository.save.mockResolvedValue(mockSupermercado);

    const supermercadoActualizado = await service.update('1', {
      nombre: 'Supermercado Actualizado S.A.',
      longitud: -58.3816,
      latitud: -34.6037,
      paginaWeb: 'https://supermercadoactualizado.com',
    });

    expect(supermercadoActualizado).toEqual(mockSupermercado);
    expect(repository.preload).toHaveBeenCalledWith({
      id: '1',
      nombre: 'Supermercado Actualizado S.A.',
      longitud: -58.3816,
      latitud: -34.6037,
      paginaWeb: 'https://supermercadoactualizado.com',
    });
    expect(repository.save).toHaveBeenCalledWith(mockSupermercado);
  });

  it('update debería lanzar una excepción si el supermercado no existe', async () => {
    repository.preload.mockResolvedValue(null);
    await expect(
      service.update('1', {
        nombre: 'Supermercado Inexistente',
        longitud: -58.3816,
        latitud: -34.6037,
        paginaWeb: 'https://inexistente.com',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('delete debería eliminar un supermercado existente', async () => {
    repository.findOne.mockResolvedValue(mockSupermercado);
    repository.delete.mockResolvedValue({ affected: 1 });

    await service.delete('1');

    expect(repository.delete).toHaveBeenCalledWith('1');
  });

  it('delete debería lanzar una excepción si el supermercado no existe', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.delete('1')).rejects.toThrow(NotFoundException);
  });
  
});
