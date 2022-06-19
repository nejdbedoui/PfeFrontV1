import { TestBed } from '@angular/core/testing';

import { SystemePredictionServiceService } from './systeme-prediction-service.service';

describe('SystemePredictionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemePredictionServiceService = TestBed.get(SystemePredictionServiceService);
    expect(service).toBeTruthy();
  });
});
