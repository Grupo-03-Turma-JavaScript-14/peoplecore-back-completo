import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AutenticacaoService } from './services/autenticacao.service';
import { AutenticacaoController } from './controllers/autenticacao.controller';
import { JwtStrategy } from './estrategias/jwt.strategy';

import { UsuarioModule } from '../usuario/usuario.module';
import { EmpresaModule } from '../empresa/empresa.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 🔥 Explicitado o strategy padrão
    ConfigModule, 
    UsuarioModule,
    EmpresaModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default-secret',
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],

  providers: [
    AutenticacaoService,
    JwtStrategy,
  ],

  controllers: [AutenticacaoController],

  exports: [AutenticacaoService, JwtModule], 
})
export class AutenticacaoModule {}