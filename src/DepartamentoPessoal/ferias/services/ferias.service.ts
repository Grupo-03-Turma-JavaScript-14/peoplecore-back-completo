import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Ferias, StatusFerias } from '../entities/ferias.entity';
import { Funcionario } from '../../../funcionario/entities/funcionario.entity';
import { Categoria } from '../../../rh/departamento/entities/categoria.entity';
import { SolicitarFeriasDto } from '../dto/solicitar-ferias.dto';
import { CalculoFeriasService } from '../../folha/services/calculo-ferias.service';

@Injectable()
export class FeriasService {
  private readonly logger = new Logger(FeriasService.name);

  constructor(
    @InjectRepository(Ferias)
    private readonly repo: Repository<Ferias>,

    @InjectRepository(Funcionario)
    private readonly funcionarioRepo: Repository<Funcionario>,

    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,

    private readonly calculoService: CalculoFeriasService,
  ) {}

  async buscarOpcoesFuncionarios(termoBusca?: string) {
    const where: any = {};

    if (termoBusca) {
      where.nome = ILike(`%${termoBusca}%`);
    }

    return await this.funcionarioRepo.find({
      where,
      relations: { categoria: true },
      order: { nome: 'ASC' },
    });
  }

  async buscarOpcoesDepartamentos() {
    return await this.categoriaRepo.find({
      select: ['id', 'departamento'],
      order: { departamento: 'ASC' },
    });
  }

  async findAll(): Promise<Ferias[]> {
    return this.repo.find({
      relations: ['funcionario', 'funcionario.categoria'],
      order: { criadoEm: 'DESC' },
    });
  }

  async findById(id: number): Promise<Ferias> {
    const ferias = await this.repo.findOne({
      where: { id },
      relations: ['funcionario', 'funcionario.categoria'],
    });

    if (!ferias) {
      throw new HttpException(
        'Férias não encontradas',
        HttpStatus.NOT_FOUND,
      );
    }

    return ferias;
  }

  async findByFuncionario(funcionarioId: number): Promise<Ferias[]> {
    return await this.repo.find({
      where: {
        funcionario: {
          id: funcionarioId,
        },
      },
      relations: ['funcionario', 'funcionario.categoria'],
      order: { criadoEm: 'DESC' },
    });
  }

  async solicitar(dto: SolicitarFeriasDto): Promise<Ferias> {
  console.log('====================================');
  console.log('DTO RECEBIDO');
  console.log(dto);
  console.log('FUNCIONARIO ID:', dto.funcionarioId);
  console.log('====================================');

  const funcionario = await this.funcionarioRepo.findOne({
    where: {
      id: Number(dto.funcionarioId),
    },
    relations: {
      categoria: true,
    },
  });

  console.log('FUNCIONARIO ENCONTRADO:', funcionario);

  if (!funcionario) {
    throw new HttpException(
      'Funcionário não encontrado',
      HttpStatus.NOT_FOUND,
    );
  }

  const valorPago = this.calculoService.calcularValor(
    funcionario.salarioBase ?? 0,
    dto.diasFruidos,
    dto.tercoVendido ?? false,
  );

  const departamento =
    funcionario.categoria?.departamento || 'GERAL';

  const ferias = this.repo.create({
    ...dto,
    dataInicio: new Date(dto.dataInicio),
    dataFim: new Date(dto.dataFim),
    valorPago,
    status: StatusFerias.SOLICITADA,
    funcionario,
    departamentoAprovador: departamento,
    aprovadorNome:
      dto.aprovadorNome || 'Aguardando Aprovação',
  });

  return await this.repo.save(ferias);
}

  async update(
    id: number,
    dto: SolicitarFeriasDto,
  ): Promise<Ferias> {
    const ferias = await this.findById(id);

    const funcionario = await this.funcionarioRepo.findOne({
      where: { id: dto.funcionarioId },
      relations: { categoria: true },
    });

    if (!funcionario) {
      throw new HttpException(
        'Funcionário não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const novoValor = this.calculoService.calcularValor(
      funcionario.salarioBase ?? 0,
      dto.diasFruidos,
      dto.tercoVendido ?? false,
    );

    Object.assign(ferias, {
      ...dto,
      dataInicio: new Date(dto.dataInicio),
      dataFim: new Date(dto.dataFim),
      valorPago: novoValor,
      funcionario,
      departamentoAprovador:
        funcionario.categoria?.departamento ||
        ferias.departamentoAprovador,
    });

    return await this.repo.save(ferias);
  }

  async aprovar(
    id: number,
    aprovadorNome: string,
  ): Promise<Ferias> {
    const ferias = await this.findById(id);

    if (ferias.status !== StatusFerias.SOLICITADA) {
      throw new HttpException(
        'Apenas férias solicitadas podem ser aprovadas',
        HttpStatus.BAD_REQUEST,
      );
    }

    ferias.status = StatusFerias.APROVADA;
    ferias.aprovadoEm = new Date();
    ferias.aprovadorNome = aprovadorNome;

    return await this.repo.save(ferias);
  }

  async rejeitar(id: number, motivo: string): Promise<Ferias> {
    const ferias = await this.findById(id);

    ferias.status = StatusFerias.REJEITADA;
    ferias.observacao = motivo;

    return await this.repo.save(ferias);
  }

  async delete(id: number): Promise<void> {
    const ferias = await this.findById(id);
    await this.repo.remove(ferias);
  }
}