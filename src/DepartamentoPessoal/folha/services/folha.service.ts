import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FolhaPagamento, StatusFolha } from '../entities/folha-pagamento.entity';
import { CalcularFolhaDto } from '../dto/calcular-folha.dto';
import { UpdateFolhaDto } from '../dto/update-folha.dto';
import { CalculoInssService } from './calculo-inss.service';
import { CalculoIrrfService } from './calculo-irrf.service';

@Injectable()
export class FolhaService {
  constructor(
    @InjectRepository(FolhaPagamento)
    private readonly repo: Repository<FolhaPagamento>,
    private readonly inssService: CalculoInssService,
    private readonly irrfService: CalculoIrrfService,
  ) {}

  async findAll(): Promise<FolhaPagamento[]> {
    return this.repo.find({ relations: ['funcionario'], order: { ano: 'DESC', mes: 'DESC' } });
  }

  async findById(id: number): Promise<FolhaPagamento> {
    const folha = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!folha) throw new HttpException('Folha não encontrada', HttpStatus.NOT_FOUND);
    return folha;
  }

  async findByFuncionario(funcionarioId: number): Promise<FolhaPagamento[]> {
    return this.repo.find({
      where: { funcionario: { id: funcionarioId } },
      order: { ano: 'DESC', mes: 'DESC' },
    });
  }

  async calcular(dto: CalcularFolhaDto): Promise<FolhaPagamento> {
    // Verificar se já existe folha para este período
    const jaExiste = await this.repo.findOne({
      where: { funcionario: { id: dto.funcionarioId }, mes: dto.mes, ano: dto.ano },
    });
    if (jaExiste) {
      throw new HttpException('Folha já calculada para este período', HttpStatus.CONFLICT);
    }

    // Buscar funcionário
    const funcionario = await this.repo.manager.findOne('tb_funcionario' as any, {
      where: { id: dto.funcionarioId },
    }) as any;

    if (!funcionario) {
      throw new HttpException('Funcionário não encontrado', HttpStatus.NOT_FOUND);
    }

    const salarioBase = funcionario?.salarioBase ?? 0;
    
    if (salarioBase <= 0) {
      throw new HttpException('Funcionário sem salário base cadastrado', HttpStatus.BAD_REQUEST);
    }

    const valorHora = salarioBase / 220;
    const horasExtrasVal = (dto.horasExtras ?? 0) * valorHora * 1.5;
    const descontoFaltas = (dto.faltas ?? 0) * valorHora * 8;
    
    const bruto = salarioBase 
      + horasExtrasVal 
      + (dto.outrosAcrescimos ?? 0) 
      + (dto.adicionalInsalubridade ?? 0) 
      + (dto.adicionalPericulosidade ?? 0);
    
    const descontoINSS = this.inssService.calcular(bruto);
    const baseIRRF = bruto - descontoINSS;
    const descontoIRRF = this.irrfService.calcular(baseIRRF);
    
    const liquido = bruto 
      - descontoINSS 
      - descontoIRRF 
      - descontoFaltas 
      - (dto.outrosDescontos ?? 0);
    
    const fgts = parseFloat((bruto * 0.08).toFixed(2));

    const folha = this.repo.create({
      mes: dto.mes,
      ano: dto.ano,
      salarioBruto: parseFloat(bruto.toFixed(2)),
      descontoINSS: parseFloat(descontoINSS.toFixed(2)),
      descontoIRRF: parseFloat(descontoIRRF.toFixed(2)),
      descontoFaltas: parseFloat(descontoFaltas.toFixed(2)),
      adicionalHorasExtras: parseFloat(horasExtrasVal.toFixed(2)),
      adicionalInsalubridade: dto.adicionalInsalubridade ?? 0,
      adicionalPericulosidade: dto.adicionalPericulosidade ?? 0,
      outrosDescontos: dto.outrosDescontos ?? 0,
      outrosAcrescimos: dto.outrosAcrescimos ?? 0,
      salarioLiquido: parseFloat(liquido.toFixed(2)),
      fgts,
      observacao: dto.observacao,
      funcionario: { id: dto.funcionarioId } as any,
    });
    
    return this.repo.save(folha);
  }

  // Novo método para atualização de folha
  async update(id: number, dto: UpdateFolhaDto): Promise<FolhaPagamento> {
    const folha = await this.findById(id);
    
    // Atualiza os dados permitidos
    Object.assign(folha, dto);
    
    return this.repo.save(folha);
  }

  async confirmarPagamento(id: number): Promise<FolhaPagamento> {
    const folha = await this.findById(id);
    folha.status = StatusFolha.PAGA;
    return this.repo.save(folha);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}