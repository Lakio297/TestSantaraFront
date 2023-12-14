// listado-empresas.component.ts
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmpresaService } from 'src/app/empresa.service';
import { Empresa } from 'src/app/interfaces/Empresa';


@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit {
  empresas: Empresa[] = [];
  imagenURL: SafeUrl | undefined;
  nombreArchivoImagen: string | undefined;

  constructor(private empresaService: EmpresaService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  obtenerEmpresas(): void {
    this.empresaService.getEmpresas().subscribe(
      (data: Empresa[]) => {
        this.empresas = data;
      },
      error => {
        console.error('Error al obtener la lista de empresas', error);
      }
    );
  }

  eliminarEmpresa(id: number): void {
    this.empresaService.eliminarEmpresa(id).subscribe(
      () => {
        console.log('Empresa eliminada correctamente');
        // Realizar acciones adicionales si es necesario
        this.obtenerEmpresas(); // Actualizar la lista después de eliminar
        window.location.reload();
      },
      error => {
        console.error('Error al eliminar la empresa', error);
        window.location.reload();
        // Manejar el error según tus necesidades
      }
    );
  }

}
