import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SolicitudService } from '../services/solicitud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicioPersonal',
  templateUrl: './inicioPersonal.component.html',
  styleUrls: ['./inicioPersonal.component.css']
})
export class InicioPersonalComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private solicitudService: SolicitudService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    if(!sessionStorage.getItem('notificacionSolicitud')){
      this.solicitudService.buscarSolicitudesPorDevolver().subscribe(response=>{
        const solicitudesPorAceptar= response.filter(solicitud => !solicitud.fechaDeDevolucion)
        if(solicitudesPorAceptar.length>0){
          this.toastrService.info('¡Hay solicitudes por aceptar!', 'Notificación');
          sessionStorage.setItem('notificacionSolicitud','true')
        }
      })
    }
  }

  public gestionarListaDeLibros(): void{
    this.router.navigateByUrl('gestionarListaDeLibros')
  }

  public gestionarReservas(){
    this.router.navigateByUrl('gestionarReservas')
  }

  public verEstadisticas(){
    this.router.navigateByUrl('verEstadisticas')
  }

  public logOut(): void{
    this.loginService.logOut()
    alert('¡Se ha cerrado la sesión!')
  }
}
