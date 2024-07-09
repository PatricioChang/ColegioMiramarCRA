import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Genero } from './Genero.entity';
import { Libro } from './Libro.entity';

@Entity('libro_genero')
export class Libro_Genero {
    @PrimaryGeneratedColumn("increment",{ type: 'int', name: 'idLibro_Genero' })
  idLibro_Genero: number;

  @ManyToOne(() => Libro, (libro) => libro.libro_Generos)
  @JoinColumn({ name: 'idLibro' })
  libro: Libro;

  @ManyToOne(() => Genero, (genero) => genero.libros_Genero)
  @JoinColumn({ name: 'idGenero' })
  genero: Genero;
}
