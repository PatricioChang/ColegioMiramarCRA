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
import { SolicitudLibroComponent } from './solicitudLibro/solicitudLibro.component';
import { ListaDeLibrosDigitalesComponent } from './listaDeLibrosDigitales/listaDeLibrosDigitales.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VerLibroDigitalComponent } from './verLibroDigital/verLibroDigital.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    InicioPersonalComponent,
    ListaDeLibrosComponent,
    SolicitudLibroComponent,
    ListaDeLibrosDigitalesComponent,
    VerLibroDigitalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
