import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Empresa } from '../../empresa/entities/empresa.entity';
import { GlobalRole } from '../../common/enums/global-role.enum';
import { CompanyRole } from '../../common/enums/company-role.enum';

@Entity('tb_usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  usuario!: string;

  @Column()
  senha!: string;

  @Column({ default: true })
  mustChangePassword!: boolean;

  // 🌍 ROLE GLOBAL (plataforma SaaS)
  @Column({
    type: 'enum',
    enum: GlobalRole,
    nullable: true,
  })
  globalRole?: GlobalRole;

  // 🏢 ROLE DA EMPRESA
  @Column({
    type: 'enum',
    enum: CompanyRole,
    nullable: true,
  })
  companyRole?: CompanyRole;

  @Column({ nullable: true })
  empresaId?: number;

  @ManyToOne(() => Empresa)
  empresa?: Empresa;
}