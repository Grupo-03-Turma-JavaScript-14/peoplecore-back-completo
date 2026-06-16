import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_historico_salarial' })
export class HistoricoSalarial {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  funcionarioId!: number;

  @Column({ type: 'date' })
  dataAlteracao!: string;

  salarioAnterior!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  salarioNovo!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  motivo!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observacao!: string;
}