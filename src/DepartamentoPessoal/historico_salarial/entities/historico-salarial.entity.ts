import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_historico_salarial' })
export class HistoricoSalarial {
  @Column({ primary: true, generated: true })
  id!: number;

  @Column()
  funcionarioId!: number;

  @Column({ type: 'date' })
  dataAlteracao!: string;

  @Column('float')
  salarioAnterior!: number;

  @Column('float')
  salarioNovo!: number;

  @Column({ nullable: true })
  motivo?: string;

  @Column({ nullable: true })
  observacao?: string;
}