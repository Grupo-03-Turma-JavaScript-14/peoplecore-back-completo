import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoSalarialDto } from './create-historico-salarial.dto';

export class UpdateHistoricoSalarialDto extends PartialType(CreateHistoricoSalarialDto) {}