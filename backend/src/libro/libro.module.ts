import { Module } from '@nestjs/common';
import { LibroController } from './libro.controller';
import { LibroService } from './libro.service';

@Module({
    imports: [],
    controllers: [LibroController],
    providers: [LibroService],
})
export class LibroModule { }
