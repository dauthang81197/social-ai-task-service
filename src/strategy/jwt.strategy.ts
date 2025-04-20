import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserEntity } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStragegy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(data: { data: UserEntity }): Promise<UserEntity> {
    const email = data?.data?.email;
    const user = await this.userService.checkEmail(email);
    if (!user) {
      throw new UnauthorizedException('auth.UNAUTHORIZED');
    }

    return user;
  }
}

export interface JwtPayload {
  id: string;
}
