import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dependente } from './entities/dependente.entity';
import { DependenteService } from './services/dependente.service';
import { DependenteController } from './controllers/dependente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dependente])],
  controllers: [DependenteController],
  providers: [DependenteService],
})
export class DependenteModule {}