import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-listaDeLibros',
  templateUrl: './listaDeLibros.component.html',
  styleUrls: ['./listaDeLibros.component.css']
})
export class ListaDeLibrosComponent implements OnInit {

  constructor(
    private librosService: LibrosService
  ) { }

  ngOnInit() {
    this.buscarLibros()
  }

  public libros: string[] = []

  public buscarLibros(): void{
    this.librosService.buscarLibros().subscribe(response=>{
      this.libros=response
    })
  }
}
