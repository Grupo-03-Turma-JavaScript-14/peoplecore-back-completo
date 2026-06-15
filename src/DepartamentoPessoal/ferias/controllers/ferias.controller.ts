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
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeriasService } from '../services/ferias.service';
import { SolicitarFeriasDto } from '../dto/solicitar-ferias.dto';

@Controller('ferias')
export class FeriasController {
  constructor(private readonly service: FeriasService) {}

  // 1. ROTAS FIXAS PRIMEIRO
  @Post()
  @HttpCode(HttpStatus.CREATED)
  solicitar(@Body() dto: SolicitarFeriasDto) {
    return this.service.solicitar(dto);
  }

  @Get('opcoes/funcionarios')
  async getOpcoesFuncionarios(@Query('nome') nome?: string) {
    return await this.service.buscarOpcoesFuncionarios(nome);
  }

  @Get('opcoes/departamentos')
  async getOpcoesDepartamentos() {
    return await this.service.buscarOpcoesDepartamentos();
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 2. ROTAS DINÂMICAS POR ÚLTIMO
  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: SolicitarFeriasDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/aprovar')
  aprovar(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const aprovadorNome = req.user ? req.user.usuario : 'Admin';
    return this.service.aprovar(id, aprovadorNome);
  }

  @Put(':id/rejeitar')
  rejeitar(@Param('id', ParseIntPipe) id: number, @Body('motivo') motivo: string) {
    return this.service.rejeitar(id, motivo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}