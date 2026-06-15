import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertencia } from '../entities/advertencia.entity';
import { CreateAdvertenciaDto } from '../dto/create-advertencia.dto';
import { UpdateAdvertenciaDto } from '../dto/update-advertencia.dto';

@Injectable()
export class AdvertenciaService {

  constructor(
    @InjectRepository(Advertencia)
    private repo: Repository<Advertencia>,
  ) {}

  async create(dto: CreateAdvertenciaDto): Promise<Advertencia> {
    const adv = this.repo.create(dto);
    return await this.repo.save(adv);
  }

  async findAll(): Promise<Advertencia[]> {
    return await this.repo.find({
      relations: ['funcionario', 'usuario'],
    });
  }

  async findById(id: number): Promise<Advertencia> {
    const adv = await this.repo.findOne({
      where: { id },
      relations: ['funcionario', 'usuario'],
    });

    if (!adv) {
      throw new HttpException('Advertência não encontrada', HttpStatus.NOT_FOUND);
    }

    return adv;
  }

  async update(id: number, dto: UpdateAdvertenciaDto): Promise<Advertencia> {
    await this.repo.update(id, dto);
    return this.findById(id);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}