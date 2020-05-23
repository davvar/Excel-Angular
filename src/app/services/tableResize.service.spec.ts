/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableResizeService } from './tableResize.service';

describe('Service: TableResize', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableResizeService]
    });
  });

  it('should ...', inject([TableResizeService], (service: TableResizeService) => {
    expect(service).toBeTruthy();
  }));
});
