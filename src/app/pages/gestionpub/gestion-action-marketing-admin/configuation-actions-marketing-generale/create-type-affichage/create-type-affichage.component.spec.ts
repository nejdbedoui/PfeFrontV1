import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeAffichageComponent } from './create-type-affichage.component';

describe('CreateTypeAffichageComponent', () => {
  let component: CreateTypeAffichageComponent;
  let fixture: ComponentFixture<CreateTypeAffichageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTypeAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTypeAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
