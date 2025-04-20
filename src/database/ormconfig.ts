import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { Environment } from '../common/constants';

const connectionOptions: TypeOrmModuleOptions &
  SeederOptions &
  DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_POSTGRES_PORT || '5432', 10),
  username: process.env.DATABASE_POSTGRES_USERNAME,
  password: process.env.DATABASE_POSTGRES_PASSWORD,
  database: process.env.DATABASE_POSTGRES_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  connectTimeoutMS: 0,
  logNotifications: true,
  synchronize: false,
  entities: [join(__dirname, '..', 'modules/**/*.entity.{ts,js}')],
  poolErrorHandler: (err) => {
    console.log(err);
  },
  logging: [Environment.local, Environment.dev].includes(
    process.env.ENV as Environment,
  )
    ? 'all'
    : ['warn', 'error'],
  migrationsTableName: 'migration',
  migrations: [join(__dirname, '..', 'database/migrations/*{.js,.ts}')],
  seeds: [join(__dirname, '..', 'database/seeds/*.seeder.{ts,js}')],
  factories: [join(__dirname, '..', 'database/factories/*.factory.{ts,js}')],
  subscribers: [join(__dirname, '..', 'modules/**/*.subscriber.{ts,js}')],
};

const dataSource = new DataSource(connectionOptions);

export { connectionOptions, dataSource };
