import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { CompanyRole } from '../../common/enums/company-role.enum';

import { EpiService } from '../services/epi.service';
import { CreateEpiDto } from '../dto/create-epi.dto';
import { EntregaEpiDto } from '../dto/entrega-epi.dto';

@ApiTags('SST — EPIs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sst/epis')
export class EpiController {
  constructor(private readonly service: EpiService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('ca-vencidos')
  findCasVencidos() {
    return this.service.findCasVencidos();
  }

  @Get('estoque-minimo')
  findEstoqueMinimo() {
    return this.service.findEstoqueMinimo();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
// Adicione este método ao seu EpiController
  @Get('entregas')
  findAllEntregas() {
    return this.service.findAllEntregas(); 
  }

  @Get('entregas/funcionario/:id')
  findEntregasByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findEntregasByFuncionario(id);
  }

  // 🏢 regras de empresa
  @Post()
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEpiDto) {
    return this.service.create(dto);
  }

  @Post('entregas')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  registrarEntrega(@Body() dto: EntregaEpiDto) {
    return this.service.registrarEntrega(dto);
  }

  @Put('entregas/:id/devolver')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  registrarDevolucao(@Param('id', ParseIntPipe) id: number) {
    return this.service.registrarDevolucao(id);
  }

  @Delete(':id')
  @Roles(CompanyRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}