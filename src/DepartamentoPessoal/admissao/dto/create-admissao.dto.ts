import { 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsDateString, 
  IsOptional, 
  IsDecimal,
  Min 
} from 'class-validator';

export class CreateAdmissaoDto {
  @IsNotEmpty({ message: 'O nome completo é obrigatório.' })
  @IsString()
  nomeCompleto!: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @IsString()
  cpf!: string;

  @IsNotEmpty({ message: 'A data de admissão é obrigatória.' })
  @IsDateString()
  dataAdmissao!: string;

  @IsNotEmpty({ message: 'O cargo é obrigatório.' })
  @IsNumber()
  @Min(1)
  cargoId!: number;

  @IsNotEmpty({ message: 'O salário é obrigatório.' })
  @IsNumber()
  @Min(0, { message: 'O salário deve ser um valor positivo.' })
  salario!: number;

  @IsNotEmpty({ message: 'O departamento é obrigatório.' })
  @IsNumber()
  @Min(1)
  departamentoId!: number;

  @IsOptional()
  @IsString()
  tipoContrato?: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}