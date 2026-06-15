import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'Empresa Exemplo LTDA' })
  @IsNotEmpty()
  @IsString()
  razaoSocial!: string;

  @ApiPropertyOptional({ example: 'Empresa Exemplo' })
  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsNotEmpty()
  @IsString()
  @Length(14, 18)
  cnpj!: string;

  @ApiPropertyOptional({ example: '62.01-5-01' })
  @IsOptional()
  @IsString()
  cnae?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ example: 'João Silva' })
  @IsOptional()
  @IsString()
  responsavelLegal?: string;

  @ApiPropertyOptional({ example: 'contato@empresa.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}