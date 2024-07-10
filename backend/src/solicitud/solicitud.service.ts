import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Repository } from 'typeorm';
import { AceptarSolicitudDto } from './DTO/AceptarSolicitud.dto';

@Injectable()
export class SolicitudService { 
    constructor(
        @InjectRepository(Solicitud)
        private solicitudRepository: Repository<Solicitud>
    ) {}

    async buscarSolicitudes(): Promise<Solicitud[]> {
        return await this.solicitudRepository.createQueryBuilder('solicitud').leftJoinAndSelect('solicitud.libro','libro').where('solicitud.devuelto = :devuelto', { devuelto: 0 }).getMany()
    }

    async aceptarSolicitud(idSolicitud: number, aceptarSolicitudDto: AceptarSolicitudDto): Promise<Solicitud>{
        const solicitud = await this.solicitudRepository.findOneById(idSolicitud)

        if (!solicitud) {
            throw new Error('Solicitud no encontrada')
        }

        const fechaDeDevolucion = new Date(aceptarSolicitudDto.fechaDeDevolucion)
        solicitud.fechaDeDevolucion= fechaDeDevolucion.toISOString().split('T')[0]

        return await this.solicitudRepository.save(solicitud)
    }
}