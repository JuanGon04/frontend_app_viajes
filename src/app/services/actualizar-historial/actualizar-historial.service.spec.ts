import { TestBed } from '@angular/core/testing';

import { ActualizarHistorialService } from './actualizar-historial.service';

describe('ActualizarHistorialService', () => {
  let service: ActualizarHistorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarHistorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
