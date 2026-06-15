import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from './entities/empresa.entity';
import { Filial } from './entities/filial.entity';
import { Contrato, TipoContrato } from './entities/contrato.entity';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { CreateFilialDto } from './dto/create-filial.dto';
import { CreateContratoDto } from './dto/create-contrato.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepo: Repository<Empresa>,

    @InjectRepository(Filial)
    private filialRepo: Repository<Filial>,

    @InjectRepository(Contrato)
    private contratoRepo: Repository<Contrato>,
  ) {}

  private validarCnpj(cnpj: string): string {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
      throw new HttpException('CNPJ inválido: deve conter 14 dígitos', HttpStatus.BAD_REQUEST);
    }
    return cnpjLimpo;
  }

  async countAll(): Promise<number> {
    return await this.empresaRepo.count();
  }

  // ==========================
  // EMPRESA
  // ==========================

  async createEmpresa(data: CreateEmpresaDto): Promise<Empresa> {
    const cnpjLimpo = this.validarCnpj(data.cnpj);
    return this.empresaRepo.save({
      ...data,
      cnpj: cnpjLimpo
    });
  }

  async findAllEmpresas(): Promise<Empresa[]> {
    return this.empresaRepo.find({
      relations: ['filiais', 'contratos'],
    });
  }

  async updateEmpresa(id: number, data: CreateEmpresaDto): Promise<Empresa> {
    const empresa = await this.empresaRepo.findOne({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa não encontrada');

    const cnpjLimpo = this.validarCnpj(data.cnpj);
    
    Object.assign(empresa, { ...data, cnpj: cnpjLimpo });
    return this.empresaRepo.save(empresa);
  }

  async deleteEmpresa(id: number): Promise<void> {
    const empresa = await this.empresaRepo.findOne({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa não encontrada');
    await this.empresaRepo.remove(empresa);
  }

  // ==========================
  // FILIAL
  // ==========================

  async createFilial(data: CreateFilialDto, empresaId: number): Promise<Filial> {
    // Aplicando a mesma lógica de limpeza de CNPJ para filiais, se necessário
    const cnpjLimpo = data.cnpj ? data.cnpj.replace(/\D/g, '') : undefined;
    
    return this.filialRepo.save({
      ...data,
      empresaId,
      cnpj: cnpjLimpo
    });
  }

  // ==========================
  // CONTRATO
  // ==========================

  async createContrato(data: CreateContratoDto, empresaId: number): Promise<Contrato> {
    return this.contratoRepo.save({
      ...data,
      empresaId,
      filialId: data.filialId,
      dataInicio: new Date(data.dataInicio),
      dataFim: data.dataFim ? new Date(data.dataFim) : undefined,
      tipo: data.tipo as TipoContrato,
    });
  }

  async findAllContratos(empresaId: number): Promise<Contrato[]> {
    return this.contratoRepo.find({
      where: { empresaId },
      relations: ['empresa', 'filial'],
    });
  }
}