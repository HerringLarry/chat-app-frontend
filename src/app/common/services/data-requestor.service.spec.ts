import { TestBed, inject } from '@angular/core/testing';

import { DataRequestorService } from './data-requestor.service';

describe('DataRequestorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataRequestorService]
    });
  });

  it('should be created', inject([DataRequestorService], (service: DataRequestorService) => {
    expect(service).toBeTruthy();
  }));
});
