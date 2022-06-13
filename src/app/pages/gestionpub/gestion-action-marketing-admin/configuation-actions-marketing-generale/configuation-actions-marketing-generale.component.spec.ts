import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguationActionsMarketingGeneraleComponent } from './configuation-actions-marketing-generale.component';

describe('ConfiguationActionsMarketingGeneraleComponent', () => {
  let component: ConfiguationActionsMarketingGeneraleComponent;
  let fixture: ComponentFixture<ConfiguationActionsMarketingGeneraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguationActionsMarketingGeneraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguationActionsMarketingGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
