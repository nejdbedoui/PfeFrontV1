import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTvComponent } from './action-tv.component';

describe('ActionTvComponent', () => {
  let component: ActionTvComponent;
  let fixture: ComponentFixture<ActionTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
