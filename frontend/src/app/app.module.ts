import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
import { GestionarListaDeLibrosComponent } from './gestionarListaDeLibros/gestionarListaDeLibros.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GestionarReservasComponent } from './gestionarReservas/gestionarReservas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [	
    AppComponent,
    IniciarSesionComponent,
    InicioPersonalComponent,
    ListaDeLibrosComponent,
    SolicitudLibroComponent,
    ListaDeLibrosDigitalesComponent,
    VerLibroDigitalComponent,
    GestionarListaDeLibrosComponent,
    GestionarReservasComponent,
    EstadisticasComponent
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    PdfViewerModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    SweetAlert2Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    BaseChartDirective
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
