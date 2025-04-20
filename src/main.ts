import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import helmet from 'helmet';
import * as morgan from 'morgan';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

import { AppModule } from './app.module';
import { API_PREFIX, API_VERSION } from './common';
import { setupSwagger } from './configs/setup-swagger';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    methods: configService.get('CORS_METHODS'),
    allowedHeaders: configService.get('CORS_ALLOWED_HEADERS'),
    // exposedHeaders: configService.get('CORS_EXPOSED_HEADERS'),
    credentials: configService.get('CORS_CREDENTIALS'),
    // preflightContinue: configService.get('CORS_PREFLIGHT_CONTINUE'),
  });
  app.setGlobalPrefix(`/${API_PREFIX}/${API_VERSION}`);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  setupSwagger(app);
  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
    }),
  );

  await app.listen(configService.get('APP_PORT') || 8080).then(() => {
    Logger.log('Server listening on port ' + configService.get('APP_PORT'));
  });
}

bootstrap();
