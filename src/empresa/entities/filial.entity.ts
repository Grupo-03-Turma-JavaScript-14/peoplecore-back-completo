import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Empresa } from './empresa.entity';
import { Contrato } from './contrato.entity';

@Entity('tb_filial')
export class Filial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 18, nullable: true })
  cnpj!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cidade!: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  estado!: string;

  // ======================
  // SAAS CORE (OBRIGATÓRIO)
  // ======================

  @Column({ type: 'int', name: 'empresa_id' })
  empresaId!: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.filiais, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  // ======================
  // RELAÇÕES
  // ======================

  @OneToMany(() => Contrato, (contrato) => contrato.filial)
  contratos!: Contrato[];
}