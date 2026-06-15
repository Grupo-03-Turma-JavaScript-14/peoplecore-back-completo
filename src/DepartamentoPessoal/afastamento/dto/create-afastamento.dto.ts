import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateAdvertenciaDto {
  @IsNotEmpty()
  @IsString()
  motivo!: string;

  @IsNotEmpty()
  @IsString()
  tipo!: string; // leve, média, grave

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsNotEmpty()
  @IsDateString()
  data!: string;

  @IsNotEmpty()
  @IsNumber()
  funcionarioId!: number;
}