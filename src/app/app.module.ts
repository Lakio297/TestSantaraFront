import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearEmpresaComponent } from './components/crear-empresa/crear-empresa.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { VerEditarEmpresaComponent } from './components/ver-editar-empresa/ver-editar-empresa.component';
import { ListadoEmpresasComponent } from './components/listado-empresas/listado-empresas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarEmpresaComponent } from './components/editar-empresa/editar-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearEmpresaComponent,
    InicioComponent,
    VerEditarEmpresaComponent,
    ListadoEmpresasComponent,
    EditarEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
