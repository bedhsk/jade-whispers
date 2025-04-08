import { Module } from '@nestjs/common';
import { ProductEffectService } from './product-effect.service';
import { ProductEffectController } from './product-effect.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductEffectController],
  providers: [ProductEffectService],
  exports: [ProductEffectService],
})
export class ProductEffectModule {}
