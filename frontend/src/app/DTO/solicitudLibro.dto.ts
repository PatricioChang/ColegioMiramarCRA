export interface SolicitudLibro {
    fechaDeSolicitud: Date
    nombreSolicitante: string
    cursoDelSolicitante?: string
    fechaDeDevolucion?: Date
    rutDelSolicitante?: string
    idLibro: number
  }