import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from '../models/Libro';
import { LibrosService } from '../services/libros.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-listaDeLibrosDigitales',
  templateUrl: './listaDeLibrosDigitales.component.html',
  styleUrls: ['./listaDeLibrosDigitales.component.css']
})
export class ListaDeLibrosDigitalesComponent implements OnInit {

  constructor(
    private router: Router,
    private pdfService: PdfService) {

    }

  ngOnInit(): void {
    this.cargarLibrosDigitales();
  }

  public librosDigitales: Libro[]=[]

  public cargarLibrosDigitales() {
    this.pdfService.buscarPdfs().subscribe(response=>{
      this.librosDigitales=response
    })
  }

  public verLibro(idLibro: number) {
    this.router.navigate(['/verLibroDigital', idLibro]);
  }
}
