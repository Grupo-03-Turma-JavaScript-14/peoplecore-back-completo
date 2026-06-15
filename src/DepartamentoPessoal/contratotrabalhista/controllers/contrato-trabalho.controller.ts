import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ContratoTrabalhoService } from '../services/contrato-trabalho.Service';
import { CreateContratoTrabalhoDto } from '../dto/create-contrato-trabalho.dto';
import { UpdateContratoTrabalhoDto } from '../dto/update-contrato-trabalho.dto';
import { ContratoTrabalho } from '../entities/contrato-trabalho.entity';

@ApiTags('Contratos Trabalhistas')
@Controller('contrato-trabalho')
export class ContratoTrabalhoController {
  constructor(private readonly service: ContratoTrabalhoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os contratos trabalhistas' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso', type: [ContratoTrabalho] })
  async findAll(): Promise<ContratoTrabalho[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar contrato por ID' })
  @ApiParam({ name: 'id', description: 'ID do contrato', example: 1 })
  @ApiResponse({ status: 200, description: 'Contrato encontrado', type: ContratoTrabalho })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ContratoTrabalho> {
    return this.service.findById(id);
  }

  // MUDANÇA AQUI: Rota atualizada para buscar pelo ID da Admissão
  @Get('admissao/:admissaoId')
  @ApiOperation({ summary: 'Buscar contrato ativo de uma admissão' })
  @ApiParam({ name: 'admissaoId', description: 'ID da admissão', example: 1 })
  @ApiResponse({ status: 200, description: 'Contrato ativo encontrado', type: ContratoTrabalho })
  @ApiResponse({ status: 404, description: 'Nenhum contrato ativo encontrado para esta admissão' })
  async findByAdmissao(@Param('admissaoId', ParseIntPipe) admissaoId: number): Promise<ContratoTrabalho> {
    return this.service.findByAdmissao(admissaoId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo contrato de trabalho' })
  @ApiBody({ type: CreateContratoTrabalhoDto })
  @ApiResponse({ status: 201, description: 'Contrato criado com sucesso', type: ContratoTrabalho })
  @ApiResponse({ status: 400, description: 'Dados inválidos (erro de validação ou enum)' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateContratoTrabalhoDto): Promise<ContratoTrabalho> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados do contrato' })
  @ApiParam({ name: 'id', description: 'ID do contrato', example: 1 })
  @ApiBody({ type: UpdateContratoTrabalhoDto })
  @ApiResponse({ status: 200, description: 'Contrato atualizado', type: ContratoTrabalho })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContratoTrabalhoDto,
  ): Promise<ContratoTrabalho> {
    return this.service.update(id, dto);
  }

  @Put(':id/encerrar')
  @ApiOperation({ summary: 'Encerrar contrato (rescisão)' })
  @ApiParam({ name: 'id', description: 'ID do contrato', example: 1 })
  @ApiBody({ schema: { example: { motivo: 'Pedido de demissão' } } })
  @ApiResponse({ status: 200, description: 'Contrato encerrado', type: ContratoTrabalho })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  async encerrar(
    @Param('id', ParseIntPipe) id: number,
    @Body('motivo') motivo: string,
  ): Promise<ContratoTrabalho> {
    return this.service.encerrar(id, motivo);
  }
}