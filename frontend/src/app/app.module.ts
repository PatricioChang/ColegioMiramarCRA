import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './iniciarSesion/iniciarSesion.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { InicioPersonalComponent } from './inicioPersonal/inicioPersonal.component';

@NgModule({
  declarations: [	
    AppComponent,
    IniciarSesionComponent,
      InicioPersonalComponent
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
