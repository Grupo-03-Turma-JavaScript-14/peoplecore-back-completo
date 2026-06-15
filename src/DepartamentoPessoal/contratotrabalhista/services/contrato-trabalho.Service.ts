import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratoTrabalho, StatusContratoTrabalho } from '../entities/contrato-trabalho.entity';
import { CreateContratoTrabalhoDto } from '../dto/create-contrato-trabalho.dto';
import { UpdateContratoTrabalhoDto } from '../dto/update-contrato-trabalho.dto';

@Injectable()
export class ContratoTrabalhoService {
  constructor(
    @InjectRepository(ContratoTrabalho)
    private repo: Repository<ContratoTrabalho>,
  ) {}

  async findAll(): Promise<ContratoTrabalho[]> {
    // Agora traz a relação da admissão correspondente ao contrato
    return this.repo.find({ 
      relations: ['admissao'] 
    });
  }

  async findById(id: number): Promise<ContratoTrabalho> {
    const contrato = await this.repo.findOne({
      where: { id },
      relations: ['admissao'],
    });
    if (!contrato) {
      throw new HttpException('Contrato não encontrado', HttpStatus.NOT_FOUND);
    }
    return contrato;
  }

  // Método adaptado: agora busca o contrato ativo baseado no ID da Admissão
  async findByAdmissao(admissaoId: number): Promise<ContratoTrabalho> {
    const contrato = await this.repo.findOne({
      where: {
        admissao: { id: admissaoId },
        status: StatusContratoTrabalho.ATIVO,
      },
      relations: ['admissao'],
    });
    if (!contrato) {
      throw new HttpException('Contrato ativo não encontrado para esta admissão', HttpStatus.NOT_FOUND);
    }
    return contrato;
  }

  async create(dto: CreateContratoTrabalhoDto): Promise<ContratoTrabalho> {
    // Remove o antigo funcionarioId e extrai o admissaoId do DTO
    const { admissaoId, ...dados } = dto;

    const contrato = this.repo.create({
      ...dados,
      dataAdmissao: new Date(dto.dataAdmissao),
      dataFimExperiencia: dto.dataFimExperiencia ? new Date(dto.dataFimExperiencia) : undefined,
      admissao: { id: admissaoId },
      admissaoId: admissaoId,
    });

    return this.repo.save(contrato);
  }

  async update(id: number, dto: UpdateContratoTrabalhoDto): Promise<ContratoTrabalho> {
    const contrato = await this.findById(id);
    const { admissaoId, ...dados } = dto;

    Object.assign(contrato, {
      ...dados,
      dataAdmissao: dto.dataAdmissao ? new Date(dto.dataAdmissao) : contrato.dataAdmissao,
      dataFimExperiencia: dto.dataFimExperiencia ? new Date(dto.dataFimExperiencia) : contrato.dataFimExperiencia,
      admissao: admissaoId ? { id: admissaoId } : contrato.admissao,
      admissaoId: admissaoId ? admissaoId : contrato.admissaoId,
    });

    return this.repo.save(contrato);
  }

  async encerrar(id: number, motivo: string): Promise<ContratoTrabalho> {
    const contrato = await this.findById(id);
    contrato.status = StatusContratoTrabalho.ENCERRADO;
    contrato.dataRescisao = new Date();
    contrato.motivoRescisao = motivo;
    return this.repo.save(contrato);
  }
}