import { Test, TestingModule } from '@nestjs/testing';
import { ProductEffectController } from './product-effect.controller';
import { ProductEffectService } from './product-effect.service';

describe('ProductEffectController', () => {
  let controller: ProductEffectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductEffectController],
      providers: [ProductEffectService],
    }).compile();

    controller = module.get<ProductEffectController>(ProductEffectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
