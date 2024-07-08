import { Module } from '@nestjs/common';
import { LibroController } from './libro.controller';
import { LibroService } from './libro.service';
import { Libro } from 'src/entities/Libro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';
import { Genero } from 'src/entities/Genero.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Libro, Libro_Genero, Genero, Solicitud, Usuario])],
    controllers: [LibroController],
    providers: [LibroService],
})
export class LibroModule { }
