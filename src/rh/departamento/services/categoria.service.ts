import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

import { Categoria } from "../entities/categoria.entity";
import { CreateCategoriaDto } from "../dto/create-categoria.dto";
import { UpdateCategoriaDto } from "../dto/update-categoria.dto";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations: {
                funcionarios: true,
                empresa: true
            }
        });
    }

    async findById(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id },
            relations: {
                funcionarios: true,
                empresa: true
            }
        });

        if (!categoria) {
            throw new HttpException(
                "Departamento não encontrado!",
                HttpStatus.NOT_FOUND
            );
        }

        return categoria;
    }

    async findAllByDepartamento(
        departamento: string
    ): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                departamento: ILike(`%${departamento}%`)
            },
            relations: {
                funcionarios: true,
                empresa: true
            }
        });
    }

    async create(
        categoriaDto: CreateCategoriaDto
    ): Promise<Categoria> {
        const categoria = this.categoriaRepository.create({
            departamento: categoriaDto.departamento
        });

        return await this.categoriaRepository.save(categoria);
    }

    async update(
        id: number,
        categoriaDto: UpdateCategoriaDto
    ): Promise<Categoria> {
        const categoria = await this.findById(id);

        categoria.departamento =
            categoriaDto.departamento ?? categoria.departamento;

        await this.categoriaRepository.save(categoria);

        return await this.findById(id);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.categoriaRepository.delete(id);
    }
}