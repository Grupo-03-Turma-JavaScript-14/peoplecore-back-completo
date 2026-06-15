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

import { AsoService } from '../services/aso.service';
import { CreateAsoDto } from '../dto/create-aso.dto';

@ApiTags('SST — ASOs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sst/asos')
export class AsoController {
  constructor(private readonly asoService: AsoService) {}

  @Get()
  findAll() {
    return this.asoService.findAll();
  }

  @Get('vencidos')
  findVencidos() {
    return this.asoService.findVencidos();
  }

  @Get('proximos-vencer')
  @ApiQuery({ name: 'dias', required: false, example: 30 })
  findProximosVencer(@Query('dias') dias?: number) {
    return this.asoService.findProximosVencer(dias ? +dias : 30);
  }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.asoService.findByFuncionario(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.asoService.findById(id);
  }

  // 🏢 regras por empresa (CompanyRole)
  @Post()
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAsoDto) {
    return this.asoService.create(dto);
  }

  @Put(':id')
  @Roles(CompanyRole.ADMIN, CompanyRole.RH)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAsoDto,
  ) {
    return this.asoService.update(id, dto);
  }

  @Delete(':id')
  @Roles(CompanyRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.asoService.delete(id);
  }
}