import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCanalDiffusionComponent } from './create-canal-diffusion.component';

describe('CreateCanalDiffusionComponent', () => {
  let component: CreateCanalDiffusionComponent;
  let fixture: ComponentFixture<CreateCanalDiffusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCanalDiffusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCanalDiffusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
