import { Injectable } from '@nestjs/common';
import { Libro } from 'src/entities/Libro.entity';
import { SolicitudLibroDto } from './DTO/SolicitudLibro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';
import { Genero } from 'src/entities/Genero.entity';

@Injectable()
export class LibroService {
    constructor(
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
    @InjectRepository(Libro)
    private libro_GeneroRepository: Repository<Libro_Genero>,
    ) {}

    private libros: Libro[]=[]
    private librosSolicitados: Libro[]=[]

    async buscarTodos(): Promise<Libro[]> {
        this.libros = await this.libroRepository.createQueryBuilder('libro').leftJoinAndSelect('libro.libro_Generos', 'libro_Generos').leftJoinAndSelect('libro_Generos.genero', 'genero').getMany();
    return this.libros;
  } 

    async buscarLibro(idLibro: number): Promise<Libro> {
        return this.libros.find(({idLibro})=>idLibro==idLibro)
    }

    async buscarLibrosReservados(): Promise<Libro[]> {
        return this.librosSolicitados
    }

    async buscarLibroReservado(idLibro: number): Promise<Libro> {
        return this.librosSolicitados.find(({idLibro})=>idLibro==idLibro)
    }

    async solicitarLibro(solicitudLibroDto: SolicitudLibroDto): Promise<boolean>{
        const libroSolicitado= this.libros.find(({idLibro})=>idLibro==solicitudLibroDto.idLibro)
        this.libros= this.libros.filter(({idLibro})=>idLibro!=solicitudLibroDto.idLibro)
        const largoLibrosSolicitados= this.librosSolicitados.length
        this.librosSolicitados.push(libroSolicitado)
        return this.librosSolicitados.length>largoLibrosSolicitados
    }
}
