import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsOptional,
  IsPositive, IsString, MaxLength, IsArray, IsInt,
} from 'class-validator';

export class CreateFuncionarioDto {
  @ApiProperty({ example: 'Maria Souza' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nome!: string;

  // Campos de Relacionamento (ESSENCIAL PARA A CORREÇÃO)
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  departamentoId?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsNumber()
  funcaoId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID da admissão vinculada' })
  @IsOptional()
  @IsInt()
  admissaoId?: number;

  @ApiPropertyOptional({ example: 'Desenvolvedora' })
  @IsOptional()
  @IsString()
  cargo?: string;

  @ApiPropertyOptional({ example: 160 })
  @IsOptional()
  @IsNumber()
  horasTrabalhadas?: number;

  @ApiPropertyOptional({ example: 25.50 })
  @IsOptional()
  @IsNumber()
  salarioBase?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  usuarioId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  categoriaId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  empresaId?: number;

  // ========== ABA 1: DADOS PESSOAIS ==========
  @IsOptional() @IsString() matricula?: string;
  @IsOptional() @IsString() cpf?: string;
  @IsOptional() @IsString() rg?: string;
  @IsOptional() @IsString() orgaoEmissor?: string;
  @IsOptional() @IsString() dataEmissaoRg?: string;
  @IsOptional() @IsString() dataNascimento?: string;
  @IsOptional() @IsString() estadoCivil?: string;
  @IsOptional() @IsString() nacionalidade?: string;
  @IsOptional() @IsString() naturalidade?: string;

  // ========== ABA 2: ENDEREÇO E CONTATO ==========
  @IsOptional() @IsString() cep?: string;
  @IsOptional() @IsString() logradouro?: string;
  @IsOptional() @IsString() numero?: string;
  @IsOptional() @IsString() complemento?: string;
  @IsOptional() @IsString() bairro?: string;
  @IsOptional() @IsString() cidade?: string;
  @IsOptional() @IsString() uf?: string;
  @IsOptional() @IsString() telefone?: string;
  @IsOptional() @IsString() email?: string;

  // ========== ABA 3: DADOS TRABALHISTAS ==========
  @IsOptional() @IsString() dataAdmissao?: string;
  @IsOptional() @IsString() tipoContrato?: string;
  @IsOptional() @IsString() banco?: string;
  @IsOptional() @IsString() agencia?: string;
  @IsOptional() @IsString() conta?: string;
  @IsOptional() @IsString() tipoConta?: string;

  // ========== ABA 4: DADOS SST ==========
  @IsOptional() @IsString() tamanhoCamisa?: string;
  @IsOptional() @IsString() tamanhoCalca?: string;
  @IsOptional() @IsString() tamanhoBota?: string;
  @IsOptional() @IsString() tamanhoLuva?: string;
  
  @ApiPropertyOptional({ example: ['Ruído', 'Calor'] })
  @IsOptional()
  @IsArray()
  fatoresRisco?: string[];

  // ========== ABA 5: DOCUMENTOS ADICIONAIS ==========
  @IsOptional() @IsString() pis?: string;
  @IsOptional() @IsString() ctpsNumero?: string;
  @IsOptional() @IsString() ctpsSerie?: string;
}