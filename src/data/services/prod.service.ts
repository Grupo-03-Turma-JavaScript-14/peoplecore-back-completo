import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      url: process.env.DATABASE_URL,

      autoLoadEntities: true,

      synchronize: false,
      logging: false,

      retryAttempts: 10,
      retryDelay: 3000,
    };
  }
}