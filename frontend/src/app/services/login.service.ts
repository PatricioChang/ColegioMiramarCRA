import { Injectable, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(
  private router: Router
) { }

  private userCRA: string='usuarioCRA'
  private passCRA: string='admin'

  public login(user: string, password: string): Observable<boolean>{
    if(user==this.userCRA&&password==this.passCRA){
      const token: string = btoa(user + ';' + password)
      sessionStorage.setItem('token', token)
      return of(true)
    }else{
      return of(false)
    } 
  }

  public logOut(): boolean{
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
      return true
    }
    return false
  }

  public isLoggedIn(): Observable<boolean> {
    let token = sessionStorage.getItem('token')
    if (token){
      
      try {
        let tokenDesencriptado: string= atob(token)
        console.log(tokenDesencriptado);
      
        let [user, password]= tokenDesencriptado.split(";")
        console.log(user);
        console.log(password);
      
        if(user==this.userCRA&&password==this.passCRA){
          return of(true)
        }
      } catch (error) {
        alert('¡Token incorrecto!')
        sessionStorage.removeItem('token')
        this.router.navigateByUrl('inicio')
        return of(false)
      }
    }
    this.router.navigateByUrl('inicio')
    return of(false)
  }
  
  public isAlreadyLogged(): Observable<boolean>{
    let token = sessionStorage.getItem('token') 
    if (token) {
      let [user, password]: string= atob(token)
      if(user==this.userCRA){
        this.router.navigateByUrl('inicioAdmin')
      }else{
        this.router.navigateByUrl('inicio');
      }
      return of(false);
    } 
    return of(true);
  }
}
