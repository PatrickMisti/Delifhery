import { TestBed } from '@angular/core/testing';

import { CanActivateUserGuard } from './can-activate-user-guard.service';

describe('CanActivateUserGuard', () => {
  let service: CanActivateUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateUserGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
