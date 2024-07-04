import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { IniciarSesionComponent } from './iniciarSesion/iniciarSesion.component';
import { InicioPersonalComponent } from './inicioPersonal/inicioPersonal.component';
import { authGuard } from './guards/auth.guard';
import { ListaDeLibrosComponent } from './listaDeLibros/listaDeLibros.component';
import { SolicitudLibroComponent } from './solicitudLibro/solicitudLibro.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'iniciarSesion', component: IniciarSesionComponent},
    {path: 'inicioPersonal', component: InicioPersonalComponent, canActivate: [authGuard]},
    {path: 'listaDeLibros', component: ListaDeLibrosComponent},
    {path:'solicitudLibro/:idLibro', component: SolicitudLibroComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];
