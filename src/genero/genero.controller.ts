import { Body, Controller, Get, Post } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { Genero } from 'src/entities/Genero.entity';
import { CrearGeneroDto } from './DTO/CrearGenero.dto';

@Controller('genero')
export class GeneroController {
    constructor(private readonly generoService: GeneroService) {}

    @Get('generos')
    async buscarTodos(): Promise<Genero[]> {
        return this.generoService.buscarTodos();
    }

    @Post('crearGenero')
    create(@Body() crearGeneroDto: CrearGeneroDto): Promise<Genero> {
        return this.generoService.crearGenero(crearGeneroDto)
    }
}
