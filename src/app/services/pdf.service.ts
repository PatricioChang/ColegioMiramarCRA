import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/Libro';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

constructor(private http: HttpClient) { }

private apiUrl= 'http://colegiomiramarcra-production.up.railway.app/pdf'

public buscarPdfs(): Observable<Libro[]>{
  return this.http.get<Libro[]>(this.apiUrl)
}

public buscarPdf(idPdf: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/${idPdf}`, { responseType: 'blob' });
}
}
