import { Injectable } from '@nestjs/common';
import { Libro } from 'src/entities/Libro.entity';
import { SolicitudLibroDto } from './DTO/SolicitudLibro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';
import { Genero } from 'src/entities/Genero.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';

@Injectable()
export class LibroService {
    constructor(
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
    @InjectRepository(Solicitud)
    private solicitudRepository: Repository<Solicitud>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
    ) {}

    async buscarTodos(): Promise<Libro[]> {
        return await this.libroRepository.createQueryBuilder('libro').leftJoinAndSelect('libro.libro_Generos', 'libro_Generos').leftJoinAndSelect('libro_Generos.genero', 'genero').getMany()
    }

    async buscarTodosDisponibles(): Promise<Libro[]> {
        return await this.libroRepository.createQueryBuilder('libro')
            .leftJoinAndSelect('libro.libro_Generos', 'libro_Generos')
            .leftJoinAndSelect('libro_Generos.genero', 'genero')
            .leftJoin('libro.solicitudes', 'solicitud')
            .andWhere(qb => {
                const subQuery = qb.subQuery()
                    .select('solicitud_sub.idLibro')
                    .from(Solicitud, 'solicitud_sub')
                    .where('solicitud_sub.idLibro = libro.idLibro')
                    .andWhere('solicitud_sub.devuelto = :devuelto', { devuelto: false })
                    .getQuery();
                return `solicitud.idSolicitud IS NULL OR libro.idLibro NOT IN (${subQuery})`
            })
            .getMany()
    } 

    async buscarLibro(idLibroBuscado: number): Promise<Libro> {
        return await this.libroRepository.createQueryBuilder('libro').leftJoinAndSelect('libro.libro_Generos', 'libro_Generos').leftJoinAndSelect('libro_Generos.genero', 'genero').where('libro.idLibro = :idLibro', { idLibro: idLibroBuscado }).getOne()
    }

    async buscarPdfs(): Promise<Libro[]> {
        return await this.libroRepository.createQueryBuilder('libro').leftJoinAndSelect('libro.libro_Generos', 'libro_Generos').leftJoinAndSelect('libro_Generos.genero', 'genero').innerJoin('libro.pdf', 'pdf').getMany()
    }

    async buscarLibrosReservados(): Promise<Libro[]> {
        return await this.libroRepository.createQueryBuilder('libro').leftJoinAndSelect('libro.libro_Generos', 'libro_Generos').leftJoinAndSelect('libro_Generos.genero', 'genero').leftJoinAndSelect('libro.solicitudes', 'solicitud').where('solicitud.devuelto = :devuelto', { devuelto: false }).getMany()
    }

    async buscarLibroReservado(idLibroBuscado: number): Promise<Libro> {
        return await this.libroRepository.createQueryBuilder('libro').leftJoinAndSelect('libro.solicitudes', 'solicitud').where('libro.idLibro = :idLibro', { idLibro: idLibroBuscado }).andWhere('solicitud.devuelto = :devuelto', { devuelto: false }).getOne()
    }

    async solicitarLibro(solicitudLibroDto: SolicitudLibroDto): Promise<Solicitud>{
        const libroSolicitado = await this.libroRepository.findOne({ where: { idLibro: solicitudLibroDto.idLibro } })
        if (!libroSolicitado) {
            throw new Error('Libro no encontrado')
        }

        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: 1 } })
        
        if (!usuario) {
            throw new Error('Usuario no encontrado')
        }

        const fechaDeSolicitud = new Date(solicitudLibroDto.fechaDeSolicitud)
        const fechaDeDevolucion = solicitudLibroDto.fechaDeDevolucion ? new Date(solicitudLibroDto.fechaDeDevolucion) : null

        const nuevaSolicitud = this.solicitudRepository.create({
        rutSolicitante: solicitudLibroDto.rut,
        nombreSolicitante: solicitudLibroDto.name,
        cursoDelSolicitante: solicitudLibroDto.grade,
        fechaDeSolicitud: fechaDeSolicitud.toISOString().split('T')[0],
        horaDeSolicitud: new Date().toLocaleTimeString(),
        devuelto: false,
        fechaDeDevolucion: fechaDeDevolucion ? fechaDeDevolucion.toISOString().split('T')[0] : null,
        horaDeDevolucion: '',
        observacion: '',
        libro: libroSolicitado,
        idUsuario: usuario
        })
        
        return this.solicitudRepository.save(nuevaSolicitud)
    }
}
