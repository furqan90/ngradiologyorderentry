import { TestBed, inject } from '@angular/core/testing';

import { OrderListResolverService } from './order-list-resolver.service';

describe('OrderListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderListResolverService]
    });
  });

  it('should be created', inject([OrderListResolverService], (service: OrderListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
