import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { IniciarSesionComponent } from './iniciarSesion/iniciarSesion.component';
import { InicioPersonalComponent } from './inicioPersonal/inicioPersonal.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'iniciarSesion', component: IniciarSesionComponent},
    {path: 'inicioPersonal', component: InicioPersonalComponent, canActivate: [authGuard]},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];
