import { TestBed } from '@angular/core/testing';

import { ParametreActionEndPointServiceService } from './parametre-action-end-point-service.service';

describe('ParametreActionEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParametreActionEndPointServiceService = TestBed.get(ParametreActionEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
