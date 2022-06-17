import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbSelectModule, NbSpinnerModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { HttpClientTestingModule } from '../../../../../../../node_modules1/@angular/common/http/testing';
import { RouterTestingModule } from '../../../../../../../node_modules1/@angular/router/testing';
import { NbToastrService } from '../../../../../../../node_modules1/@nebular/theme';
import { ToastrComponent } from '../../../../modal-overlays/toastr/toastr.component';

import { CreateCanalDiffusionComponent } from './create-canal-diffusion.component';

describe('CreateCanalDiffusionComponent', () => {
  let component: CreateCanalDiffusionComponent;
  let fixture: ComponentFixture<CreateCanalDiffusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCanalDiffusionComponent,ToastrComponent ],
      imports: [ReactiveFormsModule,NbButtonModule,RouterTestingModule,HttpClientTestingModule,NbToastrModule.forRoot(),FormsModule,NbSelectModule,NbSpinnerModule],
      providers: [NbToastrService,NbThemeModule.forRoot().providers
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  //Initialisation du composant avant le test
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCanalDiffusionComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });
//Tester s'il y a un contrôle sur les inputs du formulaire
  it('form invalid si vide', () => {
    expect(component.CanalForm.valid).toBeFalsy();
  });

  it('Validation du libelle canale diffusion', ()=>{
    let libelle = component.CanalForm.controls['libelle'];
    expect(libelle.valid).toBeFalsy();
  });
});
