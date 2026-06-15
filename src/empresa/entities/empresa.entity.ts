import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Filial } from './filial.entity';
import { Contrato } from './contrato.entity';

@Entity('tb_empresa')
export class Empresa {
  @PrimaryGeneratedColumn()
  id!: number;

  // ======================
  // DADOS PRINCIPAIS
  // ======================

  @Column()
  razaoSocial!: string;

  @Column()
  cnpj!: string;

  @Column({ nullable: true })
  nomeFantasia?: string;

  @Column({ nullable: true })
  cnae?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  responsavelLegal?: string;

  @Column({ nullable: true })
  email?: string;

  // ======================
  // CONTROLE SAAS (IMPORTANTE)
  // ======================

  @Column({ default: true })
  ativa!: boolean;

  @Column({ default: false })
  bloqueada!: boolean;

  @Column({ default: false })
  emTrial!: boolean;

  // ======================
  // AUDITORIA
  // ======================

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // ======================
  // RELAÇÕES
  // ======================

  @OneToMany(() => Filial, (filial) => filial.empresa)
  filiais!: Filial[];

  @OneToMany(() => Contrato, (contrato) => contrato.empresa)
  contratos!: Contrato[];
}