import { TestBed } from '@angular/core/testing';

import { DetailsActionService } from './details-action.service';

describe('DetailsActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsActionService = TestBed.get(DetailsActionService);
    expect(service).toBeTruthy();
  });
});
