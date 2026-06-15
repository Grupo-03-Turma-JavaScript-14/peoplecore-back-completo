import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Funcionario } from '../entities/funcionario.entity';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}

  private calcularSalario(funcionario: Funcionario): Funcionario {
    const horas = funcionario.horasTrabalhadas || 0;
    const base = funcionario.salarioBase || 0;
    funcionario.salarioTotal = horas * base;
    return funcionario;
  }

  async findAll(): Promise<Funcionario[]> {
    const funcionarios = await this.funcionarioRepository.find({
      relations: { categoria: true, empresa: true, admissao: true, funcao: true },
    });
    return funcionarios.map((f) => this.calcularSalario(f));
  }

  async findById(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({
      where: { id },
      relations: { categoria: true, empresa: true, admissao: true, funcao: true },
    });
    if (!funcionario) throw new HttpException('Colaborador não encontrado!', HttpStatus.NOT_FOUND);
    return this.calcularSalario(funcionario);
  }

  async create(data: CreateFuncionarioDto): Promise<Funcionario> {
    try {
      // O 'create' aceita o objeto, garantimos que os IDs de relação estejam presentes
      const novoFuncionario = this.funcionarioRepository.create({
        ...data,
        categoriaId: data.departamentoId || data.categoriaId,
      });
      
      const funcionarioSalvo = await this.funcionarioRepository.save(novoFuncionario);
      return this.calcularSalario(funcionarioSalvo);
    } catch (error) {
      console.error('Erro ao criar colaborador:', error);
      throw new HttpException('Erro ao salvar colaborador', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, data: Partial<CreateFuncionarioDto>): Promise<Funcionario> {
    // 1. Buscamos o colaborador existente. 
    // O 'save' precisa da instância para realizar o merge corretamente.
    const funcionario = await this.funcionarioRepository.findOne({ where: { id } });
    if (!funcionario) throw new HttpException('Colaborador não encontrado!', HttpStatus.NOT_FOUND);

    // 2. Mapeamento seguro: atualizamos os campos da instância recuperada
    // Se o campo existir no 'data', ele sobrescreve a instância.
    Object.assign(funcionario, data);

    // 3. Tratamento específico para os IDs que o front envia como 'departamentoId'
    if (data.departamentoId !== undefined) {
      funcionario.categoriaId = data.departamentoId;
    }

    // 4. Salvamos a entidade. O TypeORM vai comparar o que mudou e salvar apenas o necessário.
    const funcionarioAtualizado = await this.funcionarioRepository.save(funcionario);
    
    return this.calcularSalario(funcionarioAtualizado);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.funcionarioRepository.delete(id);
  }
}