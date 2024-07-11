import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Repository } from 'typeorm';
import { AceptarSolicitudDto } from './DTO/AceptarSolicitud.dto';
import { DevolverLibroDto } from './DTO/DevolverLibro.dto';

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

    async devolverLibro(idSolicitud: number, devolverLibroDto: DevolverLibroDto): Promise<Solicitud>{
        const solicitud = await this.solicitudRepository.findOneById(idSolicitud)

        if (!solicitud) {
            throw new Error('Solicitud no encontrada')
        }

        solicitud.observacion= devolverLibroDto.observacion
        solicitud.devuelto=true
        solicitud.horaDeDevolucion= new Date().toLocaleTimeString()

        return await this.solicitudRepository.save(solicitud)
    }

    async eliminarSolicitud(idSolicitud: number): Promise<void> {
        const solicitud = await this.solicitudRepository.findOneById(idSolicitud)
        if (!solicitud) {
          throw new NotFoundException(`Libro con id ${idSolicitud} no encontrado.`)
        }
    
        await this.solicitudRepository.remove(solicitud)
      }
}