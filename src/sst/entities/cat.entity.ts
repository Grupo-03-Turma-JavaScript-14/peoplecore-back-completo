import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum TipoCAT {
  INICIAL = 'INICIAL',
  REABERTURA = 'REABERTURA',
  COMUNICACAO_OBITO = 'COMUNICACAO_OBITO',
}

export enum GravidadeAcidente {
  LEVE = 'LEVE',
  GRAVE = 'GRAVE',
  FATAL = 'FATAL',
}

@Entity({ name: 'tb_cat' })
export class Cat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: TipoCAT, default: TipoCAT.INICIAL })
  tipo!: TipoCAT;

  @Column({ type: 'enum', enum: GravidadeAcidente })
  gravidade!: GravidadeAcidente;

  @Column({ type: 'timestamp' })
  dataAcidente!: Date;

  @Column({ type: 'varchar', length: 500 })
  descricaoAcidente!: string;

  @Column({ type: 'varchar', length: 255 })
  parteAtingida!: string;

  @Column({ type: 'varchar', length: 255 })
  agenteCausador!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  localAcidente!: string;

  @Column({ type: 'boolean', default: false })
  enviadoEsocial!: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  protocoloEsocial!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  planoAcao!: string;

  @Column({ type: 'date', nullable: true })
  dataAfastamento!: Date | null; 

  @Column({ type: 'date', nullable: true })
  dataRetorno!: Date | null; 

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  urlDocumento!: string;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;
}