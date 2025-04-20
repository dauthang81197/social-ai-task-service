import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { comparePassword } from 'src/common/utils';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

import { UserProfileResponseDto } from '../user/user-profile.response.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const userExisted = await this.userService.checkEmail(email);
    if (!userExisted?.password) {
      throw new UnauthorizedException('auth.USERNAME_OR_PASS_INCORRECT_LOGIN');
    }
    if (!comparePassword(password, userExisted?.password)) {
      throw new UnauthorizedException('auth.USERNAME_OR_PASS_INCORRECT_LOGIN');
    }

    const payload = await this.payloadToken(userExisted);
    return {
      token: payload?.token,
      refreshToken: payload?.refreshToken,
      user: UserProfileResponseDto.fromUser(userExisted),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      statusCode: HttpStatus.OK,
    };
  }

  private async payloadToken(userExisted: UserEntity | null) {
    const token = jwt.sign(
      {
        data: UserProfileResponseDto.fromUser(userExisted),
      },
      this.configService.get('JWT_SECRET') || '',
      {
        expiresIn: this.configService.get('JWT_TOKEN_EXPIRE'),
      },
    );

    const refreshToken = jwt.sign(
      {
        data: UserProfileResponseDto.fromUser(userExisted),
      },
      this.configService.get('JWT_REFRESH_TOKEN_SECRET') || '',
      {
        expiresIn: this.configService.get('JWT_TOKEN_REFRESH_EXPIRE'),
      },
    );

    return { token, refreshToken };
  }
}
