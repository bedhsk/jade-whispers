import { Test, TestingModule } from '@nestjs/testing';
import { SupernaturalEffectService } from './supernatural-effect.service';

describe('SupernaturalEffectService', () => {
  let service: SupernaturalEffectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupernaturalEffectService],
    }).compile();

    service = module.get<SupernaturalEffectService>(SupernaturalEffectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
