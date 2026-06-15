import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

import { CompanyRole } from '../../../common/enums/company-role.enum';

import { FuncaoService } from '../services/funcao.service';
import { CreateFuncaoDto } from '../dto/create-funcao.dto';
import { UpdateFuncaoDto } from '../dto/update-funcao.dto';

@ApiTags('Funções')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('funcoes')

export class FuncaoController {
  constructor(private readonly funcaoService: FuncaoService) {}

  @Get()
  async findAll() {
    return this.funcaoService.findAll();
  }

  @Get('categoria/:categoriaId')
  async findByCategoria(@Param('categoriaId', ParseIntPipe) categoriaId: number) {
    return this.funcaoService.findByCategoria(categoriaId);
  }

  @Get('buscar')
  @ApiQuery({ name: 'nome', required: true })
  @ApiQuery({ name: 'categoriaId', required: false })
  async findByNome(
    @Query('nome') nome: string,
    @Query('categoriaId') categoriaId?: string,
  ) {
    return this.funcaoService.findByNome(
      nome,
      categoriaId ? parseInt(categoriaId) : undefined,
    );
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.funcaoService.findById(id);
  }

  // 🏢 regra de empresa
  @Post()
  //@Roles(CompanyRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateFuncaoDto) {
    return this.funcaoService.create(dto);
  }

  @Put(':id')
  @Roles(CompanyRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFuncaoDto,
  ) {
    return this.funcaoService.update(id, dto);
  }

  @Delete(':id')
  @Roles(CompanyRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.funcaoService.delete(id);
  }
}