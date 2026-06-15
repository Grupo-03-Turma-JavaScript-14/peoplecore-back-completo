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
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { CompanyRole } from '../../common/enums/company-role.enum';

import { LaudoService } from '../services/laudo.service';
import { CreateLaudoDto } from '../dto/create-laudo.dto';
import { StatusLaudo } from '../entities/laudo.entity';

@ApiTags('SST — Laudos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sst/laudos')
export class LaudoController {
  constructor(private readonly service: LaudoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('vencidos')
  findVencidos() {
    return this.service.findVencidos();
  }

  @Get('proximos-vencer')
  @ApiQuery({ name: 'dias', required: false, example: 30 })
  findProximosVencer(@Query('dias') dias?: number) {
    return this.service.findProximosVencer(dias ? +dias : 30);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  // 🏢 permissões de empresa
  @Post()
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateLaudoDto) {
    return this.service.create(dto);
  }

  @Put(':id/status')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: StatusLaudo,
  ) {
    return this.service.atualizarStatus(id, status);
  }

  @Delete(':id')
  @Roles(CompanyRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}