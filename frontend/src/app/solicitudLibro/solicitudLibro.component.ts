import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitudLibro',
  templateUrl: './solicitudLibro.component.html',
  styleUrls: ['./solicitudLibro.component.css']
})
export class SolicitudLibroComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.formularioSolicitudLibro= formBuilder.group({
      name: ['',Validators.required],
      grade: ['',Validators.required],
      rut: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  public formularioSolicitudLibro: FormGroup

  public solicitarLibro(): void{
    if(this.formularioSolicitudLibro.valid){
      alert('formulario correcto')
    }else{
      alert('¡Relle todos los campos!')
    }
  }
}
