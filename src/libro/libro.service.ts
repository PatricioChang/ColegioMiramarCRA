import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Libro } from 'src/entities/Libro.entity';
import { SolicitudLibroDto } from './DTO/SolicitudLibro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Genero } from 'src/entities/Genero.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';
import { CrearEditarLibroDto } from './DTO/CrearLibro.dto';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';
import { Pdf } from 'src/entities/Pdf.entity';

@Injectable()
export class LibroService {
    constructor(
        @InjectRepository(Libro)
        private libroRepository: Repository<Libro>,
        @InjectRepository(Solicitud)
        private solicitudRepository: Repository<Solicitud>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Genero)
        private generoRepository: Repository<Genero>,
        @InjectRepository(Libro_Genero)
        private libro_GeneroRepository: Repository<Libro_Genero>,
        @InjectRepository(Pdf)
        private pdfRepository: Repository<Pdf>
    ) {}

    async crearLibro(crearEditarLibroDto: CrearEditarLibroDto): Promise<Libro> {
        const { titulo, autor, anio, editorial, ubicacion, libro_Generos } = crearEditarLibroDto

        let generosIds: number[] = []
        if (typeof libro_Generos === 'string') {
            try {
                const generosArray = JSON.parse(libro_Generos)
                if (Array.isArray(generosArray)) {
                    generosIds = generosArray.map((genero: any) => genero.idGenero)
                }
            } catch (error) {
                throw new Error('Error al parsear los géneros del libro')
            }
        } else if (Array.isArray(libro_Generos)) {
            generosIds = libro_Generos.map((genero: any) => genero.idGenero)
        }

        const libro = new Libro()
        libro.titulo = titulo
        libro.autor = autor
        libro.anio = anio
        libro.editorial = editorial
        libro.ubicacion = ubicacion

        await this.libroRepository.save(libro)

        const generos = await this.generoRepository.findByIds(generosIds)

        const nuevasRelaciones = generos.map((genero) => {
            const libroGenero = new Libro_Genero()
            libroGenero.libro = libro
            libroGenero.genero = genero
            return libroGenero
        })

        await this.libro_GeneroRepository.save(nuevasRelaciones)

        return libro
    }

    async editarLibro(idLibro: number, crearEditarLibroDto: CrearEditarLibroDto, file: Express.Multer.File): Promise<Libro> {
        const { titulo, autor, anio, editorial, ubicacion, url, img, libro_Generos } = crearEditarLibroDto

        let generosIds: number[] = []
        if (typeof libro_Generos === 'string') {
            try {
                const generosArray = JSON.parse(libro_Generos)
                if (Array.isArray(generosArray)) {
                    generosIds = generosArray.map((genero: any) => genero.idGenero)
                }
            } catch (error) {
                throw new Error('Error al parsear los géneros del libro')
            }
        } else if (Array.isArray(libro_Generos)) {
            generosIds = libro_Generos.map((genero: any) => genero.idGenero)
        }

        const libro = await this.libroRepository.findOneById(idLibro)

        if (!libro) {
        throw new Error('Libro no encontrado')
        }

        libro.titulo = titulo
        libro.autor = autor
        libro.anio = anio
        libro.editorial = editorial
        libro.ubicacion = ubicacion

        if(url){
            libro.url= url
        }

        if(file){
            const pdf = new Pdf()
            pdf.nombreArchivo = file.originalname
            pdf.data = file.buffer
            pdf.libro = libro

            await this.pdfRepository.save(pdf)
        }

        if (img) {
            libro.img = Buffer.from(img, 'base64');
        }
        
        await this.libroRepository.save(libro)

        await this.libro_GeneroRepository.delete({ libro })

        const generos = await this.generoRepository.findByIds(generosIds)

        const nuevasRelaciones = generos.map((genero) => {
            const libroGenero = new Libro_Genero()
            libroGenero.libro = libro
            libroGenero.genero = genero
            return libroGenero
        })

        await this.libro_GeneroRepository.save(nuevasRelaciones)

        return libro
    }


    async eliminarLibro(idLibro: number): Promise<void> {
        const libro = await this.libroRepository.findOneById(idLibro)
        if (!libro) {
          throw new NotFoundException(`Libro con id ${idLibro} no encontrado.`)
        }
    
        await this.libroRepository.remove(libro)
      }

    async buscarTodos(): Promise<Libro[]> {
        const libros = await this.libroRepository.createQueryBuilder('libro').leftJoinAndSelect('libro.libro_Generos', 'libro_Generos').leftJoinAndSelect('libro_Generos.genero', 'genero').getMany()
    
        return libros
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
                    .getQuery()
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

    async solicitarLibro(solicitudLibroDto: SolicitudLibroDto): Promise<Solicitud> {
        const libroSolicitado = await this.libroRepository.findOne({ where: { idLibro: solicitudLibroDto.idLibro } })
        if (!libroSolicitado) {
          throw new Error('Libro no encontrado')
        }
      
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: 1 } })
        if (!usuario) {
          throw new Error('Usuario no encontrado')
        }
      
        const fechaDeSolicitud = solicitudLibroDto.fechaDeSolicitud ? new Date(solicitudLibroDto.fechaDeSolicitud) : new Date()
        const fechaDeDevolucion = solicitudLibroDto.fechaDeDevolucion ? new Date(solicitudLibroDto.fechaDeDevolucion) : null
      
        const nuevaSolicitud = this.solicitudRepository.create({
          rutSolicitante: solicitudLibroDto.rut,
          nombreSolicitante: solicitudLibroDto.name,
          cursoDelSolicitante: solicitudLibroDto.grade,
          fechaDeSolicitud: fechaDeSolicitud.toISOString().split('T')[0],
          horaDeSolicitud: fechaDeSolicitud.toLocaleTimeString(),
          devuelto: false,
          fechaDeDevolucion: fechaDeDevolucion ? fechaDeDevolucion.toISOString().split('T')[0] : null,
          horaDeDevolucion: '',
          observacion: '',
          libro: libroSolicitado,
          idUsuario: usuario
        })
      
        return this.solicitudRepository.save(nuevaSolicitud)
    }

    async eliminarUrlDeLibro(idLibro: number): Promise<Libro>{
        const libro = await this.libroRepository.findOneById(idLibro)
        if (!libro) {
          throw new NotFoundException(`Libro con id ${idLibro} no encontrado.`)
        }

        libro.url=null
    
        await this.libroRepository.save(libro)
        return libro
    }
}

