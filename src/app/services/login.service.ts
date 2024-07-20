import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginDto } from '../DTO/login.dto';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(
  private router: Router,
  private httpClient: HttpClient,
) { 
  this.checkTokenExpiration()
}

  private apiUrl = 'http://colegiomiramarcra-production.up.railway.app/auth/login'

  public login(loginDto: LoginDto): Observable<{ success: boolean; message?: string }> {
    return this.httpClient.post<any>(this.apiUrl, loginDto).pipe(
      map(result => {
        if (result && result.token) {
          sessionStorage.setItem('token', result.token);
          return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
      }),
      catchError(error => {
        console.error('Error durante el inicio de sesion', error);
        let errorMessage = 'An error occurred during login';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return of({ success: false, message: errorMessage });
      })
    );
  }

  public logOut(): boolean{
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('notificacionSolicitud')
      Swal.fire({
        title: '¡Se ha cerrado la sesión!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
      return true
    }
    return false
  }

  private checkTokenExpiration() {
    const token = sessionStorage.getItem('token');
    if (token) {
      let decodedToken: any;
      try {
        decodedToken = jwtDecode(token);
      } catch (error) {
        Swal.fire({
          title: '¡Token invalido!',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('inicio');
        return; 
      }

      const expirationTimeInSeconds: number = decodedToken.exp;
      const currentTimeInSeconds: number = Math.floor(Date.now() / 1000);

      if (currentTimeInSeconds > expirationTimeInSeconds) {
        Swal.fire({
          title: '¡Se expiro el token vuelva a iniciar sesión!',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        this.logOut();
        this.router.navigateByUrl('inicio');
      }
    }
  }

  public isLoggedIn(): Observable<boolean> {
    let token = sessionStorage.getItem('token')
    if (token){
      return of(true)
    }
    this.router.navigateByUrl('inicio')
    return of(false)
  }
  
  public isAlreadyLogged(): Observable<boolean>{
    let token = sessionStorage.getItem('token') 
    if (token) {
      this.router.navigateByUrl('inicioAdmin')
      return of(true);
    }else{
      this.router.navigateByUrl('inicio');
      return of(false);
    }
  }
}
