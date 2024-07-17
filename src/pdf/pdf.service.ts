import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pdf } from 'src/entities/Pdf.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PdfService {
    constructor(
        @InjectRepository(Pdf)
        private pdfRepository: Repository<Pdf>
    ) {}

    async getPdf(idLibro: number): Promise<Pdf | undefined> {
        const queryBuilder: SelectQueryBuilder<Pdf> = this.pdfRepository.createQueryBuilder('pdf');
        queryBuilder.innerJoin('pdf.libro', 'libro').where('libro.idLibro = :idLibro', { idLibro });

        try {
            const pdf = await queryBuilder.getOne();
            if (!pdf) {
                throw new NotFoundException(`PDF not found for libroId ${idLibro}`);
            }
            return pdf;
        } catch (error) {
            throw new NotFoundException(`PDF not found for libroId ${idLibro}`);
        }
    }
}

