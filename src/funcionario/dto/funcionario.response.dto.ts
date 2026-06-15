import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FuncionarioResponseDto {
  @ApiProperty() id!: number;
  @ApiProperty() nome!: string;

  // Relacionamentos Expostos
  @ApiPropertyOptional() departamentoId?: number;
  @ApiPropertyOptional() funcaoId?: number;
  @ApiPropertyOptional() categoriaId?: number;
  @ApiPropertyOptional() empresaId?: number;

  @ApiProperty() cargo!: string;
  @ApiProperty() horasTrabalhadas!: number;
  @ApiProperty() salarioBase!: number;
  @ApiPropertyOptional() salarioTotal?: number;

  // Dados Pessoais e profissionais
  @ApiPropertyOptional() matricula?: string;
  @ApiPropertyOptional() cpf?: string;
  @ApiPropertyOptional() status?: string;
  @ApiPropertyOptional() email?: string;
  @ApiPropertyOptional() telefone?: string;
  @ApiPropertyOptional() dataAdmissao?: string;
  @ApiPropertyOptional() tipoContrato?: string;

  // SST E EPIs
  @ApiPropertyOptional({ type: [String] }) fatoresRisco?: string[];
}