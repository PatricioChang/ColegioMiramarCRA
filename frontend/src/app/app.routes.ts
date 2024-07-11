import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { IniciarSesionComponent } from './iniciarSesion/iniciarSesion.component';
import { InicioPersonalComponent } from './inicioPersonal/inicioPersonal.component';
import { authGuard } from './guards/auth.guard';
import { ListaDeLibrosComponent } from './listaDeLibros/listaDeLibros.component';
import { SolicitudLibroComponent } from './solicitudLibro/solicitudLibro.component';
import { ListaDeLibrosDigitalesComponent } from './listaDeLibrosDigitales/listaDeLibrosDigitales.component';
import { VerLibroDigitalComponent } from './verLibroDigital/verLibroDigital.component';
import { GestionarListaDeLibrosComponent } from './gestionarListaDeLibros/gestionarListaDeLibros.component';
import { GestionarReservasComponent } from './gestionarReservas/gestionarReservas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'iniciarSesion', component: IniciarSesionComponent},
    {path: 'inicioPersonal', component: InicioPersonalComponent, canActivate: [authGuard]},
    {path: 'listaDeLibros', component: ListaDeLibrosComponent},
    {path:'solicitudLibro/:idLibro', component: SolicitudLibroComponent},
    {path: 'listaDeLibrosDigitales', component: ListaDeLibrosDigitalesComponent},
    {path: 'verLibroDigital/:idLibro', component: VerLibroDigitalComponent},
    {path: 'gestionarListaDeLibros', component: GestionarListaDeLibrosComponent, canActivate: [authGuard]},
    {path: 'gestionarReservas', component:GestionarReservasComponent, canActivate: [authGuard]},
    {path: 'verEstadisticas', component: EstadisticasComponent, canActivate: [authGuard]},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: '**',redirectTo: '/inicio'}
];
