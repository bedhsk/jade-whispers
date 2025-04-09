import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { SupernaturalEffectModule } from './supernatural-effect/supernatural-effect.module';
import { ProductEffectModule } from './product-effect/product-effect.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { OrderItemModule } from './order-item/order-item.module';
import { ProductImageModule } from './product-image/product-image.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    UserModule,
    AddressModule,
    ProductImageModule,
    SupernaturalEffectModule,
    ProductEffectModule,
    OrderModule,
    ReviewModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
