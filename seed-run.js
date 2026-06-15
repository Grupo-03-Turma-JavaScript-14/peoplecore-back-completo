import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './dist/usuario/entities/usuario.entity.js';
import bcrypt from 'bcryptjs';

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

  const exists = await repo.findOne({ where: { usuario: email } });

  if (exists) {
    console.log('Admin já existe');
    return;
  }

  const admin = repo.create({
    nome: 'Administrador Master',
    usuario: email,
    senha: await bcrypt.hash('admin123', 10),
    role: 'ADMIN',
    mustChangePassword: true,
  });

  await repo.save(admin);

  console.log('Admin criado com sucesso');
  console.log(email);
  console.log('admin123');

  await AppDataSource.destroy();
}

run();