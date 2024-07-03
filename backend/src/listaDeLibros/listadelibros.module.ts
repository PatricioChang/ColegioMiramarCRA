import { Module } from '@nestjs/common';
import { ListaDeLibrosController } from './listadelibros.controller';
import { ListaDeLibrosService } from './listadelibros.service';

@Module({
    imports: [],
    controllers: [ListaDeLibrosController],
    providers: [ListaDeLibrosService],
})
export class ListaDeLibrosModule { }
