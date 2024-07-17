import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { SolicitudService } from './solicitud.service';
import { AceptarSolicitudDto } from './DTO/AceptarSolicitud.dto';
import { DevolverLibroDto } from './DTO/DevolverLibro.dto';

@Controller('solicitud')
export class SolicitudController { 
    constructor(
        private solicitudService: SolicitudService
    ){}

    @Get()
    async buscarSolicitudes(): Promise<Solicitud[]> {
    return this.solicitudService.buscarSolicitudes()
    }

    @Get('solicitudesPorDevolver')
    async buscarSolicitudesPorDevolver(): Promise<Solicitud[]> {
    return this.solicitudService.buscarSolicitudesPorDevolver()
    }

    @Put('aceptarSolicitud/:idSolicitud')
    async aceptarSolicitud(@Param() idSolicitud: number, @Body() aceptarSolicitudDto: AceptarSolicitudDto) {
        return this.solicitudService.aceptarSolicitud(idSolicitud,aceptarSolicitudDto)
    }

    @Put('devolverLibro/:idSolicitud')
    async devolverLibro(@Param() idSolicitud: number, @Body() devolverLibroDto: DevolverLibroDto) {
        return this.solicitudService.devolverLibro(idSolicitud,devolverLibroDto)
    }

    @Delete('eliminarSolicitud/:idSolicitud')
    async deleteLibro(@Param('idSolicitud') idSolicitud: number): Promise<void> {
    await this.solicitudService.eliminarSolicitud(idSolicitud)
    }
}
