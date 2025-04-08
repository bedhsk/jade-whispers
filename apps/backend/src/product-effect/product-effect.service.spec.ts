import { Test, TestingModule } from '@nestjs/testing';
import { ProductEffectService } from './product-effect.service';

describe('ProductEffectService', () => {
  let service: ProductEffectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductEffectService],
    }).compile();

    service = module.get<ProductEffectService>(ProductEffectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
