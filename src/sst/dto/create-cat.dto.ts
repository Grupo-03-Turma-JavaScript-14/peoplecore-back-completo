import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoCAT, GravidadeAcidente } from '../entities/cat.entity';

export class CreateCatDto {
  @ApiPropertyOptional({ enum: TipoCAT, default: TipoCAT.INICIAL })
  @IsOptional()
  @IsEnum(TipoCAT)
  tipo?: TipoCAT;  // ✅ agora opcional, default no service

  @ApiProperty({ enum: GravidadeAcidente })
  @IsEnum(GravidadeAcidente)
  gravidade!: GravidadeAcidente;

  @ApiProperty({ example: '2025-06-01T10:30:00' })
  @IsDateString()
  dataAcidente!: string;

  @ApiProperty({ example: 'Queda de nível ao descer escada' })
  @IsString()
  descricaoAcidente!: string;

  @ApiProperty({ example: 'Tornozelo direito' })
  @IsString()
  parteAtingida!: string;

  @ApiProperty({ example: 'Piso molhado' })
  @IsString()
  agenteCausador!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  localAcidente?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  planoAcao?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  dataAfastamento?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  urlDocumento?: string;  // ✅ adicionado

  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId!: number;
}