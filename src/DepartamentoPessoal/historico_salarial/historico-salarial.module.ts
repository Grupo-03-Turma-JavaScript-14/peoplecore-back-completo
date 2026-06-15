import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoSalarial } from './entities/historico-salarial.entity';
import { HistoricoSalarialService } from './services/historico-salarial.service';
import { HistoricoSalarialController } from './controllers/historico-salarial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoSalarial])],
  controllers: [HistoricoSalarialController],
  providers: [HistoricoSalarialService],
})
export class HistoricoSalarialModule {}