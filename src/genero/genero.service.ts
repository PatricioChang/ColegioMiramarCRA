import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from 'src/entities/Genero.entity';
import { Repository } from 'typeorm';
import { CrearGeneroDto } from './DTO/CrearGenero.dto';

@Injectable()
export class GeneroService {
    constructor(
        @InjectRepository(Genero)
        private generoRepository: Repository<Genero>,
    ) {}

    async buscarTodos(): Promise<Genero[]> {
        return await this.generoRepository.createQueryBuilder('genero').getMany()
    }

    async crearGenero(crearGeneroDto: CrearGeneroDto): Promise<Genero> {
        const { nombre } = crearGeneroDto

        const genero = new Genero()
        genero.nombre = nombre

        await this.generoRepository.save(genero)

        return genero
    }

    async eliminarGenero(idGenero: number): Promise<void> {
        const genero = await this.generoRepository.findOneById(idGenero)
        if (!genero) {
          throw new NotFoundException(`Libro con id ${idGenero} no encontrado.`)
        }
    
        await this.generoRepository.remove(genero)
    }
}
