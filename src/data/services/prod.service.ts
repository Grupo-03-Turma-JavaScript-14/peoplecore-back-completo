import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('DATABASE_URL =>', process.env.DATABASE_URL);

    return {
      type: 'mysql',
      url: process.env.DATABASE_URL,

      entities: [join(__dirname, '../../**/*.entity.js')],

      synchronize: true,
      logging: true,
    };
  }
}