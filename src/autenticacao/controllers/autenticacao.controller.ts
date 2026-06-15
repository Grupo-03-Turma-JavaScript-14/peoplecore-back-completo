import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AutenticacaoService } from '../services/autenticacao.service';
import { UsuarioLogin } from '../../usuario/models/usuario-login.model';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import type { Request } from 'express';

interface RequestWithUser extends Request {
  user: any;
}

@Controller('auth')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get('check-setup')
  async checkSetup() {
    return this.autenticacaoService.checkSetup();
  }

  // ROTA UNIFICADA DE REGISTRO ADICIONADA E POSICIONADA
  @Post('register')
  async register(@Body() dto: { nome: string; usuario: string; senha: string; empresaId: number }) {
    return this.autenticacaoService.register(dto);
  }

  @Post('login')
  async login(@Body() usuarioLogin: UsuarioLogin) {
    return this.autenticacaoService.login(usuarioLogin);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Req() req: RequestWithUser,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.autenticacaoService.changePassword(
      req.user.id,
      body.currentPassword,
      body.newPassword,
    );
  }
}