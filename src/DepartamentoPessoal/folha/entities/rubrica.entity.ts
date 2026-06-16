import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FolhaPagamento } from './folha-pagamento.entity';

export enum TipoRubrica {
  PROVENTO  = 'PROVENTO',
  DESCONTO  = 'DESCONTO',
}

@Entity({ name: 'tb_rubrica' })
export class Rubrica {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  descricao!: string;

  @Column({ type: 'enum', enum: TipoRubrica })
  tipo!: TipoRubrica;

  @Column('decimal', { precision: 10, scale: 2 })
  valor!: number;

  @ManyToOne(() => FolhaPagamento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'folha_id' })
  folha!: FolhaPagamento;
}