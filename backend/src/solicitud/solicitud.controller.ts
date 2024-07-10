import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { SolicitudService } from './solicitud.service';
import { AceptarSolicitudDto } from './DTO/AceptarSolicitud.dto';

@Controller('solicitud')
export class SolicitudController { 
    constructor(
        private solicitudService: SolicitudService
    ){}

    @Get()
    async buscarTodos(): Promise<Solicitud[]> {
    return this.solicitudService.buscarSolicitudes()
    }

    @Put('aceptarSolicitud/:idSolicitud')
    async aceptarSolicitud(@Param() idSolicitud: number, @Body() aceptarSolicitudDto: AceptarSolicitudDto) {
        return this.solicitudService.aceptarSolicitud(idSolicitud,aceptarSolicitudDto)
    }
}
