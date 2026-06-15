import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AdvertenciaService } from '../services/advertencia.service';
import { CreateAdvertenciaDto } from '../dto/create-advertencia.dto';
import { UpdateAdvertenciaDto } from '../dto/update-advertencia.dto';

@Controller('/advertencias')
export class AdvertenciaController {

  constructor(private readonly service: AdvertenciaService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateAdvertenciaDto) {
    return this.service.create(dto);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdvertenciaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}