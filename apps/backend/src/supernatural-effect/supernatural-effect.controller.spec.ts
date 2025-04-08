import { Test, TestingModule } from '@nestjs/testing';
import { SupernaturalEffectController } from './supernatural-effect.controller';
import { SupernaturalEffectService } from './supernatural-effect.service';

describe('SupernaturalEffectController', () => {
  let controller: SupernaturalEffectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupernaturalEffectController],
      providers: [SupernaturalEffectService],
    }).compile();

    controller = module.get<SupernaturalEffectController>(SupernaturalEffectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
