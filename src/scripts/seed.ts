import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import * as bcrypt from 'bcryptjs';

import { GlobalRole } from '../common/enums/global-role.enum';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'peoplecore',
  entities: [Usuario],
  synchronize: false,
});

async function run() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Usuario);

  const email = 'admin@peoplecore.com.br';

  const exists = await repo.findOne({
    where: { usuario: email },
  });

  if (exists) {
    console.log('✅ SUPER ADMIN já existe');
    await AppDataSource.destroy();
    return;
  }

  const superAdmin = repo.create({
    nome: 'Super Administrador',
    usuario: email,
    senha: await bcrypt.hash('admin123', 10),

    // 🌍 identidade global do sistema
    globalRole: GlobalRole.SUPER_ADMIN,

    // 🔥 importante: NÃO pertence a empresa
    empresaId: undefined,

    mustChangePassword: true,
  });

  await repo.save(superAdmin);

  console.log('🚀 SUPER ADMIN criado com sucesso');
  console.log('📧', email);
  console.log('🔑 admin123');

  await AppDataSource.destroy();
}

run();