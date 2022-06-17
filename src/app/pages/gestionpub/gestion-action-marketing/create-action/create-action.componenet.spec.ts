import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NbButtonModule, NbToastrModule, NbSelectModule, NbThemeModule, NbToastrService, NbDatepickerModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbListModule, NbProgressBarModule, NbSpinnerModule, NbStepperModule, NbTabsetModule, NbToggleModule } from "@nebular/theme";
import { ListboxModule } from "primeng/primeng";
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from "../../../../../../node_modules1/@angular/common/http/testing";
import { RouterTestingModule } from "../../../../../../node_modules1/@angular/router/testing";
import { CreateActionComponent } from "./create-action.component";

describe('CreateActionComponent', () => {
    let component: CreateActionComponent;
    let fixture: ComponentFixture<CreateActionComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ CreateActionComponent ],
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
      fixture = TestBed.createComponent(CreateActionComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
    });
//Tester si les condition du l'affichage du l'input SMS sont correct
    it('should NOT appear ', () => {
      component.canal1 = 'Mobile';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.SMS'))).toBeNull();

    });

    it('form invalid si vide', () => {
      expect(component.ActionForm1.valid && component.ActionForm2.valid && component.ActionForm3.valid && component.ActionForm1.valid ).toBeFalsy();
    });
  });