/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckproService } from './checkpro.service';

describe('Service: Checkpro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckproService]
    });
  });

  it('should ...', inject([CheckproService], (service: CheckproService) => {
    expect(service).toBeTruthy();
  }));
});
