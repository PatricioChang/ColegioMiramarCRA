import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from '../services/libros.service';
import { SolicitudLibroDto } from '../DTO/solicitudLibro.dto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudLibro',
  templateUrl: './solicitudLibro.component.html',
  styleUrls: ['./solicitudLibro.component.css']
})
export class SolicitudLibroComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private librosService: LibrosService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.formularioSolicitudLibro= formBuilder.group({
      name: ['',Validators.required],
      userType: ['', Validators.required],
      grade: ['', Validators.required],
      rut: [],
    })
  }

  ngOnInit() {
    this.idLibro= +this.route.snapshot.paramMap.get('idLibro')!
    this.comprobarReserva()
  }

  public formularioSolicitudLibro: FormGroup
  public idLibro: number=0
  public cursosEducacionGeneralBasica: string[] = [
    '1°A', '1°B', '1°C', '2°A', '2°B', '2°C', 
    '3°A', '3°B', '3°C', '4°A', '4°B', '4°C', 
    '5°A', '5°B', '5°C', '6°A', '6°B', '6°C', 
    '7°A', '7°B', '8°A', '8°B', '8°C'
  ]
  public cursosEnsenanzaMedia: string[] = [
    '1°AHC', '1°BHC', '1°ATP', '1°BTP', 
    '2°AHC', '2°BHC', '2°ATP', '2°BTP', 
    '3°A HC', '3°A ADMINISTRACIÓN', '3°A PARVULOS', '3°B ENFERMERÍA', 
    '4°A HC', '4°A ADMINISTRACIÓN', '4°A PARVULOS', '4°B ENFERMERÍA'
  ]

  public cambioUserType() {
    const tipoUsuario = this.formularioSolicitudLibro.controls['userType'].value
    if (tipoUsuario === 'funcionario') {
      this.formularioSolicitudLibro.patchValue({ grade: 'Funcionario' })
      this.formularioSolicitudLibro.controls['grade'].clearValidators()
      this.formularioSolicitudLibro.controls['grade'].setValidators([Validators.required])
    } else {
      this.formularioSolicitudLibro.controls['grade'].setValidators([Validators.required])
    }
    this.formularioSolicitudLibro.controls['grade'].updateValueAndValidity()
  }

  public comprobarReserva(): void{
    this.librosService.buscarLibroReservado(this.idLibro).subscribe(response=>{
      if(response){
        Swal.fire({
          title: '¡El libro ya esta reservado!',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        this.router.navigateByUrl('listaDeLibros')
      }else{  
        this.librosService.buscarLibro(this.idLibro).subscribe(response=>{
          if(!response){
            Swal.fire({
              title: '¡El libro no existe!',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
            this.router.navigateByUrl('listaDeLibros')
          }
        })
      }
    })
  }

  public solicitarLibro(): void{
    if(this.formularioSolicitudLibro.valid){
      const solicitudLibroDto: SolicitudLibroDto= this.formularioSolicitudLibro.value
      solicitudLibroDto.fechaDeSolicitud= new Date()
      solicitudLibroDto.idLibro=this.idLibro
      this.librosService.solicitarLibro(solicitudLibroDto).subscribe(response=>{
        if(response){
          Swal.fire({
            title: '¡Reserva hecha!',
            text: "Se confirmo la reserva.",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
          this.router.navigateByUrl('listaDeLibros')
        }else{
          Swal.fire({
            title: '¡Hubo un error en la reserva!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        }
      })
    }else{
      Swal.fire({
        title: '¡Rellene todos los campos!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  }
}
