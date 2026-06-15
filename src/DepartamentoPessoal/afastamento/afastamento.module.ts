import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Afastamento } from './entities/afastamento.entity';
import { AfastamentoController } from './controllers/afastamento.controller';
import { AfastamentoService } from './services/afastamento.service';


@Module({
  imports: [TypeOrmModule.forFeature([Afastamento])],
  controllers: [AfastamentoController],
  providers: [AfastamentoService],
})
export class AfastamentoModule {}