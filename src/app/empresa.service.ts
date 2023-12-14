import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Empresa } from './interfaces/Empresa';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private verEmpresaURL = 'https://localhost:7056/api/Empresa/ver-empresa';
  private verEmpresasURL = 'https://localhost:7056/api/Empresa/ver-empresas';
  private crearEmpresaURL = 'https://localhost:7056/api/Empresa/crear-empresa';
  private editarEmpresaURL = 'https://localhost:7056/api/Empresa/editar-empresa';
  private eliminarEmpresaURL = 'https://localhost:7056/api/Empresa/eliminar-empresa';
  private imagenUrl = 'https://localhost:7056/api/imagen';

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.verEmpresasURL);
  }

  getEmpresa(idEmpresa: number ) : Observable<Empresa> {
    return this.http.get<Empresa>(`${this.verEmpresaURL}/${idEmpresa}`)
  }

  crearEmpresa(empresaForm: FormGroup): Observable<any> {
    const formData = new FormData();

    Object.keys(empresaForm.controls).forEach(key => {
      formData.append(key, empresaForm.get(key)?.value);
    });

    return this.http.post(`${this.crearEmpresaURL}`, formData, { responseType: 'text' });
  }

  editarEmpresa(id: number, empresaForm: FormGroup): Observable<any> {
    const formData = new FormData();

    Object.keys(empresaForm.controls).forEach(key => {
      formData.append(key, empresaForm.get(key)?.value);
    });

    return this.http.put(`${this.editarEmpresaURL}/${id}`, formData, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error al editar la empresa', error);
          throw error;
        })
      );
  }

  eliminarEmpresa(id: number): Observable<any> {
    const url = `${this.eliminarEmpresaURL}/${id}`;
    return this.http.delete(url);
  }

  obtenerImagen(nombreArchivo: string): Observable<Blob> {
    return this.http.get(`${this.imagenUrl}/${nombreArchivo}`, { responseType: 'blob' });
  }
}
