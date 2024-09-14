import { Test, TestingModule } from '@nestjs/testing';
import { CiudadSupermercadoController } from './ciudad-supermercado.controller';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';

describe('CiudadSupermercadoController', () => {
  let controller: CiudadSupermercadoController;
  let service: CiudadSupermercadoService;

  const mockCiudadSupermercadoService = {
    addSupermarketToCity: jest.fn(),
    findSupermarketsFromCity: jest.fn(),
    findSupermarketFromCity: jest.fn(),
    updateSupermarketsFromCity: jest.fn(),
    deleteSupermarketFromCity: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiudadSupermercadoController],
      providers: [
        {
          provide: CiudadSupermercadoService,
          useValue: mockCiudadSupermercadoService,
        },
      ],
    }).compile();

    controller = module.get<CiudadSupermercadoController>(CiudadSupermercadoController);
    service = module.get<CiudadSupermercadoService>(CiudadSupermercadoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
