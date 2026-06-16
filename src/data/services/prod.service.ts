import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    return {
      type: 'mysql',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
    };
  }
}