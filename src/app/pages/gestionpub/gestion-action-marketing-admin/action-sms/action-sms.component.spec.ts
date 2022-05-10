import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSmsComponent } from './action-sms.component';

describe('ActionSmsComponent', () => {
  let component: ActionSmsComponent;
  let fixture: ComponentFixture<ActionSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
