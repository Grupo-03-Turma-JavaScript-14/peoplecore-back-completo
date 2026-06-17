import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { Funcionario } from "../../../funcionario/entities/funcionario.entity";

@Entity({ name: "tb_categoria" })
export class Categoria {

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255 })
  departamento!: string;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.categoria)
  funcionarios!: Funcionario[];

  @Column({ nullable: true })
  empresaId?: number;

  @ManyToOne('Empresa', 'categorias', {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'empresaId' })
  empresa?: any;
}