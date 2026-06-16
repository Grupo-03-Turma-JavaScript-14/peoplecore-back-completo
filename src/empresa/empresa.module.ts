import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Empresa } from './entities/empresa.entity';
import { Filial } from './entities/filial.entity';
import { Contrato } from './entities/contrato.entity';

import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';


import { FilialService } from './Filial.Service';
import { FilialController } from './filial.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa, Filial, Contrato]),
  ],
  controllers: [EmpresaController, FilialController], 
  providers: [EmpresaService, FilialService],         
  exports: [EmpresaService, FilialService],           
})
export class EmpresaModule {}