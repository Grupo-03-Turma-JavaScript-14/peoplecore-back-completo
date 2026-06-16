import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
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

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fornecedor!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  valor!: number;

  @Column({ type: 'timestamp' })
  dataInicio!: Date;

  @Column({ type: 'timestamp', nullable: true })
  dataFim!: Date;

  @Column({
    type: 'enum',
    enum: TipoContrato,
    default: TipoContrato.SERVICO,
  })
  tipo!: TipoContrato;


  @Column({ type: 'int', name: 'empresa_id' })
  empresaId!: number;

  @Column({ type: 'int', name: 'filial_id', nullable: true })
  filialId!: number;


  @ManyToOne(() => Empresa, (empresa) => empresa.contratos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @ManyToOne(() => Filial, (filial) => filial.contratos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'filial_id' })
  filial!: Filial;
}