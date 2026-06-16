import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_dependente' })
export class Dependente {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  parentesco!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone!: string;

  @Column({ type: 'date', nullable: true })
  dataNascimento!: string;

  @Column()
  funcionarioId!: number;
}