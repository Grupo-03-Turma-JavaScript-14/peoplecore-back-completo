import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_DATABASE ?? 'peoplecore',

      autoLoadEntities: true,

      synchronize: false,
      logging: false,

      // ✔ opções válidas de estabilidade
      retryAttempts: 10,
      retryDelay: 3000,
    };
  }
}