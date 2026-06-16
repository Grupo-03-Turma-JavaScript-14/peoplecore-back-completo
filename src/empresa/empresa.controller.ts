import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { CreateFilialDto } from './dto/create-filial.dto';
import { CreateContratoDto } from './dto/create-contrato.dto';

import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard';
import type { Request } from 'express';
@Controller('empresas') 
export class EmpresaController {
  constructor(private readonly service: EmpresaService) {}

  // ==========================
  // ROTA PÚBLICA (Configuração Inicial)
  // ==========================

  @Post()
  createEmpresa(@Body() dto: CreateEmpresaDto) {
    // Esta rota fica aberta para o cadastro inicial da empresa e admin
    return this.service.createEmpresa(dto);
  }

  // ==========================
  // ROTAS PROTEGIDAS (Restante da API)
  // ==========================

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllEmpresas() {
    return this.service.findAllEmpresas();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateEmpresa(@Param('id') id: string, @Body() dto: CreateEmpresaDto) {
    return this.service.updateEmpresa(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEmpresa(@Param('id') id: string) {
    return this.service.deleteEmpresa(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('filial')
  createFilial(@Body() dto: CreateFilialDto, @Req() req: Request) {
    const user = req.user as any;
    return this.service.createFilial(dto, user.empresaId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('contrato')
  createContrato(@Body() dto: CreateContratoDto, @Req() req: Request) {
    const user = req.user as any;
    return this.service.createContrato(dto, user.empresaId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('contrato')
  findAllContratos(@Req() req: Request) {
    const user = req.user as any;
    return this.service.findAllContratos(user.empresaId);
  }
}