export interface SolicitudLibroDto {
    fechaDeSolicitud: Date
    nombreSolicitante: string
    cursoDelSolicitante?: string
    fechaDeDevolucion?: Date
    rutDelSolicitante?: string
    idLibro: number
  }