import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcao } from './entities/funcao.entity';
import { FuncaoService } from './services/funcao.service';
import { FuncaoController } from './controllers/funcao.controller';
import { Categoria } from '../departamento/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcao, Categoria]), 
  ],
  providers: [FuncaoService],
  controllers: [FuncaoController],
  exports: [FuncaoService],
})
export class FuncaoModule {}