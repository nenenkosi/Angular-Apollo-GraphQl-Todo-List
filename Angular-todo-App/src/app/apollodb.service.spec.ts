import { TestBed } from '@angular/core/testing';

import { ApollodbService } from './apollodb.service';

describe('ApollodbService', () => {
  let service: ApollodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApollodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
