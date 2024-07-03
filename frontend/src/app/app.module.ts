import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './iniciarSesion/iniciarSesion.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { InicioPersonalComponent } from './inicioPersonal/inicioPersonal.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaDeLibrosComponent } from './listaDeLibros/listaDeLibros.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    InicioPersonalComponent,
    ListaDeLibrosComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
