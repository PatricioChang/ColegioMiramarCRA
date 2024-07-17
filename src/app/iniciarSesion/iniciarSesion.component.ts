import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { LoginDto } from '../DTO/login.dto';
import Swal from 'sweetalert2';

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
          Swal.fire({
            title: '¡Login correcto!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
          this.router.navigateByUrl('inicioPersonal')
        }else{
          Swal.fire({
            title: '¡'+response.message+'!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        }
      })
    }else{
      Swal.fire({
        title: '¡Rellene los datos!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
    this.formLogIn.reset()
  }
}
