import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity/ciudad.entity';
import { Repository } from 'typeorm';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<Ciudad>;

  const mockCiudadRepository = {
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
        CiudadService,
        {
          provide: getRepositoryToken(Ciudad),
          useValue: mockCiudadRepository,
        },
      ],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<Ciudad>>(getRepositoryToken(Ciudad));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
