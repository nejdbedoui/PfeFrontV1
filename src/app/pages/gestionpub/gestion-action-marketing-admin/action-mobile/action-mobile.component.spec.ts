import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMobileComponent } from './action-mobile.component';

describe('ActionMobileComponent', () => {
  let component: ActionMobileComponent;
  let fixture: ComponentFixture<ActionMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
