import { Libro_Genero } from "../models/Libro_Genero"

export interface CrearEditarLibroDto {
   titulo: string
   autor: string
   anio: number
   editorial: string
   libro_Generos: Libro_Genero[]
   ubicacion: string
   pdf?: string
   img?: string
  }