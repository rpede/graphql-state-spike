import { TestBed } from '@angular/core/testing';

import { UserIDResolver } from './user-id.resolver';

describe('UserIDResolver', () => {
  let resolver: UserIDResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserIDResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
