import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsOptional,
  IsPositive, IsString, MaxLength,
} from 'class-validator';

export class CreateFuncionarioDto {
  @ApiProperty({ example: 'Maria Souza' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nome!: string;

  @ApiProperty({ example: 'Desenvolvedora Backend' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cargo!: string;

  @ApiProperty({ example: 160 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  horasTrabalhadas!: number;

  @ApiProperty({ example: 25.50 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  salarioBase!: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  usuarioId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  categoriaId?: number;

  // ========== NOVOS CAMPOS OPCIONAIS ==========
  @ApiPropertyOptional({ example: '12345' })
  @IsOptional()
  @IsString()
  matricula?: string;

  @ApiPropertyOptional({ example: '123.456.789-00' })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiPropertyOptional({ example: '12.345.678-9' })
  @IsOptional()
  @IsString()
  rg?: string;

  @ApiPropertyOptional({ example: '1990-01-01' })
  @IsOptional()
  @IsString()
  dataNascimento?: string;

  @ApiPropertyOptional({ example: 'Rua Exemplo, 123' })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiPropertyOptional({ example: '(11) 99999-9999' })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({ example: 'usuario@email.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '12345678901' })
  @IsOptional()
  @IsString()
  pis?: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsOptional()
  @IsString()
  ctpsNumero?: string;

  @ApiPropertyOptional({ example: '1234' })
  @IsOptional()
  @IsString()
  ctpsSerie?: string;

  @ApiPropertyOptional({ example: 'SOLTEIRO' })
  @IsOptional()
  @IsString()
  estadoCivil?: string;

  @ApiPropertyOptional({ example: 'Brasileira' })
  @IsOptional()
  @IsString()
  nacionalidade?: string;

  @ApiPropertyOptional({ example: 'São Paulo/SP' })
  @IsOptional()
  @IsString()
  naturalidade?: string;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional()
  @IsString()
  dataAdmissao?: string;

  @ApiPropertyOptional({ example: 'CLT' })
  @IsOptional()
  @IsString()
  tipoContrato?: string;

  @ApiPropertyOptional({ example: '001' })
  @IsOptional()
  @IsString()
  banco?: string;

  @ApiPropertyOptional({ example: '1234-5' })
  @IsOptional()
  @IsString()
  agencia?: string;

  @ApiPropertyOptional({ example: '123456-7' })
  @IsOptional()
  @IsString()
  conta?: string;

  @ApiPropertyOptional({ example: 'CORRENTE' })
  @IsOptional()
  @IsString()
  tipoConta?: string;
}