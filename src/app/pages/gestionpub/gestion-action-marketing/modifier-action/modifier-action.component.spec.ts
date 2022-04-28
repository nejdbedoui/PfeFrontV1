import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierActionComponent } from './modifier-action.component';

describe('ModifierActionComponent', () => {
  let component: ModifierActionComponent;
  let fixture: ComponentFixture<ModifierActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
