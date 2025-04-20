import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AuthController } from './controllers/auth.controller';
import { JwtStragegy } from '../../strategy';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRE },
    }),
    HttpModule,
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [AuthService, ConfigService, JwtStragegy],
  exports: [],
})
export class AuthModule {}
