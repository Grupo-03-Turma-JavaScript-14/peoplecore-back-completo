import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity({ name: 'tb_admissao' })
export class Admissao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nomeCompleto!: string;

  @Column({ length: 14, unique: true })
  cpf!: string;

  @Column({ type: 'date' })
  dataAdmissao!: string;

  @Column()
  cargoId!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  salario!: number;

  @Column()
  departamentoId!: number;

  @Column({ nullable: true, length: 50 })
  tipoContrato?: string;

  @Column({ nullable: true, type: 'text' })
  observacao?: string;

 
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}