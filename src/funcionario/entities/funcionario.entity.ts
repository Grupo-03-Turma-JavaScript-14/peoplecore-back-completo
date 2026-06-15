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
  @Column({ length: 255, nullable: false })
  nome!: string;

  @Column({ length: 255, nullable: true })
  cargo?: string;

  @Column({ nullable: true })
  horasTrabalhadas?: number;

  @Column('float', { nullable: true })
  salarioBase?: number;

  salarioTotal?: number;

  @AfterLoad()
  calcularSalarioVirtual() {
    this.salarioTotal =
      (this.horasTrabalhadas || 0) * (this.salarioBase || 0);
  }

  // Relacionamentos e Chaves Estrangeiras

  @Column({ name: 'admissao_id', nullable: true })
  admissaoId?: number;

  @OneToOne(() => Admissao, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'admissao_id' })
  admissao?: Admissao;

  @Column({ name: 'categoria_id', nullable: true })
  categoriaId?: number;

  @ManyToOne(
    () => Categoria,
    (categoria) => categoria.funcionarios,
    { nullable: true },
  )
  @JoinColumn({ name: 'categoria_id' })
  categoria?: Categoria;

  @Column({ name: 'funcao_id', nullable: true })
  funcaoId?: number;

  @ManyToOne(() => Funcao, { nullable: true })
  @JoinColumn({ name: 'funcao_id' })
  funcao?: Funcao;

  @Column({ nullable: true })
  empresaId?: number;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresaId' })
  empresa?: Empresa;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario?: Usuario;

  // Demais campos

  @IsOptional()
  @Column({ nullable: true })
  matricula?: string;

  @IsOptional()
  @Column({ nullable: true })
  cpf?: string;

  @Column({
    type: 'enum',
    enum: StatusFuncionario,
    default: StatusFuncionario.ATIVO,
  })
  status!: StatusFuncionario;
}