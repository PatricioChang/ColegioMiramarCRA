import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { Router } from '@angular/router';

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
  }

  public libros: Libro[] = []
  public librosReservados: Libro[]=[]

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
}
