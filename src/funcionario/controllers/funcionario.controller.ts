import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler'; // Importação necessária
import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from '../entities/funcionario.entity';
import { DeleteResult } from 'typeorm';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from '../dto/update-funcionario.dto';

@Controller('/funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) { }

  @SkipThrottle() // Permite busca sem o limite restrito de 3 req/min
  @Get()
  async findAll(): Promise<any[]> { // Alterado para 'any[]' ou um DTO de resposta
    const data = await this.funcionarioService.findAll();
    // Aqui você pode mapear os dados para garantir que campos sensíveis do 'usuario' sejam removidos
    return data.map(({ usuario, ...rest }) => rest); 
  }

  @SkipThrottle()
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const data = await this.funcionarioService.findById(id);
    const { usuario, ...rest } = data; // Destruturação para remover o objeto usuario
    return rest;
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } }) // Limite rigoroso de 3 por minuto
  @Post()
  create(@Body() funcionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    return this.funcionarioService.create(funcionarioDto as any);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() funcionarioDto: UpdateFuncionarioDto,
  ): Promise<Funcionario> {
    return this.funcionarioService.update({ ...funcionarioDto, id } as any);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.funcionarioService.delete(id);
  }
}