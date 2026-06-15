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
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { FolhaService } from '../services/folha.service';
import { CalcularFolhaDto } from '../dto/calcular-folha.dto';
import { UpdateFolhaDto } from '../dto/update-folha.dto'; // Crie este DTO

@ApiTags('Folha de Pagamento')
@Controller('folha')
export class FolhaController {
  constructor(private readonly service: FolhaService) {}

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

  @Post('calcular')
  @HttpCode(HttpStatus.CREATED)
  calcular(@Body() dto: CalcularFolhaDto) {
    return this.service.calcular(dto);
  }

  // Novo método para atualização
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFolhaDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/pagar')
  confirmarPagamento(@Param('id', ParseIntPipe) id: number) {
    return this.service.confirmarPagamento(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}