import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    // Retorna todos os departamentos
    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations: {
                funcionarios: true,
                empresa: true
            }
        });
    }

    // Busca um departamento pelo ID
    async findById(id: number): Promise<Categoria> {
        let categoria = await this.categoriaRepository.findOne({
            where: { id },
            relations: {
                funcionarios: true,
                empresa: true
            }
        });

        if (!categoria)
            throw new HttpException('Departamento não encontrado!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    // Busca por nome de departamento (usando o campo 'departamento' da entity)
    async findAllByDepartamento(departamento: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                departamento: ILike(`%${departamento}%`)
            },
            relations: {
                funcionarios: true,
                empresa: true
            }
        })
    }

    // Cria um novo departamento
    async create(categoria: Categoria): Promise<Categoria> {
        // Valida se já existe um com o mesmo nome para evitar duplicidade (opcional)
        return await this.categoriaRepository.save(categoria);
    }

    // Atualiza um departamento
    async update(id: number, categoria: Categoria): Promise<Categoria> {
        await this.findById(id); // Garante que existe
        
        // Atualiza apenas o campo necessário
        await this.categoriaRepository.update(id, {
            departamento: categoria.departamento
        });
        
        return await this.findById(id);
    }

    // Deleta um departamento
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.categoriaRepository.delete(id);
    }
}