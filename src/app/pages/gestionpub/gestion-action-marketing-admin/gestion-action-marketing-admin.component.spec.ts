import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionActionMarketingAdminComponent } from './gestion-action-marketing-admin.component';

describe('GestionActionMarketingAdminComponent', () => {
  let component: GestionActionMarketingAdminComponent;
  let fixture: ComponentFixture<GestionActionMarketingAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionActionMarketingAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionActionMarketingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
