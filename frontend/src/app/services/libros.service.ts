import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Libro } from '../models/Libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/listaDeLibros'

  public buscarLibros(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.apiUrl)
  }
}
