import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GlobalRole } from '../enums/global-role.enum'; // Importação necessária

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // --- LOG DE DIAGNÓSTICO ---
    console.log('--- DIAGNÓSTICO DE ACESSO ---');
    console.log('Usuário no Request:', user ? JSON.stringify(user) : 'NENHUM USUÁRIO ENCONTRADO');
    console.log('Roles necessárias:', requiredRoles);
    // ---------------------------

    if (!user) return false;

    // O SUPER_ADMIN tem acesso total, ignorando a companyRole
    const isSuperAdmin = user.globalRole === GlobalRole.SUPER_ADMIN;
    
    // Verifica se o usuário possui alguma das roles necessárias na empresa
    const hasCompanyRole = requiredRoles.some((role) => user.companyRole === role);

    const hasRole = isSuperAdmin || hasCompanyRole;

    console.log('Acesso liberado?', hasRole);
    return hasRole;
  }
}