import { EmpresaService } from './../../empresa.service';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/interfaces/Empresa';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css'],
})
export class CrearEmpresaComponent {
  empresaForm!: FormGroup;
  selectedLogoFile: File | undefined;
  previewImageUrl: string | ArrayBuffer | null = null; // Nueva propiedad para la imagen de vista previa
  modoEdicion: boolean = false;
  mensajeExito: string | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private empresaService: EmpresaService
  ) {}

  ngOnInit() {
    // Inicialización del formulario reactivo
    this.empresaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccionCalle: [''],
      numeroExterior: [''],
      numeroPuerta: [''],
      colonia: [''],
      ciudad: [''],
      provincia: ['', Validators.required], // Hacer que la provincia sea obligatoria
      codigoPostal: [''],
      pais: ['', Validators.required], // Hacer que el país sea obligatorio
      telefono: [''],
      correo: ['', Validators.required],
      sitioWeb: [''],
      rfc: ['', Validators.required], // Hacer que el RFC sea obligatorio
      registro: ['', Validators.required],
      logo: [],
      moneda: ['', Validators.required], // Hacer que la moneda sea obligatoria
    });
  }

  descartarCambios() {
    const confirmacion = confirm(
      'ALERTA: El registro ha sido modificado. Sus cambios se descartarán. ¿Desea continuar?'
    );

    if (confirmacion) {
      console.log('Limpiezito pa');
      this.resetFormulario();
    }
  }

  guardarEmpresa() {
    try {

      Object.values(this.empresaForm.controls).forEach(control => {
        control.markAsTouched();
      });

      // Validaciones antes de enviar la solicitud
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

      console.log(this.empresaForm.value);
      // Llama al servicio con el formulario
      this.empresaService.crearEmpresa(this.empresaForm).subscribe(
        (response) => {
          console.log('Empresa creada con éxito');
          this.modoEdicion = true;
          this.mensajeExito = 'Empresa creada con éxito';
          // Otros procesos necesarios después de guardar
        },
        (error) => {
          if (error instanceof ErrorEvent) {
            // Errores de cliente, como la pérdida de conexión
            console.error('Error de red:', error.message);
          } else {
            // Manejar otros errores
            console.error('Error al crear la empresa', error);

            // Asegúrate de realizar acciones adicionales según sea necesario
          }
        }
      );
    } catch (error) {
      console.error('Error inesperado en la función guardarEmpresa', error);
    }
  }

  onLogoSelected(event: any) {
    const file = event.target.files[0];
    this.selectedLogoFile = file;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImageUrl = reader.result;
      };
    } else {
      this.previewImageUrl = null;
    }
  }

  private resetFormulario() {
    // Resetea el formulario a su estado inicial
    this.empresaForm.reset();
  }
}
