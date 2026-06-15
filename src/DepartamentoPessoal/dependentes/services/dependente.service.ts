import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dependente } from '../entities/dependente.entity';

@Injectable()
export class DependenteService {
  constructor(
    @InjectRepository(Dependente)
    private repo: Repository<Dependente>,
  ) {}

  create(dto: any) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: any) {
    return this.repo.save({ id, ...dto });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}