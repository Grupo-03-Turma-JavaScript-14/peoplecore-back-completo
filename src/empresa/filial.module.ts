import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filial } from './entities/filial.entity'; // Certifique-se que o caminho está correto
import { FilialController } from './filial.controller';
import { FilialService } from './Filial.Service';

@Module({
  imports: [TypeOrmModule.forFeature([Filial])],
  controllers: [FilialController], // Isso cria a rota /filial
  providers: [FilialService],
  exports: [FilialService],
})
export class FilialModule {}