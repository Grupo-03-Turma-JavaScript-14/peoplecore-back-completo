import { PartialType } from '@nestjs/swagger';
import { CreateContratoTrabalhoDto } from './create-contrato-trabalho.dto';

export class UpdateContratoTrabalhoDto extends PartialType(CreateContratoTrabalhoDto) {}