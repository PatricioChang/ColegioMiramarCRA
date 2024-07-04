import { Injectable } from '@nestjs/common';
import { Libro } from 'src/entities/Libro.entity';

@Injectable()
export class ListaDeLibrosService {
    /*@InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    ) {}*/

    private libros: Libro[]=[
        {id:1,autor:'Miguel de Cervantes', ano:1605,editorial:'Santillana',generos:['Novela','Parodia','Sátira','Farsa','Ficción','Histórica','Novela psicológica','Ficción de aventuras'],titulo:'Don Quijote de la Mancha',ubicacion:'A'},
        {id:2,autor:'Homero',ano:-750,editorial:'Zig-Zag',generos:['Epopeya','Épico'],titulo:'Odisea',ubicacion:'B'}
    ]

    async buscarTodos(): Promise<Libro[]> {
    return this.libros
    }
}
