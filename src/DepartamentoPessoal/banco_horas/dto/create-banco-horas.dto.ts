import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateBancoHorasDto {
  @IsNotEmpty()
  @IsNumber()
  funcionarioId!: number;

  @IsNotEmpty()
  @IsDateString()
  data!: string;

  @IsNotEmpty()
  @IsNumber()
  horasTrabalhadas!: number;

  @IsNotEmpty()
  @IsNumber()
  horasExtras!: number;

  @IsNotEmpty()
  @IsNumber()
  saldo!: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}