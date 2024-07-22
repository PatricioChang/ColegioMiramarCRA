import { BadRequestException, Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { LibroService } from 'src/libro/libro.service';
import { Libro } from 'src/entities/Libro.entity';

@Controller('pdf')
export class PdfController { 
  constructor(
      private pdfService: PdfService,
      private libroService: LibroService
  ) {}

  @Get()
  async buscarTodos(): Promise<Libro[]> {
    return this.libroService.buscarPdfs();
  }

  @Get(':id')
  async buscarPdf(@Param('id') idLibro: number, @Res() res: Response) {
    const pdf = await this.pdfService.getPdf(idLibro)
    if (!pdf) {
      throw new BadRequestException('PDF not found');
    }
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdf.nombreArchivo}"`,
    });
    res.send(pdf.data)
  }

  @Delete(':id')
  async eliminarPdf(@Param('id') idLibro: number): Promise<void> {
    await this.pdfService.eliminarPdf(idLibro)
  }
}
