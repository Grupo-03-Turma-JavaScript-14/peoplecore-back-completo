import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {

    if (process.env.DATABASE_URL) {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [join(__dirname, '../../**/*.entity.{js,ts}')],
        synchronize: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }

    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'SUA_SENHA',
      database: 'peoplecore',
      entities: [join(__dirname, '../../**/*.entity.{js,ts}')],
      synchronize: true,
      logging: true,
    };
  }
}