import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoTrabalho } from './entities/contrato-trabalho.entity';
import { ContratoTrabalhoService } from './services/contrato-trabalho.Service';   // ← caminho corrigido
import { ContratoTrabalhoController } from './controllers/contrato-trabalho.controller'; // ← caminho corrigido

@Module({
  imports: [TypeOrmModule.forFeature([ContratoTrabalho])],
  providers: [ContratoTrabalhoService],
  controllers: [ContratoTrabalhoController],
  exports: [ContratoTrabalhoService],
})
export class ContratoTrabalhoModule {}