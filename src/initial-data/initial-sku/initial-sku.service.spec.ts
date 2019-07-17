import { Test, TestingModule } from '@nestjs/testing';
import { InitialSkuService } from './initial-sku.service';

describe('InitialSkuService', () => {
  let service: InitialSkuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitialSkuService],
    }).compile();

    service = module.get<InitialSkuService>(InitialSkuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
