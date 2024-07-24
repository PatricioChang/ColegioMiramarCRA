import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Libro } from '../models/Libro';
import { LibrosService } from './libros.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

constructor(
  private http: HttpClient,
  private libroService: LibrosService
) { }

private apiUrl= 'https://colegiomiramarcra-production.up.railway.app/pdf'

public buscarPdfs(): Observable<{ libro: Libro, imagenBase64: string }[]>{
  return this.http.get<Libro[]>(this.apiUrl).pipe(
    map(libros => libros.map(libro => {
      let imagenBase64 = ''
      if (libro.img && libro.img.data) {
        imagenBase64 = this.libroService.convertirArrayBufferABase64(libro.img.data)
      }
      return { libro, imagenBase64 }
    }))
  )
}

public buscarPdf(idLibro: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/${idLibro}`, { responseType: 'blob' });
}

public eliminarPdf(idLibro: number): Observable<void> {
  return this.http.delete<void>(this.apiUrl + "/" + idLibro)
}

}
