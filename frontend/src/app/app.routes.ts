import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { IniciarSesionComponent } from './iniciarSesion/iniciarSesion.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'iniciarSesion', component: IniciarSesionComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];
