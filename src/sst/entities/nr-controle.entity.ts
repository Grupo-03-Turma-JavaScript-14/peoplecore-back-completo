import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum StatusNR {
  CONFORME     = 'CONFORME',
  NAO_CONFORME = 'NAO_CONFORME',
  EM_ADEQUACAO = 'EM_ADEQUACAO',
  NAO_APLICAVEL = 'NAO_APLICAVEL',
}

@Entity({ name: 'tb_nr_controle' })
export class NrControle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  numero!: string;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'enum', enum: StatusNR, default: StatusNR.NAO_CONFORME })
  status!: StatusNR;

  @Column({ type: 'varchar', length: 500, nullable: true })
  descricaoNaoConformidade!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  planoAcao!: string;

  @Column({ type: 'date', nullable: true })
  prazoAdequacao!: Date;

  @Column({ type: 'date', nullable: true })
  dataUltimaAuditoria!: Date;

  @Column({ type: 'date', nullable: true })
  dataProximaAuditoria!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  responsavel!: string;

  @Column({ default: false })
  aplicavelEmpresa!: boolean;

  @CreateDateColumn()
  criadoEm!: Date;

  @UpdateDateColumn()
  atualizadoEm!: Date;
}