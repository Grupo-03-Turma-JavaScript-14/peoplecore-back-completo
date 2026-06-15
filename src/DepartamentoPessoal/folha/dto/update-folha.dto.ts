import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFolhaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  salarioBruto?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  salarioLiquido?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observacao?: string;
}