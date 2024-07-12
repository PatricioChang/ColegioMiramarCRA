import { Libro } from './Libro';

export class Solicitud {
  idSolicitud: number;
  rutSolicitante?: string;
  nombreSolicitante: string;
  cursoDelSolicitante?: string;
  fechaDeSolicitud: string;
  horaDeSolicitud: string;
  devuelto: boolean;
  fechaDeDevolucion?: string;
  horaDeDevolucion?: string;
  observacion?: string;
  libro: Libro;
  constructor(idSolicitud: number, nombreSolicitante: string, fechaDeSolicitud: string, horaDeSolicitud: string, devuelto: boolean, libro: Libro, rutSolicitante?: string, cursoDelSolicitante?: string, fechaDeDevolucion?: string, horaDeDevolucion?: string, observacion?: string) {
    this.idSolicitud = idSolicitud;
    this.rutSolicitante = rutSolicitante;
    this.nombreSolicitante = nombreSolicitante;
    this.cursoDelSolicitante = cursoDelSolicitante;
    this.fechaDeSolicitud = fechaDeSolicitud;
    this.horaDeSolicitud = horaDeSolicitud;
    this.devuelto = devuelto;
    this.fechaDeDevolucion = fechaDeDevolucion;
    this.horaDeDevolucion = horaDeDevolucion;
    this.observacion = observacion;
    this.libro = libro;
  }
}