import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Empresa } from './empresa.entity';
import { Contrato } from './contrato.entity';

@Entity('tb_filial')
export class Filial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  cnpj?: string;

  @Column({ nullable: true })
  cidade?: string;

  @Column({ nullable: true })
  estado?: string;

  // ======================
  // SAAS CORE (OBRIGATÓRIO)
  // ======================

  @Column()
  empresaId!: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.filiais, {
    onDelete: 'CASCADE',
  })
  empresa!: Empresa;

  // ======================
  // RELAÇÕES
  // ======================

  @OneToMany(() => Contrato, (contrato) => contrato.filial)
  contratos!: Contrato[];
}