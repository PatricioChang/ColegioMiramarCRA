import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Solicitud } from './Solicitud.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn("increment",{type: "int", name:"idUsuario"})
  idUsuario: number

  @PrimaryColumn()
  usuario: string

  @Column()
  contraseña: string

  @OneToMany(()=> Solicitud, (solicitudes)=>solicitudes.idUsuario)
  solicitudes: Solicitud[]
}
