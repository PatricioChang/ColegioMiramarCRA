import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { LoginDto } from '../DTO/login.dto';

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
      const loginDto: LoginDto = {user: this.formLogIn.get('user')!.value, password: this.formLogIn.get('password')?.value}
      this.loginService.login(loginDto).subscribe(response=>{
        if(response && response.success){
          alert("¡Login Correcto!")
          this.router.navigateByUrl('inicioPersonal')
        }else{
          alert(response.message)
        }
      })
    }else{
      alert("¡Rellene los datos!")
    }
    this.formLogIn.reset()
  }
}
