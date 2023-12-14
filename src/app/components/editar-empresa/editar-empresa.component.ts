import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { EmpresaService } from 'src/app/empresa.service';
import { Empresa } from 'src/app/interfaces/Empresa';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {
  empresaForm: FormGroup;
  empresaId: number;
  empresa: Empresa;
  previewImageUrl: SafeUrl | undefined;

  selectedLogoFile: File | undefined;
  previewImage: string | ArrayBuffer | null = null; // Nueva propiedad para la imagen de vista previa

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.empresaForm = this.fb.group({
      nombre: [''],
      registro: [''],
      direccionCalle: [''],
      numeroExterior: [''],
      numeroPuerta: [''],
      colonia: [''],
      ciudad: [''],
      provincia: [''],
      codigoPostal: [''],
      pais: [''],
      telefono: [''],
      correo: [''],
      sitioWeb: [''],
      rfc: [''],
      moneda: [''],
      logo: [],
    });

    // Inicializar empresaId y empresa
    this.empresaId = 0; // O el valor inicial que prefieras
    this.empresa = {} as Empresa; // O el valor inicial que prefieras
  }

  ngOnInit(): void {
    // Cargar datos de la empresa al iniciar el componente
    this.obtenerDatosEmpresa();
  }

  obtenerDatosEmpresa(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.empresaService.getEmpresa(id)),
      catchError((error) => {
        console.error('Error al obtener datos de la empresa', error);
        this.router.navigateByUrl(''); // Redirigir a una página predeterminada en caso de error
        return EMPTY; // Devolver un observable vacío para que la suscripción no se rompa
      })
    ).subscribe((empresa) => {
      if (!empresa) {
        console.error('No se pudo obtener la empresa');
        this.router.navigateByUrl(''); // Redirigir a una página predeterminada si no se obtiene la empresa

        return;
      }

      this.empresaId = empresa.id;
      this.empresa = empresa;

      this.obtenerImagen(this.obtenerUltimoApartado(empresa.logoPath));

      // Actualizar valores del formulario con los datos de la empresa
      this.empresaForm.patchValue({
        nombre: empresa.nombre,
        registro: empresa.registro,
        direccionCalle: empresa.direccionCalle,
        numeroExterior: empresa.numeroExterior,
        numeroPuerta: empresa.numeroPuerta,
        colonia: empresa.colonia,
        ciudad: empresa.ciudad,
        provincia: empresa.provincia,
        codigoPostal: empresa.codigoPostal,
        pais: empresa.pais,
        telefono: empresa.telefono,
        correo: empresa.correo,
        sitioWeb: empresa.sitioWeb,
        rfc: empresa.rfc,
        moneda: empresa.moneda,
      });
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
        this.previewImageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      (error) => {
        console.error('Error al obtener la imagen', error);
      }
    );
  }

  onLogoSelected(event: any) {
    const file = event.target.files[0];
    this.selectedLogoFile = file;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    } else {
      this.previewImage = null;
    }
  }

  aplicarEdicion(): void {

    if (this.empresaForm.invalid) {
      console.error('Por favor, completa todos los campos obligatorios');

      Object.keys(this.empresaForm.controls).forEach(key => {
        const control = this.empresaForm.get(key);
        if (control?.invalid) {
          console.log(`Control ${key} es inválido. Errores:`, control.errors);
        }
      });

      return;
    }
    // Verificar si el formulario es válido antes de enviar la solicitud
    if (this.empresaForm.valid) {
      // Obtener el ID de la empresa desde la ruta
      const id = this.empresaId;
      console.log(this.empresaForm.value);

      // Llamar al servicio de editarEmpresa
      this.empresaService.editarEmpresa(id, this.empresaForm.value).subscribe(
        (empresa) => {
          console.log('Empresa editada correctamente:', empresa);
          // Redirigir a la página de detalles o a donde sea necesario
        },
        (error) => {
          console.error('Error al editar la empresa', error);
        }
      );
    } else {
      console.error('El formulario no es válido');
    }
  }
}
