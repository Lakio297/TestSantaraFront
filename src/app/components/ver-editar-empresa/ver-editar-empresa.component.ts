// ver-editar-empresa.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/empresa.service';
import { Empresa } from 'src/app/interfaces/Empresa';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-ver-editar-empresa',
  templateUrl: './ver-editar-empresa.component.html',
  styleUrls: ['./ver-editar-empresa.component.css'],
})
export class VerEditarEmpresaComponent implements OnInit {
  empresa: Empresa | undefined;
  imagenURL: SafeUrl | undefined;
  nombreArchivoImagen: string | undefined;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Obtener el nombre de la empresa desde los parámetros de la ruta

    this.route.params
      .pipe(switchMap(({ id }) => this.empresaService.getEmpresa(id)))
      .subscribe((empresa) => {
        if (!empresa) return this.router.navigateByUrl('');

        this.obtenerImagen(this.obtenerUltimoApartado(empresa.logoPath));

        return (this.empresa = empresa);
      });
  }

  obtenerUltimoApartado(ruta: string): string {
    // Utiliza métodos de manipulación de cadenas para obtener la última parte del path
    const partesRuta = ruta.split('\\');
    console.log(partesRuta[partesRuta.length - 1]);
    return partesRuta[partesRuta.length - 1];
  }

  obtenerImagen(nombreArchivo: string): void {
    this.empresaService.obtenerImagen(nombreArchivo).subscribe(
      (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        this.imagenURL = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      (error) => {
        console.error('Error al obtener la imagen', error);
      }
    );
  }


  editarEmpresa(): void {
    // Redirigir a la página de edición con el nombre de la empresa como parámetro
    if (this.empresa) {
      this.router.navigate(['/editar', this.empresa.id]);
    }
  }


}
