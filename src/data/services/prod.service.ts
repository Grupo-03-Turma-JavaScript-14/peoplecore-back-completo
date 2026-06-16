import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {

    console.log('DB_HOST =', process.env.DB_HOST);
    console.log('DB_PORT =', process.env.DB_PORT);
    console.log('DB_DATABASE =', process.env.DB_DATABASE);
    console.log('DB_USERNAME =', process.env.DB_USERNAME);

    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      retryAttempts: 10,
      retryDelay: 3000,
    };
  }
}