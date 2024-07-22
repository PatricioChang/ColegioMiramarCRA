import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Libro } from './Libro.entity';

@Entity('pdf')
export class Pdf {
  @PrimaryGeneratedColumn("increment",{type: "int", name:"idPdf"})
  idPdf: number

  @Column()
  nombreArchivo: string

  @Column('longblob')
  data: Buffer

  @OneToOne(() => Libro, (libro) => libro.pdf, { onDelete: "CASCADE", onUpdate: "CASCADE"})
  @JoinColumn({ name: 'idLibro' })
  libro: Libro;
}
