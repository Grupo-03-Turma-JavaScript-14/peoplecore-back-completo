import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // ESTA LINHA VAI MOSTRAR NO LOG DO RAILWAY O QUE ESTÁ CHEGANDO
    console.log('--- TESTE DE URL DO BANCO ---:', process.env.DATABASE_URL);

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