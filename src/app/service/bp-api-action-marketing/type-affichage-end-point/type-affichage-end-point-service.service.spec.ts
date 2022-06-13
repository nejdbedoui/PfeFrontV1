import { TestBed } from '@angular/core/testing';

import { TypeAffichageEndPointServiceService } from './type-affichage-end-point-service.service';

describe('TypeAffichageEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeAffichageEndPointServiceService = TestBed.get(TypeAffichageEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
