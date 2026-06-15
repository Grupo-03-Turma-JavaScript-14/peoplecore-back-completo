import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';
import { ContratoTrabalho, StatusContratoTrabalho } from '../../DepartamentoPessoal/contratotrabalhista/entities/contrato-trabalho.entity';

// Interfaces locais para manter o Back-end desacoplado do Front-end
export interface HeadcountDep {
  departamento: string;
  total: number;
}

export interface CustoFolhaDep {
  departamento: string;
  custoTotal: number;
  mediaSalarial: number;
  total: number;
}

@Injectable()
export class HeadcountService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcRepo: Repository<Funcionario>,

    @InjectRepository(ContratoTrabalho)  // ← corrigido
    private readonly contratoRepo: Repository<ContratoTrabalho>,
  ) {}

  async headcountTotal(): Promise<number> {
    return this.contratoRepo.count({
      where: { status: StatusContratoTrabalho.ATIVO },  // ← corrigido
    });
  }

  async headcountPorDepartamento(): Promise<HeadcountDep[]> {
    const dados = await this.funcRepo
      .createQueryBuilder('f')
      .leftJoin('f.categoria', 'cat')
      .select('COALESCE(cat.departamento, \'Sem Departamento\')', 'departamento')
      .addSelect('COUNT(f.id)', 'total')
      .groupBy('cat.departamento')
      .getRawMany();

    return dados.map((item) => ({
      departamento: item.departamento,
      total: Number(item.total) || 0,
    }));
  }

  async headcountPorCargo(): Promise<{ cargo: string; total: number }[]> {
    const dados = await this.funcRepo
      .createQueryBuilder('f')
      .select('f.cargo', 'cargo')
      .addSelect('COUNT(f.id)', 'total')
      .groupBy('f.cargo')
      .orderBy('total', 'DESC')
      .getRawMany();

    return dados.map((item) => ({
      cargo: item.cargo || 'Não informado',
      total: Number(item.total) || 0,
    }));
  }

  async custoFolhaPorDepartamento(): Promise<CustoFolhaDep[]> {
    const dados = await this.funcRepo
      .createQueryBuilder('f')
      .leftJoin('f.categoria', 'cat')
      .select('COALESCE(cat.departamento, \'Sem Departamento\')', 'departamento')
      .addSelect('SUM(CAST(f.salarioBase AS DECIMAL))', 'custoTotal')
      .addSelect('AVG(CAST(f.salarioBase AS DECIMAL))', 'mediaSalarial')
      .addSelect('COUNT(f.id)', 'total')
      .groupBy('cat.departamento')
      .getRawMany();

    return dados.map((item) => ({
      departamento: item.departamento,
      custoTotal: Number(item.custoTotal) || 0,
      mediaSalarial: Number(item.mediaSalarial) || 0,
      total: Number(item.total) || 0,
    }));
  }
}