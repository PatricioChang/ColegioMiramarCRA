import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Libro_Genero } from './Libro_Genero.entity';

@Entity('genero')
export class Genero {
  @PrimaryGeneratedColumn("increment",{type:"int", name:"idGenero"})
  idGenero: number

  @Column("varchar", { unique: true })
  nombre: string

  @OneToMany(()=>Libro_Genero, (libros_Genero)=>libros_Genero.genero)
  libros_Genero: Libro_Genero[]
}
