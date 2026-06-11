import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Funcao } from '../entities/funcao.entity';
import { Categoria } from '../../departamento/entities/categoria.entity';
import { CreateFuncaoDto } from '../dto/create-funcao.dto';
import { UpdateFuncaoDto } from '../dto/update-funcao.dto';

@Injectable()
export class FuncaoService {
  constructor(
    @InjectRepository(Funcao)
    private funcaoRepository: Repository<Funcao>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Funcao[]> {
    return this.funcaoRepository.find({
      where: { ativo: true },
      relations: ['categorias'],
      order: { nome: 'ASC' },
    });
  }

  async findById(id: number): Promise<Funcao> {
    const funcao = await this.funcaoRepository.findOne({
      where: { id },
      relations: ['categorias'],
    });
    if (!funcao) {
      throw new HttpException('Função não encontrada', HttpStatus.NOT_FOUND);
    }
    return funcao;
  }

  async findByCategoria(categoriaId: number): Promise<Funcao[]> {
    return this.funcaoRepository
      .createQueryBuilder('funcao')
      .leftJoinAndSelect('funcao.categorias', 'categoria')
      .where('categoria.id = :categoriaId', { categoriaId })
      .andWhere('funcao.ativo = :ativo', { ativo: true })
      .orderBy('funcao.nome', 'ASC')
      .getMany();
  }

  async findByNome(nome: string, categoriaId?: number): Promise<Funcao[]> {
    const query = this.funcaoRepository
      .createQueryBuilder('funcao')
      .leftJoinAndSelect('funcao.categorias', 'categoria')
      .where('funcao.nome LIKE :nome', { nome: `%${nome}%` })
      .andWhere('funcao.ativo = :ativo', { ativo: true });

    if (categoriaId) {
      query.andWhere('categoria.id = :categoriaId', { categoriaId });
    }

    return query.orderBy('funcao.nome', 'ASC').getMany();
  }

  async create(dto: CreateFuncaoDto): Promise<Funcao> {
    const existe = await this.funcaoRepository.findOne({
      where: { nome: dto.nome },
    });
    
    if (existe) {
      throw new HttpException('Já existe uma função com este nome', HttpStatus.CONFLICT);
    }

    const funcao = this.funcaoRepository.create({
      nome: dto.nome,
      descricao: dto.descricao,
      nivel: dto.nivel,
      salarioBaseSugerido: dto.salarioBaseSugerido,
      ativo: dto.ativo ?? true,
    });

    if (dto.categoriaIds && dto.categoriaIds.length > 0) {
      const categorias = await this.categoriaRepository.findBy({
        id: In(dto.categoriaIds),
      });
      funcao.categorias = categorias;
    }

    return this.funcaoRepository.save(funcao);
  }

  async update(id: number, dto: UpdateFuncaoDto): Promise<Funcao> {
    const funcao = await this.findById(id);
    
    Object.assign(funcao, dto);
    
    if (dto.categoriaIds) {
      const categorias = await this.categoriaRepository.findBy({
        id: In(dto.categoriaIds),
      });
      funcao.categorias = categorias;
    }
    
    return this.funcaoRepository.save(funcao);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.funcaoRepository.update(id, { ativo: false });
  }
}