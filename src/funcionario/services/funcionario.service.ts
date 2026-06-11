import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Funcionario } from '../entities/funcionario.entity';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}

  private calcularSalario(funcionario: Funcionario): Funcionario {
    funcionario.salarioTotal = funcionario.horasTrabalhadas * funcionario.salarioBase;
    return funcionario;
  }

  async findAll(): Promise<Funcionario[]> {
    try {
      const funcionarios = await this.funcionarioRepository.find({
        relations: { categoria: true },
      });
      return funcionarios.map((f) => this.calcularSalario(f));
    } catch (error) {
      console.error('Erro ao listar:', error);
      throw new HttpException('Erro ao processar a solicitação', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number): Promise<Funcionario> {
    try {
      const funcionario = await this.funcionarioRepository.findOne({
        where: { id },
        relations: { categoria: true },
      });
      if (!funcionario) throw new HttpException('Colaborador não encontrado!', HttpStatus.NOT_FOUND);
      return this.calcularSalario(funcionario);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error('Erro ao buscar:', error);
      throw new HttpException('Erro ao processar a requisição', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(funcionario: Funcionario): Promise<Funcionario> {
    try {
      console.log('📝 Dados recebidos para criar:', funcionario);
      const funcionarioSalvo = await this.funcionarioRepository.save(funcionario);
      console.log('✅ Funcionário criado:', funcionarioSalvo);
      return this.calcularSalario(funcionarioSalvo);
    } catch (error) {
      console.error('❌ Erro ao criar:', error);
      throw new HttpException('Erro ao salvar colaborador', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(funcionario: Funcionario): Promise<Funcionario> {
    try {
      await this.findById(funcionario.id);
      console.log('📝 Atualizando funcionário ID:', funcionario.id);
      const updated = await this.funcionarioRepository.save(funcionario);
      console.log('✅ Funcionário atualizado:', updated);
      return this.calcularSalario(updated);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error('❌ Erro ao atualizar:', error);
      throw new HttpException('Erro ao atualizar colaborador', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      await this.findById(id);
      return await this.funcionarioRepository.delete(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error('Erro ao deletar:', error);
      throw new HttpException('Não é possível excluir este colaborador. Exclua primeiro os registros vinculados (contratos, férias, folhas, etc.)', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}