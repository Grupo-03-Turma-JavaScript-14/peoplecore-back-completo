// src/ia.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IaController } from './controllers/ia.controller';
import { IaService } from './services/ia.service';

@Module({
  imports: [HttpModule],
  controllers: [IaController],
  providers: [IaService],
  exports: [IaService],
})
export class IaModule {}