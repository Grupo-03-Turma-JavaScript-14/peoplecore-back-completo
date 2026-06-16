import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum TipoLaudo {
  PGR                   = 'PGR',
  PCMSO                 = 'PCMSO',
  LTCAT                 = 'LTCAT',
  INSALUBRIDADE         = 'INSALUBRIDADE',
  PERICULOSIDADE        = 'PERICULOSIDADE',
  ERGONOMIA_AET         = 'ERGONOMIA_AET',
  PPP                   = 'PPP',
  APR                   = 'APR',
  PCA                   = 'PCA',
  OUTROS                = 'OUTROS',
}

export enum StatusLaudo {
  VIGENTE   = 'VIGENTE',
  VENCIDO   = 'VENCIDO',
  RENOVACAO = 'RENOVACAO',
}

@Entity({ name: 'tb_laudo' })
export class Laudo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: TipoLaudo })
  tipo!: TipoLaudo;

  @Column({ type: 'enum', enum: StatusLaudo, default: StatusLaudo.VIGENTE })
  status!: StatusLaudo;

  @Column({ type: 'varchar', length: 255 })
  responsavelTecnico!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  crea!: string;

  @Column({ type: 'date' })
  dataEmissao!: Date;

  @Column({ type: 'date' })
  dataVencimento!: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  descricao!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  urlDocumento!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nrRelacionada!: string;

  @CreateDateColumn()
  criadoEm!: Date;

  @UpdateDateColumn()
  atualizadoEm!: Date;

  @ManyToOne(() => Funcionario, { nullable: true })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;
}