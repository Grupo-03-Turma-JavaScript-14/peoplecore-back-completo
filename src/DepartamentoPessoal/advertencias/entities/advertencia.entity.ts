import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_advertencia' })
export class Advertencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  funcionarioId!: number;

  @Column()
  motivo!: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ type: 'date' })
  data!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}