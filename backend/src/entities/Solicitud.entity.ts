import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { Libro } from './Libro.entity';

@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsOptional()
  rutSolicitante: string

  @Column()
  nombreSolicitante: string

  @Column()
  @IsOptional()
  cursoDelSolicitante: string

  @Column()
  fechaDeSolicitud: string

  @Column()
  horaDeSolicitud: string

  @Column()
  devuelto: boolean

  @Column()
  @IsOptional()
  fechaDeDevolucion: string

  @Column()
  horaDeDevolucion: string

  @Column()
  @IsOptional()
  observacion: string

  @ManyToOne(()=> Usuario, (usuario)=> usuario.solicitudes)
  @JoinColumn([{name: "idUsuario", referencedColumnName: "idUsuario"}])
  idUsuario: Usuario

  @ManyToOne(()=> Libro, (libro)=> libro.solicitudes)
  @JoinColumn([{name:"idLibro", referencedColumnName:"idLibro"}])
  idLibro: Libro
}
