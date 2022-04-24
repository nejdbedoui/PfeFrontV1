import { TestBed } from '@angular/core/testing';

import { PopulationCibleEndPointServiceService } from './population-cible-end-point-service.service';

describe('PopulationCibleEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopulationCibleEndPointServiceService = TestBed.get(PopulationCibleEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
