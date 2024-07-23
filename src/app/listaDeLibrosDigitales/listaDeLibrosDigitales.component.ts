import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from '../models/Libro';
import { LibrosService } from '../services/libros.service';
import { PdfService } from '../services/pdf.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-listaDeLibrosDigitales',
  templateUrl: './listaDeLibrosDigitales.component.html',
  styleUrls: ['./listaDeLibrosDigitales.component.css']
})
export class ListaDeLibrosDigitalesComponent implements OnInit {

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private libroService: LibrosService
  ) {

    }

  ngOnInit(): void {
    this.cargarLibrosDigitales()
    this.buscarFormulario.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(titulo => {
        this.filtrarLibros(titulo)
      })
  }

  public librosDigitales: Libro[]=[]
  public buscarFormulario: FormControl = new FormControl()

  public cargarLibrosDigitales() {
    this.libroService.buscarLibros().subscribe(libros=>{
      this.pdfService.buscarPdfs().subscribe(response=>{
        const librosConPdf = response.map(pdf => pdf.idLibro)
        libros.forEach(libro => {
          if (libro.url || librosConPdf.includes(libro.idLibro)) {
            this.librosDigitales.push(libro)
          }
        })
      })
    })
  }

  public verLibro(idLibro: number) {
    this.router.navigate(['/verLibroDigital', idLibro]);
  }

  public filtrarLibros(titulo: string): void {
    if (titulo) {
      this.pdfService.buscarPdfs().subscribe(response => {
        this.librosDigitales = response.filter(libro =>
          libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        )
      })
    } else {
      this.cargarLibrosDigitales()
    }
  }
}
