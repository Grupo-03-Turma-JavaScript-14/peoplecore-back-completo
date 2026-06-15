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

import { NrControleService } from '../services/nr-controle.service';
import { CreateNrControleDto } from '../dto/create-nr-controle.dto';

@ApiTags('SST — NRs Conformidade')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sst/nr-controle')
export class NrControleController {
  constructor(private readonly service: NrControleService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('nao-conformes')
  findNaoConformes() {
    return this.service.findNaoConformes();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  // 🏢 permissões da empresa
  @Post()
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateNrControleDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateNrControleDto>,
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