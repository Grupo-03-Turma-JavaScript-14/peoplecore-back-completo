import { Column, Entity } from 'typeorm';
import { Funcionario } from '../../../funcionario/entities/funcionario.entity';

@Entity({ name: 'tb_dependente' })
export class Dependente {
  @Column({ primary: true, generated: true })
  id!: number;

  @Column()
  nome!: string;

  @Column()
  parentesco!: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ type: 'date', nullable: true })
  dataNascimento?: string;

  @Column()
  funcionarioId!: number;
}