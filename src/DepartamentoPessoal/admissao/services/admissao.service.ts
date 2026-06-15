import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admissao } from '../entities/admissao.entity';
import { CreateAdmissaoDto } from '../dto/create-admissao.dto';

@Injectable()
export class AdmissaoService {
  constructor(
    @InjectRepository(Admissao)
    private repo: Repository<Admissao>,
  ) {}

  create(dto: CreateAdmissaoDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: CreateAdmissaoDto) {
    return this.repo.save({ id, ...dto });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}