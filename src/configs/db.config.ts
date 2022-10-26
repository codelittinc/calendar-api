import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { loadEnvVars } from './loadEnvVars';

loadEnvVars();

export const getDbAppConfig = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

  return {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: false,
  } as TypeOrmModuleOptions;
};

export const getDbMigrationConfig = () => {
  const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_DOCKER_EXPOSE_PORT, DB_DOCKER_EXPOSE_HOST } = process.env;

  return {
    type: 'postgres',
    host: DB_DOCKER_EXPOSE_HOST,
    port: +DB_DOCKER_EXPOSE_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  } as DataSourceOptions;
};
