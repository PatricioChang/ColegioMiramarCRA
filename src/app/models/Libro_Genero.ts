import { Genero } from "./Genero"

export class Libro_Genero {
    public id: number
    public genero: Genero
    constructor(id: number, genero: Genero){
      this.id=id
      this.genero=genero
    }
  }