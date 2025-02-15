import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public listaDeLibros(): void{
    this.router.navigateByUrl('listaDeLibros')
  }

  public listaDeLibrosDigitales(): void{
    this.router.navigateByUrl('listaDeLibrosDigitales')
  }

  public estadisticasUsuario(): void{
    this.router.navigateByUrl('estadisticasUsuario')
  }
}
