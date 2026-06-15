import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_banco_horas' })
export class BancoHoras {
  @Column({ primary: true, generated: true })
  id!: number;

  @Column()
  funcionarioId!: number;

  @Column({ type: 'date' })
  data!: string;

  @Column('float')
  horasTrabalhadas!: number;

  @Column('float')
  horasExtras!: number;

  @Column('float')
  saldo!: number;

  @Column({ nullable: true })
  tipo!: string; // crédito, débito, ajuste

  @Column({ nullable: true })
  observacao?: string;
}