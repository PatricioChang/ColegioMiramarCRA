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
      grade: [],
      rut: [],
    })
  }

  ngOnInit() {
    this.idLibro= +this.route.snapshot.paramMap.get('idLibro')!
    this.comprobarReserva()
  }

  public formularioSolicitudLibro: FormGroup
  public idLibro: number=0

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
