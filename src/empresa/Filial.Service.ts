import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filial } from './entities/filial.entity';

@Injectable()
export class FilialService {
  constructor(
    @InjectRepository(Filial)
    private filialRepository: Repository<Filial>,
  ) {}

  findAll() {
    return this.filialRepository.find();
  }

  create(data: any) {
    return this.filialRepository.save(data);
  }
}