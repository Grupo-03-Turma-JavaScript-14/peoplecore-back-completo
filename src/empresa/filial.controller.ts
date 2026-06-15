import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilialService } from './Filial.Service'; // Você precisará criar este service também

@Controller('filial') // A rota que seu frontend tentou acessar
export class FilialController {
  constructor(private readonly filialService: FilialService) {}

  @Get()
  findAll() {
    return this.filialService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.filialService.create(data);
  }
}