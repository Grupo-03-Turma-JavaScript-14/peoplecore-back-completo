import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Categoria } from '../../departamento/entities/categoria.entity';

@Entity('tb_funcao')
export class Funcao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, unique: true })
  nome!: string;

  @Column({ type: 'text', nullable: true })
  descricao!: string;

  @Column({ length: 50, nullable: true })
  nivel!: string; // Junior, Pleno, Senior, Especialista, Gerente

  @Column('float', { nullable: true })
  salarioBaseSugerido!: number;

  @Column({ default: true })
  ativo!: boolean;

  @CreateDateColumn()
  criadoEm!: Date;

  @UpdateDateColumn()
  atualizadoEm!: Date;

  // Relacionamento com categorias
  @ManyToMany(() => Categoria)
  @JoinTable({
    name: 'tb_categoria_funcao',
    joinColumn: { name: 'funcao_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoria_id', referencedColumnName: 'id' },
  })
  categorias!: Categoria[];
}