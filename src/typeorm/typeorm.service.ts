import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Genero } from 'src/entities/Genero.entity';
import { Libro } from 'src/entities/Libro.entity';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';
import { Pdf } from 'src/entities/Pdf.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 't9pznx1y0a11teer',
    password: 'uwrcpezfduk7mx57',
    database: 'yo8jehfqsc8cs5i3',
    entities: [Usuario, Libro, Solicitud, Libro_Genero, Genero, Pdf],
    synchronize: true
  }
