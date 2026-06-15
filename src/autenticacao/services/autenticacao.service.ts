import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { EmpresaService } from '../../empresa/empresa.service';
import { UsuarioLogin } from '../../usuario/models/usuario-login.model';
import { GlobalRole } from '../../common/enums/global-role.enum';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly empresaService: EmpresaService,
    private readonly jwtService: JwtService,
  ) { }

  async checkSetup() {
    const userCount = await this.usuarioService.countAll();
    const empresaCount = await this.empresaService.countAll();

    return {
      configured: userCount > 0 && empresaCount > 0,
      userCreated: userCount > 0
    };
  }

  async register(dto: { nome: string; usuario: string; senha: string; empresaId: number }) {
    const usuario = await this.usuarioService.create({
      nome: dto.nome,
      usuario: dto.usuario,
      senha: dto.senha,
      empresaId: dto.empresaId,
      globalRole: GlobalRole.SUPER_ADMIN,
      mustChangePassword: false,
    });

    const payload = {
      sub: usuario.id,
      usuario: usuario.usuario,
      globalRole: usuario.globalRole,
      companyRole: usuario.companyRole, // Garantido aqui
      empresaId: usuario.empresaId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: usuario,
    };
  }

  async login(usuarioLogin: UsuarioLogin) {
    const usuario = await this.usuarioService.findByUsuarioWithPassword(usuarioLogin.usuario);
    if (!usuario) throw new HttpException('Usuário inválido', HttpStatus.UNAUTHORIZED);

    const senhaOk = await bcrypt.compare(usuarioLogin.senha, usuario.senha!);
    if (!senhaOk) throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);

    // CORREÇÃO: Incluindo companyRole no payload do login
    const payload = {
      sub: usuario.id,
      usuario: usuario.usuario,
      globalRole: usuario.globalRole,
      companyRole: usuario.companyRole, 
      mustChangePassword: usuario.mustChangePassword,
      empresaId: usuario.empresaId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: usuario,
    };
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const usuario = await this.usuarioService.findByIdWithPassword(userId);
    if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const senhaOk = await bcrypt.compare(currentPassword, usuario.senha!);
    if (!senhaOk) throw new HttpException('Senha atual incorreta', HttpStatus.BAD_REQUEST);

    await this.usuarioService.updatePasswordAndClearFlag(userId, newPassword);

    return { message: 'Senha alterada com sucesso' };
  }
}