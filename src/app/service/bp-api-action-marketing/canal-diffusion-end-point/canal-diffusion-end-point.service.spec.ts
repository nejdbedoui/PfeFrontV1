import { TestBed } from '@angular/core/testing';

import { CanalDiffusionEndPointService } from './canal-diffusion-end-point.service';

describe('CanalDiffusionEndPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanalDiffusionEndPointService = TestBed.get(CanalDiffusionEndPointService);
    expect(service).toBeTruthy();
  });
});
