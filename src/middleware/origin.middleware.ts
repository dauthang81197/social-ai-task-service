import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const origin = req.header('Origin');
    req['locals'] = { ...req['locals'], origin };
    req['typeUser'] = req._parsedOriginalUrl;
    next();
  }
}
