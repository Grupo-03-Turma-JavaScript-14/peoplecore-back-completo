import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertencia } from './entities/advertencia.entity';
import { AdvertenciaService } from './services/advertencia.service';
import { AdvertenciaController } from './controllers/advertencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Advertencia])],
  controllers: [AdvertenciaController],
  providers: [AdvertenciaService],
  exports: [AdvertenciaService],
})
export class AdvertenciaModule {}