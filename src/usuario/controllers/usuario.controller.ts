import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UsuarioService } from "../services/usuario.service";
import { JwtAuthGuard } from "../../autenticacao/guards/jwt-auth.guard";
import type { Request } from "express";
import { Usuario } from "../entities/usuario.entity";
import { GlobalRole } from "../../common/enums/global-role.enum";

@Controller("usuarios")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // 🔥 ROTA PÚBLICA PARA CONFIGURAÇÃO INICIAL
  // Necessária para vincular o Admin à Empresa criada
  @Post(":id/vincular-empresa")
  async vincularEmpresa(
    @Param("id", ParseIntPipe) id: number,
    @Body("empresaId") empresaId: number,
  ) {
    return this.usuarioService.vincularEmpresa(id, empresaId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Req() req: Request): Promise<Usuario[]> {
    return this.usuarioService.findAll(req.user as Usuario);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("/:id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<Usuario> {
    return this.usuarioService.findById(id, req.user as Usuario);
  }

  @Get("/usuario/:usuario")
  async findByUsuario(
    @Param("usuario") usuario: string,
  ): Promise<Usuario | null> {
    return this.usuarioService.findByUsuario(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() usuario: Usuario, @Req() req: Request): Promise<Usuario> {
    const user = req.user as Usuario;
    if (user?.globalRole !== GlobalRole.SUPER_ADMIN) {
      usuario.empresaId = user.empresaId;
    }
    return this.usuarioService.create(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  async update(@Body() usuario: Usuario, @Req() req: Request): Promise<Usuario> {
    return this.usuarioService.update(usuario, req.user as Usuario);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    return this.usuarioService.delete(id, req.user as Usuario);
  }
}