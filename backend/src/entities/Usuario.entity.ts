import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  usuario: string

  @Column()
  contraseña: string
}
