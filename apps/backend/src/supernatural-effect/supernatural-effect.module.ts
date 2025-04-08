import { Module } from '@nestjs/common';
import { SupernaturalEffectService } from './supernatural-effect.service';
import { SupernaturalEffectController } from './supernatural-effect.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SupernaturalEffectController],
  providers: [SupernaturalEffectService],
  exports: [SupernaturalEffectService],
})
export class SupernaturalEffectModule {}
