import { Controller, Get } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { Genero } from 'src/entities/Genero.entity';

@Controller('genero')
export class GeneroController {
    constructor(private readonly generoService: GeneroService) {}

    @Get('generos')
    async buscarTodos(): Promise<Genero[]> {
        return this.generoService.buscarTodos();
    }
}
