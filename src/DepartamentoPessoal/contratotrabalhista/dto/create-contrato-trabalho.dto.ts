import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsInt } from 'class-validator';
import { TipoContratoTrabalho } from '../entities/contrato-trabalho.entity';

export class CreateContratoTrabalhoDto {
  @ApiProperty({ enum: TipoContratoTrabalho, description: 'Tipo de contrato do colaborador' })
  @IsEnum(TipoContratoTrabalho)
  tipo!: TipoContratoTrabalho;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  dataAdmissao!: string;

  @ApiPropertyOptional({ example: '2024-03-15' })
  @IsOptional()
  @IsDateString()
  dataFimExperiencia?: string;

  @ApiPropertyOptional({ example: '12345/001-6' })
  @IsOptional()
  @IsString()
  ctps?: string;

  @ApiPropertyOptional({ example: '12345678901' })
  @IsOptional()
  @IsString()
  pis?: string;

  @ApiPropertyOptional({ example: 1500.00 })
  @IsOptional()
  @IsNumber()
  salario?: number; 

  // MUDANÇA AQUI: Alterado de funcionarioId para admissaoId para casar com a nova regra do Back
  @ApiProperty({ example: 1, description: 'ID da admissão vinculada' })
  @IsInt({ message: 'O admissaoId deve ser um número inteiro' })
  admissaoId!: number;
}