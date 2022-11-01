import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { loadEnvVars } from './loadEnvVars';

loadEnvVars();

export const getDbAppConfig = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, DATABASE_URL } = process.env;

  if (DATABASE_URL) {
    const urlParts = DATABASE_URL.replace('postgres://', '').split('@');
    const userAndPassword = urlParts[0].split(':');
    const hostPortAndDatabase = urlParts[1].split(':');
    const portAndDatabase = hostPortAndDatabase[1].split('/');

    return {
      type: 'postgres',
      username: userAndPassword[0],
      password: userAndPassword[1],
      host: hostPortAndDatabase[0],
      port: +portAndDatabase[0],
      database: portAndDatabase[1].split('?')[0],
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: false,
      ssl: { rejectUnauthorized: false },
    } as TypeOrmModuleOptions;
  }

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
  const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE_URL } = process.env;

  if (DATABASE_URL) {
    const urlParts = DATABASE_URL.replace('postgres://', '').split('@');
    const userAndPassword = urlParts[0].split(':');
    const hostPortAndDatabase = urlParts[1].split(':');
    const portAndDatabase = hostPortAndDatabase[1].split('/');

    return {
      type: 'postgres',
      username: userAndPassword[0],
      password: userAndPassword[1],
      host: hostPortAndDatabase[0],
      port: +portAndDatabase[0],
      database: portAndDatabase[1].split('?')[0],
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
      ssl: { rejectUnauthorized: false },
    } as DataSourceOptions;
  }

  return {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  } as DataSourceOptions;
};
