import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadoService } from './supermercado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Supermercado } from './supermercado.entity/supermercado.entity';
import { Repository } from 'typeorm';

describe('SupermercadoService', () => {
  let service: SupermercadoService;
  let repository: Repository<Supermercado>;

  const mockSupermercadoRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    preload: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupermercadoService,
        {
          provide: getRepositoryToken(Supermercado),
          useValue: mockSupermercadoRepository,
        },
      ],
    }).compile();

    service = module.get<SupermercadoService>(SupermercadoService);
    repository = module.get<Repository<Supermercado>>(getRepositoryToken(Supermercado));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
