import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicioPersonal',
  templateUrl: './inicioPersonal.component.html',
  styleUrls: ['./inicioPersonal.component.css']
})
export class InicioPersonalComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public gestionarListaDeLibros(): void{
    this.router.navigateByUrl('gestionarListaDeLibros')
  }

  public gestionarReservas(){
    this.router.navigateByUrl('gestionarReservas')
  }

  public logOut(): void{
    this.loginService.logOut()
    alert('¡Se ha cerrado la sesión!')
  }
}
