import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { Libro } from './Libro.entity';

@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn("increment",{ type: 'int', name: 'idSolicitud' })
  idSolicitud: number

  @Column({ nullable: true })
  @IsOptional()
  rutSolicitante: string

  @Column()
  nombreSolicitante: string

  @Column({ nullable: true })
  @IsOptional()
  cursoDelSolicitante: string

  @Column()
  fechaDeSolicitud: string

  @Column()
  horaDeSolicitud: string

  @Column()
  devuelto: boolean

  @Column({ nullable: true })
  @IsOptional()
  fechaDeDevolucion: string

  @Column({ nullable: true })
  @IsOptional()
  horaDeDevolucion: string

  @Column({ nullable: true })
  @IsOptional()
  observacion: string

  @ManyToOne(()=> Usuario, (usuario)=> usuario.solicitudes)
  @JoinColumn([{name: "idUsuario", referencedColumnName: "idUsuario"}])
  idUsuario: Usuario

  @ManyToOne(()=> Libro, (libro)=> libro.solicitudes, { onDelete: "CASCADE", onUpdate: "CASCADE"})
  @JoinColumn([{name:"idLibro"}])
  libro: Libro
}
