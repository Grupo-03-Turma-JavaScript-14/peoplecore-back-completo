import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean, IsArray } from 'class-validator';

export class CreateFuncaoDto {
  @ApiProperty({ example: 'Desenvolvedor Full Stack' })
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({ example: 'Pleno' })
  @IsOptional()
  @IsString()
  nivel?: string;

  @ApiPropertyOptional({ example: 5500 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salarioBaseSugerido?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @ApiPropertyOptional({ example: [1, 2], description: 'IDs das categorias (departamentos)' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoriaIds?: number[];
}