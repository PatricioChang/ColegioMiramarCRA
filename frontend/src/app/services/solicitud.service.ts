import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/Solicitud';
import { Observable } from 'rxjs';
import { AceptarSolicitudDto } from '../DTO/aceptarSolicitud.dto';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/solicitud'

  public buscarSolicitudes(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(this.apiUrl)
  }

  public aceptarSolicitud(idSolicitud: number, aceptarSolicitudDto: AceptarSolicitudDto): Observable<Solicitud>{
    return this.http.put<Solicitud>(this.apiUrl + "/aceptarSolicitud/" + idSolicitud, aceptarSolicitudDto)
  }

}
