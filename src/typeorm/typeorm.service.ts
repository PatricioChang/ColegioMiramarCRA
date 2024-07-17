import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Genero } from 'src/entities/Genero.entity';
import { Libro } from 'src/entities/Libro.entity';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';
import { Pdf } from 'src/entities/Pdf.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'xq7t6tasopo9xxbs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 'x0hj09w5gmr8eh47',
    password: 'gnq02og80mpv1t7k',
    database: 'hltrfzmbs6ljk6ac',
    entities: [Usuario, Libro, Solicitud, Libro_Genero, Genero, Pdf],
    synchronize: true
  }
