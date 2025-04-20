import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { LanguageCode } from 'src/common/constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .status(exception.getStatus())
      .json(
        await this.getMessage(
          exception,
          ctx.getRequest().i18nLang,
          exception.getResponse(),
        ),
      );
  }

  async getMessage(exception: HttpException, lang: string, data?: any) {
    const exceptionResponse = exception.getResponse() as any;
    if (exceptionResponse.hasOwnProperty('message')) {
      if (exceptionResponse.message instanceof Array) {
        exceptionResponse.message = await this.translateArray(
          exceptionResponse.message,
          lang,
        );
      } else if (typeof exceptionResponse.message === 'string') {
        exceptionResponse.message = this.i18n.translate(
          exceptionResponse.message,
          {
            lang: lang,
          },
        );
      }
      return {
        statusCode: exception.getStatus(),
        data: data?.data,
        message: exceptionResponse.message || exceptionResponse,
      };
    }
    return {
      statusCode: exception.getStatus(),
      data: data?.data,
      message: exceptionResponse,
    };
  }

  async translateArray(errors: any[], lang: string) {
    const data = [];
    for (const item of errors) {
      if (typeof item === 'string') {
        data.push(this.i18n.translate(item, { lang: lang }));
        continue;
      } else if (item instanceof ValidationError) {
        await this.getValidateErrorMessages(item, data, lang);
        continue;
      }
      data.push(item);
    }
    return data;
  }

  async getValidateErrorMessages(
    node: ValidationError,
    data,
    lang: string = LanguageCode.EN,
  ) {
    if (node.constraints) {
      const message = await Promise.all(
        Object.values(node.constraints).map(
          async (value: string) =>
            await this.i18n.translate(value, { lang: lang }),
        ),
      );
      data.push({ field: node.property, message: message });
    }
    if (node.children && node.children.length !== 0) {
      node.children.forEach((item) => {
        this.getValidateErrorMessages(item, data, lang);
      });
    } else {
      return data;
    }
  }
}
