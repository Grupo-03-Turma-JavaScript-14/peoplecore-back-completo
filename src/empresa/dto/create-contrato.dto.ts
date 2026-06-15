export class CreateContratoDto {
  nome!: string;

  fornecedor?: string;

  valor?: number;

  dataInicio!: Date;

  dataFim?: Date;

  tipo!: 'SERVICO' | 'TREINAMENTO' | 'TERCEIRO';



  filialId?: number;
}