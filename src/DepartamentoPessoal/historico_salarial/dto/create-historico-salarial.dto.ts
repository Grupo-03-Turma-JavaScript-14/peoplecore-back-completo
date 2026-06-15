import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateHistoricoSalarialDto {
  @IsNotEmpty()
  @IsNumber()
  funcionarioId!: number;

  @IsNotEmpty()
  @IsDateString()
  dataAlteracao!: string;

  @IsNotEmpty()
  @IsNumber()
  salarioAnterior!: number;

  @IsNotEmpty()
  @IsNumber()
  salarioNovo!: number;

  @IsOptional()
  @IsString()
  motivo?: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}