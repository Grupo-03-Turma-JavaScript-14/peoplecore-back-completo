import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Empresa } from '../../empresa/entities/empresa.entity';
import { GlobalRole } from '../../common/enums/global-role.enum';
import { CompanyRole } from '../../common/enums/company-role.enum';

@Entity('tb_usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  nome!: string;

  @Column({ type: 'varchar', length: 100 })
  usuario!: string;

  @Column({ type: 'varchar', length: 255 })
  senha!: string;

  @Column({ default: true })
  mustChangePassword!: boolean;

  @Column({
    type: 'enum',
    enum: GlobalRole,
    nullable: true,
  })
  globalRole!: GlobalRole;

  @Column({
    type: 'enum',
    enum: CompanyRole,
    nullable: true,
  })
  companyRole!: CompanyRole;

  @Column({ type: 'int', name: 'empresa_id', nullable: true })
  empresaId!: number;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa?: Empresa;
}