import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from '../services/libros.service';
import { SolicitudLibro } from '../DTO/solicitudLibro.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
      amount: []
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
        alert('¡El libro ya esta reservado!')
        this.router.navigateByUrl('listaDeLibros')
      }else{
        this.librosService.buscarLibro(this.idLibro).subscribe(response=>{
          if(!response){
            alert('¡El libro no existe!')
            this.router.navigateByUrl('listaDeLibros')
          }
        })
      }
    })
  }

  public solicitarLibro(): void{
    if(this.formularioSolicitudLibro.valid){
      const solicitudLibroDto: SolicitudLibro= this.formularioSolicitudLibro.value
      solicitudLibroDto.fechaDeSolicitud= new Date()
      solicitudLibroDto.idLibro=this.idLibro
      console.log(solicitudLibroDto)
      this.librosService.solicitarLibro(solicitudLibroDto).subscribe(response=>{
        if(response){
          alert('¡Reserva hecha!')
          this.router.navigateByUrl('listaDeLibros')
        }else{
          alert('¡Hubo un error en la reserva!')
        }
      })
    }else{
      alert('¡Relle todos los campos!')
    }
  }
}
