import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from '../../departamento/entities/categoria.entity';

@Entity({ name: 'tb_funcionario' })
export class Funcionario {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome!: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  cargo!: string;

  @IsNotEmpty()
  @Column()
  horasTrabalhadas!: number;

  @IsNotEmpty()
  @Column('float')
  salarioBase!: number;

  salarioTotal?: number;

  // ========== NOVOS CAMPOS ==========
  @IsOptional()
  @Column({ length: 20, nullable: true })
  matricula?: string;

  @IsOptional()
  @Column({ length: 14, nullable: true })
  cpf?: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  rg?: string;

  @IsOptional()
  @Column({ type: 'date', nullable: true })
  dataNascimento?: string;

  @IsOptional()
  @Column({ length: 255, nullable: true })
  endereco?: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  telefone?: string;

  @IsOptional()
  @Column({ length: 255, nullable: true })
  email?: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  pis?: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  ctpsNumero?: string;

  @IsOptional()
  @Column({ length: 10, nullable: true })
  ctpsSerie?: string;

  @IsOptional()
  @Column({ length: 50, nullable: true })
  estadoCivil?: string;

  @IsOptional()
  @Column({ length: 50, nullable: true })
  nacionalidade?: string;

  @IsOptional()
  @Column({ length: 100, nullable: true })
  naturalidade?: string;

  @IsOptional()
  @Column({ type: 'date', nullable: true })
  dataAdmissao?: string;

  @IsOptional()
  @Column({ length: 50, nullable: true })
  tipoContrato?: string;

  @IsOptional()
  @Column({ length: 50, nullable: true })
  banco?: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  agencia?: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  conta?: string;

  @IsOptional()
  @Column({ length: 30, nullable: true })
  tipoConta?: string;

  @IsOptional()
  @Column({ length: 10, nullable: true })
  tamanhoCamisa?: string;

  @IsOptional()
  @Column({ length: 10, nullable: true })
  tamanhoCalca?: string;

  @IsOptional()
  @Column({ length: 10, nullable: true })
  tamanhoBota?: string;

  @IsOptional()
  @Column({ length: 10, nullable: true })
  tamanhoLuva?: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  fatoresRisco?: string[];

  @IsOptional()
  @Column({ length: 50, nullable: true })
  status?: string;

  // ========== RELACIONAMENTOS ==========
  @ManyToOne(() => Usuario, (usuario) => usuario.funcionarios)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.funcionarios)
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;
}