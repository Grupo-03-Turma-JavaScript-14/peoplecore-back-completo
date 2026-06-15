import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoHoras } from './entities/banco-horas.entity';
import { BancoHorasService } from './services/banco-horas.service';
import { BancoHorasController } from './controllers/banco-horas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BancoHoras])],
  controllers: [BancoHorasController],
  providers: [BancoHorasService],
})
export class BancoHorasModule {}