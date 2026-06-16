import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Filial } from '../../empresa/entities/filial.entity';
import { Contrato } from '../../empresa/entities/contrato.entity';

export class ProdService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      url: process.env.DATABASE_URL,

      entities: [
        Empresa,
        Filial,
        Contrato,
      ],

      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    };
  }
}