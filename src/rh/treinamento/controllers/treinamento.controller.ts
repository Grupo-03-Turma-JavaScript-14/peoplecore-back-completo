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

import { JwtAuthGuard } from '../../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

import { CompanyRole } from '../../../common/enums/company-role.enum';

import { TreinamentoService } from '../services/treinamento.service';
import { CertificadoService } from '../services/certificado.service';
import { CreateTreinamentoDto } from '../dto/create-treinamento.dto';
import { InscricaoDto } from '../dto/inscricao.dto';

@ApiTags('Treinamentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('treinamentos')
export class TreinamentoController {
  constructor(
    private readonly service: TreinamentoService,
    private readonly certService: CertificadoService,
  ) {}

  // ======================
  // LISTAGEM
  // ======================
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  // ======================
  // INSCRIÇÕES
  // ======================

  @Get(':id/inscricoes')
  findInscricoesByTreinamento(@Param('id', ParseIntPipe) id: number) {
    return this.service.findInscricoesByTreinamento(id);
  }

  @Get('funcionario/:id/inscricoes')
  findInscricoes(@Param('id', ParseIntPipe) id: number) {
    return this.service.findInscricoesByFuncionario(id);
  }

  // ======================
  // CERTIFICADOS
  // ======================

  @Get('funcionario/:id/certificados')
  findCertificados(@Param('id', ParseIntPipe) id: number) {
    return this.certService.findByFuncionario(id);
  }

  @Get('certificados/vencendo')
  certVencendo() {
    return this.certService.findVencendo(30);
  }

  // ======================
  // CREATE / UPDATE / DELETE
  // ======================

  @Post()
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTreinamentoDto) {
    return this.service.create(dto);
  }

  @Post('inscricoes')
  @HttpCode(HttpStatus.CREATED)
  inscrever(@Body() dto: InscricaoDto) {
    return this.service.inscrever(dto);
  }

  @Put('inscricoes/:id/concluir')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  concluir(
    @Param('id', ParseIntPipe) id: number,
    @Body('nota') nota?: number,
  ) {
    return this.service.concluir(id, nota);
  }

  @Post('inscricoes/:id/certificado')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  emitirCertificado(@Param('id', ParseIntPipe) id: number) {
    return this.certService.emitir(id);
  }

  @Put(':id')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateTreinamentoDto>,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(CompanyRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}