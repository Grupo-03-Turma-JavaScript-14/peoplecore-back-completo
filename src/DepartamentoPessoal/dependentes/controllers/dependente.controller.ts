import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DependenteService } from '../services/dependente.service';

@Controller('dependentes')
export class DependenteController {
  constructor(private service: DependenteService) {}

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