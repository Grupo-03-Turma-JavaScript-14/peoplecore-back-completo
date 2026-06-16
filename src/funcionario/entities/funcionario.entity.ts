import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  AfterLoad,
} from 'typeorm';

import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from '../../rh/departamento/entities/categoria.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Admissao } from '../../DepartamentoPessoal/admissao/entities/admissao.entity';
import { Funcao } from '../../rh/funcao/entities/funcao.entity';

export enum StatusFuncionario {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

@Entity({ name: 'tb_funcionario' })
export class Funcionario {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  nome!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cargo!: string;

  @Column({ type: 'int', nullable: true })
  horasTrabalhadas!: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  salarioBase!: number;

  salarioTotal?: number;

  @AfterLoad()
  calcularSalarioVirtual() {
    this.salarioTotal =
      (this.horasTrabalhadas || 0) * (this.salarioBase || 0);
  }

  @Column({ type: 'int', name: 'admissao_id', nullable: true })
  admissaoId!: number;

  @OneToOne(() => Admissao, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'admissao_id' })
  admissao?: Admissao;

  @Column({ type: 'int', name: 'categoria_id', nullable: true })
  categoriaId!: number;

  @ManyToOne(
    () => Categoria,
    (categoria) => categoria.funcionarios,
    { nullable: true },
  )
  @JoinColumn({ name: 'categoria_id' })
  categoria?: Categoria;

  @Column({ type: 'int', name: 'funcao_id', nullable: true })
  funcaoId!: number;

  @ManyToOne(() => Funcao, { nullable: true })
  @JoinColumn({ name: 'funcao_id' })
  funcao?: Funcao;

  @Column({ type: 'int', nullable: true })
  empresaId!: number;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresaId' })
  empresa?: Empresa;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario?: Usuario;

  @IsOptional()
  @Column({ type: 'varchar', length: 50, nullable: true })
  matricula!: string;

  @IsOptional()
  @Column({ type: 'varchar', length: 14, nullable: true })
  cpf!: string;

  @Column({
    type: 'enum',
    enum: StatusFuncionario,
    default: StatusFuncionario.ATIVO,
  })
  status!: StatusFuncionario;
}