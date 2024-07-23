import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Libro } from '../models/Libro';
import { SolicitudLibroDto } from '../DTO/solicitudLibro.dto';
import { CrearEditarLibroDto } from '../DTO/crearEditarLibro.dto';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

constructor(private http: HttpClient) { }

  private apiUrl= 'https://colegiomiramarcra-production.up.railway.app/libro'

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

  public solicitarLibro(solicitudLibroDto: SolicitudLibroDto): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl, solicitudLibroDto)
  }

  public agregarLibro(crearEditarLibroDto: CrearEditarLibroDto): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl + '/crearLibro', crearEditarLibroDto)
  }

  public editarLibro(idLibro: number, crearEditarLibroDto: FormData): Observable<Libro> {
    return this.http.put<Libro>(this.apiUrl + '/editarLibro/' + idLibro, crearEditarLibroDto)
  }

  public borrarLibro(idLibro: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + idLibro)
  }

  public eliminarUrlDeLibro(idLibro: number): Observable<Libro>{
    return this.http.put<Libro>(this.apiUrl + '/eliminarUrlDeLibro/' + idLibro,{})
  }
}