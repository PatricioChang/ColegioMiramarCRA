import { Libro_Genero } from "../models/Libro_Genero"

export interface crearLibroDto {
   titulo: string
   autor: string
   anio: number
   editorial: string
   libro_Generos: Libro_Genero[]
   ubicacion: string
  }