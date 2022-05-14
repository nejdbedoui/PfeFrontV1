import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionContractComponent } from './gestion-contract.component';

describe('GestionContractComponent', () => {
  let component: GestionContractComponent;
  let fixture: ComponentFixture<GestionContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
