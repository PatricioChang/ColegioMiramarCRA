import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from 'src/entities/Genero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneroService {
    constructor(
        @InjectRepository(Genero)
        private generoRepository: Repository<Genero>,
    ) {}

    async buscarTodos(): Promise<Genero[]> {
        return await this.generoRepository.createQueryBuilder('genero').getMany()
    }
}
