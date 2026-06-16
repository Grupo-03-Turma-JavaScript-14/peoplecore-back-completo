import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../../funcionario/entities/funcionario.entity';

export enum TipoMovimentacao {
  PROMOCAO      = 'PROMOCAO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  REBAIXAMENTO  = 'REBAIXAMENTO',
  MUDANCA_CARGO = 'MUDANCA_CARGO',
}

@Entity({ name: 'tb_promocao' })
export class Promocao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: TipoMovimentacao })
  tipo!: TipoMovimentacao;

  @Column({ length: 255 })
  cargoAnterior!: string;

  @Column({ length: 255 })
  cargoNovo!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salarioAnterior!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  salarioNovo!: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  motivo!: string;

  @CreateDateColumn()
  dataMovimentacao!: Date;

  @ManyToOne(() => Funcionario, { eager: true })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;
}