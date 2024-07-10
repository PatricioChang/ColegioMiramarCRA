import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from 'src/entities/Libro.entity';
import { CrearEditarLibroDto } from './DTO/CrearEditarLibro.dto';
import { SolicitudLibroDto } from './DTO/SolicitudLibro.dto';
import { Solicitud } from 'src/entities/Solicitud.entity';

@Controller('libro')
export class LibroController { 
constructor(private readonly libroService: LibroService) {}

  @Get('libros')
  async buscarTodos(): Promise<Libro[]> {
    return this.libroService.buscarTodos()
  }

  @Get('librosDisponibles')
  async buscarTodosDisponibles(): Promise<Libro[]> {
    return this.libroService.buscarTodosDisponibles()
  }

  @Get('libro/:idLibro')
  async buscarLibro(@Param('idLibro') idLibro: number): Promise<Libro> {
    return this.libroService.buscarLibro(idLibro)
  }

  @Get('listaReservados')
  async buscarLibrosReservados(): Promise<Libro[]> {
    return this.libroService.buscarLibrosReservados()
  }

  @Get('libroReservado/:idLibro')
  async buscarLibroReservado(@Param('idLibro') idLibro: number): Promise<Libro> {
    return this.libroService.buscarLibroReservado(idLibro)
  }

  @Post()
  async solicitarLibro(@Body() solicitudLibroDto: SolicitudLibroDto): Promise<Solicitud> {
    return this.libroService.solicitarLibro(solicitudLibroDto)
  }

  @Post('crearLibro')
  create(@Body() crearEditarLibroDto: CrearEditarLibroDto): Promise<Libro> {
    return this.libroService.crearLibro(crearEditarLibroDto)
  }

  @Put('editarLibro/:idLibro')
  async editarLibro(@Param() idLibro: number, @Body() crearEditarLibroDto: CrearEditarLibroDto) {
    return this.libroService.editarLibro(idLibro, crearEditarLibroDto)
  }

  @Delete(':id')
  async deleteLibro(@Param('id') idLibro: number): Promise<void> {
    await this.libroService.eliminarLibro(idLibro)
  }
}
