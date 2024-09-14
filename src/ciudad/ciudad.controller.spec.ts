import { Test, TestingModule } from '@nestjs/testing';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';

describe('CiudadController', () => {
  let controller: CiudadController;
  let service: CiudadService;

  const mockCiudadService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiudadController],
      providers: [
        {
          provide: CiudadService,
          useValue: mockCiudadService,
        },
      ],
    }).compile();

    controller = module.get<CiudadController>(CiudadController);
    service = module.get<CiudadService>(CiudadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Puedes agregar más pruebas aquí
});
