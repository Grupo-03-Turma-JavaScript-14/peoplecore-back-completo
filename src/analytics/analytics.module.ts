import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { ContratoTrabalho } from '../DepartamentoPessoal/contratotrabalhista/entities/contrato-trabalho.entity';
import { AnalyticsService } from './services/analytics.service';
import { TurnoverService } from './services/turnover.service';
import { HeadcountService } from './services/headcount.service';
import { AnalyticsController } from './controllers/analytics.controller';
import { SstModule } from '../sst/sst.module';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario, ContratoTrabalho]), SstModule],
  providers: [AnalyticsService, TurnoverService, HeadcountService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}