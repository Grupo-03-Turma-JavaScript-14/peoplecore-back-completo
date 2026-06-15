import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Interface atualizada para incluir as roles necessárias
export interface JwtPayload {
  sub: number;
  usuario: string;
  globalRole?: string;    // Adicionado para suportar SUPER_ADMIN
  companyRole?: string;   // Adicionado para suportar ADMIN, RH, etc.
  empresaId?: number | null;
  departamento?: string | null;
  mustChangePassword?: boolean;
  permissions?: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  // O método validate agora mapeia os campos corretamente
  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }

    // Estes campos estarão disponíveis no objeto 'request.user' em qualquer Guard ou Controller
    return {
      id: payload.sub,
      usuario: payload.usuario,
      globalRole: payload.globalRole,      // Agora o RolesGuard vai enxergar isso
      companyRole: payload.companyRole,    // Agora o RolesGuard vai enxergar isso
      empresaId: payload.empresaId ?? null,
      departamento: payload.departamento ?? null,
      mustChangePassword: payload.mustChangePassword ?? false,
      permissions: payload.permissions ?? [],
    };
  }
}