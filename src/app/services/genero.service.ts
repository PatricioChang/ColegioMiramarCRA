import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/Genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/genero'

  public buscarGeneros(): Observable<Genero[]>{
    return this.http.get<Genero[]>(this.apiUrl + '/generos')
  }
}
