import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearEmpresaComponent } from './components/crear-empresa/crear-empresa.component';
import { ListadoEmpresasComponent } from './components/listado-empresas/listado-empresas.component';
import { VerEditarEmpresaComponent } from './components/ver-editar-empresa/ver-editar-empresa.component';
import { EditarEmpresaComponent } from './components/editar-empresa/editar-empresa.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'crear', component: CrearEmpresaComponent }, // Asegúrate de agregar las rutas existentes
  { path: 'listado', component: ListadoEmpresasComponent }, // Asegúrate de agregar las rutas existentes
  { path: 'ver/:id', component: VerEditarEmpresaComponent},
  { path: 'editar/:id', component: EditarEmpresaComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
