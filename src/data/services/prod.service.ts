import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Filial } from '../../empresa/entities/filial.entity';
import { Contrato } from '../../empresa/entities/contrato.entity';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('DATABASE_URL =>', process.env.DATABASE_URL);

    return {
      type: 'mysql',
      url: process.env.DATABASE_URL,

      entities: [
        Empresa,
        Filial,
        Contrato,
        __dirname + '/../../**/*.entity{.ts,.js}',
      ],

      autoLoadEntities: true,

      synchronize: true,

      logging: true,

      retryAttempts: 10,
      retryDelay: 3000,
    };
  }
}