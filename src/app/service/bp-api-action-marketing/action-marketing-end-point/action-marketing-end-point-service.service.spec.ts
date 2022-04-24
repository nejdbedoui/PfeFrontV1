import { TestBed } from '@angular/core/testing';

import { ActionMarketingEndPointServiceService } from './action-marketing-end-point-service.service';

describe('ActionMarketingEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionMarketingEndPointServiceService = TestBed.get(ActionMarketingEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
