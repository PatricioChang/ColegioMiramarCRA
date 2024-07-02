import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciarSesion',
  templateUrl: './iniciarSesion.component.html',
  styleUrls: ['./iniciarSesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formLogIn= formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  public formLogIn: FormGroup

  public iniciarSesion(): void{
    if(this.formLogIn.valid){
      this.loginService.login(this.formLogIn.get('user')!.value, this.formLogIn.get("password")?.value).subscribe(response=>{
        if(response){
          alert("¡Login Correcto!")
          this.router.navigateByUrl('inicioPersonal')
        }else{
          alert("¡Login Incorrecto!")
        }
      })
    }else{
      alert("¡Rellene los datos!")
    }
    this.formLogIn.reset()
  }
}
