import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Genero } from 'src/entities/Genero.entity';
import { Libro } from 'src/entities/Libro.entity';
import { Libro_Genero } from 'src/entities/Libro_Genero.entity';
import { Pdf } from 'src/entities/Pdf.entity';
import { Solicitud } from 'src/entities/Solicitud.entity';
import { Usuario } from 'src/entities/Usuario.entity';

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'database-1.c3mmouogc0io.us-east-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'colegiomiramarcra',
    database: 'colegiomiramarcra',
    entities: [Usuario, Libro, Solicitud, Libro_Genero, Genero, Pdf],
    synchronize: true
  }
