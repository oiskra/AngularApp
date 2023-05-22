import { TestBed } from '@angular/core/testing';

import { FunctionalityService } from './functionality.service';

describe('FunctionalityService', () => {
  let service: FunctionalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
