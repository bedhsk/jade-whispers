import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PassportModule, UserModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtService, // Proporciona JwtService como provider directamente
  ],
  exports: [AuthService],
})
export class AuthModule {}
