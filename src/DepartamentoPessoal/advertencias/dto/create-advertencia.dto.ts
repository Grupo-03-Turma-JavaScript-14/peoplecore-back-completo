import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAdvertenciaDto {

  @IsNotEmpty()
  @IsString()
  motivo!: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsString()
  gravidade!: 'LEVE' | 'MEDIA' | 'GRAVE';

  @IsNotEmpty()
  @IsString()
  data!: string;

  @IsNotEmpty()
  @IsNumber()
  funcionarioId!: number;

  @IsOptional()
  @IsNumber()
  usuarioId?: number;
}