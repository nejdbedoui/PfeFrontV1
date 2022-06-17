import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbToastrModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbProgressBarModule, NbSelectModule, NbSpinnerModule, NbStepperModule, NbThemeModule, NbToastrService } from '@nebular/theme';
import { ListboxModule } from 'primeng/primeng';
import { HttpClientTestingModule } from '../../../../../node_modules1/@angular/common/http/testing';
import { RouterTestingModule } from '../../../../../node_modules1/@angular/router/testing';

import { DashboardPrincipaleComponent } from './dashboard-principale.component';

fdescribe('DashboardPrincipaleComponent', () => {
  let component: DashboardPrincipaleComponent;
  let fixture: ComponentFixture<DashboardPrincipaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPrincipaleComponent ],
      imports: [ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule,NbToastrModule.forRoot(),FormsModule,NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule.forRoot(), NbIconModule, NbInputModule, NbListModule, NbProgressBarModule, NbSelectModule, NbSpinnerModule, NbStepperModule,ListboxModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [NbToastrService,NbThemeModule.forRoot().providers
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPrincipaleComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });
//Teste si la page est creer
  it('Page crée', () => {
    expect(component).toBeTruthy();
  });
});
