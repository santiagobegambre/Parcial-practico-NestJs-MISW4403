import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity/ciudad.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]: jest.Mock<any, any>;
};

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: MockType<Repository<Ciudad>>;

  const mockCiudad = {
    id: '1',
    nombre: 'Buenos Aires',
    pais: 'Argentina',
    numHabitantes: 2890151,
    supermercados: [],
  };

  const mockCiudadArray = [mockCiudad];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiudadService,
        {
          provide: getRepositoryToken(Ciudad),
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

    service = module.get<CiudadService>(CiudadService);
    repository = module.get(getRepositoryToken(Ciudad)) as MockType<Repository<Ciudad>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll debería retornar un array de ciudades', async () => {
    repository.find.mockResolvedValue(mockCiudadArray);
    const ciudades = await service.findAll();
    expect(ciudades).toEqual(mockCiudadArray);
  });

  it('findOne debería retornar una ciudad por ID', async () => {
    repository.findOne.mockResolvedValue(mockCiudad);
    const ciudad = await service.findOne('1');
    expect(ciudad).toEqual(mockCiudad);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['supermercados'],
    });
  });
  

  it('findOne debería lanzar una excepción si la ciudad no existe', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('create debería crear una nueva ciudad', async () => {
    repository.create.mockReturnValue(mockCiudad);
    repository.save.mockResolvedValue(mockCiudad);

    const newCiudad = await service.create({
      nombre: 'Córdoba',
      pais: 'Argentina',
      numHabitantes: 1391000,
    });

    expect(newCiudad).toEqual(mockCiudad);
    expect(repository.create).toHaveBeenCalledWith({
      nombre: 'Córdoba',
      pais: 'Argentina',
      numHabitantes: 1391000,
    });
    expect(repository.save).toHaveBeenCalledWith(mockCiudad);
  });

  it('update debería modificar una ciudad existente', async () => {
    repository.preload.mockResolvedValue(mockCiudad);
    repository.save.mockResolvedValue(mockCiudad);

    const ciudadActualizada = await service.update('1', {
      nombre: 'Buenos Aires Actualizada',
      pais: 'Argentina',
      numHabitantes: 3000000,
    });

    expect(ciudadActualizada).toEqual(mockCiudad);
    expect(repository.preload).toHaveBeenCalledWith({
      id: '1',
      nombre: 'Buenos Aires Actualizada',
      pais: 'Argentina',
      numHabitantes: 3000000,
    });
    expect(repository.save).toHaveBeenCalledWith(mockCiudad);
  });

  it('update debería lanzar una excepción si la ciudad no existe', async () => {
    repository.preload.mockResolvedValue(null);
    await expect(
      service.update('1', {
        nombre: 'Ciudad Inexistente',
        pais: 'Argentina',
        numHabitantes: 0,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('delete debería eliminar una ciudad existente', async () => {
    repository.findOne.mockResolvedValue(mockCiudad);
    repository.delete.mockResolvedValue({ affected: 1 });

    await service.delete('1');

    expect(repository.delete).toHaveBeenCalledWith('1');
  });

  it('delete debería lanzar una excepción si la ciudad no existe', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.delete('1')).rejects.toThrow(NotFoundException);
  });
  
});
