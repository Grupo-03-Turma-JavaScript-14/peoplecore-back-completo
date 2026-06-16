import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../../autenticacao/guards/jwt-auth.guard";

import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

import { CreateCategoriaDto } from "../dto/create-categoria.dto";
import { UpdateCategoriaDto } from "../dto/update-categoria.dto";

@ApiTags('Departamentos')
@Controller('/departamentos')
export class CategoriaController {
  constructor(
    private readonly categoriaService: CategoriaService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllBydescricao(
    @Param('descricao') departamento: string,
  ): Promise<Categoria[]> {
    return this.categoriaService.findAllByDepartamento(departamento);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateCategoriaDto,
  ) {
    console.log('BODY RECEBIDO:', dto);
    return this.categoriaService.create(dto as Categoria);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    console.log('UPDATE RECEBIDO:', dto);
    return this.categoriaService.update(id, dto as Categoria);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriaService.delete(id);
  }
}