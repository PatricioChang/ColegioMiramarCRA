export class Libro {
  public id: number
  public titulo: string
  public autor: string
  public ano: number
  public editorial: string
  public generos: string[]
  public ubicacion: string
  constructor(id: number, titulo: string, autor: string, año: number, editorial: string, generos: string[], ubicacion: string){
    this.id=id
    this.titulo=titulo
    this.autor=autor
    this.ano=año
    this.editorial=editorial
    this.generos=generos
    this.ubicacion=ubicacion
  }
}
