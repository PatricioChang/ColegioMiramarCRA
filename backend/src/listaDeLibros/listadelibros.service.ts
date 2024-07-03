import { Injectable } from '@nestjs/common';

@Injectable()
export class ListaDeLibrosService {
    /*@InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    ) {}*/

    private libros: string[]=['','','']

    async buscarTodos(): Promise<string[]> {
    return this.libros
    }
}
