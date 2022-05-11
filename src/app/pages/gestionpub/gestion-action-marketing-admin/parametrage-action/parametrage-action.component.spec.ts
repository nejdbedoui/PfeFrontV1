import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageActionComponent } from './parametrage-action.component';

describe('ParametrageActionComponent', () => {
  let component: ParametrageActionComponent;
  let fixture: ComponentFixture<ParametrageActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrageActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
