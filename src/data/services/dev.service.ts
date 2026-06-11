import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from '../../departamento/entities/categoria.entity';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';
import { Promocao } from '../../promocao/entities/promocao.entity';
import { Contrato } from '../../contrato/entities/contrato.entity';
import { RegistroPonto } from '../../ponto/entities/registro-ponto.entity';
import { FolhaPagamento } from '../../folha/entities/folha-pagamento.entity';
import { Rubrica } from '../../folha/entities/rubrica.entity';
import { Ferias } from '../../ferias/entities/ferias.entity';
import { Laudo } from '../../sst/entities/laudo.entity';
import { Aso } from '../../sst/entities/aso.entity';
import { Epi } from '../../sst/entities/epi.entity';
import { EntregaEpi } from '../../sst/entities/entrega-epi.entity';
import { Cat } from '../../sst/entities/cat.entity';
import { NrControle } from '../../sst/entities/nr-controle.entity';
import { Cipa } from '../../sst/entities/cipa.entity';
import { RiscoAmbiental } from '../../sst/entities/risco-ambiental.entity';
import { Treinamento } from '../../treinamento/entities/treinamento.entity';
import { Inscricao } from '../../treinamento/entities/inscricao.entity';
import { Certificado } from '../../treinamento/entities/certificado.entity';
import { Funcao } from '../../funcao/entities/funcao.entity';

export class DevService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_DATABASE ?? 'peoplecore',
      entities: [
        Usuario,
        Categoria,
        Funcionario,
        Promocao,
        Contrato,
        RegistroPonto,
        FolhaPagamento,
        Rubrica,
        Ferias,
        Laudo,
        Aso,
        Epi,
        EntregaEpi,
        Cat,
        NrControle,
        Cipa,
        RiscoAmbiental,
        Treinamento,
        Inscricao,
        Certificado,
        Funcao, 
      ],
      synchronize: true,
      logging: true,
    };
  }
}