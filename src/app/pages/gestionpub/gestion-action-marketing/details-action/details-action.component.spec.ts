import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsActionComponent } from './details-action.component';

fdescribe('DetailsActionComponent', () => {
  let component: DetailsActionComponent;
  let fixture: ComponentFixture<DetailsActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
