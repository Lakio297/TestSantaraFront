import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEditarEmpresaComponent } from './ver-editar-empresa.component';

describe('VerEditarEmpresaComponent', () => {
  let component: VerEditarEmpresaComponent;
  let fixture: ComponentFixture<VerEditarEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerEditarEmpresaComponent]
    });
    fixture = TestBed.createComponent(VerEditarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
