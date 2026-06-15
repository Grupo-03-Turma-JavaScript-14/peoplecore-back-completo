import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_afastamento' })
export class Afastamento {
  @Column({ primary: true, generated: true })
  id!: number;

  @Column()
  tipo!: string;

  @Column()
  dataInicio!: string;

  @Column({ nullable: true })
  dataFim?: string;

  @Column({ nullable: true })
  motivo?: string;

  @Column()
  funcionarioId!: number;
}