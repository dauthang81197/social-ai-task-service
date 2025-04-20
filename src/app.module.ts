import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { connectionOptions } from './database/ormconfig';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import I18nModuleConfig from './i18n';
import { TrimRequestMiddleware } from './middleware/trim.middleware';
import { BaseModule } from './modules/base.module';
import { ScheduleModule } from '@nestjs/schedule';

export const CORE_MODULE_IMPORT = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  I18nModuleConfig,
  TypeOrmModule.forRootAsync({
    useFactory() {
      return connectionOptions;
    },
    async dataSourceFactory(options) {
      if (!options) {
        throw new Error('Invalid options passed');
      }

      return addTransactionalDataSource(new DataSource(options));
    },
  }),
  ScheduleModule.forRoot(),
];

@Module({
  imports: [...CORE_MODULE_IMPORT, BaseModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (i18n: I18nService) => {
        return new HttpExceptionFilter(i18n);
      },
      inject: [I18nService],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrimRequestMiddleware).forRoutes('*');
  }
}
