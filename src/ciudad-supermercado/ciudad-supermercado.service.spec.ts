import { Test, TestingModule } from '@nestjs/testing';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ciudad } from '../ciudad/ciudad.entity/ciudad.entity';
import { Supermercado } from '../supermercado/supermercado.entity/supermercado.entity';
import { Repository } from 'typeorm';

describe('CiudadSupermercadoService', () => {
  let service: CiudadSupermercadoService;
  let ciudadRepository: Repository<Ciudad>;
  let supermercadoRepository: Repository<Supermercado>;

  const mockCiudadRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockSupermercadoRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
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

});
