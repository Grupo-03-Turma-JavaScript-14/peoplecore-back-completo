import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { FuncionarioService } from '../services/funcionario.service';
import { DeleteResult } from 'typeorm';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from '../dto/update-funcionario.dto';
import { FuncionarioResponseDto } from '../dto/funcionario.response.dto';

@Controller('/funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) { }

  @SkipThrottle()
  @Get()
  async findAll(): Promise<FuncionarioResponseDto[]> {
    const data = await this.funcionarioService.findAll();
    return data.map(item => ({
      ...item,
      categoriaId: item.categoria?.id,
      empresaId: item.empresa?.id,
      admissaoId: item.admissaoId
    })) as unknown as FuncionarioResponseDto[];
  }

  @SkipThrottle()
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<FuncionarioResponseDto> {
    const item = await this.funcionarioService.findById(id);
    return {
      ...item,
      categoriaId: item.categoria?.id,
      empresaId: item.empresa?.id,
      admissaoId: item.admissaoId
    } as unknown as FuncionarioResponseDto;
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  async create(@Body() funcionarioDto: CreateFuncionarioDto): Promise<FuncionarioResponseDto> {
    const novoFuncionario = await this.funcionarioService.create(funcionarioDto);
    return novoFuncionario as unknown as FuncionarioResponseDto;
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() funcionarioDto: UpdateFuncionarioDto,
  ): Promise<FuncionarioResponseDto> {
    const atualizado = await this.funcionarioService.update(id, funcionarioDto);
    return atualizado as unknown as FuncionarioResponseDto;
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.funcionarioService.delete(id);
  }
}