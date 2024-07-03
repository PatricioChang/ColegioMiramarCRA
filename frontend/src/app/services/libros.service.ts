import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

constructor(private http: HttpClient) { }

  private libros: string[]=[]
  private apiUrl= 'http://localhost:3000/listaDeLibros'

  
  public buscarLibros(): Observable<string[]>{
    return this.http.get<string[]>(this.apiUrl)
  }
}
