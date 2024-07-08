import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from 'src/entities/Libro.entity';
import { SolicitudLibroDto } from './DTO/SolicitudLibro.dto';
import { Solicitud } from 'src/entities/Solicitud.entity';

@Controller('libro')
export class LibroController { 
constructor(private readonly libroService: LibroService) {}

  @Get('lista')
  async buscarTodos(): Promise<Libro[]> {
    return this.libroService.buscarTodos();
  }

  @Get('libro/:idLibro')
  async buscarLibro(@Param('idLibro') idLibro: number): Promise<Libro> {
    return this.libroService.buscarLibro(idLibro);
  }

  @Get('listaReservados')
  async buscarLibrosReservados(): Promise<Libro[]> {
    return this.libroService.buscarLibrosReservados();
  }

  @Get('libroReservado/:idLibro')
  async buscarLibroReservado(@Param('idLibro') idLibro: number): Promise<Libro> {
    return this.libroService.buscarLibroReservado(idLibro);
  }

  @Post()
  async solicitarLibro(@Body() solicitudLibroDto: SolicitudLibroDto): Promise<Solicitud> {
    return this.libroService.solicitarLibro(solicitudLibroDto);
  }
}
