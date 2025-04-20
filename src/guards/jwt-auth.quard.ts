import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers['authorization'];

    if (!bearerToken) {
      throw new UnauthorizedException('auth.UNAUTHORIZED');
    }
    const token = bearerToken.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException({ message: 'auth.TOKEN_INVALID' });
    }
    // append to request
    try {
      request.user = jwt.verify(
        token,
        this.configService.get('JWT_SECRET') || '',
      );
    } catch (e) {
      throw new UnauthorizedException({ message: 'auth.TOKEN_EXPIRED' });
    }

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
