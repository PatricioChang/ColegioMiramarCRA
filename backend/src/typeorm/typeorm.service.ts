import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/Usuario.entity';

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 't9pznx1y0a11teer',
    password: 'uwrcpezfduk7mx57',
    database: 'yo8jehfqsc8cs5i3',
    entities: [Usuario],
    synchronize: true
  }
