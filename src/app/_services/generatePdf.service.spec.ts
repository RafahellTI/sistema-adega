/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeneratePdfService } from './generatePdf.service';

describe('Service: GeneratePdf', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratePdfService]
    });
  });

  it('should ...', inject([GeneratePdfService], (service: GeneratePdfService) => {
    expect(service).toBeTruthy();
  }));
});
