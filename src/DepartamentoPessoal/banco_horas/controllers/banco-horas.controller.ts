import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BancoHorasService } from '../services/banco-horas.service';

@Controller('banco-horas')
export class BancoHorasController {
  constructor(private service: BancoHorasService) {}

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}