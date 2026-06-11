import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    console.log('[JwtAuthGuard] Token recebido:', token ? 'SIM' : 'NÃO');
    console.log('[JwtAuthGuard] Rota:', request.url);
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('[JwtAuthGuard] User encontrado:', user);
    console.log('[JwtAuthGuard] Info:', info?.message);
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido');
    }
    return user;
  }
}