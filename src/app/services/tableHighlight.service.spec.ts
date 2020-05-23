/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableHighlightService } from './tableHighlight.service';

describe('Service: TableHighlight', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableHighlightService]
    });
  });

  it('should ...', inject([TableHighlightService], (service: TableHighlightService) => {
    expect(service).toBeTruthy();
  }));
});
