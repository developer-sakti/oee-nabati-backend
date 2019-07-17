import { Test, TestingModule } from '@nestjs/testing';
import { InitialSkuController } from './initial-sku.controller';

describe('InitialSku Controller', () => {
  let controller: InitialSkuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitialSkuController],
    }).compile();

    controller = module.get<InitialSkuController>(InitialSkuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
