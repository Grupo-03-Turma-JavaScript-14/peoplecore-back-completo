import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../../funcionario/entities/funcionario.entity';

export enum StatusFolha {
  RASCUNHO   = 'RASCUNHO',
  PROCESSADA = 'PROCESSADA',
  PAGA       = 'PAGA',
}

@Entity({ name: 'tb_folha_pagamento' })
export class FolhaPagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mes!: number;

  @Column()
  ano!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  salarioBruto!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  descontoINSS!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  descontoIRRF!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  descontoFaltas!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  adicionalHorasExtras!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  adicionalInsalubridade!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  adicionalPericulosidade!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  outrosDescontos!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  outrosAcrescimos!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  salarioLiquido!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  fgts!: number;

  @Column({ type: 'enum', enum: StatusFolha, default: StatusFolha.RASCUNHO })
  status!: StatusFolha;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observacao!: string;

  @CreateDateColumn()
  criadoEm!: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;
}