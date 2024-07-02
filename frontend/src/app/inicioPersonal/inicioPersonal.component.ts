import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-inicioPersonal',
  templateUrl: './inicioPersonal.component.html',
  styleUrls: ['./inicioPersonal.component.css']
})
export class InicioPersonalComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  public gestionarLibros(): void{
    alert('Gestionar libros')
  }

  public logOut(): void{
    this.loginService.logOut()
    alert('¡Se ha cerrado la sesión!')
  }
}
