import { Injectable } from '@nestjs/common';
import { Libro } from 'src/entities/Libro.entity';
import { SolicitudLibroDto } from './DTO/SolicitudLibro.dto';

@Injectable()
export class LibroService {
    /*@InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    ) {}*/

    private libros: Libro[]=[
        {id:1,autor:'Miguel de Cervantes', ano:1605,editorial:'Santillana',generos:['Novela','Parodia','Sátira','Farsa','Ficción','Histórica','Novela psicológica','Ficción de aventuras'],titulo:'Don Quijote de la Mancha',ubicacion:'A'},
        {id:2,autor:'Homero',ano:-750,editorial:'Zig-Zag',generos:['Epopeya','Épico'],titulo:'Odisea',ubicacion:'B'}
    ]
    private librosSolicitados: Libro[]=[

    ]

    async buscarTodos(): Promise<Libro[]> {
    return this.libros
    }

    async buscarLibro(idLibro: number): Promise<Libro> {
        return this.libros.find(({id})=>id==idLibro)
    }

    async buscarLibrosReservados(): Promise<Libro[]> {
        return this.librosSolicitados
    }

    async buscarLibroReservado(idLibro: number): Promise<Libro> {
        return this.librosSolicitados.find(({id})=>id==idLibro)
    }

    async solicitarLibro(solicitudLibroDto: SolicitudLibroDto): Promise<boolean>{
        const libroSolicitado= this.libros.find(({id})=>id==solicitudLibroDto.idLibro)
        this.libros= this.libros.filter(({id})=>id!=solicitudLibroDto.idLibro)
        const largoLibrosSolicitados= this.librosSolicitados.length
        this.librosSolicitados.push(libroSolicitado)
        return this.librosSolicitados.length>largoLibrosSolicitados
    }
}
