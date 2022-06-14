import { TestBed } from '@angular/core/testing';

import { DashboardGeneraleEndPointServiceService } from './dashboard-generale-end-point-service.service';

describe('DashboardGeneraleEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardGeneraleEndPointServiceService = TestBed.get(DashboardGeneraleEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
