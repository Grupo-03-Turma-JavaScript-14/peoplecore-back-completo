import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ferias } from './entities/ferias.entity';
import { FeriasService } from './services/ferias.service';
import { CalculoFeriasService } from '../folha/services/calculo-ferias.service';
import { FeriasController } from './controllers/ferias.controller';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';
import { Categoria } from '../../rh/departamento/entities/categoria.entity'; // IMPORTANTE: Verifique o caminho correto

@Module({
  // CORREÇÃO: Adicione 'Categoria' aqui para que o repositório seja criado
  imports: [TypeOrmModule.forFeature([Ferias, Funcionario, Categoria])], 
  providers: [FeriasService, CalculoFeriasService],
  controllers: [FeriasController],
  exports: [FeriasService],
})
export class FeriasModule {}