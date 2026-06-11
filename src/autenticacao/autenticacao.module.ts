import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutenticacaoService } from './services/autenticacao.service';
import { AutenticacaoController } from './controllers/autenticacao.controller';
import { JwtStrategy } from './estrategias/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    PassportModule,
    UsuarioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log('[JwtModule] Secret carregado:', secret ? 'SIM' : 'NÃO');
        return {
          secret: secret,
          signOptions: { expiresIn: '7d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AutenticacaoService, JwtStrategy, JwtAuthGuard],
  controllers: [AutenticacaoController],
  exports: [AutenticacaoService, JwtAuthGuard, JwtStrategy],
})
export class AutenticacaoModule {}