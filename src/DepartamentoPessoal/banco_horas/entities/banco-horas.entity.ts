import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_banco_horas' })
export class BancoHoras {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  funcionarioId!: number;

  @Column({ type: 'date' })
  data!: string;

  @Column('decimal', { precision: 6, scale: 2 })
  horasTrabalhadas!: number;

  @Column('decimal', { precision: 6, scale: 2 })
  horasExtras!: number;

  @Column('decimal', { precision: 6, scale: 2 })
  saldo!: number;


  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo!: string; // crédito, débito, ajuste

  @Column({ type: 'varchar', length: 500, nullable: true })
  observacao!: string;
}