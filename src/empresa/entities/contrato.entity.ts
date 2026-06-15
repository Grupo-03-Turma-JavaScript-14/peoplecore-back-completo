import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Empresa } from './empresa.entity';
import { Filial } from './filial.entity';

export enum TipoContrato {
  SERVICO = 'SERVICO',
  TREINAMENTO = 'TREINAMENTO',
  TERCEIRO = 'TERCEIRO',
}

@Entity('tb_contrato')
export class Contrato {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  fornecedor?: string;

  @Column('decimal', { nullable: true })
  valor?: number;

  @Column({ type: 'datetime' })
  dataInicio!: Date;

  @Column({ type: 'datetime', nullable: true })
  dataFim?: Date;

  @Column({
    type: 'enum',
    enum: TipoContrato,
    default: TipoContrato.SERVICO,
  })
  tipo!: TipoContrato;

  // ======================
  // SAAS CORE
  // ======================

  @Column()
  empresaId!: number;

  @Column({ nullable: true })
  filialId?: number;

  // ======================
  // RELAÇÕES
  // ======================

  @ManyToOne(() => Empresa, (empresa) => empresa.contratos, {
    onDelete: 'CASCADE',
  })
  empresa!: Empresa;

  @ManyToOne(() => Filial, (filial) => filial.contratos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  filial?: Filial;
}