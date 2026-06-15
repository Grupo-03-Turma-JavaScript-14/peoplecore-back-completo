import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { GlobalRole } from "../../common/enums/global-role.enum";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async vincularEmpresa(id: number, empresaId: number, novoEmail?: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    
    // Se um novo email for enviado, atualizamos (Lógica de substituição de identidade)
    if (novoEmail) {
      usuario.usuario = novoEmail.trim().toLowerCase();
    }
    
    usuario.empresaId = empresaId;
    return await this.usuarioRepository.save(usuario);
  }

  async countAll(): Promise<number> {
    return await this.usuarioRepository.count();
  }

  async findAll(user: Usuario): Promise<Usuario[]> {
    if (user.globalRole === GlobalRole.SUPER_ADMIN) return this.usuarioRepository.find();
    return this.usuarioRepository.find({ where: { empresaId: user.empresaId } });
  }

  async findById(id: number, user?: Usuario): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    return usuario;
  }

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { usuario: usuario.trim().toLowerCase() } });
  }

  async findByUsuarioWithPassword(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { usuario: usuario.trim().toLowerCase() },
      select: ["id", "nome", "usuario", "senha", "globalRole", "companyRole", "mustChangePassword", "empresaId"],
    });
  }

  async findByIdWithPassword(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { id },
      select: ["id", "nome", "usuario", "senha", "globalRole", "companyRole", "mustChangePassword", "empresaId"],
    });
  }

  async updatePasswordAndClearFlag(id: number, senha: string): Promise<void> {
    const senhaHash = await bcrypt.hash(senha, 10);
    await this.usuarioRepository.update(id, { senha: senhaHash, mustChangePassword: false });
  }

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    const cleanEmail = usuario.usuario!.trim().toLowerCase();
    const exists = await this.findByUsuario(cleanEmail);
    if (exists) throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);

    const senhaHash = await bcrypt.hash(usuario.senha!, 10);
    return this.usuarioRepository.save({ ...usuario, usuario: cleanEmail, senha: senhaHash });
  }

  async update(usuario: Partial<Usuario>, user?: Usuario): Promise<Usuario> {
    const existente = await this.findById(usuario.id!, user);
    if (usuario.senha) usuario.senha = await bcrypt.hash(usuario.senha, 10);
    return this.usuarioRepository.save({ ...existente, ...usuario });
  }

  async delete(id: number, user?: Usuario): Promise<DeleteResult> {
    return await this.usuarioRepository.delete(id);
  }
}