import { TestBed } from '@angular/core/testing';

import { HistoriqueInteractionEndPointServiceService } from './historique-interaction-end-point-service.service';

describe('HistoriqueInteractionEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoriqueInteractionEndPointServiceService = TestBed.get(HistoriqueInteractionEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
