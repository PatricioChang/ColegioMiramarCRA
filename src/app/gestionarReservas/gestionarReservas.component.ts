import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Libro } from '../models/Libro';
import { Solicitud } from '../models/Solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AceptarSolicitudDto } from '../DTO/aceptarSolicitud.dto';
import { DevolverLibroDto } from '../DTO/devolverLibro.dto';
import Swal from 'sweetalert2';


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
    this.formularioDevolverReserva= formBuilder.group({
      observacion: ['']
    })
  }

  ngOnInit() {
    this.cargarSolicitudes()
  }

  public aceptarReservaBoolean: boolean=false
  public devolverReservaBoolean: boolean=false
  public formularioReserva: FormGroup
  public formularioDevolverReserva: FormGroup
  public solicitud: Solicitud= new Solicitud(0,'','','',false,new Libro(0,'','',0,'',[],''))
  public libros: Libro[]=[]
  public solicitudesPorAceptar: Solicitud[]=[]
  public solicitudesPorDevolver: Solicitud[]=[]


  public cargarSolicitudes(){
    this.solicitudService.buscarSolicitudesPorDevolver().subscribe(response=>{
      this.solicitudesPorAceptar= response.filter(solicitud => !solicitud.fechaDeDevolucion)
      this.solicitudesPorDevolver= response.filter(solicitud => solicitud.fechaDeDevolucion)
    })
  }

  public iniciarAceptarReserva(solicitud: Solicitud){
   this. aceptarReservaBoolean=true
   this.solicitud= solicitud
  }

  public iniciarDevolverReserva(solicitud: Solicitud){
    this. devolverReservaBoolean=true
    this.solicitud= solicitud
   }

  public eliminarReserva(idSolicitud: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.eliminarSolicitud(idSolicitud).subscribe(() => {
          Swal.fire({
            title: 'Rechazado!',
            text: "La solicitud se ha sido eliminado.",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })
          this.cargarSolicitudes()
        })
      }
    })
  }

  public devolverReserva(){
    const devolverLibroDto: DevolverLibroDto= this.formularioDevolverReserva.value
    this.solicitudService.devolverLibro(this.solicitud.idSolicitud, devolverLibroDto).subscribe(response=>{
      console.log(response)
      if(response){
        Swal.fire({
          title: '¡Se ha devuelto la reserva!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        this.formularioReserva.reset()
        this.devolverReservaBoolean=false
        this.cargarSolicitudes()
      }
    })
  }
  

  public aceptarReserva(){
    if(this.formularioReserva.valid){
      const aceptarSolicitudDto: AceptarSolicitudDto = this.formularioReserva.value
      const fechaIngresada= new Date(aceptarSolicitudDto.fechaDeDevolucion)
      fechaIngresada.setDate(fechaIngresada.getDate()+1)
      if(fechaIngresada.getTime()>new Date().getTime()){
        this.solicitudService.aceptarSolicitud(this.solicitud.idSolicitud, aceptarSolicitudDto).subscribe(response=>{
          if(response){
            Swal.fire({
              title: '¡Se ha aceptado la reserva!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
            this.formularioReserva.reset()
            this.aceptarReservaBoolean=false
            this.cargarSolicitudes()
          }
        })
      }else{
        Swal.fire({
          title: '¡La fecha tiene que ser mayor a la actual!',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        this.formularioReserva.reset()
      }
    }else{
      Swal.fire({
        title: '¡Rellene los datos!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  }
  
  public logOut(): void{
    this.loginService.logOut()
  }
}
