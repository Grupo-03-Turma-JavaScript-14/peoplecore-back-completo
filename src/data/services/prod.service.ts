import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {

    console.log('DATABASE_URL =', process.env.DATABASE_URL);
    console.log('DB_HOST =', process.env.DB_HOST);
    console.log('DB_PORT =', process.env.DB_PORT);
    console.log('DB_DATABASE =', process.env.DB_DATABASE);
    console.log('DB_USERNAME =', process.env.DB_USERNAME);

    return {
      type: 'mysql',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      retryAttempts: 10,
      retryDelay: 3000,
    };
  }
}