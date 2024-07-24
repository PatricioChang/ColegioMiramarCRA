import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Solicitud } from './Solicitud.entity';
import { Libro_Genero } from './Libro_Genero.entity';
import { Pdf } from './Pdf.entity';
import { IsOptional } from 'class-validator';

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

  @Column({ nullable: true })
  @IsOptional()
  url: string

  @Column({ type: 'longblob', nullable: true })
  @IsOptional()
  img: Buffer;

  @OneToMany(()=>Solicitud, (solicitud)=>solicitud.libro)
  solicitudes: Solicitud[]

  @OneToMany(()=>Libro_Genero, (libro_Generos)=>libro_Generos.libro)
  libro_Generos: Libro_Genero[]

  @OneToOne(() => Pdf, pdf => pdf.libro)
  pdf: Pdf;
}
