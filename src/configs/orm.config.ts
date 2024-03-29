import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '../snake-naming.strategy';

export const ormConfig = registerAs('database', () => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA || 'public',
    namingStrategy: new SnakeNamingStrategy(),
    migrationsTableName: '__migrations',
    entities: ['**/*.entity.js'],
    subscribers: [''],
    migrations: ['**/{migrations,seeds}/*.js'],
    migrationsRun: true,
    logging: process.env.DB_LOGGING == 'true',
    ssl:
      process.env.DB_SSL == 'true'
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  } as TypeOrmModuleOptions;
});
