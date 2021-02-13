import { TestBed } from '@angular/core/testing';

import { HiringEventService } from './hiring-event.service';

describe('HiringEventService', () => {
  let service: HiringEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiringEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
