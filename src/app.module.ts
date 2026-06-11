import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';
import { UploadController } from './upload/upload.controller';

// Módulos
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './departamento/categoria.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { PromocaoModule } from './promocao/promocao.module';
import { ContratoModule } from './contrato/contrato.module';
import { PontoModule } from './ponto/ponto.module';
import { FolhaModule } from './folha/folha.module';
import { FeriasModule } from './ferias/ferias.module';
import { SstModule } from './sst/sst.module';
import { EsocialModule } from './esocial/esocial.module';
import { TreinamentoModule } from './treinamento/treinamento.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { IaModule } from './ia/ia.module';
import { FuncaoModule } from './funcao/funcao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,
      limit: 3,
    }, {
      name: 'long',
      ttl: 60000,
      limit: 100,
    }]),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';
        if (isProd) {
          const prodService = new ProdService();
          return prodService.createTypeOrmOptions();
        } else {
          const devService = new DevService();
          return devService.createTypeOrmOptions();
        }
      },
    }),

    AutenticacaoModule,
    UsuarioModule,
    CategoriaModule,
    FuncionarioModule,
    PromocaoModule,
    ContratoModule,
    PontoModule,
    FolhaModule,
    FeriasModule,
    SstModule,
    EsocialModule,
    TreinamentoModule,
    AnalyticsModule,
    IaModule,
    FuncaoModule,
  ],
  controllers: [AppController, UploadController], // ← UploadController adicionado aqui
  providers: [
    DevService,
    ProdService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}