import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Solicitud } from './Solicitud.entity';
import { Libro_Genero } from './Libro_Genero.entity';

@Entity('libro')
export class Libro {
  @PrimaryGeneratedColumn("increment",{type:"int", name:"idLibro"})
  idLibro: number

  @Column("varchar")
  titulo: string

  @Column()
  autor: string

  @Column()
  anio: number

  @Column()
  editorial: string

  @Column()
  ubicacion: string

  @OneToMany(()=>Solicitud, (solicitud)=>solicitud.libro)
  solicitudes: Solicitud[]

  @OneToMany(()=>Libro_Genero, (libro_Generos)=>libro_Generos.libro)
  libro_Generos: Libro_Genero[]
}
