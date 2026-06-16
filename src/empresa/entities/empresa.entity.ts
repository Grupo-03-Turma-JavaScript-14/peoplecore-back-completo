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

  @Column({ type: 'varchar', length: 255 })
  razaoSocial!: string;

  @Column({ type: 'varchar', length: 18 }) // CNPJ formatado tem 18 caracteres
  cnpj!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nomeFantasia!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  cnae!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logo!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  responsavelLegal!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string;

  // ======================
  // CONTROLE SAAS
  // ======================

  @Column({ type: 'boolean', default: true })
  ativa!: boolean;

  @Column({ type: 'boolean', default: false })
  bloqueada!: boolean;

  @Column({ type: 'boolean', default: false })
  emTrial!: boolean;

  // ======================
  // AUDITORIA
  // ======================

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // ======================
  // RELAÇÕES
  // ======================

  @OneToMany(() => Filial, (filial) => filial.empresa)
  filiais!: Filial[];

  @OneToMany(() => Contrato, (contrato) => contrato.empresa)
  contratos!: Contrato[];
}