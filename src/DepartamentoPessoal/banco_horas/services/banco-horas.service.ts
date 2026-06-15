import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BancoHoras } from '../entities/banco-horas.entity';

@Injectable()
export class BancoHorasService {
  constructor(
    @InjectRepository(BancoHoras)
    private repo: Repository<BancoHoras>,
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