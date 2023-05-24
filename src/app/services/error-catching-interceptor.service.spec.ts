import { TestBed } from '@angular/core/testing';

import { ErrorCatchingInterceptorService } from './error-catching-interceptor.service';

describe('ErrorCatchingInterceptorService', () => {
  let service: ErrorCatchingInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorCatchingInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
