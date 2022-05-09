import { TestBed } from '@angular/core/testing';

import { FormatAffichageEndPointService } from './format-affichage-end-point.service';

describe('FormatAffichageEndPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatAffichageEndPointService = TestBed.get(FormatAffichageEndPointService);
    expect(service).toBeTruthy();
  });
});
