import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrincipaleComponent } from './dashboard-principale.component';

describe('DashboardPrincipaleComponent', () => {
  let component: DashboardPrincipaleComponent;
  let fixture: ComponentFixture<DashboardPrincipaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPrincipaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
