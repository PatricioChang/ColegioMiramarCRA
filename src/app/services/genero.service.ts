import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/Genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  constructor(private http: HttpClient) { }

  private apiUrl= 'https://colegiomiramarcrabackend-966dcdc0a6ed.herokuapp.com/genero'

  public buscarGeneros(): Observable<Genero[]>{
    return this.http.get<Genero[]>(this.apiUrl + '/generos')
  }
}
