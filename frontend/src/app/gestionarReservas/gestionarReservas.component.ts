import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Libro } from '../models/Libro';
import { Solicitud } from '../models/Solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AceptarSolicitudDto } from '../DTO/aceptarSolicitud.dto';

@Component({
  selector: 'app-gestionarReservas',
  templateUrl: './gestionarReservas.component.html',
  styleUrls: ['./gestionarReservas.component.css']
})
export class GestionarReservasComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private solicitudService: SolicitudService,
    private formBuilder: FormBuilder
  ) { 
    this.formularioReserva= formBuilder.group({
      fechaDeDevolucion: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.cargarSolicitudes()
  }

  public aceptarReservaBoolean: boolean=false
  public formularioReserva: FormGroup
  public solicitud: Solicitud= new Solicitud(0,'','','',false,new Libro(0,'','',0,'',[],''))
  public libros: Libro[]=[]
  public solicitudes: Solicitud[]=[]

  public cargarSolicitudes(){
    this.solicitudService.buscarSolicitudes().subscribe(response=>{
      this.solicitudes=response
    })
  }

  public iniciarAceptarReserva(solicitud: Solicitud){
   this. aceptarReservaBoolean=true
   this.solicitud= solicitud
  }

  public eliminarLibro(){

  }

  public aceptarReserva(){
    if(this.formularioReserva.valid){
      const aceptarSolicitudDto: AceptarSolicitudDto = this.formularioReserva.value
      const fechaIngresada= new Date(aceptarSolicitudDto.fechaDeDevolucion)
      fechaIngresada.setDate(fechaIngresada.getDate()+1)
      if(fechaIngresada.getTime()>new Date().getTime()){
        this.solicitudService.aceptarSolicitud(this.solicitud.idSolicitud, aceptarSolicitudDto).subscribe(response=>{
          if(response){
            alert('¡Se ha aceptado la reserva!')
            this.formularioReserva.reset()
            this.aceptarReservaBoolean=false
          }
        })
      }else{
        alert('¡La fecha tiene que ser mayor a la actual!')
        this.formularioReserva.reset()
      }
    }else{
      alert('¡Rellene los datos!')
    }
  }
  
  public logOut(): void{
    this.loginService.logOut()
    alert('¡Se ha cerrado la sesión!')
  }
}
