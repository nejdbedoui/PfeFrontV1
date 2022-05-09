import { TestBed } from '@angular/core/testing';

import { VilleEndPointService } from './ville-end-point.service';

describe('VilleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VilleEndPointService = TestBed.get(VilleEndPointService);
    expect(service).toBeTruthy();
  });
});
