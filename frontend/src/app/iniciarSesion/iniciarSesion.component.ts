import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciarSesion',
  templateUrl: './iniciarSesion.component.html',
  styleUrls: ['./iniciarSesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.formularioIniciarSesion= formBuilder.group({
      mail: [Validators.required]
    })
  }

  ngOnInit() {
  }

  public formularioIniciarSesion: FormGroup
}
