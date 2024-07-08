import { Pdf } from 'src/entities/Pdf.entity';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroService } from 'src/libro/libro.service';
import { Libro } from 'src/entities/Libro.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Pdf, Libro, Solicitud, Usuario])],
    controllers: [PdfController],
    providers: [PdfService,LibroService],
})
export class PdfModule { }
