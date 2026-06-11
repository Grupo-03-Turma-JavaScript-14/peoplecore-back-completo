import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    
    if (!secret) {
      console.error('[JwtStrategy] ERRO: JWT_SECRET não encontrado no .env!');
      throw new Error('JWT_SECRET não configurado');
    }
    
    console.log('[JwtStrategy] JWT_SECRET carregado com sucesso');
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    console.log('[JwtStrategy] Validando payload:', payload);
    
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }
    
    return {
      id: payload.sub,
      usuario: payload.usuario,
      role: payload.role,
    };
  }
}