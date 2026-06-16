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
import { Empresa } from "../../../empresa/entities/empresa.entity"; 

@Entity({ name: "tb_categoria" })
export class Categoria {

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ type: "varchar", length: 255 })
  departamento!: string;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.categoria)
  funcionarios!: Funcionario[];

  @Column({ type: "int", name: "empresa_id", nullable: true })
  empresaId!: number;

  @ManyToOne(() => Empresa, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'empresa_id' }) 
  empresa?: Empresa;
}