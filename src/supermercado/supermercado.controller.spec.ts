import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadoController } from './supermercado.controller';
import { SupermercadoService } from './supermercado.service';

describe('SupermercadoController', () => {
  let controller: SupermercadoController;
  let service: SupermercadoService;

  const mockSupermercadoService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupermercadoController],
      providers: [
        {
          provide: SupermercadoService,
          useValue: mockSupermercadoService,
        },
      ],
    }).compile();

    controller = module.get<SupermercadoController>(SupermercadoController);
    service = module.get<SupermercadoService>(SupermercadoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
