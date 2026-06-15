import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { UploadController } from './upload/upload.controller';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresaModule } from './empresa/empresa.module';
import { FilialModule } from './empresa/filial.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { CategoriaModule } from './rh/departamento/categoria.module';
import { FuncaoModule } from './rh/funcao/funcao.module';
import { AdmissaoModule } from './DepartamentoPessoal/admissao/admissao.module';
import { ContratoTrabalhoModule } from './DepartamentoPessoal/contratotrabalhista/contrato-trabalho.module';
import { FeriasModule } from './DepartamentoPessoal/ferias/ferias.module';
import { FolhaModule } from './DepartamentoPessoal/folha/folha.module';
import { IaModule } from './ia/ia.module'
import { SstModule } from './sst/sst.module';
import { PromocaoModule } from './rh/promocao/promocao.module'
import { TreinamentoModule } from './rh/treinamento/treinamento.module';
import { EsocialModule } from './esocial/esocial.module';
import { PontoModule } from './DepartamentoPessoal/ponto/ponto.module';
import { HistoricoSalarialModule } from './DepartamentoPessoal/historico_salarial/historico-salarial.module';
import { DependenteModule } from './DepartamentoPessoal/dependentes/dependente.module';
import { BancoHorasModule } from './DepartamentoPessoal/banco_horas/banco-horas.module';
import { AfastamentoModule } from './DepartamentoPessoal/afastamento/afastamento.module';
import { AdvertenciaModule } from './DepartamentoPessoal/advertencias/advertencia.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ name: 'short', ttl: 1000, limit: 10 }]),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';
        return isProd ? new ProdService().createTypeOrmOptions() : new DevService().createTypeOrmOptions();
      },
    }),
    AutenticacaoModule,
    UsuarioModule,
    EmpresaModule,
    FilialModule,
    FuncionarioModule,
    CategoriaModule,
    FuncaoModule,
    AdmissaoModule,
    ContratoTrabalhoModule,
    FeriasModule,
    FolhaModule,
    IaModule,
    SstModule,
    PromocaoModule,
    TreinamentoModule,
    EsocialModule,
    PontoModule,
    HistoricoSalarialModule,
    DependenteModule,
    BancoHorasModule,
    AfastamentoModule,
    AnalyticsModule,
    AdvertenciaModule,


  ],
  controllers: [AppController, UploadController],
  providers: [
    DevService,
    ProdService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule { }