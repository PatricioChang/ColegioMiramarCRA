import { Controller, Get } from '@nestjs/common';
import { ListaDeLibrosService } from './listadelibros.service';
import { Libro } from 'src/entities/Libro.entity';

@Controller('listaDeLibros')
export class ListaDeLibrosController { 
constructor(private readonly listaDeLibros: ListaDeLibrosService) {}

  @Get()
  async buscarTodos(): Promise<Libro[]> {
    return this.listaDeLibros.buscarTodos();
  }
}
