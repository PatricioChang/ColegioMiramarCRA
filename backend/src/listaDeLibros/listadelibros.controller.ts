import { Controller, Get } from '@nestjs/common';
import { ListaDeLibrosService } from './listadelibros.service';

@Controller('listaDeLibros')
export class ListaDeLibrosController { 
constructor(private readonly listaDeLibros: ListaDeLibrosService) {}

  @Get()
  async buscarTodos(): Promise<string[]> {
    return this.listaDeLibros.buscarTodos();
  }
}
