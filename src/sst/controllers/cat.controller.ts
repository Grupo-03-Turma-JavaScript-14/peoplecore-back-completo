// cat.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { CatService } from '../services/cat.service';
import { CreateCatDto } from '../dto/create-cat.dto';

@Controller('sst/cat')
export class CatController {
  constructor(private readonly service: CatService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get('funcionario/:funcionarioId')
  async findByFuncionario(@Param('funcionarioId') funcionarioId: number) {
    return this.service.findByFuncionario(funcionarioId);
  }

  @Post()
  async create(@Body() dto: CreateCatDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CreateCatDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.service.delete(id);
    return { message: 'CAT removida com sucesso' };
  }

  @Post(':id/enviar-esocial')
  async enviarEsocial(@Param('id') id: number, @Body('protocolo') protocolo: string) {
    if (!protocolo) {
      throw new HttpException('Protocolo é obrigatório', HttpStatus.BAD_REQUEST);
    }
    return this.service.marcarEnviadoEsocial(id, protocolo);
  }
}