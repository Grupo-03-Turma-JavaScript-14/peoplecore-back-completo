import { PartialType } from '@nestjs/mapped-types';
import { CreateAdmissaoDto } from './create-admissao.dto';

export class UpdateAdmissaoDto extends PartialType(CreateAdmissaoDto) {}