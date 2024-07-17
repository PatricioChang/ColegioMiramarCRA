import { Pdf } from 'src/entities/Pdf.entity';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroService } from 'src/libro/libro.service';
import { Libro } from 'src/entities/Libro.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';
import { Genero } from 'src/entities/Genero.entity';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Pdf, Libro, Solicitud, Usuario, Genero, Libro_Genero])],
    controllers: [PdfController],
    providers: [PdfService,LibroService],
})
export class PdfModule { }
