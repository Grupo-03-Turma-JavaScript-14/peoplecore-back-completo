import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from 'typeorm'; 
// Substituímos o import do Funcionário pelo da Admissão
import { Admissao } from '../../admissao/entities/admissao.entity'; 

export enum TipoContratoTrabalho { 
  CLT = 'CLT', 
  PJ = 'PJ', 
  ESTAGIO = 'ESTAGIO', 
  TEMPORARIO = 'TEMPORARIO', 
  APRENDIZ = 'APRENDIZ', 
} 

export enum StatusContratoTrabalho { 
  ATIVO = 'ATIVO', 
  ENCERRADO = 'ENCERRADO', 
  SUSPENSO = 'SUSPENSO', 
} 

@Entity({ name: 'tb_contrato_trabalho' }) 
export class ContratoTrabalho { 
  @PrimaryGeneratedColumn() 
  id!: number; 

  @Column({ type: 'enum', enum: TipoContratoTrabalho }) 
  tipo!: TipoContratoTrabalho; 

  @Column({ type: 'enum', enum: StatusContratoTrabalho, default: StatusContratoTrabalho.ATIVO }) 
  status!: StatusContratoTrabalho; 

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => typeof value === 'string' ? parseFloat(value) : value
    }
  }) 
  salario?: number; 

  @Column({ type: 'date' }) 
  dataAdmissao!: Date; 

  @Column({ type: 'date', nullable: true }) 
  dataFimExperiencia?: Date; 

  @Column({ type: 'date', nullable: true }) 
  dataRescisao?: Date; 

  @Column({ length: 255, nullable: true }) 
  motivoRescisao?: string; 

  @Column({ length: 20, nullable: true }) 
  ctps?: string; 

  @Column({ length: 20, nullable: true }) 
  pis?: string; 

  // 1. Mudamos a coluna física para armazenar o ID da Admissão
  @Column({ name: 'admissao_id' })
  admissaoId!: number;

  // 2. Criamos o relacionamento direto com a Admissão correspondente
  @OneToOne(() => Admissao) 
  @JoinColumn({ name: 'admissao_id' }) 
  admissao!: Admissao; 

  @CreateDateColumn() 
  criadoEm!: Date; 

  @UpdateDateColumn() 
  atualizadoEm!: Date; 
}