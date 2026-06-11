import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat, TipoCAT, GravidadeAcidente } from '../entities/cat.entity';
import { CreateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly repo: Repository<Cat>,
  ) {}

  async findAll(): Promise<Cat[]> {
    const cats = await this.repo.find({ 
      relations: ['funcionario'],
      order: { dataAcidente: 'DESC' } 
    });
    
    // Log para debug
    console.log(`📊 Encontradas ${cats.length} CATs`);
    if (cats.length > 0) {
      console.log('📊 Primeira CAT:', {
        id: cats[0].id,
        funcionarioId: cats[0].funcionario?.id,
        funcionarioNome: cats[0].funcionario?.nome,
      });
    }
    
    return cats;
  }

  async findById(id: number): Promise<Cat> {
    const cat = await this.repo.findOne({ 
      where: { id }, 
      relations: ['funcionario']
    });
    
    if (!cat) {
      throw new HttpException('CAT não encontrada', HttpStatus.NOT_FOUND);
    }
    
    console.log(`📊 CAT ${id}:`, {
      funcionarioId: cat.funcionario?.id,
      funcionarioNome: cat.funcionario?.nome,
    });
    
    return cat;
  }

  async findByFuncionario(funcionarioId: number): Promise<Cat[]> {
    return this.repo.find({
      where: { funcionario: { id: funcionarioId } },
      relations: ['funcionario'],
      order: { dataAcidente: 'DESC' },
    });
  }

  async create(dto: CreateCatDto): Promise<Cat> {
    try {
      console.log('📝 Criando CAT - DTO recebido:', {
        gravidade: dto.gravidade,
        dataAcidente: dto.dataAcidente,
        descricaoAcidente: dto.descricaoAcidente?.substring(0, 50),
        parteAtingida: dto.parteAtingida,
        agenteCausador: dto.agenteCausador,
        localAcidente: dto.localAcidente,
        funcionarioId: dto.funcionarioId,
        urlDocumento: dto.urlDocumento,
      });

      // Validação
      if (!dto.funcionarioId) {
        throw new HttpException('funcionarioId é obrigatório', HttpStatus.BAD_REQUEST);
      }

      // Criar a entidade
      const cat = new Cat();
      cat.tipo = dto.tipo || TipoCAT.INICIAL;
      cat.gravidade = dto.gravidade;
      cat.dataAcidente = new Date(dto.dataAcidente);
      cat.descricaoAcidente = dto.descricaoAcidente;
      cat.parteAtingida = dto.parteAtingida;
      cat.agenteCausador = dto.agenteCausador;
      cat.localAcidente = dto.localAcidente || '';
      cat.planoAcao = dto.planoAcao || '';
      cat.urlDocumento = dto.urlDocumento || '';
      cat.dataAfastamento = dto.dataAfastamento ? new Date(dto.dataAfastamento) : null;
      cat.enviadoEsocial = false;
      cat.protocoloEsocial = '';
      cat.funcionario = { id: dto.funcionarioId } as any;

      // Salvar
      const saved = await this.repo.save(cat);
      console.log('✅ CAT salva com ID:', saved.id);

      // Buscar com relacionamento
      const savedWithRelation = await this.repo.findOne({
        where: { id: saved.id },
        relations: ['funcionario'],
      });

      console.log('✅ CAT com funcionário:', {
        id: savedWithRelation?.id,
        funcionario: savedWithRelation?.funcionario,
      });

      return savedWithRelation!;
    } catch (error: any) {
      console.error('❌ Erro ao criar CAT:', error);
      throw new HttpException(
        error.message || 'Erro ao criar CAT',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, dto: CreateCatDto): Promise<Cat> {
    try {
      const cat = await this.findById(id);
      
      if (dto.tipo !== undefined) cat.tipo = dto.tipo;
      if (dto.gravidade !== undefined) cat.gravidade = dto.gravidade;
      if (dto.dataAcidente !== undefined) cat.dataAcidente = new Date(dto.dataAcidente);
      if (dto.descricaoAcidente !== undefined) cat.descricaoAcidente = dto.descricaoAcidente;
      if (dto.parteAtingida !== undefined) cat.parteAtingida = dto.parteAtingida;
      if (dto.agenteCausador !== undefined) cat.agenteCausador = dto.agenteCausador;
      if (dto.localAcidente !== undefined) cat.localAcidente = dto.localAcidente;
      if (dto.planoAcao !== undefined) cat.planoAcao = dto.planoAcao;
      if (dto.urlDocumento !== undefined) cat.urlDocumento = dto.urlDocumento;
      if (dto.dataAfastamento !== undefined) {
        cat.dataAfastamento = dto.dataAfastamento ? new Date(dto.dataAfastamento) : null;
      }
      if (dto.funcionarioId !== undefined) {
        cat.funcionario = { id: dto.funcionarioId } as any;
      }
      
      await this.repo.save(cat);
      return this.findById(id);
    } catch (error: any) {
      console.error('Erro ao atualizar CAT:', error);
      throw new HttpException(error.message || 'Erro ao atualizar CAT', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async marcarEnviadoEsocial(id: number, protocolo: string): Promise<Cat> {
    const cat = await this.findById(id);
    cat.enviadoEsocial = true;
    cat.protocoloEsocial = protocolo;
    await this.repo.save(cat);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new HttpException('CAT não encontrada', HttpStatus.NOT_FOUND);
    }
  }
}