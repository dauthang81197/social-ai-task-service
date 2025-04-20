import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ImgFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file: Express.Multer.File = request.file;
    if (!this.validateFile(file)) {
      throw new BadRequestException('common.INVALID_FILE_IMG');
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new BadRequestException('common.INVALID_FILE_SIZE');
    }

    return next.handle();
  }

  private validateFile(file: Express.Multer.File): boolean {
    const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    return allowedMimeTypes.includes(file?.mimetype);
  }
}
