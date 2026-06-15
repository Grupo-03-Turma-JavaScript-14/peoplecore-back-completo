import { PartialType } from '@nestjs/swagger';
import { CreateAdvertenciaDto } from './create-advertencia.dto';

export class UpdateAdvertenciaDto extends PartialType(CreateAdvertenciaDto) {}