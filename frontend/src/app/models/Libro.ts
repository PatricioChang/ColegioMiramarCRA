import { Libro_Genero } from "./Libro_Genero"

export class Libro {
  public idLibro: number
  public titulo: string
  public autor: string
  public ano: number
  public editorial: string
  public libro_Generos: Libro_Genero[]
  public ubicacion: string
  constructor(idLibro: number, titulo: string, autor: string, año: number, editorial: string, libro_Generos: Libro_Genero[], ubicacion: string){
    this.idLibro=idLibro
    this.titulo=titulo
    this.autor=autor
    this.ano=año
    this.editorial=editorial
    this.libro_Generos=libro_Generos
    this.ubicacion=ubicacion
  }
}
