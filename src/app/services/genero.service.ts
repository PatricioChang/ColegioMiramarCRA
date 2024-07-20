import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/Genero';
import { CrearGeneroDto } from '../DTO/crearGenero.dto';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  constructor(private http: HttpClient) { }

  private apiUrl= 'http://colegiomiramarcra-production.up.railway.app/genero'

  public buscarGeneros(): Observable<Genero[]>{
    return this.http.get<Genero[]>(this.apiUrl + '/generos')
  }

  public agregarGenero(crearGeneroDto: CrearGeneroDto): Observable<Genero>{
    return this.http.post<Genero>(this.apiUrl + '/crearGenero', crearGeneroDto)
  }

  public borrarGenero(idGenero: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + idGenero)
  }
}