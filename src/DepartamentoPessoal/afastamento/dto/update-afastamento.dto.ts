import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvertenciaDto } from './create-afastamento.dto';

export class UpdateAdvertenciaDto extends PartialType(CreateAdvertenciaDto) {}