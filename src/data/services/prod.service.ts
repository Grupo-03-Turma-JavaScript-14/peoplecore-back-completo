import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      url: process.env.DATABASE_URL,

      autoLoadEntities: true,

      synchronize: true, // <- mudar aqui

      logging: true,
    };
  }
}