import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_afastamento' })
export class Afastamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  funcionarioId!: number;

  @Column()
  tipo!: string;

  @Column({ type: 'date' })
  dataInicio!: string;

  @Column({ type: 'date', nullable: true })
  dataFim!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  motivo!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}