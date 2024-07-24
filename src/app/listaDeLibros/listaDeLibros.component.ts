import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-listaDeLibros',
  templateUrl: './listaDeLibros.component.html',
  styleUrls: ['./listaDeLibros.component.css']
})
export class ListaDeLibrosComponent implements OnInit {

  constructor(
    private librosService: LibrosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buscarLibros()
    this.buscarFormulario.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(titulo => {
        this.filtrarLibros(titulo)
      })
  }

  public librosReservados: { libro: Libro, imagenBase64: string }[]=[]
  public libros: { libro: Libro, imagenBase64: string }[] = []
  public buscarFormulario: FormControl = new FormControl()

  public buscarLibros(): void{
    this.librosService.buscarLibrosDisponibles().subscribe(response=>{
      this.libros=response
    })
    this.librosService.buscarLibrosReservados().subscribe(response=>{
      this.librosReservados=response
    })
  }

  public reservarLibro(idLibro: number): void{
    this.router.navigate(['/solicitudLibro', idLibro])
  }

  public filtrarLibros(titulo: string): void {
    if (titulo) {
      this.librosService.obtenerLibros().subscribe(response => {
        this.libros = response.filter(libro =>
          libro.libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        )
      })
      this.librosService.buscarLibrosReservados().subscribe(response=>{
        this.librosReservados= response.filter(libro=>
          libro.libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        )
      })
    } else {
      this.buscarLibros()
    }
  }
}
