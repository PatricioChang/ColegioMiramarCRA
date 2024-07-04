import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column()
  autor: string

  @Column()
  ano: number

  @Column()
  editorial: string

  @Column()
  generos: string[]

  @Column()
  ubicacion: string
}
