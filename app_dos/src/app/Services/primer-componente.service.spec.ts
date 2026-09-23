import { TestBed } from '@angular/core/testing';
import { PrimerComponenteService } from './primer-componente.service';

describe('PrimerComponenteService', () => {
  let service: PrimerComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimerComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
