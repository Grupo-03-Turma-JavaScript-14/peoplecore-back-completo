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
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

import { CompanyRole } from '../../../common/enums/company-role.enum';

import { CreatePromocaoDto } from '../dto/create-promocao.dto';
import { PromocaoService } from '../services/promocao.service';

@ApiTags('Promoções e Movimentações')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('promocoes')
export class PromocaoController {
  constructor(private readonly service: PromocaoService) {}

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

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  // ======================
  // CREATE
  // ======================

  @Post()
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePromocaoDto) {
    return this.service.create(dto);
  }

  // ======================
  // DELETE
  // ======================

  @Delete(':id')
  @Roles(CompanyRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}