import { PartialType } from '@nestjs/mapped-types';
import { CreateBancoHorasDto } from './create-banco-horas.dto';

export class UpdateBancoHorasDto extends PartialType(CreateBancoHorasDto) {}