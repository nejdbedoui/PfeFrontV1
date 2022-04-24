import { TestBed } from '@angular/core/testing';

import { CategoriePubEndPointServiceService } from './categorie-pub-end-point-service.service';

describe('CategoriePubEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriePubEndPointServiceService = TestBed.get(CategoriePubEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
