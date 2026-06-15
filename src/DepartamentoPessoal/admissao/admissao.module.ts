import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admissao } from './entities/admissao.entity';
import { AdmissaoController } from './controllers/admissao.controller';
import { AdmissaoService } from './services/admissao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admissao])],
  controllers: [AdmissaoController],
  providers: [AdmissaoService], 
})
export class AdmissaoModule {}