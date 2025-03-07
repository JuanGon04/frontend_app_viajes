import { TestBed } from '@angular/core/testing';

import { InfoViajeService } from './info-viaje.service';

describe('InfoViajeService', () => {
  let service: InfoViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
