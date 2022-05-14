import { TestBed } from '@angular/core/testing';

import { ContractEndPointServiceService } from './contract-end-point-service.service';

describe('ContractEndPointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractEndPointServiceService = TestBed.get(ContractEndPointServiceService);
    expect(service).toBeTruthy();
  });
});
