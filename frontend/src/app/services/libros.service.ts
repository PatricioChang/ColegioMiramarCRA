import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Libro } from '../models/Libro';
import { SolicitudLibro } from '../DTO/solicitudLibro.dto';
import { crearLibroDto } from '../DTO/crearLibro.dto';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/libro'

  public buscarLibros(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.apiUrl + '/libros')
  }

  public buscarLibrosDisponibles(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.apiUrl + '/librosDisponibles')
  }

  public buscarLibro(idLibro: number): Observable<Libro>{
    return this.http.get<Libro>(this.apiUrl + '/libro/'+ idLibro)
  }

  public buscarLibrosReservados(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.apiUrl + '/listaReservados')
  }

  public buscarLibroReservado(idLibro: number): Observable<Libro>{
    return this.http.get<Libro>(this.apiUrl + '/libroReservado/'+ idLibro)
  }

  public solicitarLibro(solicitudLibroDto: SolicitudLibro): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl, solicitudLibroDto)
  }

  public agregarLibro(crearLibroDto: crearLibroDto): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl + '/crearLibro', crearLibroDto)
  }

  public updateLibro(libro: Libro): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${libro.idLibro}`, libro)
  }

  public borrarLibro(idLibro: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idLibro}`)
  }
}
