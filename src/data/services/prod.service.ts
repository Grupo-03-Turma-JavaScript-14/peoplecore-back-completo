import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('DATABASE_URL =>', process.env.DATABASE_URL);

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
}